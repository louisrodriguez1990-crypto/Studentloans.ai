import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/open-graph';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { LastReviewed } from '@/components/ui/last-reviewed';
import Link from 'next/link';
import { POLICY_AS_OF_DATE } from '@/lib/constants';
import { Cog, FileText, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'About — Methodology, Editorial Standards & How We Make Money',
  description:
    'How StudentDebt.ai works, our methodology, editorial standards, and our commitment to accuracy and transparency.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'About', href: '/about' }]}
        className="mb-6"
      />

      <h1 className="text-3xl font-bold text-[#1a1f36]">About StudentDebt.ai</h1>
      <LastReviewed className="mt-3" />

      <div className="mt-8 space-y-10 text-[#4a5568]">
        <section>
          <h2 className="text-xl font-semibold text-[#1a1f36]">What we do</h2>
          <p className="mt-3">
            StudentDebt.ai is a decision engine that helps federal student loan borrowers
            understand how the 2026 policy changes affect their specific situation. We provide
            personalized reports — not generic advice — based on a deterministic rules engine
            that applies federal eligibility criteria directly to your loan profile.
          </p>
        </section>

        {/* Methodology — visual diagram */}
        <section>
          <h2 className="text-xl font-semibold text-[#1a1f36]">How the assessment works</h2>
          <p className="mt-3">
            When you complete the intake form, your answers are processed by a rules engine — a
            set of pure TypeScript functions that apply federal policy logic. The engine decides
            your eligibility for various programs (SAVE, IDR, PSLF, refinancing) based on your
            inputs.
          </p>

          {/* Visual methodology flow */}
          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Our methodology
            </p>
            <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0">
              {[
                {
                  icon: FileText,
                  title: 'Your Answers',
                  desc: 'Loan type, income, employment, goals',
                },
                {
                  icon: Cog,
                  title: 'Rules Engine',
                  desc: 'Deterministic policy logic — same inputs, same outputs',
                },
                {
                  icon: FileText,
                  title: 'AI Formatting',
                  desc: 'Converts engine output to plain-English report',
                },
                {
                  icon: ShieldCheck,
                  title: 'Your Report',
                  desc: 'Personalized action plan with cited sources',
                },
              ].map((step, i) => (
                <div key={step.title} className="flex items-center gap-3 sm:flex-col sm:flex-1 sm:text-center">
                  {i > 0 && (
                    <ArrowRight className="hidden sm:block h-4 w-4 text-gray-300 shrink-0 sm:absolute sm:left-[-12px] relative" />
                  )}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200 sm:mx-auto">
                    <step.icon className="h-5 w-5 text-[#00C9A7]" />
                  </div>
                  <div className="sm:mt-2">
                    <p className="text-sm font-medium text-[#1a1f36]">{step.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4">
            Critically, the AI only has access to the engine&apos;s pre-computed output — not
            your raw inputs, and not any external policy information. This prevents the AI
            from hallucinating policy details or inventing recommendations.
          </p>
          <p className="mt-3">
            The result: the accuracy of a rules-based system, presented in the clarity of
            natural language.
          </p>
        </section>

        {/* Editorial Standards */}
        <section>
          <h2 className="text-xl font-semibold text-[#1a1f36]">Editorial standards</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-[#00C9A7] mt-0.5 shrink-0" />
              <p>
                <strong className="text-[#1a1f36]">Accuracy:</strong> All policy rules are
                version-controlled and cite authoritative federal sources. The engine is
                updated when policy changes and all pages display last-reviewed dates.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Cog className="h-5 w-5 text-[#00C9A7] mt-0.5 shrink-0" />
              <p>
                <strong className="text-[#1a1f36]">Independence:</strong> The assessment
                engine is 100% deterministic. Affiliate relationships never influence the
                engine&apos;s eligibility checks, recommendations, or warnings.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-[#00C9A7] mt-0.5 shrink-0" />
              <p>
                <strong className="text-[#1a1f36]">Transparency:</strong> Federal
                benefit-loss warnings always appear before any refinance referral. All
                affiliate relationships are disclosed inline and on this page.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1f36]">Policy information</h2>
          <p className="mt-3">
            All policy rules are versioned and cite authoritative federal sources. The current
            rules reflect policy as of <strong className="text-[#1a1f36]">{POLICY_AS_OF_DATE}</strong>.
            Federal student loan policy changes frequently. We update the rules when policy
            changes, but encourage all users to verify current information at{' '}
            <a
              href="https://studentaid.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00C9A7] hover:text-[#00b396] underline transition-colors"
            >
              studentaid.gov
            </a>
            .
          </p>
        </section>

        <section id="affiliates">
          <h2 className="text-xl font-semibold text-[#1a1f36]">
            How we make money
          </h2>
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <p>
              This site may earn compensation when you click on affiliate links to refinancing
              partners, advisors, or other financial services. Affiliate relationships are
              clearly disclosed on all pages where they appear.
            </p>
            <p className="mt-3">
              <strong className="text-[#1a1f36]">
                Affiliate relationships do not influence the rules engine&apos;s
                recommendations.
              </strong>{' '}
              The engine applies federal eligibility criteria; it does not weigh financial
              considerations for or against any particular partner. Federal benefit-loss
              warnings always appear before any refinance referral.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1f36]">Disclaimer</h2>
          <p className="mt-3">
            StudentDebt.ai provides educational information only. Nothing on this site
            constitutes financial or legal advice. Student loan situations vary significantly.
            We recommend consulting a qualified student loan advisor or attorney before making
            decisions about your loans.
          </p>
          <p className="mt-3">
            See our{' '}
            <Link href="/privacy" className="text-[#00C9A7] hover:text-[#00b396] underline transition-colors">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms" className="text-[#00C9A7] hover:text-[#00b396] underline transition-colors">
              Terms of Service
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
