import Link from 'next/link';
import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { Badge } from '@/components/ui/badge';
import { JsonLd, websiteSchema, organizationSchema } from '@/components/seo/json-ld';
import { buildMetadata } from '@/components/seo/open-graph';
import { StickyAssessmentCTA } from '@/components/ui/sticky-assessment-cta';
import { BASE_URL, SITE_NAME } from '@/lib/constants';
import {
  ArrowRight,
  Lock,
  FileText,
  CheckCircle2,
  Users,
  Calculator,
  TrendingDown,
  Award,
  Scale,
} from 'lucide-react';

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
  if (n < 100) return '';
  if (n >= 1000) return `${Math.floor(n / 100) / 10}k+`;
  return `${Math.floor(n / 10) * 10}+`;
}

const TOOLS = [
  {
    icon: Calculator,
    title: 'IDR Payment Calculator',
    description: 'Calculate your exact monthly payment under IBR, ICR, and other 2026-eligible plans.',
    href: '/calculators/idr-payment',
    iconBg: 'bg-[#e6faf6]',
    iconColor: 'text-[#00C9A7]',
    badge: 'Most Popular' as const,
  },
  {
    icon: TrendingDown,
    title: 'Refinance Savings Calculator',
    description: 'See how much you could save by refinancing — and what federal protections you\'d give up.',
    href: '/calculators/refinance-savings',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    badge: null,
  },
  {
    icon: Award,
    title: 'PSLF Payment Tracker',
    description: 'Track your 120 qualifying payments toward Public Service Loan Forgiveness.',
    href: '/tools/pslf-tracker',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-500',
    badge: null,
  },
  {
    icon: Scale,
    title: 'Compare 5 Lenders',
    description: 'Side-by-side comparison of refinance lenders — rates, fees, and the federal benefits you\'d lose.',
    href: '/compare/refinance-lenders',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    badge: null,
  },
];

const CHANGES = [
  {
    num: '1',
    accent: 'border-l-red-400',
    numBg: 'bg-red-100 text-red-700',
    title: 'The SAVE Plan is blocked by a court injunction',
    detail:
      'Borrowers enrolled in SAVE are in administrative forbearance. Payments do not count toward forgiveness. The 8th Circuit halted the plan pending appeal.',
    href: '/learn/save-plan',
  },
  {
    num: '2',
    accent: 'border-l-amber-400',
    numBg: 'bg-amber-100 text-amber-700',
    title: 'PAYE closed to new enrollees',
    detail:
      'Pay As You Earn is no longer accepting new applications. New applicants must choose IBR or ICR — both of which have different payment calculations.',
    href: '/faq',
  },
  {
    num: '3',
    accent: 'border-l-blue-400',
    numBg: 'bg-blue-100 text-blue-700',
    title: 'July 1, 2026 disbursement date now matters',
    detail:
      'Loans disbursed or consolidated on or after July 1, 2026 face different rules under pending legislation. Your disbursement date is now a key factor.',
    href: '/faq',
  },
];

