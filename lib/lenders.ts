// lib/lenders.ts
// Refinance lender comparison data.
// Affiliate links: apply to each lender's affiliate program to get your tracking links.
// Current active affiliate: ELFI (code: 39533)

export interface Lender {
  id: string;
  name: string;
  tagline: string;
  rateRange: string;        // e.g. "4.99% – 9.99% APR"
  minCreditScore: number;
  minLoanAmount: number;    // dollars
  maxLoanAmount: number;    // dollars
  features: string[];
  affiliateHref: string;
  ctaLabel: string;
  isAffiliate: boolean;
  badge?: string;           // e.g. "Best for high balances"
}

export const LENDERS: Lender[] = [
  {
    id: 'elfi',
    name: 'ELFI',
    tagline: 'Education Loan Finance — competitive rates, dedicated loan advisors',
    rateRange: '4.86% – 8.49% APR',
    minCreditScore: 680,
    minLoanAmount: 10_000,
    maxLoanAmount: 500_000,
    features: [
      'Dedicated personal loan advisor',
      'No application or origination fees',
      'Soft credit check to see rates',
      'Unemployment protection available',
    ],
    affiliateHref: 'https://www.elfi.com/?code=39533',
    ctaLabel: 'Check your rate at ELFI',
    isAffiliate: true,
    badge: 'Featured partner',
  },
  {
    id: 'earnest',
    name: 'Earnest',
    tagline: 'Precision pricing with biweekly payment option to pay off faster',
    rateRange: '4.99% – 9.74% APR',
    minCreditScore: 650,
    minLoanAmount: 5_000,
    maxLoanAmount: 500_000,
    features: [
      'Skip one payment per year',
      'Biweekly payment option',
      'No fees — ever',
      'In-house servicing',
    ],
    affiliateHref: 'https://www.earnest.com/student-loan-refinancing',
    ctaLabel: 'Check your rate at Earnest',
    isAffiliate: false,
    badge: 'Best for flexibility',
  },
  {
    id: 'sofi',
    name: 'SoFi',
    tagline: 'Member benefits including career coaching and financial planning',
    rateRange: '4.99% – 9.99% APR',
    minCreditScore: 650,
    minLoanAmount: 5_000,
    maxLoanAmount: 500_000,
    features: [
      'Unemployment protection up to 12 months',
      'Career coaching + financial advising',
      'No fees',
      'Referral bonus program',
    ],
    affiliateHref: 'https://www.sofi.com/student-loan-refinancing/',
    ctaLabel: 'Check your rate at SoFi',
    isAffiliate: false,
    badge: 'Best perks',
  },
  {
    id: 'laurel-road',
    name: 'Laurel Road',
    tagline: 'Specialized in healthcare professionals with residency refinancing',
    rateRange: '5.24% – 9.75% APR',
    minCreditScore: 660,
    minLoanAmount: 5_000,
    maxLoanAmount: 500_000,
    features: [
      'Medical/dental residency program available',
      'No fees',
      'Rate match guarantee',
      'KeyBank member discounts',
    ],
    affiliateHref: 'https://www.laurelroad.com/student-loan-refinancing/',
    ctaLabel: 'Check your rate at Laurel Road',
    isAffiliate: false,
    badge: 'Best for healthcare workers',
  },
  {
    id: 'splash',
    name: 'Splash Financial',
    tagline: 'Marketplace lender — matches you with multiple credit unions',
    rateRange: '4.96% – 10.99% APR',
    minCreditScore: 640,
    minLoanAmount: 5_000,
    maxLoanAmount: 500_000,
    features: [
      'Matches you with multiple lenders',
      'Lower credit score minimum',
      'No fees',
      'Credit union rates available',
    ],
    affiliateHref: 'https://www.splashfinancial.com/student-loan-refinancing/',
    ctaLabel: 'Check your rate at Splash',
    isAffiliate: false,
    badge: 'Best for lower credit scores',
  },
];
