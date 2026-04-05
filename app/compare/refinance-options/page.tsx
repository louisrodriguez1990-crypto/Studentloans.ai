import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { buildMetadata } from '@/components/seo/open-graph';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';
import { BASE_URL } from '@/lib/constants';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: 'Federal vs. Private Student Loans: Refinancing Options Explained 2026',
  description:
    'Should you refinance federal student loans? A clear comparison of staying federal vs. refinancing private — including what you permanently give up and when refinancing makes financial sense.',
  path: '/compare/refinance-options',
  type: 'article',
});

const FEDERAL_PROS = [
  'Income-driven repayment: payments capped at 10–20% of discretionary income (IBR, ICR)',
  'PSLF: 100% tax-free forgiveness after 10 years for public sector workers',
  'IDR forgiveness: balance forgiven after 20–25 years on income-driven plans',
  'Federal forbearance and deferment during financial hardship',
  'Unemployment deferment (up to 3 years)',
  'Death and disability discharge — loans cancelled if you die or become permanently disabled',
  'Eligibility for future forgiveness programs (cannot benefit from new programs once refinanced)',
];

const FEDERAL_CONS = [
  'Interest rates may be higher than private market rates (especially for high-credit borrowers)',
  'SAVE Plan blocked by court injunction — current IDR options are IBR and ICR only',
  'Servicer transfers happen without your consent',
  'Administrative burden: annual income recertification required',
];

const PRIVATE_PROS = [
  'Potentially lower interest rate — meaningful savings for high-income, high-credit borrowers',
  'Simplified repayment — one lender, one payment, no annual recertification',
  'Fixed rates lock in today\'s rate before potential rate increases',
  'No loan servicing transfers — your relationship is with a stable private lender',
];

const PRIVATE_CONS = [
  'Permanent, irreversible loss of all federal protections upon refinancing',
  'No income-driven repayment — payment is fixed regardless of job loss or income change',
  'No PSLF eligibility — even if you later take a government job',
  'No federal forbearance or deferment (some lenders offer limited hardship programs)',
  'No eligibility for any future federal forgiveness programs',
  'Default consequences are stricter — private lenders may sue or garnish wages faster',
];

const SCENARIOS = [
  {
    title: 'Refinancing makes financial sense when:',
    accent: 'border-l-emerald-400 bg-emerald-50',
    items: [
      'You work in the private sector and are certain you will never pursue PSLF',
      'Your income is high enough that IDR gives no payment reduction (your IDR payment ≥ standard payment)',
      'Your credit score is 720+ and you\'d qualify for a rate 1.5%+ lower than your current rate',
      'Your remaining balance is under $50K and you can pay it off within 5–7 years',
      'You have private loans (you\'re refinancing private-to-private, losing nothing)',
    ],
  },
  {
    title: 'Refinancing is almost certainly wrong when:',
    accent: 'border-l-red-400 bg-red-50',
    items: [
      'You work for a government agency, 501(c)(3) nonprofit, or other PSLF-qualifying employer',
      'You\'re enrolled in IDR and your payment is lower than the standard 10-year payment',
      'Your balance is over $75K with any chance of IDR forgiveness ahead',
      'You have income instability, variable work hours, or plan a career change',
      'You\'re considering leaving your job within the next 2–3 years',
      'You have FFEL or Perkins loans that haven\'t been consolidated yet (consolidate first, then assess)',
    ],
  },
];

