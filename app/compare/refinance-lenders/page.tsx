import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import { buildMetadata } from '@/components/seo/open-graph';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';
import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure';
import { BASE_URL } from '@/lib/constants';
import { LENDERS } from '@/lib/lenders';

export const metadata: Metadata = buildMetadata({
  title: 'Best Student Loan Refinancing Lenders 2026 — Compare 5 Options',
  description:
    'Compare the top student loan refinancing lenders side-by-side. Rates, features, and eligibility requirements — plus a federal benefit warning before you decide.',
  path: '/compare/refinance-lenders',
  type: 'article',
});

export default function RefinanceLendersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: BASE_URL },
          { name: 'Compare', url: `${BASE_URL}/compare` },
          { name: 'Refinance Lenders', url: `${BASE_URL}/compare/refinance-lenders` },
        ])}
      />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← Back to home</Link>

        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Best Student Loan Refinancing Lenders 2026
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Compare rates, features, and eligibility across the top private refinancing lenders.
          Rates shown are representative — your actual rate depends on your credit score,
          income, and loan details.
        </p>

        {/* Federal benefit warning — required before any refinance CTA */}
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900">Read this before you refinance</p>
              <p className="mt-1 text-sm text-amber-800">
                Refinancing federal student loans into a private loan is <strong>permanent and irreversible</strong>.
                You permanently give up: income-driven repayment (IBR, SAVE, PAYE), Public Service Loan
                Forgiveness (PSLF), federal forbearance and deferment, and any future federal forgiveness programs.
                Refinancing only makes financial sense if you work in the private sector, have a high stable income,
                and are certain you will never qualify for PSLF.{' '}
                <Link href="/compare/refinance-options" className="underline font-medium">
                  Read the full trade-off analysis →
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Affiliate disclosure */}
        <AffiliateDisclosure className="mt-4" />

        {/* Not sure? Take the assessment */}
        <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 flex items-center justify-between gap-4">
          <p className="text-sm text-emerald-800">
            <strong>Not sure if refinancing is right for you?</strong> Our free assessment tells you
            in 3 minutes whether your profile fits — before you apply anywhere.
          </p>
          <Link
            href="/assess"
            className="shrink-0 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 flex items-center gap-1"
          >
            Get my assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Lender cards */}
        <div className="mt-10 space-y-6">
          {LENDERS.map((lender, index) => (
            <div
              key={lender.id}
              className={`rounded-xl border p-6 ${
                index === 0
                  ? 'border-emerald-300 bg-white shadow-sm ring-1 ring-emerald-200'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {/* Badge */}
              {lender.badge && (
                <span className="inline-block mb-3 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-medium text-emerald-700">
                  {lender.badge}
                </span>
              )}

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">{lender.name}</h2>
                  <p className="mt-0.5 text-sm text-gray-500">{lender.tagline}</p>

                  <div className="mt-3 flex flex-wrap gap-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Rate range</p>
                      <p className="mt-0.5 text-base font-semibold text-gray-900">{lender.rateRange}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Min. credit score</p>
                      <p className="mt-0.5 text-base font-semibold text-gray-900">{lender.minCreditScore}+</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Loan range</p>
                      <p className="mt-0.5 text-base font-semibold text-gray-900">
                        ${(lender.minLoanAmount / 1000).toFixed(0)}K – ${(lender.maxLoanAmount / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-1">
                    {lender.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sm:shrink-0">
                  <a
                    href={lender.affiliateHref}
                    target="_blank"
                    rel={`noopener noreferrer nofollow${lender.isAffiliate ? ' sponsored' : ''}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
                  >
                    {lender.ctaLabel}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <p className="mt-2 text-xs text-gray-400 text-center">
                    Soft credit check · No commitment
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-xl bg-gray-50 border border-gray-200 p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900">Still not sure which lender to choose?</h2>
          <p className="mt-2 text-gray-600 text-sm">
            Our free assessment analyzes your specific loan profile, employment, and income to tell
            you whether refinancing makes sense — and which federal benefits you'd be giving up.
          </p>
          <Link
            href="/assess"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700"
          >
            Get my free assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Methodology note */}
        <p className="mt-8 text-xs text-gray-400">
          Rates are sourced from each lender's public website as of April 2026 and are subject to change.
          StudentDebt.ai earns affiliate compensation when you apply through marked links.
          This does not influence which lenders are listed or how they are ranked.
          Lenders are displayed with our active affiliate partner featured first, then alphabetically.
        </p>
      </div>
    </>
  );
}
