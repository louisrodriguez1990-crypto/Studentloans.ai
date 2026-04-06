// engine/rules/pslf.ts
// Public Service Loan Forgiveness (PSLF) eligibility rules.
//
// Source: https://studentaid.gov/manage-loans/forgiveness-cancellation/public-service
// Effective date of current rules: 2026-04-01
//
// Key requirements (as of policy review date):
//   1. Must have Direct Loans (or consolidate FFEL/Perkins into Direct)
//   2. Must work full-time for a qualifying employer (government or 501(c)(3) nonprofit)
//   3. Must be on a qualifying repayment plan (IDR or standard 10-year)
//   4. Must make 120 qualifying monthly payments
//
// PSLF Waiver (expired Oct 31, 2022): retroactive credit was applied to eligible
// accounts. No new waivers are available. See POLICY_CONFIG.pslfWaiver.
// IDR Account Adjustment: may have credited additional PSLF-qualifying payments
// for time in repayment, deferment, and certain forbearances prior to 2023.

import type { IntakeData, LoanClassification } from '../types';
import { POLICY_CONFIG } from '@/lib/policy-config';

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

  // Note: PSLF Waiver expired per POLICY_CONFIG.pslfWaiver.expiryDate —
  // retroactive credit was applied; borrowers should verify their count at
  // studentaid.gov if they were in repayment before Oct 2022.

  // Estimate payments remaining: yearsInRepayment × 12 is a rough proxy
  // (assumes borrower was on a qualifying plan for all those years).
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
