// engine/rules/pslf.ts
// Public Service Loan Forgiveness (PSLF) eligibility rules.
//
// TODO: Complete eligibility logic after compliance review.
// Source: https://studentaid.gov/manage-loans/forgiveness-cancellation/public-service
// Effective date of current rules: 2026-04-01
//
// Key requirements (as of policy review date):
//   1. Must have Direct Loans (or consolidate FFEL/Perkins into Direct)
//   2. Must work full-time for a qualifying employer (government or 501(c)(3) nonprofit)
//   3. Must be on a qualifying repayment plan (IDR or standard)
//   4. Must make 120 qualifying monthly payments
//
// TODO: Verify whether the PSLF Waiver (expired Oct 31, 2022) has any ongoing effects.
// TODO: Confirm IDR Account Adjustment implications for PSLF payment counts.

import type { IntakeData, LoanClassification } from '../types';

export interface PSLFEligibilityResult {
  eligible: boolean;
  requiresConsolidation: boolean;
  qualifyingEmployer: boolean;
  estimatedPaymentsRemaining?: number;
}

export function checkPSLFEligibility(
  intake: IntakeData,
  classification: LoanClassification,
): PSLFEligibilityResult {
  // Private loans are never eligible
  if (!classification.hasFederalLoans) {
    return {
      eligible: false,
      requiresConsolidation: false,
      qualifyingEmployer: false,
    };
  }

  // Only government/nonprofit employment qualifies
  const qualifyingEmployer = intake.employmentType === 'government_nonprofit';

  if (!qualifyingEmployer) {
    return {
      eligible: false,
      requiresConsolidation: classification.requiresConsolidationForPSLF,
      qualifyingEmployer: false,
    };
  }

  // FFEL/Perkins require consolidation into Direct Loans for PSLF
  const requiresConsolidation =
    classification.requiresConsolidationForPSLF && !classification.hasDirectLoans;

  if (requiresConsolidation) {
    return {
      eligible: false,
      requiresConsolidation: true,
      qualifyingEmployer: true,
    };
  }

  // TODO: Check if they're on a qualifying repayment plan
  // Standard 10-year and all IDR plans qualify; graduated/extended do not
  // For now, assume eligible if they meet the other criteria

  // TODO: Estimate payments remaining based on yearsInRepayment
  const estimatedPaymentsRemaining =
    intake.yearsInRepayment >= 10
      ? 0
      : Math.max(0, (10 - intake.yearsInRepayment) * 12);

  return {
    eligible: classification.hasDirectLoans,
    requiresConsolidation: false,
    qualifyingEmployer: true,
    estimatedPaymentsRemaining,
  };
}
