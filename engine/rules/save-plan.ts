// engine/rules/save-plan.ts
// SAVE (Saving on a Valuable Education) Plan eligibility rules.
//
// TODO: Complete eligibility logic after compliance review.
// Source: https://studentaid.gov/announcements-events/save-plan
// Source: https://www.federalregister.gov/documents/2023/07/10/2023-13112/
// Effective date of current rules: 2026-04-01
//
// Status as of April 2026:
//   - The SAVE Plan was subject to a court injunction (8th Circuit, 2024).
//   - Borrowers enrolled in SAVE have been placed in administrative forbearance.
//   - New enrollments are blocked pending litigation outcome.
//   - TODO: Update this rule when the litigation is resolved.

import type { IntakeData, LoanClassification } from '../types';

export interface SAVEEligibilityResult {
  eligible: boolean;
  currentlyEnrolled: boolean;
  affectedByInjunction: boolean;
  inAdministrativeForbearance: boolean;
}

export function checkSAVEEligibility(
  intake: IntakeData,
  classification: LoanClassification,
): SAVEEligibilityResult {
  // Private loans are never eligible for federal IDR plans
  if (!classification.hasFederalLoans) {
    return {
      eligible: false,
      currentlyEnrolled: false,
      affectedByInjunction: false,
      inAdministrativeForbearance: false,
    };
  }

  // FFEL and Perkins loans require consolidation into Direct Loans first
  if (classification.requiresConsolidationForIDR && !classification.hasDirectLoans) {
    return {
      eligible: false,
      currentlyEnrolled: false,
      affectedByInjunction: false,
      inAdministrativeForbearance: false,
    };
  }

  const currentlyEnrolled = intake.enrolledInSAVE === true;

  // TODO: Verify exact injunction scope and whether new enrollments are possible
  // as of the POLICY_VERSION date. Update this flag accordingly.
  const affectedByInjunction = true; // Injunction has been active since July 2024

  // TODO: Determine if forbearance still applies or if SAVE has been fully restored
  const inAdministrativeForbearance = currentlyEnrolled && affectedByInjunction;

  // Base eligibility: has qualifying federal direct loans
  const eligible = classification.hasDirectLoans;

  return {
    eligible,
    currentlyEnrolled,
    affectedByInjunction,
    inAdministrativeForbearance,
  };
}
