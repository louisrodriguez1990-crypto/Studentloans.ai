// engine/assess.ts
// Main deterministic assessment orchestrator.
// This is the only place where rule outputs are combined into an AssessmentResult.
// The LLM layer never calls this directly — it only receives the output.

import { ENGINE_VERSION, POLICY_VERSION } from './version';
import { checkSAVEEligibility } from './rules/save-plan';
import { checkIDREligibility } from './rules/idr';
import { checkPSLFEligibility } from './rules/pslf';
import { checkRefinanceCandidate } from './rules/refinance';
import { checkConsolidation } from './rules/consolidation';
import { POLICY_CONFIG } from '@/lib/policy-config';
import type {
  IntakeData,
  AssessmentResult,
  LoanClassification,
  EligibilityFlags,
  Warning,
  Recommendation,
  RoutingTag,
  ConfidenceLevel,
} from './types';

// ─── Loan Classification ─────────────────────────────────────────────────────

function classifyLoans(intake: IntakeData): LoanClassification {
  const hasFederalLoans = intake.loanTypes.some(
    (t) => t === 'federal_direct' || t === 'ffel' || t === 'perkins',
  );
  const hasDirectLoans = intake.loanTypes.includes('federal_direct');
  const hasFFEL = intake.loanTypes.includes('ffel');
  const hasPerkins = intake.loanTypes.includes('perkins');
  const hasPrivateLoans = intake.loanTypes.includes('private');
  const hasUnknownLoans = intake.loanTypes.includes('unknown');

  // FFEL and Perkins require consolidation to access IDR/PSLF
  const requiresConsolidationForIDR = (hasFFEL || hasPerkins) && !hasDirectLoans;
  const requiresConsolidationForPSLF = (hasFFEL || hasPerkins) && !hasDirectLoans;

  return {
    hasFederalLoans,
    hasDirectLoans,
    hasFFEL,
    hasPerkins,
    hasPrivateLoans,
    hasUnknownLoans,
    requiresConsolidationForIDR,
    requiresConsolidationForPSLF,
    hasPost2026Loans: intake.disbursedAfterJuly2026,
  };
}

// ─── Eligibility Aggregation ─────────────────────────────────────────────────

function buildEligibility(
  intake: IntakeData,
  classification: LoanClassification,
): EligibilityFlags {
  const saveResult = checkSAVEEligibility(intake, classification);
  const idrResult = checkIDREligibility(intake, classification);
  const pslfResult = checkPSLFEligibility(intake, classification);
  const refinanceResult = checkRefinanceCandidate(intake);
  const consolidationResult = checkConsolidation(intake, classification);

  return {
    saveEligible: saveResult.eligible,
    idrEligible: idrResult.eligible,
    pslfEligible: pslfResult.eligible,
    refinanceCandidate: refinanceResult.isCandidate,
    consolidationNeeded: consolidationResult.needed,
    saveCurrentlyEnrolled: saveResult.currentlyEnrolled,
    saveAffectedByCourtInjunction: saveResult.affectedByInjunction,
  };
}

// ─── Warnings ────────────────────────────────────────────────────────────────

