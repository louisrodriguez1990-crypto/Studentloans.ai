import { NextRequest, NextResponse } from 'next/server';
import { AssessRequestSchema } from '@/lib/validations';
import { runAssessment } from '@/engine/assess';
import { setSession } from '@/lib/kv';
import { trackEvent } from '@/lib/posthog';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  // Rate limiting: 5 assessments/min per IP (prevent API abuse)
  const ip = getClientIp(request);
  const { success: allowed } = await checkRateLimit(`assess:${ip}`, 5, 60);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = AssessRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const intake = parsed.data;
  const result = runAssessment(intake);

  // Store in KV (7-day TTL) — non-fatal if KV is not configured
  try {
    await setSession(intake.sessionId, result);
  } catch (err) {
    console.error('[assess] KV write failed (non-fatal):', err);
  }

  // Fire-and-forget: persist to Supabase for analytics (non-blocking)
  persistToSupabase(intake, result).catch((err) => {
    console.error('[assess] Supabase persist failed:', err);
  });

  // Track assessment event anonymously
  trackEvent(intake.sessionId, 'assessment_completed', {
    confidence: result.confidence,
    routing_tags: result.routingTags,
    confusion_flags: result.confusionFlags,
  }).catch(() => {});

  return NextResponse.json({
    sessionId: intake.sessionId,
    confidence: result.confidence,
    routingTags: result.routingTags,
    assessment: result,
  });
}

async function persistToSupabase(
  intake: ReturnType<typeof AssessRequestSchema.parse>,
  result: Awaited<ReturnType<typeof runAssessment>>,
): Promise<void> {
  // Lazy import to keep this out of the critical path
  const { getSupabaseAdmin } = await import('@/lib/supabase');
  const admin = getSupabaseAdmin();
  await admin.from('assessments').insert({
    session_id: intake.sessionId,
    engine_version: result.engineVersion,
    policy_version: result.policyVersion,
    intake_data: intake,
    result_data: result,
  });
}
