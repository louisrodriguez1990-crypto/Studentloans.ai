// lib/policy-config.ts
// Centralised federal student loan policy configuration.
//
// All policy flags, effective dates, and program status values live here.
// Update this file (and bump POLICY_VERSION in engine/version.ts) whenever
// a policy change occurs — do not scatter hardcoded values across rule files.
//
// Future: these values can be moved to environment variables or a Supabase
// policy_rules table without changing any rule logic.

export const POLICY_CONFIG = {
  asOfDate: '2026-04-01',

  save: {
    // 8th Circuit Court of Appeals injunction, active since July 2024.
    // Blocked new enrollments and placed existing enrollees in administrative forbearance.
    // Payments during forbearance do NOT count toward IDR forgiveness or PSLF.
    // Source: https://studentaid.gov/announcements-events/save-plan
    injunctionActive: true,
    injunctionEffectiveDate: '2024-07-18',
    newEnrollmentsBlocked: true,
  },

  paye: {
    // PAYE closed to new enrollees July 1, 2024. Existing enrollees remain grandfathered.
    // Source: https://studentaid.gov/manage-loans/repayment/plans/income-driven
    closedToNewEnrollees: true,
    closureDate: '2024-07-01',
  },

  pslfWaiver: {
    // One-Time Account Adjustment / PSLF Waiver — expired October 31, 2022.
    // Retroactive credit was applied; no new waivers available.
    // Source: https://studentaid.gov/manage-loans/forgiveness-cancellation/public-service/temporary-expanded-public-service-loan-forgiveness
    expired: true,
    expiryDate: '2022-10-31',
  },

  // Loans first disbursed or consolidated on/after this date are subject to
  // different rules under pending 2026 legislation.
  post2026Cutoff: '2026-07-01',
} as const;

export type PolicyConfig = typeof POLICY_CONFIG;