function collectWarnings(intake: IntakeData, eligibility: EligibilityFlags): Warning[] {
  const warnings: Warning[] = [];

  // SAVE injunction warning — highest priority for affected borrowers
  if (eligibility.saveCurrentlyEnrolled && eligibility.saveAffectedByCourtInjunction) {
    warnings.push({
      id: 'save-injunction',
      severity: 'critical',
      title: 'Your SAVE Plan payments are paused',
      detail:
        'The SAVE Plan is currently subject to a court injunction. Borrowers enrolled in SAVE ' +
        'have been placed in administrative forbearance. Payments made during forbearance ' +
        'do not count toward IDR forgiveness or PSLF. Check studentaid.gov for current status.',
      source: 'https://studentaid.gov/announcements-events/save-plan',
      effectiveDate: POLICY_CONFIG.save.injunctionEffectiveDate,
    });
  }

  // Federal benefit loss warning for refinance candidates
  if (eligibility.refinanceCandidate && eligibility.idrEligible) {
    warnings.push({
      id: 'refinance-federal-loss',
      severity: 'critical',
      title: 'Refinancing would permanently eliminate your federal protections',
      detail:
        'Refinancing federal loans into a private loan is irreversible. You would lose access ' +
        'to income-driven repayment, Public Service Loan Forgiveness, federal forbearance, ' +
        'and any future federal forgiveness programs.',
      source: 'https://studentaid.gov/manage-loans/refinancing',
    });
  }

  // Consolidation payment count reset warning
  if (eligibility.consolidationNeeded && intake.yearsInRepayment > 2) {
    warnings.push({
      id: 'consolidation-reset',
      severity: 'warning',
      title: 'Consolidation may reset your repayment payment count',
      detail:
        'Consolidating your loans into a Direct Consolidation Loan typically resets your ' +
        'qualifying payment count for IDR forgiveness. The IDR Account Adjustment may ' +
        'partially restore prior payments — confirm with your servicer before consolidating.',
      source: 'https://studentaid.gov/manage-loans/consolidation',
    });
  }

  // Default warning
  if (intake.repaymentStatus === 'in_default') {
    warnings.push({
      id: 'in-default',
      severity: 'critical',
      title: 'Your loans are in default',
      detail:
        'Defaulted loans carry serious consequences including damaged credit, wage garnishment, ' +
        'and loss of eligibility for federal student aid. You must exit default before accessing ' +
        'income-driven repayment or forgiveness programs. Options include loan rehabilitation ' +
        'or direct consolidation.',
      source: 'https://studentaid.gov/manage-loans/default',
    });
  }

  return warnings;
}

// ─── Recommendations ─────────────────────────────────────────────────────────

function buildRecommendations(
  intake: IntakeData,
  eligibility: EligibilityFlags,
): Recommendation[] {
  const recs: Recommendation[] = [];
  let priority = 1;

  // Default exit — must happen first
  if (intake.repaymentStatus === 'in_default') {
    recs.push({
      id: 'exit-default',
      type: 'contact_servicer',
      priority: priority++,
      title: 'Exit default immediately',
      rationale:
        'Default blocks access to all income-driven repayment plans and forgiveness programs.',
      action:
        'Contact your servicer or call the Default Resolution Group at 1-800-621-3115 to ' +
        'start rehabilitation or consolidation.',
      source: 'https://studentaid.gov/manage-loans/default',
    });
  }

  // PSLF path
  if (eligibility.pslfEligible) {
    recs.push({
      id: 'pursue-pslf',
      type: 'pursue_forgiveness',
      priority: priority++,
      title: 'Submit your PSLF Employment Certification Form',
      rationale:
        'You appear eligible for Public Service Loan Forgiveness. After 120 qualifying payments ' +
        'while working for a qualifying employer, your remaining balance is forgiven tax-free.',
      action:
        'Submit the PSLF Form annually and whenever you change employers using the PSLF Help Tool.',
      source: 'https://studentaid.gov/manage-loans/forgiveness-cancellation/public-service',
    });
  }

  // Consolidation needed
  if (eligibility.consolidationNeeded) {
    recs.push({
      id: 'consolidate-for-access',
      type: 'consolidate_loans',
      priority: priority++,
      title: 'Consolidate your loans to access federal repayment options',
      rationale:
        'Your FFEL or Perkins loans must be consolidated into a Direct Loan to access ' +
        'income-driven repayment plans and PSLF.',
      action:
        'Apply for a Direct Consolidation Loan at studentaid.gov. Understand the payment ' +
        'count reset implications first.',
      caveats: ['Your qualifying payment count may reset after consolidation.'],
      source: 'https://studentaid.gov/manage-loans/consolidation',
    });
  }

  // IDR plan enrollment
  if (eligibility.idrEligible && !eligibility.pslfEligible) {
    recs.push({
      id: 'enroll-idr',
      type: 'apply_for_plan',
      priority: priority++,
      title: 'Enroll in an income-driven repayment plan',
      rationale:
        'An IDR plan caps your monthly payment at a percentage of your discretionary income ' +
        'and forgives any remaining balance after 20-25 years of payments.',
      action: 'Apply at studentaid.gov/idr. Compare IBR and ICR options currently available.',
      source: 'https://studentaid.gov/manage-loans/repayment/plans/income-driven',
    });
  }

  // Refinance (only for strong candidates, always with warnings)
  if (eligibility.refinanceCandidate) {
    recs.push({
      id: 'compare-refinance',
      type: 'refinance',
      priority: priority++,
      title: 'Compare private refinance rates — but review the trade-offs first',
      rationale:
        'Your income and employment profile may qualify you for a competitive private rate.',
      action:
        'Compare offers from multiple lenders. Never refinance federal loans without ' +
        'first confirming you will not need IDR, PSLF, or federal forbearance.',
      caveats: [
        'Refinancing federal loans is irreversible.',
        'You permanently lose access to income-driven repayment and PSLF.',
      ],
    });
  }

  // No action needed
  if (recs.length === 0) {
    recs.push({
      id: 'no-action',
      type: 'take_no_action',
      priority: 1,
      title: "Your situation doesn't require immediate action",
      rationale: 'Based on your inputs, your current repayment path is appropriate.',
      action: 'Continue monitoring policy updates and re-assess annually.',
    });
  }

  return recs;
}

