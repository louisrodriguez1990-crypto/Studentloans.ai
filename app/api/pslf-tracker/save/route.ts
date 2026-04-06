import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const SaveRequestSchema = z.object({
  email: z.string().email(),
  state: z.object({
    qualifyingPayments: z.number().int().min(0).max(120),
    employmentStartMonth: z.string().max(7), // YYYY-MM
    currentPlan: z.string().max(32),
    loanBalance: z.string().max(20),
    enrolledInSAVE: z.boolean(),
  }),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { success: allowed } = await checkRateLimit(`pslf-save:${ip}`, 20, 60);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = SaveRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { email, state } = parsed.data;

  persistTrackerState(email, state).catch((err) => {
    console.error('[pslf-tracker/save] Background persist failed:', err);
  });

  return NextResponse.json({ success: true });
}

async function persistTrackerState(
  email: string,
  state: z.infer<typeof SaveRequestSchema>['state'],
): Promise<void> {
  const { getSupabaseAdmin } = await import('@/lib/supabase');
  const admin = getSupabaseAdmin();

  await admin.from('pslf_trackers').upsert(
    {
      email,
      qualifying_payments: state.qualifyingPayments,
      employment_start_month: state.employmentStartMonth || null,
      current_plan: state.currentPlan,
      loan_balance: state.loanBalance || null,
      enrolled_in_save: state.enrolledInSAVE,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'email' },
  );
}
