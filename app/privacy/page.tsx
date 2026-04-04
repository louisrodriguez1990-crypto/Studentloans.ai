import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/open-graph';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How StudentDebt.ai collects, uses, and protects your information.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: April 1, 2026</p>

      <div className="mt-8 space-y-8 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">What we collect</h2>
          <p className="mt-3">
            <strong>Anonymous session data.</strong> When you use the assessment tool, we generate
            a random session ID (not tied to your identity) and store your assessment inputs and
            results. This data is anonymized — it does not include your name, Social Security
            number, or any other personally identifiable information unless you choose to provide
            your email address.
          </p>
          <p className="mt-3">
            <strong>Email address (optional).</strong> If you choose to save your assessment, we
            store your email address. We use it to send you your assessment recap and relevant
            policy update notifications. We do not sell your email address.
          </p>
          <p className="mt-3">
            <strong>Anonymous analytics.</strong> We use Vercel Analytics and PostHog to
            understand how the site is used. These tools collect anonymized data about page views
            and user interactions. No PII is collected through these tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">What we don&apos;t collect</h2>
          <ul className="mt-3 list-disc list-inside space-y-1">
            <li>Your name</li>
            <li>Your Social Security number</li>
            <li>Your exact loan account numbers</li>
            <li>Your exact income (only ranges)</li>
            <li>Your location beyond what your browser sends by default</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">How we use your data</h2>
          <ul className="mt-3 list-disc list-inside space-y-1">
            <li>To generate and display your personalized assessment report</li>
            <li>To send policy update emails if you opted in</li>
            <li>To improve the site and the rules engine (anonymized, aggregated only)</li>
            <li>To publish original research on borrower confusion patterns (anonymized, aggregated only)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Data retention</h2>
          <p className="mt-3">
            Session data is stored for 7 days in our session storage. Cached reports are stored
            for up to 30 days. Email subscriber data is retained until you unsubscribe.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Your rights</h2>
          <p className="mt-3">
            You can request deletion of your data at any time by emailing us at
            privacy@studentdebt.ai. If you subscribed to emails, you can unsubscribe by replying
            to any email with &ldquo;unsubscribe&rdquo; in the subject line.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Third-party services</h2>
          <p className="mt-3">
            We use the following third-party services: Anthropic (report generation), Vercel
            (hosting and session storage), Supabase (database), Resend (email), PostHog
            (analytics). Each service has its own privacy policy.
          </p>
        </section>
      </div>
    </div>
  );
}
