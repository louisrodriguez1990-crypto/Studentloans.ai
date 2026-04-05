import { NextRequest, NextResponse } from 'next/server';
import { SubscribeRequestSchema } from '@/lib/validations';
import { getResend, FROM_EMAIL } from '@/lib/resend';
import { trackEvent } from '@/lib/posthog';
import { scheduleDripEmails } from '@/lib/email-sequences';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = SubscribeRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { email, sessionId, segment: clientSegment } = parsed.data;

  // Send confirmation email
  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Your StudentDebt.ai assessment is saved',
      html: buildConfirmationEmail(),
    });
  } catch (err) {
    console.error('[subscribe] Email send failed:', err);
    return NextResponse.json(
      { error: 'Failed to send confirmation email. Please try again.' },
      { status: 502 },
    );
  }

  // Persist to Supabase and determine segment (fire-and-forget)
  persistAndSchedule(email, sessionId, clientSegment).catch((err) => {
    console.error('[subscribe] Background persist/schedule failed:', err);
  });

  if (sessionId) {
    trackEvent(sessionId, 'email_captured').catch(() => {});
  }

  return NextResponse.json({ success: true });
}

async function persistAndSchedule(
  email: string,
  sessionId?: string,
  clientSegment?: string,
): Promise<void> {
  const { getSupabaseAdmin } = await import('@/lib/supabase');
  const admin = getSupabaseAdmin();

  // Determine segment: look up from assessment if sessionId provided, else use clientSegment
  let segment: string | null = clientSegment ?? null;

  if (!segment && sessionId) {
    try {
      const { data: assessment } = await admin
        .from('assessments')
        .select('result_data')
        .eq('session_id', sessionId)
        .single();
      const routingTags = assessment?.result_data?.routingTags as string[] | undefined;
      segment = routingTags?.[0] ?? null;
    } catch {
      // Non-fatal — proceed without segment
    }
  }

  // Upsert subscriber with segment
  await admin
    .from('subscribers')
    .upsert({ email, session_id: sessionId ?? null, segment }, { onConflict: 'email' });

  // Schedule drip emails based on segment
  if (segment) {
    try {
      await scheduleDripEmails(email, segment, FROM_EMAIL, getResend());
    } catch (err) {
      console.error('[subscribe] Drip scheduling failed (non-fatal):', err);
    }
  }
}

function buildConfirmationEmail(): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Your assessment is saved</h2>
      <p>We've saved your StudentDebt.ai assessment. We'll send you updates when relevant
      student loan policy changes affect your situation.</p>
      <p>Return to your assessment any time by visiting
      <a href="https://studentdebt.ai">studentdebt.ai</a>.</p>
      <hr />
      <p style="font-size: 12px; color: #666;">
        This email is for informational purposes only. It is not financial or legal advice.
        You can unsubscribe at any time by replying to this email with "unsubscribe".
      </p>
    </div>
  `.trim();
}
