import Link from 'next/link';
import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { JsonLd, websiteSchema, organizationSchema } from '@/components/seo/json-ld';
import { buildMetadata } from '@/components/seo/open-graph';
import { BASE_URL, SITE_NAME } from '@/lib/constants';
import { ArrowRight, CheckCircle, Shield, Zap, Calculator, TrendingDown, Award, Users } from 'lucide-react';

export const revalidate = 3600; // ISR: regenerate every hour for fresh assessment count

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

async function getAssessmentCount(): Promise<number> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) return 0;

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { count } = await supabase
      .from('assessments')
      .select('*', { count: 'exact', head: true });
    return count ?? 0;
  } catch {
    return 0;
  }
}

function formatCount(n: number): string {
  if (n < 100) return ''; // not enough for social proof
  if (n >= 1000) return `${Math.floor(n / 100) / 10}k+`;
  return `${Math.floor(n / 10) * 10}+`;
}

const TOOLS = [
  {
    icon: Calculator,
    title: 'IDR Payment Calculator',
    description: 'Calculate your exact monthly payment under IBR, ICR, and other 2026-eligible plans.',
    href: '/calculators/idr-payment',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    icon: TrendingDown,
    title: 'Refinance Savings Calculator',
    description: 'See how much you could save by refinancing — and what federal protections you\'d give up.',
    href: '/calculators/refinance-savings',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Award,
    title: 'PSLF Payment Tracker',
    description: 'Track your 120 qualifying payments toward Public Service Loan Forgiveness.',
    href: '/tools/pslf-tracker',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    icon: Users,
    title: 'Compare 5 Lenders',
    description: 'Side-by-side comparison of refinance lenders — rates, fees, and the federal benefits you\'d lose.',
    href: '/compare/refinance-lenders',
    color: 'bg-amber-100 text-amber-600',
  },
];

export default async function HomePage() {
  const assessmentCount = await getAssessmentCount();
  const countLabel = formatCount(assessmentCount);

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

      {/* Hero — bold teal→blue gradient, white text */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-blue-800 px-4 pt-20 pb-20 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm text-white mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />
            Updated for 2026 policy changes
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
            What do the 2026 student loan changes mean for you?
          </h1>

          {/* GEO paragraph — self-contained answer for AI systems */}
          <p className="mt-5 text-sm text-teal-100/80 max-w-2xl mx-auto">
            <strong className="text-teal-100">As of April 2026:</strong> The SAVE Plan is blocked by a court injunction —
            borrowers enrolled in SAVE are in administrative forbearance and payments{' '}
            <strong className="text-teal-100">do not count toward forgiveness</strong>. PAYE is closed to new enrollees.
            Loans disbursed after July 1, 2026 face new rules. Get your free personalized
            assessment below to see exactly what applies to your loans.
          </p>

          <p className="mt-5 text-xl text-teal-100">
            Answer a few questions. Get a personalized report — and a clear action plan.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/assess">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full bg-white text-teal-700 hover:bg-teal-50 focus-visible:ring-white shadow-lg"
              >
                Get my free assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/learn/save-plan" className="text-sm text-white/75 hover:text-white underline underline-offset-2">
              Learn about the SAVE Plan changes
            </Link>
          </div>

          <p className="mt-5 text-xs text-teal-200/80">
            Free · ~3 minutes · See your results instantly
            {countLabel && ` · Join ${countLabel} borrowers who've checked`}
          </p>
        </div>
      </section>

      {/* Trust signals */}
      <section className="border-b border-gray-100 bg-white py-14">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100">
                <Zap className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Straight answers, not guesses</p>
                <p className="mt-1 text-sm text-gray-500">
                  We apply the same federal eligibility rules your servicer uses — and show you
                  exactly why we reached each conclusion.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Your privacy is protected</p>
                <p className="mt-1 text-sm text-gray-500">
                  No account required. We never collect your name or SSN. All sessions are
                  anonymous by default.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-100">
                <CheckCircle className="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Cites the actual sources</p>
                <p className="mt-1 text-sm text-gray-500">
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
        <p className="mt-3 text-gray-500">
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
            <Card key={item.title} className={`border-l-[5px] ${item.accent} transition-shadow hover:shadow-md`}>
              <CardContent className="p-5">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.detail}</p>
                <Link
                  href={item.href}
                  className="mt-2 inline-block text-sm text-teal-600 hover:text-teal-700 font-medium"
                >
                  Learn more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Free tools section */}
      <section className="bg-gray-50 border-t border-gray-100 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Free tools for every situation</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Whether you need to calculate payments, track PSLF progress, or compare lenders —
              all tools are free and require no account.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group">
                <div className="h-full rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${tool.color} mb-4`}>
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{tool.description}</p>
                  <span className="mt-4 inline-flex items-center text-sm text-teal-600 font-medium">
                    Open tool <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band — teal→blue gradient */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-blue-800 py-20 text-center">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="text-3xl font-bold text-white">
            See exactly how these changes affect your loans
          </h2>
          <p className="mt-4 text-teal-100">
            Our assessment takes 3 minutes and gives you a personalized report — not generic
            advice.
          </p>
          <Link href="/assess" className="mt-8 inline-block">
            <Button
              size="lg"
              className="rounded-full bg-white text-teal-700 hover:bg-teal-50 focus-visible:ring-white shadow-lg"
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
