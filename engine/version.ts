// engine/version.ts
// Version constants embedded in every AssessmentResult and Report.
// Bumping POLICY_VERSION automatically invalidates all cached reports
// (since the hash is computed over the full AssessmentResult, which includes these).

export const ENGINE_VERSION = '0.1.0';

// Date of last policy review. Bump this when policy rules are updated.
// Source: https://studentaid.gov / https://www.federalregister.gov
export const POLICY_VERSION = '2026-04-01';
