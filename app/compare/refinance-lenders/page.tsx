import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { buildMetadata } from '@/components/seo/open-graph';
import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { LastReviewed } from '@/components/ui/last-reviewed';
import { LENDERS } from '@/lib/lenders';
import { LenderViewToggle } from '@/components/compare/lender-view-toggle';

export const metadata: Metadata = buildMetadata({
  title: 'Best Student Loan Refinancing Lenders 2026 — Compare 5 Options',
  description:
    'Compare the top student loan refinancing lenders side-by-side. Rates, features, and eligibility requirements — plus a federal benefit warning before you decide.',
  path: '/compare/refinance-lenders',
  type: 'article',
});

export default function RefinanceLendersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: 'Compare', href: '/compare/refinance-lenders' },
          { label: 'Refinance Lenders', href: '/compare/refinance-lenders' },
        ]}
        className="mb-6"
      />

      <LastReviewed className="mb-4" />

      <h1 className="mt-2 text-3xl font-bold text-[#1a1f36]">
        Best Student Loan Refinancing Lenders 2026
      </h1>
      <p className="mt-3 text-lg text-[#4a5568]">
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
              Refinancing federal student loans into a private loan is{' '}
              <strong>permanent and irreversible</strong>. You permanently give up:
              income-driven repayment (IBR, SAVE, PAYE), Public Service Loan Forgiveness
              (PSLF), federal forbearance and deferment, and any future federal forgiveness
              programs. Refinancing only makes financial sense if you work in the private
              sector, have a high stable income, and are certain you will never qualify for
              PSLF.{' '}
              <Link
                href="/compare/refinance-options"
                className="underline font-medium"
              >
                Read the full trade-off analysis →
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Affiliate disclosure */}
      <AffiliateDisclosure className="mt-4" />

      {/* Not sure? Take the assessment */}
      <div className="mt-6 rounded-lg border border-[#00C9A7]/30 bg-[#e6faf6] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-[#1a1f36]">
          <strong>Not sure if refinancing is right for you?</strong> Our free assessment
          tells you in 3 minutes whether your profile fits — before you apply anywhere.
        </p>
        <Link
          href="/assess"
          className="shrink-0 rounded-lg bg-[#00C9A7] px-4 py-2 text-sm font-medium text-white hover:bg-[#00b396] flex items-center gap-1 transition-colors"
        >
          Get my assessment <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Lender cards/table — with view toggle */}
      <div className="mt-10">
        <LenderViewToggle lenders={LENDERS} />
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 rounded-xl bg-gray-50 border border-gray-200 p-8 text-center">
        <h2 className="text-xl font-semibold text-[#1a1f36]">
          Still not sure which lender to choose?
        </h2>
        <p className="mt-2 text-[#4a5568] text-sm">
          Our free assessment analyzes your specific loan profile, employment, and income to
          tell you whether refinancing makes sense — and which federal benefits you&apos;d be
          giving up.
        </p>
        <Link
          href="/assess"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#00C9A7] px-6 py-3 font-medium text-white hover:bg-[#00b396] transition-colors"
        >
          Get my free assessment <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Methodology note */}
      <p className="mt-8 text-xs text-gray-400">
        Rates are sourced from each lender&apos;s public website as of April 2026 and are
        subject to change. StudentDebt.ai earns affiliate compensation when you apply through
        marked links. This does not influence which lenders are listed or how they are ranked.
        Lenders are displayed with our active affiliate partner featured first, then
        alphabetically.
      </p>
    </div>
  );
}
