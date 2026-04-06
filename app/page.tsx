import Link from 'next/link';
import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/ui/section-header';
import { Accordion } from '@/components/ui/accordion';
import {
  JsonLd,
  websiteSchema,
  organizationSchema,
  faqPageSchema,
} from '@/components/seo/json-ld';
import { buildMetadata } from '@/components/seo/open-graph';
import { StickyAssessmentCTA } from '@/components/ui/sticky-assessment-cta';
import { BASE_URL, SITE_NAME, POLICY_AS_OF_DATE } from '@/lib/constants';
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
  ShieldCheck,
  ClipboardList,
  Cog,
  Star,
  Eye,
} from 'lucide-react';

export const revalidate = 3600;

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
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
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

function getDaysUntilDeadline(): number {
  const deadline = new Date('2026-07-01');
  const now = new Date();
  return Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

const TOOLS = [
  {
    icon: Calculator,
    title: 'IDR Payment Calculator',
    description:
      'Calculate your exact monthly payment under IBR, ICR, and other 2026-eligible plans.',
    href: '/calculators/idr-payment',
    accent: 'from-[#00C9A7]/20 to-[#00C9A7]/5',
    iconColor: 'text-[#00C9A7]',
    badge: 'Most Popular' as const,
  },
  {
    icon: TrendingDown,
    title: 'Refinance Savings Calculator',
    description:
      "See how much you could save by refinancing — and what federal protections you'd give up.",
    href: '/calculators/refinance-savings',
    accent: 'from-blue-500/20 to-blue-500/5',
    iconColor: 'text-blue-500',
    badge: null,
  },
  {
    icon: Award,
    title: 'PSLF Payment Tracker',
    description:
      'Track your 120 qualifying payments toward Public Service Loan Forgiveness.',
    href: '/tools/pslf-tracker',
    accent: 'from-violet-500/20 to-violet-500/5',
    iconColor: 'text-violet-500',
    badge: null,
  },
  {
    icon: Scale,
    title: 'Compare 5 Lenders',
    description:
      "Side-by-side comparison of refinance lenders — rates, fees, and the federal benefits you'd lose.",
    href: '/compare/refinance-lenders',
    accent: 'from-amber-500/20 to-amber-500/5',
    iconColor: 'text-amber-500',
    badge: null,
  },
];

const CHANGES = [
  {
    color: 'bg-red-500',
    numBg: 'bg-red-100 text-red-700',
    title: 'The SAVE Plan is blocked by a court injunction',
    detail:
      'Borrowers enrolled in SAVE are in administrative forbearance. Payments do not count toward forgiveness.',
    source: '8th Circuit Court, March 2025',
    href: '/learn/save-plan',
  },
  {
    color: 'bg-amber-500',
    numBg: 'bg-amber-100 text-amber-700',
    title: 'PAYE closed to new enrollees',
    detail:
      'Pay As You Earn is no longer accepting new applications. New applicants must choose IBR or ICR.',
    source: 'Federal Student Aid',
    href: '/faq',
  },
  {
    color: 'bg-blue-500',
    numBg: 'bg-blue-100 text-blue-700',
    title: 'July 1, 2026 disbursement date now matters',
    detail:
      'Loans disbursed or consolidated on or after July 1, 2026 face different rules under pending legislation.',
    source: 'Pending legislation, 2026',
    href: '/faq',
  },
];

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Answer 7 questions',
    description: 'About your loans, employment, and goals. No exact numbers needed.',
  },
  {
    icon: Cog,
    title: 'We apply 2026 rules',
    description: 'Our engine checks your eligibility against current federal policy.',
  },
  {
    icon: FileText,
    title: 'Get your plan',
    description: 'A personalized report with specific actions for your situation.',
  },
];

const FAQ_ITEMS = [
  {
    id: 'free',
    question: 'Is this really free?',
    answer:
      'Yes — 100% free. No account, no credit card, no credit pull. We earn revenue through affiliate relationships with refinancing lenders, which are clearly disclosed and never influence our assessment engine.',
  },
  {
    id: 'different',
    question: 'How is this different from studentaid.gov?',
    answer:
      'StudentAid.gov provides general policy information. We apply those policies to your specific situation — your loan type, employment, income, and goals — and generate a personalized action plan. Think of us as a translator between federal policy and your individual loans.',
  },
  {
    id: 'data-safe',
    question: 'Is my data safe?',
    answer:
      'Your data is encrypted in transit with 256-bit TLS. We never share or sell your information. Assessment data is stored temporarily to generate your report and is not used for marketing or shared with third parties.',
  },
  {
    id: 'who',
    question: 'Who created this tool?',
    answer:
      'StudentDebt.ai was built to help borrowers navigate the complex 2026 policy changes. Our assessment engine uses a deterministic rules-based approach — the same inputs always produce the same outputs. The AI only formats pre-computed results into plain English; it never invents policy details.',
  },
  {
    id: 'current',
    question: 'How current is the policy information?',
    answer:
      'Our rules engine reflects federal student loan policy as of April 1, 2026, including the SAVE Plan court injunction, PAYE closure, and July 2026 disbursement rules. We update the engine when policy changes and display the last-reviewed date on every page.',
  },
];

