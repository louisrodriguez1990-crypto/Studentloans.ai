// engine/rules/idr.ts
// Income-Driven Repayment (IDR) plan eligibility rules.
//
// Source: https://studentaid.gov/manage-loans/repayment/plans/income-driven
// Source: https://www.federalregister.gov/documents/2023/07/10/2023-13112/
// Effective date of current rules: 2026-04-01
//
// Plans covered:
//   - SAVE (Saving on a Valuable Education) — see rules/save-plan.ts
//   - PAYE (Pay As You Earn) — closed to new enrollees as of July 1, 2024
//   - IBR New (2014): 10% discretionary income; requires partial financial hardship
//   - IBR Old (2007): 15% discretionary income; requires partial financial hardship
//   - ICR (Income-Contingent Repayment) — no hardship requirement; only plan for Parent PLUS consolidation

import type { IntakeData, LoanClassification } from '../types';
import { hasPartialFinancialHardship } from '../lib/hardship';
import { POLICY_CONFIG } from '@/lib/policy-config';

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

  if (classification.hasDirectLoans) {
    // SAVE and ICR have no partial financial hardship requirement
    availablePlans.push('SAVE');
    availablePlans.push('ICR');

    // IBR New (2014): eligible only if IDR payment < standard 10-year payment
    if (hasPartialFinancialHardship(intake, 'IBR_NEW')) {
      availablePlans.push('IBR_NEW');
    }

    // IBR Old (2007): eligible only if IDR payment < standard 10-year payment
    if (hasPartialFinancialHardship(intake, 'IBR_OLD')) {
      availablePlans.push('IBR_OLD');
    }

    // PAYE is closed to new enrollees as of the closure date in policy config
    if (!POLICY_CONFIG.paye.closedToNewEnrollees) {
      availablePlans.push('PAYE');
    }
  }

  return {
    eligible: availablePlans.length > 0,
    availablePlans,
    requiresConsolidation: false,
  };
}
