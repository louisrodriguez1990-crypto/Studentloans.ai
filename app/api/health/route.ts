import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface CheckResult {
  status: 'ok' | 'error' | 'unconfigured';
  message?: string;
}

async function checkKV(): Promise<CheckResult> {
  if (!process.env.KV_REST_API_URL) return { status: 'unconfigured' };
  try {
    const { kv } = await import('@/lib/kv');
    await kv.set('health:ping', 1, { ex: 10 });
    return { status: 'ok' };
  } catch (err) {
    return { status: 'error', message: String(err) };
  }
}

async function checkSupabase(): Promise<CheckResult> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return { status: 'unconfigured' };
  try {
    const { getSupabaseAdmin } = await import('@/lib/supabase');
    const admin = getSupabaseAdmin();
    const { error } = await admin.from('assessments').select('id').limit(1);
    if (error) return { status: 'error', message: error.message };
    return { status: 'ok' };
  } catch (err) {
    return { status: 'error', message: String(err) };
  }
}

function checkAnthropicKey(): CheckResult {
  if (!process.env.ANTHROPIC_API_KEY) return { status: 'unconfigured' };
  return { status: 'ok' };
}

function checkResendKey(): CheckResult {
  if (!process.env.RESEND_API_KEY) return { status: 'unconfigured' };
  return { status: 'ok' };
}

export async function GET() {
  const [kvCheck, supabaseCheck] = await Promise.allSettled([checkKV(), checkSupabase()]);

  const checks = {
    kv: kvCheck.status === 'fulfilled' ? kvCheck.value : { status: 'error' as const },
    supabase: supabaseCheck.status === 'fulfilled' ? supabaseCheck.value : { status: 'error' as const },
    anthropic: checkAnthropicKey(),
    resend: checkResendKey(),
  };

  const allOk = Object.values(checks).every(
    (c) => c.status === 'ok' || c.status === 'unconfigured',
  );
  const anyError = Object.values(checks).some((c) => c.status === 'error');

  const overallStatus = anyError ? 'degraded' : allOk ? 'ok' : 'degraded';

  return NextResponse.json(
    { status: overallStatus, checks, timestamp: new Date().toISOString() },
    { status: overallStatus === 'ok' ? 200 : 207 },
  );
}
