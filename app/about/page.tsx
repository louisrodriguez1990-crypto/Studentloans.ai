import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/open-graph';
import Link from 'next/link';
import { POLICY_AS_OF_DATE } from '@/lib/constants';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description:
    'How StudentDebt.ai works, our methodology, and our commitment to accuracy and transparency.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">About StudentDebt.ai</h1>

      <div className="mt-8 space-y-8 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">What we do</h2>
          <p className="mt-3">
            StudentDebt.ai is a decision engine that helps federal student loan borrowers
            understand how the 2026 policy changes affect their specific situation. We provide
            personalized reports — not generic advice — based on a deterministic rules engine that
            applies federal eligibility criteria directly to your loan profile.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">How the assessment works</h2>
          <p className="mt-3">
            When you complete the intake form, your answers are processed by a rules engine — a
            set of pure TypeScript functions that apply federal policy logic. The engine decides
            your eligibility for various programs (SAVE, IDR, PSLF, refinancing) based on your
            inputs.
          </p>
          <p className="mt-3">
            The rules engine output is then formatted into a plain-English report by Claude (an
            AI model). Critically, the AI only has access to the engine&apos;s pre-computed output
            — not your raw inputs, and not any external policy information. This prevents the AI
            from hallucinating policy details or inventing recommendations.
          </p>
          <p className="mt-3">
            The result: the accuracy of a rules-based system, presented in the clarity of natural
            language.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Policy information</h2>
          <p className="mt-3">
            All policy rules are versioned and cite authoritative federal sources. The current
            rules reflect policy as of <strong>{POLICY_AS_OF_DATE}</strong>. Federal student loan
            policy changes frequently. We update the rules when policy changes, but encourage all
            users to verify current information at{' '}
            <a
              href="https://studentaid.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              studentaid.gov
            </a>
            .
          </p>
        </section>

        <section id="affiliates">
          <h2 className="text-xl font-semibold text-gray-900">Affiliate relationships</h2>
          <p className="mt-3">
            This site may earn compensation when you click on affiliate links to refinancing
            partners, advisors, or other financial services. Affiliate relationships are clearly
            disclosed on all pages where they appear.
          </p>
          <p className="mt-3">
            Affiliate relationships do not influence the rules engine&apos;s recommendations. The
            engine applies federal eligibility criteria; it does not weigh financial
            considerations for or against any particular partner. Federal benefit-loss warnings
            always appear before any refinance referral.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Disclaimer</h2>
          <p className="mt-3">
            StudentDebt.ai provides educational information only. Nothing on this site constitutes
            financial or legal advice. Student loan situations vary significantly. We recommend
            consulting a qualified student loan advisor or attorney before making decisions about
            your loans.
          </p>
          <p className="mt-3">
            See our{' '}
            <Link href="/privacy" className="text-blue-600 underline">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms" className="text-blue-600 underline">
              Terms of Service
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
