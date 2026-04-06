// engine/lib/hardship.ts
// Partial financial hardship calculations for IBR eligibility.
//
// IBR requires that the calculated IDR payment be less than what the borrower
// would pay on the standard 10-year repayment plan ("partial financial hardship").
//
// Sources:
//   https://studentaid.gov/manage-loans/repayment/plans/income-driven
//   https://www.federalregister.gov/documents/2023/07/10/2023-13112/
//
// Income and balance values are estimated from range midpoints since the intake
// form collects ranges, not exact figures. This produces a reasonable approximation
// appropriate for a screening tool — not a legally binding calculation.
//
// FPL table: 2025 HHS Federal Poverty Guidelines (contiguous 48 states + DC).
// Used for 2026 IDR calculations per studentaid.gov's standard one-year lag.
// Source: https://aspe.hhs.gov/poverty-guidelines

import type { BalanceRange, IncomeRange, IntakeData } from '../types';

// ─── Income midpoints ─────────────────────────────────────────────────────────

const INCOME_MIDPOINTS: Record<IncomeRange, number> = {
  under_30k: 20_000,
  '30k_50k': 40_000,
  '50k_75k': 62_500,
  '75k_100k': 87_500,
  over_100k: 120_000,
};

// ─── Balance midpoints ────────────────────────────────────────────────────────

const BALANCE_MIDPOINTS: Record<BalanceRange, number> = {
  under_10k: 7_500,
  '10k_30k': 20_000,
  '30k_60k': 45_000,
  '60k_100k': 80_000,
  over_100k: 130_000,
};

// ─── 2025 Federal Poverty Guidelines (contiguous 48 states + DC) ─────────────

const FPL_BASE = 15_060; // family of 1
const FPL_PER_ADDITIONAL = 5_380; // each additional person

function getFPL(familySize: number): number {
  const size = Math.max(1, Math.min(familySize, 20));
  return FPL_BASE + (size - 1) * FPL_PER_ADDITIONAL;
}

// ─── Standard 10-year repayment estimate ─────────────────────────────────────

// Assumed blended federal loan interest rate (undergrad + grad mix, 2024-25 rates)
const ASSUMED_ANNUAL_RATE = 0.065;
const LOAN_TERM_MONTHS = 120;

/**
 * Estimate the standard 10-year monthly payment for a given balance range.
 * Uses the standard amortization formula.
 */
export function estimateStandard10YearPayment(intake: IntakeData): number {
  const principal = BALANCE_MIDPOINTS[intake.balanceRange];
  const monthlyRate = ASSUMED_ANNUAL_RATE / 12;
  // P * r * (1+r)^n / ((1+r)^n - 1)
  const factor = Math.pow(1 + monthlyRate, LOAN_TERM_MONTHS);
  return (principal * monthlyRate * factor) / (factor - 1);
}

// ─── IBR payment estimate ─────────────────────────────────────────────────────

/**
 * Estimate the monthly IBR payment for a borrower.
 *
 * IBR New (2014):  10% of discretionary income / 12
 * IBR Old (2007):  15% of discretionary income / 12
 *
 * Discretionary income = max(0, AGI − 150% × FPL for family size)
 */
export function estimateIBRPayment(intake: IntakeData, planType: 'IBR_NEW' | 'IBR_OLD'): number {
  const agi = INCOME_MIDPOINTS[intake.incomeRange];
  const fpl150 = getFPL(intake.familySize) * 1.5;
  const discretionary = Math.max(0, agi - fpl150);
  const pct = planType === 'IBR_NEW' ? 0.10 : 0.15;
  return (discretionary * pct) / 12;
}

// ─── Hardship check ───────────────────────────────────────────────────────────

/**
 * Returns true if the borrower has "partial financial hardship" for the given
 * IBR plan — meaning their IBR payment would be less than the standard 10-year
 * payment. This is a required condition for IBR eligibility.
 */
export function hasPartialFinancialHardship(
  intake: IntakeData,
  planType: 'IBR_NEW' | 'IBR_OLD',
): boolean {
  return estimateIBRPayment(intake, planType) < estimateStandard10YearPayment(intake);
}
