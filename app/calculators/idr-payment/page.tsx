import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/open-graph';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';
import { BASE_URL } from '@/lib/constants';
import { IDRCalculatorClient } from './client';

export const metadata: Metadata = buildMetadata({
  title: 'Income-Driven Repayment Calculator 2026 (IBR, SAVE, PAYE)',
  description:
    'Calculate your estimated monthly payment under IBR, SAVE, and PAYE income-driven repayment plans. Updated for 2026 federal policy changes including the SAVE Plan court injunction.',
  path: '/calculators/idr-payment',
  type: 'article',
});

export default function IDRCalculatorPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: BASE_URL },
          { name: 'Calculators', url: `${BASE_URL}/calculators` },
          { name: 'IDR Payment Calculator', url: `${BASE_URL}/calculators/idr-payment` },
        ])}
      />
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900">
          Income-Driven Repayment Calculator
        </h1>
        <p className="mt-3 text-gray-600">
          Estimate your monthly student loan payment under IBR, SAVE, and PAYE. Updated for
          2026 federal policy — including the SAVE Plan court injunction that has paused
          payments for enrolled borrowers.
        </p>
        <IDRCalculatorClient />
      </div>
    </>
  );
}
