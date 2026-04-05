import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/open-graph';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';
import { BASE_URL } from '@/lib/constants';
import { PSLFTrackerClient } from './client';

export const metadata: Metadata = buildMetadata({
  title: 'PSLF Payment Tracker — Track Your 120 Qualifying Payments',
  description:
    'Track your progress toward Public Service Loan Forgiveness (PSLF). Enter your qualifying payments, employment start date, and see exactly how many months until forgiveness — free tool.',
  path: '/tools/pslf-tracker',
  type: 'article',
});

export default function PSLFTrackerPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: BASE_URL },
          { name: 'Tools', url: `${BASE_URL}/tools` },
          { name: 'PSLF Tracker', url: `${BASE_URL}/tools/pslf-tracker` },
        ])}
      />
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900">PSLF Payment Tracker</h1>
        <p className="mt-3 text-gray-600">
          Track your progress toward the 120 qualifying payments required for Public Service Loan
          Forgiveness. Your progress is saved locally in your browser — no account required.
        </p>
        <PSLFTrackerClient />
      </div>
    </>
  );
}