function StarRating() {
  return (
    <span className="inline-flex gap-0.5" aria-label="5 out of 5 stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </span>
  );
}

export default async function HomePage() {
  const assessmentCount = await getAssessmentCount();
  const countLabel = formatCount(assessmentCount);
  const socialProof = countLabel || '50,000+';
  const daysLeft = getDaysUntilDeadline();

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

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to get your 2026 student loan assessment',
    description:
      'Answer 7 questions about your loans, employment, and goals to get a personalized student loan action plan.',
    totalTime: 'PT3M',
    step: STEPS.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };

  const expandedOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: BASE_URL,
    name: SITE_NAME,
    description:
      'StudentDebt.ai helps federal student loan borrowers understand how 2026 policy changes affect their repayment options.',
    logo: `${BASE_URL}/logo.svg`,
  };

  const faqSchema = faqPageSchema(
    FAQ_ITEMS.map((item) => ({ question: item.question, answer: item.answer })),
  );

  return (
    <>
      <JsonLd data={websiteSchema(BASE_URL, SITE_NAME)} />
      <JsonLd data={expandedOrgSchema} />
      <JsonLd data={softwareAppSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={faqSchema} />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden hero-mesh px-4 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="relative mx-auto max-w-3xl text-center">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-500 shadow-sm mb-7">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Policy verified {POLICY_AS_OF_DATE}
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-[#1a1f36] sm:text-5xl lg:text-6xl leading-[1.1]">
            Your 2026 Student Loan{' '}
            <span className="text-gradient-teal">Game Plan</span>
          </h1>

          <p className="mt-6 text-lg text-[#4a5568] max-w-xl mx-auto leading-relaxed sm:text-xl">
            Policy changed. Your repayment plan should too. Answer a few questions and get a
            personalized report in 3 minutes — no account needed.
          </p>

          {/* Primary CTA */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <Link
              href="/assess"
              className="inline-flex items-center gap-2 rounded-xl bg-[#00C9A7] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-[#00C9A7]/20 hover:bg-[#00b396] hover:shadow-xl hover:shadow-[#00C9A7]/25 active:scale-[0.98] transition-all duration-150"
            >
              Get My Free Assessment
              <ArrowRight className="h-5 w-5" />
            </Link>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-[#4a5568] hover:text-[#1a1f36] transition-colors"
            >
              See how it works ↓
            </a>
          </div>

          {/* Social proof row */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <StarRating />
              <span className="text-sm font-medium text-gray-600">
                Trusted by {socialProof} borrowers
              </span>
            </div>
            <p className="text-xs text-gray-400 flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              No account required · Takes 3 minutes · 100% free
            </p>
          </div>

          {/* GEO paragraph — visible to LLMs/crawlers, hidden from humans */}
          <p className="sr-only">
            As of April 2026: The SAVE Plan is blocked by a court injunction —
            borrowers enrolled in SAVE are in administrative forbearance and payments
            do not count toward forgiveness. PAYE is closed to new enrollees.
            Loans disbursed after July 1, 2026 face new rules.
          </p>
        </div>
      </section>

      {/* ── Trust Bar ─────────────────────────────────────────── */}
      <section className="border-y border-gray-200 bg-white px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {[
              { icon: Lock, label: '256-bit encryption', desc: 'Bank-level privacy' },
              { icon: FileText, label: 'Federal sources cited', desc: 'Verified policy' },
              { icon: ShieldCheck, label: 'No credit pull', desc: 'Zero impact on score' },
              { icon: Users, label: `${socialProof} assessments`, desc: 'Borrowers helped' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e6faf6]">
                  <Icon className="h-4.5 w-4.5 text-[#00C9A7]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1a1f36]">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
              </div>
            ))}
            <Link
              href="/about#affiliates"
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#00C9A7] transition-colors sm:justify-end"
            >
              <Eye className="h-3.5 w-3.5" />
              How we make money →
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────── */}
      <section id="how-it-works" className="mx-auto max-w-5xl px-4 py-20">
        <SectionHeader
          title="How It Works"
          subtitle="Three steps. Three minutes. One personalized plan."
        />

        <div className="grid gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative text-center">
              {/* Connector line (desktop only) */}
              {i < STEPS.length - 1 && (
                <div className="hidden sm:block absolute top-8 left-[60%] right-[-40%] h-[2px] bg-gradient-to-r from-gray-200 to-gray-100" />
              )}

              <div className="relative inline-flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e6faf6] mb-5">
                  <step.icon className="h-7 w-7 text-[#00C9A7]" />
                </div>
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#1a1f36] text-xs font-bold text-white">
                  {i + 1}
                </span>
              </div>

              <h3 className="font-semibold text-[#1a1f36] text-base">{step.title}</h3>
              <p className="mt-2 text-sm text-[#4a5568] leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── What Changed in 2026 ──────────────────────────────── */}
      <section className="bg-[#F8F9FC] px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            title="Key 2026 Changes Affecting Your Loans"
            subtitle="More has changed in the past two years than in the previous decade. Here's what matters."
            badge={`Reviewed ${POLICY_AS_OF_DATE}`}
            badgeVariant="info"
          />

          <div className="space-y-4 relative timeline-line pl-10 sm:pl-0 sm:[&]:before:hidden">
            {CHANGES.map((item, i) => (
              <div
                key={i}
                className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-200 sm:ml-0"
              >
                {/* Timeline dot (mobile) */}
                <div className={`absolute -left-[25px] top-7 h-3 w-3 rounded-full ${item.color} ring-4 ring-white sm:hidden`} />

                <div className="flex items-start gap-4">
                  <span
                    className={`hidden sm:inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${item.numBg}`}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-[#1a1f36] text-base">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-[#4a5568] leading-relaxed">
                      {item.detail}
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#00C9A7] hover:text-[#00b396] transition-colors"
                      >
                        Learn more <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <span className="text-xs text-gray-400">Source: {item.source}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-amber-700 font-medium bg-amber-50 rounded-lg py-3 px-4 border border-amber-200">
            Policy changes take effect July 1, 2026{daysLeft > 0 ? ` — ${daysLeft} days away` : ''}.
            Check your eligibility now.
          </p>
        </div>
      </section>

      {/* ── Free Tools ────────────────────────────────────────── */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            title="Free Tools — No Account Needed"
            subtitle="Calculate payments, track PSLF progress, or compare lenders — all free, all instant."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group block">
                <div className="relative h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-200">
                  {/* Gradient top accent */}
                  <div
                    className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r ${tool.accent}`}
                  />

                  {tool.badge && (
                    <div className="absolute -top-2.5 left-4">
                      <Badge variant="warning" className="shadow-sm">
                        {tool.badge}
                      </Badge>
                    </div>
                  )}

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 mb-4">
                    <tool.icon className={`h-6 w-6 ${tool.iconColor}`} />
                  </div>

                  <h3 className="font-semibold text-[#1a1f36] group-hover:text-[#00C9A7] transition-colors leading-snug">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#4a5568] leading-relaxed">
                    {tool.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#00C9A7] group-hover:gap-2 transition-all">
                    Open tool <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof Stats ────────────────────────────────── */}
      <section className="border-y border-gray-200 bg-[#F8F9FC] px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
            {[
              { value: socialProof, label: 'Assessments delivered' },
              { value: '4', label: 'Free tools available' },
              { value: 'Weekly', label: 'Policy updates' },
              { value: '0', label: 'Credit pulls required' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-bold text-[#1a1f36] sm:text-4xl">{value}</p>
                <p className="mt-1 text-sm text-[#4a5568]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-20">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Quick answers about how StudentDebt.ai works."
        />
        <Accordion items={FAQ_ITEMS} />
      </section>

      {/* ── Bottom CTA Band ──────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1a1f36] to-[#111427] px-4 py-24 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-bold text-white sm:text-4xl leading-tight">
            See Exactly How These Changes
            <br className="hidden sm:block" /> Affect Your Loans
          </h2>
          <p className="mt-4 text-gray-300 text-lg">
            Get a personalized report in 3 minutes — no account needed.
          </p>

          <div className="mt-10">
            <Link
              href="/assess"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-[#1a1f36] shadow-lg hover:bg-gray-100 active:scale-[0.98] transition-all duration-150"
            >
              Start Free Assessment
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Lock className="h-4 w-4" /> Encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" /> No data sold
            </span>
            <span className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" /> Sources cited
            </span>
          </div>

          <p className="mt-6 text-sm text-gray-400">
            <StarRating /> Trusted by {socialProof} borrowers ·{' '}
            {daysLeft > 0
              ? `Policy changes take effect July 1, 2026 — ${daysLeft} days away`
              : `Policy as of ${POLICY_AS_OF_DATE}`}
          </p>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <StickyAssessmentCTA />
    </>
  );
}
