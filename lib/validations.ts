import { z } from 'zod';

// ─── Intake ──────────────────────────────────────────────────────────────────

const LoanTypeSchema = z.enum(['federal_direct', 'ffel', 'perkins', 'private', 'unknown']);
const BalanceRangeSchema = z.enum(['under_10k', '10k_30k', '30k_60k', '60k_100k', 'over_100k']);
const RepaymentStatusSchema = z.enum([
  'in_repayment',
  'grace_period',
  'forbearance_deferment',
  'in_default',
  'unknown',
]);
const EmploymentTypeSchema = z.enum([
  'government_nonprofit',
  'private_sector',
  'self_employed',
  'unemployed',
]);
const IncomeRangeSchema = z.enum(['under_30k', '30k_50k', '50k_75k', '75k_100k', 'over_100k']);
const UserIntentSchema = z.enum([
  'save_plan_impact',
  'refinance_consideration',
  'forgiveness_eligibility',
  'best_repayment_plan',
  'consolidation',
  'understand_options',
]);

export const IntakeDataSchema = z.object({
  loanTypes: z.array(LoanTypeSchema).min(1, 'At least one loan type is required'),
  balanceRange: BalanceRangeSchema,
  repaymentStatus: RepaymentStatusSchema,
  employmentType: EmploymentTypeSchema,
  incomeRange: IncomeRangeSchema,
  familySize: z.number().int().min(1).max(20),
  yearsInRepayment: z.number().int().min(0).max(40),
  intent: z.array(UserIntentSchema).min(1, 'At least one intent is required'),
  disbursedAfterJuly2026: z.boolean().nullable(),
  enrolledInSAVE: z.boolean().nullable(),
  timestamp: z.string().datetime(),
  sessionId: z.string().min(1).max(64),
});

// ─── API Request Bodies ───────────────────────────────────────────────────────

export const AssessRequestSchema = IntakeDataSchema;

export const ReportRequestSchema = z.object({
  sessionId: z.string().min(1).max(64),
  bust: z.boolean().optional(), // true = skip cache read, generate fresh phrasing
  assessment: z.record(z.string(), z.unknown()).optional(), // client-provided AssessmentResult fallback if KV not available
});

export const SubscribeRequestSchema = z.object({
  email: z.string().email(),
  sessionId: z.string().min(1).max(64).optional(),
  // Direct segment (for tools like PSLF tracker that know the segment without an assessment)
  segment: z.string().max(64).optional(),
});

export const TrackRequestSchema = z.object({
  event: z.string().min(1).max(100),
  sessionId: z.string().min(1).max(64).optional(),
  properties: z.record(z.string(), z.unknown()).optional(),
});

// Inferred types
export type IntakeDataInput = z.infer<typeof IntakeDataSchema>;
export type ReportRequestInput = z.infer<typeof ReportRequestSchema>;
export type SubscribeRequestInput = z.infer<typeof SubscribeRequestSchema>;
export type TrackRequestInput = z.infer<typeof TrackRequestSchema>;
