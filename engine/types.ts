// engine/types.ts
// ALL shared TypeScript interfaces for StudentDebt.ai
// This file is the foundation — every other module imports from here.

export type LoanType =
  | 'federal_direct'
  | 'ffel'
  | 'perkins'
  | 'private'
  | 'unknown';

export type BalanceRange =
  | 'under_10k'
  | '10k_30k'
  | '30k_60k'
  | '60k_100k'
  | 'over_100k';

export type RepaymentStatus =
  | 'in_repayment'
  | 'grace_period'
  | 'forbearance_deferment'
  | 'in_default'
  | 'unknown';

export type EmploymentType =
  | 'government_nonprofit'
  | 'private_sector'
  | 'self_employed'
  | 'unemployed';

export type IncomeRange =
  | 'under_30k'
  | '30k_50k'
  | '50k_75k'
  | '75k_100k'
  | 'over_100k';

export type UserIntent =
  | 'save_plan_impact'
  | 'refinance_consideration'
  | 'forgiveness_eligibility'
  | 'best_repayment_plan'
  | 'consolidation'
  | 'understand_options';

export type RoutingTag =
  | 'refinance_candidate'
  | 'forgiveness_candidate'
  | 'needs_specialist'
  | 'confusion_high'
  | 'no_action_needed'
  | 'deadline_sensitive';

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export type WarningSeverity = 'critical' | 'warning' | 'info';

// ─── Intake ──────────────────────────────────────────────────────────────────

export interface IntakeData {
  loanTypes: LoanType[];
  balanceRange: BalanceRange;
  repaymentStatus: RepaymentStatus;
  employmentType: EmploymentType;
  incomeRange: IncomeRange;
  familySize: number;
  yearsInRepayment: number;
  intent: UserIntent[];
  disbursedAfterJuly2026: boolean | null;
  enrolledInSAVE: boolean | null;
  timestamp: string;
  sessionId: string;
}

// ─── Loan Classification ─────────────────────────────────────────────────────

export interface LoanClassification {
  hasFederalLoans: boolean;
  hasDirectLoans: boolean;
  hasFFEL: boolean;
  hasPerkins: boolean;
  hasPrivateLoans: boolean;
  hasUnknownLoans: boolean;
  // FFEL and Perkins are not directly eligible for IDR/PSLF without consolidation
  requiresConsolidationForIDR: boolean;
  requiresConsolidationForPSLF: boolean;
  // Whether any loans were disbursed/consolidated on or after July 1, 2026
  hasPost2026Loans: boolean | null;
}

// ─── Eligibility ─────────────────────────────────────────────────────────────

export interface EligibilityFlags {
  saveEligible: boolean;
  idrEligible: boolean;
  pslfEligible: boolean;
  refinanceCandidate: boolean;
  consolidationNeeded: boolean;
  // Detailed SAVE eligibility
  saveCurrentlyEnrolled: boolean;
  saveAffectedByCourtInjunction: boolean;
}

// ─── Warnings ────────────────────────────────────────────────────────────────

export interface Warning {
  id: string;
  severity: WarningSeverity;
  title: string;
  detail: string;
  source?: string; // URL to authoritative reference
  effectiveDate?: string; // ISO date string
}

// ─── Recommendations ─────────────────────────────────────────────────────────

export type RecommendationType =
  | 'switch_repayment_plan'
  | 'apply_for_plan'
  | 'consolidate_loans'
  | 'refinance'
  | 'pursue_forgiveness'
  | 'contact_servicer'
  | 'take_no_action'
  | 'seek_specialist';

export interface Recommendation {
  id: string;
  type: RecommendationType;
  priority: number; // 1 = highest priority
  title: string;
  rationale: string;
  action?: string; // specific next step
  caveats?: string[];
  source?: string;
}

// ─── Assessment Result ────────────────────────────────────────────────────────

export interface AssessmentResult {
  sessionId: string;
  engineVersion: string;
  policyVersion: string;
  timestamp: string;
  confidence: ConfidenceLevel;
  loanClassification: LoanClassification;
  eligibility: EligibilityFlags;
  warnings: Warning[];
  recommendations: Recommendation[];
  routingTags: RoutingTag[];
  confusionFlags: string[];
}

// ─── Report ──────────────────────────────────────────────────────────────────

export interface Report {
  sessionId: string;
  assessmentHash: string;
  markdown: string;
  generatedAt: string;
  modelVersion: string;
}

// ─── Session Storage ─────────────────────────────────────────────────────────

export interface SessionData {
  assessment: AssessmentResult;
  report?: Report;
  emailCaptured: boolean;
  ctaClicked?: RoutingTag;
  createdAt: string;
  updatedAt: string;
}
