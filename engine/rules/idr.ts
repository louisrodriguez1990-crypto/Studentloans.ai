// engine/rules/idr.ts
// Income-Driven Repayment (IDR) plan eligibility rules.
//
// TODO: Complete eligibility matrix after compliance review.
// Source: https://studentaid.gov/manage-loans/repayment/plans/income-driven
// Source: https://www.federalregister.gov/documents/2023/07/10/2023-13112/
// Effective date of current rules: 2026-04-01
//
// Plans covered:
//   - SAVE (Saving on a Valuable Education) — see rules/save-plan.ts
//   - PAYE (Pay As You Earn) — closed to new enrollees as of July 1, 2024
//   - IBR (Income-Based Repayment) — original and 2014 versions
//   - ICR (Income-Contingent Repayment) — only plan available for Parent PLUS consolidation
//
// TODO: Confirm PAYE closure date and whether existing enrollees are grandfathered.

import type { IntakeData, LoanClassification } from '../types';

export interface IDREligibilityResult {
  eligible: boolean;
  availablePlans: IDRPlan[];
  requiresConsolidation: boolean;
}

export type IDRPlan = 'SAVE' | 'IBR_NEW' | 'IBR_OLD' | 'ICR' | 'PAYE';

export function checkIDREligibility(
  intake: IntakeData,
  classification: LoanClassification,
): IDREligibilityResult {
  // Private loans are never eligible
  if (!classification.hasFederalLoans) {
    return { eligible: false, availablePlans: [], requiresConsolidation: false };
  }

  const requiresConsolidation =
    classification.requiresConsolidationForIDR && !classification.hasDirectLoans;

  if (requiresConsolidation) {
    // Can still become eligible after consolidation
    return { eligible: false, availablePlans: [], requiresConsolidation: true };
  }

  const availablePlans: IDRPlan[] = [];

  // TODO: IBR eligibility requires partial financial hardship — need income/payment comparison
  // For now, assume eligible if they have federal direct loans
  if (classification.hasDirectLoans) {
    availablePlans.push('SAVE');
    availablePlans.push('IBR_NEW');
    availablePlans.push('IBR_OLD');
    availablePlans.push('ICR');
  }

  // TODO: PAYE is closed to new enrollees — only include if already enrolled
  // availablePlans.push('PAYE');

  return {
    eligible: availablePlans.length > 0,
    availablePlans,
    requiresConsolidation: false,
  };
}
