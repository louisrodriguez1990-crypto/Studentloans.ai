// engine/rules/consolidation.ts
// Federal Direct Consolidation Loan eligibility and recommendation rules.
//
// TODO: Complete consolidation logic after compliance review.
// Source: https://studentaid.gov/manage-loans/consolidation
// Effective date of current rules: 2026-04-01
//
// Key considerations:
//   - Consolidating FFEL/Perkins into Direct unlocks IDR and PSLF eligibility
//   - Consolidation resets payment count for IDR forgiveness (20/25 year clock)
//   - EXCEPTION: IDR Account Adjustment may credit payments made before consolidation
//   - Consolidating into Direct after July 1, 2026 may have different implications
//   - TODO: Verify IDR Account Adjustment one-time payment count restoration status
//
// WARNING: Consolidation of loans in a forgiveness-eligible payment track
// can reset the qualifying payment count. This must always be surfaced as a warning.

import type { IntakeData, LoanClassification } from '../types';

export interface ConsolidationResult {
  needed: boolean;
  recommended: boolean;
  reason?: string;
  paymentCountResetRisk: boolean;
}

export function checkConsolidation(
  intake: IntakeData,
  classification: LoanClassification,
): ConsolidationResult {
  // No consolidation needed if already all Direct loans
  if (classification.hasDirectLoans && !classification.hasFFEL && !classification.hasPerkins) {
    return {
      needed: false,
      recommended: false,
      paymentCountResetRisk: false,
    };
  }

  // No federal loans → consolidation not applicable
  if (!classification.hasFederalLoans) {
    return {
      needed: false,
      recommended: false,
      paymentCountResetRisk: false,
    };
  }

  const hasNonDirectFederal = classification.hasFFEL || classification.hasPerkins;

  // Payment count reset risk exists when borrower has years in repayment
  const paymentCountResetRisk = hasNonDirectFederal && intake.yearsInRepayment > 2;

  if (classification.requiresConsolidationForIDR || classification.requiresConsolidationForPSLF) {
    const isPSLFCandidate = intake.employmentType === 'government_nonprofit';
    const reason = isPSLFCandidate
      ? 'Consolidation required to access PSLF with FFEL/Perkins loans'
      : 'Consolidation required to access income-driven repayment plans';

    return {
      needed: true,
      recommended: true,
      reason,
      paymentCountResetRisk,
    };
  }

  return {
    needed: false,
    recommended: hasNonDirectFederal,
    reason: hasNonDirectFederal
      ? 'Consolidating FFEL/Perkins into Direct loans expands repayment options'
      : undefined,
    paymentCountResetRisk,
  };
}
