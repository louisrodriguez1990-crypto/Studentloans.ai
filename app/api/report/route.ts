import { NextRequest, NextResponse } from 'next/server';
import { ReportRequestSchema } from '@/lib/validations';
import { getSession, getReport, setReport } from '@/lib/kv';
import { anthropic, REPORT_MODEL, REPORT_MAX_TOKENS } from '@/lib/anthropic';
import { buildUserPrompt, SYSTEM_PROMPT } from '@/lib/report-prompt';
import { hashAssessment } from '@/engine/hash';
import { trackEvent } from '@/lib/posthog';
import type { Report } from '@/engine/types';

export const runtime = 'nodejs';
// Reports can take up to 30s for cold LLM calls
export const maxDuration = 30;

export async function POST(request: NextRequest) {
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

  const { sessionId, bust } = parsed.data;

  // Load the assessment from KV
  const assessment = await getSession(sessionId);
  if (!assessment) {
    return NextResponse.json(
      { error: 'Session not found or expired. Please complete the assessment again.' },
      { status: 404 },
    );
  }

  const assessmentHash = hashAssessment(assessment);

  // Check cache unless bust=true (used by "Regenerate" button)
  if (!bust) {
    const cached = await getReport(assessmentHash);
    if (cached) {
      trackEvent(sessionId, 'report_served_from_cache').catch(() => {});
      return NextResponse.json(cached);
    }
  }

  // Generate report via LLM
  let markdown: string;
  try {
    const message = await anthropic.messages.create({
      model: REPORT_MODEL,
      max_tokens: REPORT_MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildUserPrompt(assessment) }],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected LLM response type');
    }
    markdown = content.text;
  } catch (err) {
    console.error('[report] LLM generation failed:', err);
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

  // Cache the report (30-day TTL)
  await setReport(assessmentHash, report);

  trackEvent(sessionId, 'report_generated', { bust: bust ?? false }).catch(() => {});

  return NextResponse.json(report);
}
