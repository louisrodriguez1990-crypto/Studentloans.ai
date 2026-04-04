// engine/rules/refinance.ts
// Refinance candidate detection rules.
//
// TODO: Complete rate-comparison logic after compliance review.
// Source: https://studentaid.gov/manage-loans/refinancing
// Effective date of current rules: 2026-04-01
//
// CRITICAL WARNING: Refinancing federal loans into private loans is IRREVERSIBLE.
// Borrowers lose access to:
//   - Income-driven repayment plans
//   - Public Service Loan Forgiveness
//   - Federal forbearance/deferment protections
//   - Potential future federal forgiveness programs
//
// This engine will ALWAYS surface these warnings before any refinance CTA.
// The routing tag 'refinance_candidate' should NEVER appear without the corresponding
// federal-benefit-loss warning.

import type { IntakeData } from '../types';

export interface RefinanceCandidateResult {
  isCandidate: boolean;
  federalBenefitLossRisk: boolean;
  primaryReason?: string;
}

export function checkRefinanceCandidate(intake: IntakeData): RefinanceCandidateResult {
  // Borrowers pursuing PSLF should NEVER refinance federal loans
  if (intake.employmentType === 'government_nonprofit') {
    return {
      isCandidate: false,
      federalBenefitLossRisk: true,
      primaryReason: 'PSLF eligibility would be lost',
    };
  }

  // Borrowers in default should address default first, not refinance
  if (intake.repaymentStatus === 'in_default') {
    return {
      isCandidate: false,
      federalBenefitLossRisk: true,
      primaryReason: 'Must exit default before refinancing',
    };
  }

  // Only private-sector, employed borrowers with higher incomes are plausible candidates
  const higherIncomeRanges = ['50k_75k', '75k_100k', 'over_100k'];
  const hasHigherIncome = higherIncomeRanges.includes(intake.incomeRange);

  if (!hasHigherIncome) {
    return {
      isCandidate: false,
      federalBenefitLossRisk: true,
      primaryReason: 'Income-driven repayment likely more beneficial at this income level',
    };
  }

  // TODO: Compare estimated IDR payment vs. private market rates
  // TODO: Factor in balance range — high balances with stable income are stronger candidates
  // TODO: Factor in whether they have private loans already (no federal benefit loss)

  const hasPrivateLoans = intake.loanTypes.includes('private');
  const onlyPrivateLoans =
    intake.loanTypes.length === 1 && intake.loanTypes[0] === 'private';

  return {
    isCandidate: hasHigherIncome && intake.employmentType === 'private_sector',
    federalBenefitLossRisk: !onlyPrivateLoans,
    primaryReason: hasPrivateLoans
      ? 'May benefit from consolidating private loans at lower rate'
      : 'Higher income with private-sector employment — standard repayment may be competitive',
  };
}