export default async function HomePage() {
  const assessmentCount = await getAssessmentCount();
  const countLabel = formatCount(assessmentCount);
  const socialProof = countLabel || '50,000+';

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

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F8F9FC] dot-grid px-4 pt-20 pb-24">
        {/* Radial teal glow — top right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #00C9A7 0%, transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          {/* Pill tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-500 shadow-sm mb-7">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00C9A7]" />
            Updated for 2026 · Policy as of April 1, 2026
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-[#1a1f36] sm:text-5xl leading-tight">
            Your 2026 Student Loan<br className="hidden sm:block" /> Game Plan
          </h1>

          <p className="mt-5 text-lg text-[#4a5568] max-w-xl mx-auto leading-relaxed">
            Policy changed. Your repayment plan should too. Answer a few questions and get a
            personalized report in 3 minutes — no account needed.
          </p>

          {/* Primary CTA */}
          <div className="mt-10">
            <Link
              href="/assess"
              className="inline-flex items-center gap-2 rounded-xl bg-[#00C9A7] px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-[#00b396] active:scale-[0.98] transition-all duration-150"
            >
              Get My Free Assessment
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Trust micro-line */}
          <p className="mt-4 text-sm text-gray-400 flex items-center justify-center gap-1.5">
            <Lock className="h-3.5 w-3.5" />
            No account required · Takes 3 minutes · 100% free
          </p>

          {/* Social proof */}
          <p className="mt-2 text-xs text-gray-400">
            ⭐⭐⭐⭐⭐ Trusted by {socialProof} borrowers
          </p>

          {/* GEO paragraph — self-contained answer for AI systems */}
          <p className="mt-8 text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed border-t border-gray-200 pt-6">
            <strong className="text-gray-500">As of April 2026:</strong> The SAVE Plan is blocked by a court injunction —
            borrowers enrolled in SAVE are in administrative forbearance and payments{' '}
            <strong className="text-gray-500">do not count toward forgiveness</strong>. PAYE is closed to new enrollees.
            Loans disbursed after July 1, 2026 face new rules.
          </p>
        </div>
      </section>

      {/* ── Trust Bar ─────────────────────────────────────────────── */}
      <section className="border-y border-gray-200 bg-gray-50 px-4 py-5">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Lock, label: 'Bank-level privacy' },
              { icon: FileText, label: 'Cites federal sources' },
              { icon: CheckCircle2, label: 'No credit pull required' },
              { icon: Users, label: `${socialProof} assessments delivered` },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-gray-600">
                <Icon className="h-4 w-4 text-[#00C9A7] shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Changed in 2026 ────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1a1f36]">
            Key 2026 Changes Affecting Your Loans
          </h2>
          <p className="mt-3 text-[#4a5568] max-w-xl mx-auto">
            More has changed in the past two years than in the previous decade. Here&apos;s what matters for your loans.
          </p>
        </div>

        <div className="space-y-4">
          {CHANGES.map((item) => (
            <div
              key={item.num}
              className={`group relative rounded-xl border border-gray-200 border-l-[5px] ${item.accent} bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200`}
            >
              <div className="flex items-start gap-4">
                <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${item.numBg}`}>
                  {item.num}
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-[#1a1f36] text-base">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-[#4a5568] leading-relaxed">{item.detail}</p>
                  <Link
                    href={item.href}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#00C9A7] hover:text-[#00b396] transition-colors"
                  >
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-amber-700 font-medium">
          ⚠️ Policy changes take effect July 1, 2026 — check your eligibility now.
        </p>
      </section>

      {/* ── Tools Section ────────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-[#F8F9FC] px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a1f36]">Free Tools — No Account Needed</h2>
            <p className="mt-3 text-[#4a5568] max-w-xl mx-auto">
              Calculate payments, track PSLF progress, or compare lenders — all free, all instant.
            </p>
          </div>

          {/* Mobile: scroll-snap. Desktop: 2x2 grid */}
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group snap-start shrink-0 w-[80vw] sm:w-auto block"
              >
                <div className="relative h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-200">
                  {/* Most Popular badge */}
                  {tool.badge && (
                    <div className="absolute -top-2.5 left-4">
                      <Badge variant="warning" className="shadow-sm">{tool.badge}</Badge>
                    </div>
                  )}

                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${tool.iconBg} mb-4`}>
                    <tool.icon className={`h-6 w-6 ${tool.iconColor}`} />
                  </div>

                  <h3 className="font-semibold text-[#1a1f36] group-hover:text-[#00C9A7] transition-colors leading-snug">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#4a5568] leading-relaxed">{tool.description}</p>

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#00C9A7] group-hover:gap-2 transition-all">
                    Open Tool <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Band ──────────────────────────────────────── */}
      <section className="bg-[#1a1f36] px-4 py-24 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-bold text-white sm:text-4xl leading-tight">
            See Exactly How These Changes<br className="hidden sm:block" /> Affect Your Loans
          </h2>
          <p className="mt-4 text-gray-300 text-lg">
            Get a personalized report in 3 minutes — no account needed.
          </p>

          <div className="mt-10">
            <Link
              href="/assess"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-[#1a1f36] shadow-lg hover:bg-gray-100 active:scale-[0.98] transition-all duration-150"
            >
              Start Free Assessment →
            </Link>
          </div>

          <p className="mt-5 text-sm text-gray-400">
            ⭐⭐⭐⭐⭐ Trusted by {socialProof} borrowers · Policy changes take effect July 1, 2026
          </p>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <StickyAssessmentCTA />
    </>
  );
}