export default function RefinanceOptionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: BASE_URL },
          { name: 'Compare', url: `${BASE_URL}/compare` },
          { name: 'Refinance Options', url: `${BASE_URL}/compare/refinance-options` },
        ])}
      />

      <div className="mx-auto max-w-3xl px-4 py-12">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to home
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Federal vs. Private: Refinancing Options Explained
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Refinancing federal student loans into a private loan can save thousands in interest —
          or cost you tens of thousands in lost forgiveness. Here&apos;s exactly how to think
          about the trade-off.
        </p>

        {/* Warning banner */}
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900">This decision is permanent</p>
              <p className="mt-1 text-sm text-amber-800">
                Once you refinance a federal loan into a private loan, you cannot undo it.
                You permanently and irrevocably give up all federal protections and forgiveness
                eligibility. There is no way to refinance back to federal.
              </p>
            </div>
          </div>
        </div>

        {/* Side-by-side comparison */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {/* Stay federal */}
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-6">
            <h2 className="text-lg font-bold text-gray-900">Stay federal</h2>
            <p className="mt-1 text-sm text-gray-600">Keep your loans with a federal servicer on an income-driven plan</p>
            <div className="mt-4 space-y-2">
              {FEDERAL_PROS.map((p) => (
                <div key={p} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
                  <span className="text-gray-700">{p}</span>
                </div>
              ))}
              <div className="mt-4 border-t border-blue-200 pt-4 space-y-2">
                {FEDERAL_CONS.map((c) => (
                  <div key={c} className="flex items-start gap-2 text-sm">
                    <XCircle className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
                    <span className="text-gray-500">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Refinance private */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900">Refinance private</h2>
            <p className="mt-1 text-sm text-gray-600">Consolidate into a new private loan at a lower rate</p>
            <div className="mt-4 space-y-2">
              {PRIVATE_PROS.map((p) => (
                <div key={p} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                  <span className="text-gray-700">{p}</span>
                </div>
              ))}
              <div className="mt-4 border-t border-gray-200 pt-4 space-y-2">
                {PRIVATE_CONS.map((c) => (
                  <div key={c} className="flex items-start gap-2 text-sm">
                    <XCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                    <span className="text-gray-500">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* When it makes sense */}
        <div className="mt-10 space-y-6">
          {SCENARIOS.map((s) => (
            <div key={s.title} className={`rounded-xl border-l-4 ${s.accent} p-6`}>
              <h3 className="font-semibold text-gray-900">{s.title}</h3>
              <ul className="mt-3 space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* The math: a worked example */}
        <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold text-gray-900">The math: a worked example</h2>
          <p className="mt-2 text-sm text-gray-600">
            Borrower: private-sector employee, $90K income, $45K remaining balance, 6.8% current rate, 720 credit score.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Stay federal (IBR)</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">$412/mo</p>
              <p className="mt-1 text-sm text-gray-600">10% of discretionary income</p>
              <p className="mt-2 text-xs text-gray-500">
                With negative amortization at this balance + rate, forgiveness at year 20 with ~$28K remaining — potentially taxable.
              </p>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Refinance at 5.2%</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">$480/mo</p>
              <p className="mt-1 text-sm text-gray-600">10-year payoff, ~$12K in total interest</p>
              <p className="mt-2 text-xs text-gray-500">
                Higher monthly payment but paid off in 10 years. Total interest: $12,400 vs. $48,000+ staying federal. Net savings: ~$35K.
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            This is an illustration. Your numbers will differ based on your exact income, balance, and rate offer.
            Use our{' '}
            <Link href="/calculators/refinance-savings" className="text-blue-600 underline">
              refinance savings calculator
            </Link>{' '}
            with your real numbers.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/compare/refinance-lenders"
            className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 hover:bg-emerald-100 transition-colors group"
          >
            <p className="font-semibold text-gray-900 group-hover:text-emerald-700">
              Compare 5 refinancing lenders →
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Side-by-side rates, features, and eligibility for the top private lenders.
            </p>
          </Link>
          <Link
            href="/assess"
            className="rounded-xl border border-blue-200 bg-blue-50 p-5 hover:bg-blue-100 transition-colors group"
          >
            <p className="font-semibold text-gray-900 group-hover:text-blue-700">
              Get my personalized assessment →
            </p>
            <p className="mt-1 text-sm text-gray-600">
              3-minute analysis of whether refinancing fits your specific profile.
            </p>
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          This comparison reflects federal student loan policy as of April 2026. Federal policy changes frequently.
          Verify current program status at{' '}
          <a href="https://studentaid.gov" target="_blank" rel="noopener noreferrer" className="underline">
            studentaid.gov
          </a>
          . Nothing on this page constitutes financial or legal advice.
        </p>
      </div>
    </>
  );
}
