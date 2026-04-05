import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { JsonLd, websiteSchema, organizationSchema } from '@/components/seo/json-ld';
import { buildMetadata } from '@/components/seo/open-graph';
import { BASE_URL, SITE_NAME } from '@/lib/constants';
import { ArrowRight, CheckCircle, Shield, Zap } from 'lucide-react';

export const metadata: Metadata = {
  ...buildMetadata({
    title: SITE_NAME,
    description:
      'Understand how 2026 federal student loan policy changes affect you — for free. Get a personalized report in 3 minutes. No jargon. No guessing. Just answers.',
  }),
  keywords: [
    'student loan 2026',
    'SAVE plan injunction',
    'student loan repayment calculator',
    'PSLF eligibility',
    'income driven repayment 2026',
    'federal student loan changes',
    'student debt help',
    'student loan forgiveness 2026',
    'IBR vs SAVE plan',
  ],
};

export default function HomePage() {
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'StudentDebt.ai Assessment',
    applicationCategory: 'FinanceApplication',
    description:
      'Free assessment tool that applies 2026 federal student loan policy rules to your specific situation and generates a personalized repayment report.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: `${BASE_URL}/assess`,
    operatingSystem: 'Web',
  };

  return (
    <>
      <JsonLd data={websiteSchema(BASE_URL, SITE_NAME)} />
      <JsonLd data={organizationSchema(BASE_URL, SITE_NAME)} />
      <JsonLd data={softwareAppSchema} />

      {/* Hero — green→blue gradient */}
      <section className="bg-gradient-to-b from-emerald-50 via-blue-50 to-white px-4 pt-20 pb-16 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-sm text-emerald-700 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Updated for 2026 policy changes
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            What do the 2026 student loan changes mean for you?
          </h1>

          {/* GEO paragraph — self-contained answer for AI systems */}
          <p className="mt-5 text-base text-gray-600 max-w-2xl mx-auto">
            <strong>As of April 2026:</strong> The SAVE Plan is blocked by a court injunction —
            borrowers enrolled in SAVE are in administrative forbearance and payments{' '}
            <strong>do not count toward forgiveness</strong>. PAYE is closed to new enrollees.
            Loans disbursed after July 1, 2026 face new rules. Get your free personalized
            assessment below to see exactly what applies to your loans.
          </p>

          <p className="mt-5 text-xl text-gray-600">
            Answer a few questions. Get a personalized report — and a clear action plan.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/assess">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-600"
              >
                Get my free assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/learn/save-plan" className="text-sm text-gray-600 hover:text-gray-900 underline">
              Learn about the SAVE Plan changes
            </Link>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            Free · ~3 minutes · See your results instantly
          </p>
        </div>
      </section>

      {/* Trust signals — colored icon circles */}
      <section className="border-t-2 border-emerald-100 bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                <Zap className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Straight answers, not guesses</p>
                <p className="mt-1 text-sm text-gray-600">
                  We apply the same federal eligibility rules your servicer uses — and show you
                  exactly why we reached each conclusion.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Your privacy is protected</p>
                <p className="mt-1 text-sm text-gray-600">
                  No account required. We never collect your name or SSN. All sessions are
                  anonymous by default.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100">
                <CheckCircle className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Cites the actual sources</p>
                <p className="mt-1 text-sm text-gray-600">
                  Every recommendation links to the authoritative federal source. Verify anything
                  we tell you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What changed in 2026 — colored left-border cards */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900">What changed in 2026</h2>
        <p className="mt-3 text-gray-600">
          Federal student loan policy has seen more changes in the past two years than in the
          previous decade. Here are the most important ones.
        </p>
        <div className="mt-8 space-y-4">
          {[
            {
              title: 'The SAVE Plan is blocked by a court injunction',
              detail:
                'The SAVE Plan — designed to lower payments for millions of borrowers — was halted by the 8th Circuit Court of Appeals. Borrowers enrolled in SAVE are in administrative forbearance. Payments do not count toward forgiveness.',
              href: '/learn/save-plan',
              accent: 'border-l-amber-400',
            },
            {
              title: 'PAYE closed to new enrollees',
              detail:
                'Pay As You Earn (PAYE) is no longer accepting new applications. Borrowers on PAYE can stay, but new applicants must choose IBR or ICR.',
              href: '/faq',
              accent: 'border-l-blue-400',
            },
            {
              title: 'July 1, 2026 disbursement date matters',
              detail:
                'Loans disbursed or consolidated on or after July 1, 2026 are subject to different rules under pending legislation. Knowing your disbursement date is now important.',
              href: '/faq',
              accent: 'border-l-violet-400',
            },
          ].map((item) => (
            <Card key={item.title} className={`border-l-4 ${item.accent}`}>
              <CardContent className="p-5">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{item.detail}</p>
                <Link
                  href={item.href}
                  className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  Learn more
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA band — emerald→blue gradient */}
      <section className="bg-gradient-to-r from-emerald-600 to-blue-600 py-16 text-center">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="text-2xl font-bold text-white">
            See exactly how these changes affect your loans
          </h2>
          <p className="mt-3 text-emerald-100">
            Our assessment takes 3 minutes and gives you a personalized report — not generic
            advice.
          </p>
          <Link href="/assess" className="mt-8 inline-block">
            <Button
              size="lg"
              className="bg-white text-emerald-700 hover:bg-emerald-50 focus-visible:ring-white"
            >
              Start free assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
