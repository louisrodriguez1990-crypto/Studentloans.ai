export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'StudentDebt.ai';
export const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://studentdebt.ai';

export const NOT_FINANCIAL_ADVICE_DISCLAIMER =
  'This report is for informational purposes only. It is not financial or legal advice. ' +
  'Individual situations vary. Consult a qualified student loan advisor or attorney before ' +
  'making decisions about your loans.';

export const AFFILIATE_DISCLOSURE =
  'This site may earn compensation when you click on affiliate links. Affiliate ' +
  'relationships do not influence the engine\'s recommendations. Federal benefit ' +
  'warnings always appear before any refinance referral.';

export const POLICY_AS_OF_DATE = 'April 1, 2026';

// Session TTL in seconds
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

// Report cache TTL in seconds
export const REPORT_CACHE_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

// KV key prefixes
export const KV_SESSION_PREFIX = 'session:';
export const KV_REPORT_PREFIX = 'report:';
