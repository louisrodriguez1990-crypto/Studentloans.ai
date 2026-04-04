import { Resend } from 'resend';

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'noreply@studentdebt.ai';

// Lazy singleton — avoids throwing at build time when RESEND_API_KEY is not set
let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}
