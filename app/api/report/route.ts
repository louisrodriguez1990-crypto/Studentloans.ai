import { NextRequest, NextResponse } from 'next/server';
import { ReportRequestSchema } from '@/lib/validations';
import { getSession, getReport, setReport } from '@/lib/kv';
import { anthropic, REPORT_MODEL, REPORT_MAX_TOKENS } from '@/lib/anthropic';
import { buildUserPrompt, SYSTEM_PROMPT } from '@/lib/report-prompt';
import { hashAssessment } from '@/engine/hash';
import { trackEvent } from '@/lib/posthog';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import type { AssessmentResult, Report } from '@/engine/types';

export const runtime = 'nodejs';
export const maxDuration = 45; // extended to accommodate retries

/** Generate LLM report with up to 3 attempts and exponential backoff */
async function generateWithRetry(assessment: NonNullable<Awaited<ReturnType<typeof getSession>>>): Promise<string> {
  const maxAttempts = 3;
  let lastErr: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const message = await anthropic.messages.create({
        model: REPORT_MODEL,
        max_tokens: REPORT_MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: buildUserPrompt(assessment) }],
      });
      const content = message.content[0];
      if (content.type !== 'text') throw new Error('Unexpected LLM response type');
      return content.text;
    } catch (err) {
      lastErr = err;
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 1000 * attempt)); // 1s, 2s
      }
    }
  }
  throw lastErr;
}

export async function POST(request: NextRequest) {
  // Rate limiting: 10 requests/min per IP
  const ip = getClientIp(request);
  const { success: allowed } = await checkRateLimit(`report:${ip}`, 10, 60);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = ReportRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { sessionId, bust, assessment: clientAssessment } = parsed.data;

  // Try KV first, fall back to client-provided assessment (non-fatal if KV is down)
  let assessment: AssessmentResult | null = await getSession(sessionId).catch(() => null);
  if (!assessment) {
    if (clientAssessment) {
      assessment = clientAssessment as unknown as AssessmentResult;
    } else {
      return NextResponse.json(
        { error: 'Session not found or expired. Please complete the assessment again.' },
        { status: 404 },
      );
    }
  }

  const assessmentHash = hashAssessment(assessment);

  // Check report cache (non-fatal if KV is down)
  if (!bust) {
    const cached = await getReport(assessmentHash).catch(() => null);
    if (cached) {
      trackEvent(sessionId, 'report_served_from_cache').catch(() => {});
      return NextResponse.json(cached);
    }
  }

  // Generate with retry logic
  let markdown: string;
  try {
    markdown = await generateWithRetry(assessment);
  } catch (err) {
    console.error('[report] LLM generation failed after retries:', err);
    return NextResponse.json(
      { error: 'Report generation failed. Please try again.' },
      { status: 502 },
    );
  }

  const report: Report = {
    sessionId,
    assessmentHash,
    markdown,
    generatedAt: new Date().toISOString(),
    modelVersion: REPORT_MODEL,
  };

  // Cache the report (30-day TTL) — non-fatal if KV is down
  setReport(assessmentHash, report).catch((err) => {
    console.error('[report] KV report cache write failed (non-fatal):', err);
  });

  trackEvent(sessionId, 'report_generated', { bust: bust ?? false }).catch(() => {});

  return NextResponse.json(report);
}
