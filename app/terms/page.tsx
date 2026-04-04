import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/open-graph';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description: 'Terms of service for StudentDebt.ai.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: April 1, 2026</p>

      <div className="mt-8 space-y-8 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Educational use only</h2>
          <p className="mt-3">
            StudentDebt.ai provides educational information to help you understand federal student
            loan policy. The information on this site, including assessment reports, is for
            informational purposes only. It does not constitute financial, legal, or tax advice.
            Individual situations vary. Consult a qualified professional before making decisions
            about your loans.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Accuracy</h2>
          <p className="mt-3">
            We make reasonable efforts to ensure our rules engine reflects current federal policy.
            However, policy changes frequently, and we cannot guarantee that all information is
            current or accurate. Always verify information at{' '}
            <a
              href="https://studentaid.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              studentaid.gov
            </a>{' '}
            before taking action.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">No warranty</h2>
          <p className="mt-3">
            This site is provided &ldquo;as is&rdquo; without warranties of any kind. We are not
            responsible for any decisions you make based on information provided on this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Affiliate links</h2>
          <p className="mt-3">
            Some links on this site may be affiliate links. We may earn compensation when you
            click them and take an action. Affiliate relationships are disclosed and do not
            influence the assessment engine&apos;s recommendations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Changes to these terms</h2>
          <p className="mt-3">
            We may update these terms at any time. Continued use of the site after changes
            constitutes acceptance of the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
}