// ─── Routing Tags ────────────────────────────────────────────────────────────

function deriveRoutingTags(
  intake: IntakeData,
  eligibility: EligibilityFlags,
  confusionFlags: string[],
): RoutingTag[] {
  const tags: RoutingTag[] = [];

  if (eligibility.refinanceCandidate) tags.push('refinance_candidate');
  if (eligibility.pslfEligible) tags.push('forgiveness_candidate');
  if (intake.repaymentStatus === 'in_default') tags.push('needs_specialist');
  if (confusionFlags.length >= 3) tags.push('confusion_high');
  if (eligibility.saveCurrentlyEnrolled && eligibility.saveAffectedByCourtInjunction)
    tags.push('deadline_sensitive');

  if (tags.length === 0) tags.push('no_action_needed');

  return tags;
}

// ─── Confusion Flags ─────────────────────────────────────────────────────────

function detectConfusion(intake: IntakeData): string[] {
  const flags: string[] = [];

  if (intake.loanTypes.includes('unknown')) flags.push('unknown_loan_type');
  if (intake.repaymentStatus === 'unknown') flags.push('unknown_repayment_status');
  if (intake.disbursedAfterJuly2026 === null) flags.push('unknown_disbursement_date');
  if (intake.enrolledInSAVE === null) flags.push('unknown_save_enrollment');
  if (intake.intent.includes('understand_options')) flags.push('general_confusion');

  return flags;
}

// ─── Confidence ──────────────────────────────────────────────────────────────

function computeConfidence(
  intake: IntakeData,
  confusionFlags: string[],
): ConfidenceLevel {
  const unknownCount = confusionFlags.length;
  if (unknownCount === 0) return 'high';
  if (unknownCount <= 2) return 'medium';
  return 'low';
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export function runAssessment(intake: IntakeData): AssessmentResult {
  const loanClassification = classifyLoans(intake);
  const eligibility = buildEligibility(intake, loanClassification);
  const confusionFlags = detectConfusion(intake);
  const warnings = collectWarnings(intake, eligibility);
  const recommendations = buildRecommendations(intake, eligibility);
  const routingTags = deriveRoutingTags(intake, eligibility, confusionFlags);
  const confidence = computeConfidence(intake, confusionFlags);

  return {
    sessionId: intake.sessionId,
    engineVersion: ENGINE_VERSION,
    policyVersion: POLICY_VERSION,
    timestamp: new Date().toISOString(),
    confidence,
    loanClassification,
    eligibility,
    warnings,
    recommendations,
    routingTags,
    confusionFlags,
  };
}
