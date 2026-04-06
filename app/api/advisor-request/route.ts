import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { getResend, FROM_EMAIL } from '@/lib/resend';

export const runtime = 'nodejs';

const AdvisorRequestSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email(),
  situation: z.string().min(1).max(200),
  details: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { success: allowed } = await checkRateLimit(`advisor-request:${ip}`, 5, 60);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = AdvisorRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { name, email, situation, details } = parsed.data;

  // Send confirmation to user
  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Your advisor match request — StudentDebt.ai',
      html: buildUserConfirmation(name),
    });
  } catch (err) {
    console.error('[advisor-request] Confirmation email failed:', err);
    // Non-fatal — still save the lead
  }

  // Persist lead and notify admin (fire-and-forget)
  persistLead({ name, email, situation, details: details ?? '' }).catch((err) => {
    console.error('[advisor-request] Background persist failed:', err);
  });

  return NextResponse.json({ success: true });
}

async function persistLead(data: {
  name: string;
  email: string;
  situation: string;
  details: string;
}): Promise<void> {
  const { getSupabaseAdmin } = await import('@/lib/supabase');
  const admin = getSupabaseAdmin();

  await admin.from('advisor_requests').insert({
    name: data.name,
    email: data.email,
    situation: data.situation,
    details: data.details || null,
    created_at: new Date().toISOString(),
  });

  // Notify admin
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL;
  if (adminEmail) {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: adminEmail,
      subject: `New advisor request — ${data.name}`,
      html: buildAdminNotification(data),
    });
  }
}

function buildUserConfirmation(name: string): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
      <h2 style="font-size: 20px; font-weight: 700;">We received your request, ${name}</h2>
      <p>We'll match you with a fee-only student loan advisor within 1–2 business days.
      You'll hear from us via this email address.</p>
      <p>In the meantime, you can explore our free tools:</p>
      <ul>
        <li><a href="https://studentdebt.ai/calculators/idr-payment">IDR Payment Calculator</a></li>
        <li><a href="https://studentdebt.ai/tools/pslf-tracker">PSLF Payment Tracker</a></li>
        <li><a href="https://studentdebt.ai/faq">Student Loan FAQ</a></li>
      </ul>
      <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;" />
      <p style="font-size: 12px; color: #9ca3af;">
        StudentDebt.ai provides educational information only. Nothing in this email constitutes
        financial or legal advice.
      </p>
    </div>
  `.trim();
}

function buildAdminNotification(data: {
  name: string;
  email: string;
  situation: string;
  details: string;
}): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
      <h2 style="font-size: 20px; font-weight: 700;">New advisor match request</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 8px; font-weight: 600; color: #6b7280; width: 120px;">Name</td>
          <td style="padding: 8px;">${data.name}</td>
        </tr>
        <tr style="background: #f9fafb;">
          <td style="padding: 8px; font-weight: 600; color: #6b7280;">Email</td>
          <td style="padding: 8px;"><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: 600; color: #6b7280;">Situation</td>
          <td style="padding: 8px;">${data.situation}</td>
        </tr>
        ${data.details ? `
        <tr style="background: #f9fafb;">
          <td style="padding: 8px; font-weight: 600; color: #6b7280; vertical-align: top;">Details</td>
          <td style="padding: 8px;">${data.details}</td>
        </tr>` : ''}
      </table>
    </div>
  `.trim();
}
