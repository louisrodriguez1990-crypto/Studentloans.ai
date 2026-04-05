import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/open-graph';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';
import { BASE_URL } from '@/lib/constants';
import { ForgivenessTimelineClient } from './client';

export const metadata: Metadata = buildMetadata({
  title: 'Student Loan Forgiveness Timeline Calculator — How Long Until Forgiveness?',
  description:
    'Calculate exactly when your federal student loans will be forgiven under IBR, PSLF, or ICR. Enter your income, balance, and repayment plan — get your estimated forgiveness date and amount.',
  path: '/calculators/forgiveness-timeline',
  type: 'article',
});

export default function ForgivenessTimelinePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: BASE_URL },
          { name: 'Calculators', url: `${BASE_URL}/calculators` },
          { name: 'Forgiveness Timeline', url: `${BASE_URL}/calculators/forgiveness-timeline` },
        ])}
      />
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Forgiveness Timeline Calculator</h1>
        <p className="mt-3 text-gray-600">
          Enter your loan details to see exactly when your loans would be forgiven under IBR or
          PSLF — and how much would be wiped out.
        </p>
        <ForgivenessTimelineClient />
      </div>
    </>
  );
}
