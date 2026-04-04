import { NextRequest, NextResponse } from 'next/server';
import { SubscribeRequestSchema } from '@/lib/validations';
import { getResend, FROM_EMAIL } from '@/lib/resend';
import { trackEvent } from '@/lib/posthog';

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

  const { email, sessionId } = parsed.data;

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

  // Persist to Supabase subscribers table (fire-and-forget)
  persistSubscriber(email, sessionId).catch((err) => {
    console.error('[subscribe] Supabase persist failed:', err);
  });

  if (sessionId) {
    trackEvent(sessionId, 'email_captured').catch(() => {});
  }

  return NextResponse.json({ success: true });
}

async function persistSubscriber(email: string, sessionId?: string): Promise<void> {
  const { getSupabaseAdmin } = await import('@/lib/supabase');
  const admin = getSupabaseAdmin();
  await admin
    .from('subscribers')
    .upsert({ email, session_id: sessionId ?? null }, { onConflict: 'email' });
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
