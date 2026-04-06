import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const { success: allowed } = await checkRateLimit(`pslf-load:${ip}`, 30, 60);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  const email = request.nextUrl.searchParams.get('email');
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }

  try {
    const { getSupabaseAdmin } = await import('@/lib/supabase');
    const admin = getSupabaseAdmin();

    const { data, error } = await admin
      .from('pslf_trackers')
      .select(
        'qualifying_payments, employment_start_month, current_plan, loan_balance, enrolled_in_save',
      )
      .eq('email', email)
      .single();

    if (error || !data) {
      return NextResponse.json({ state: null });
    }

    return NextResponse.json({
      state: {
        qualifyingPayments: data.qualifying_payments ?? 0,
        employmentStartMonth: data.employment_start_month ?? '',
        currentPlan: data.current_plan ?? 'ibr',
        loanBalance: data.loan_balance ?? '',
        enrolledInSAVE: data.enrolled_in_save ?? false,
      },
    });
  } catch (err) {
    console.error('[pslf-tracker/load] Supabase error:', err);
    return NextResponse.json({ state: null });
  }
}
