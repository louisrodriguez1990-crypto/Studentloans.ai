import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/open-graph';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';
import { BASE_URL } from '@/lib/constants';
import { RefinanceSavingsClient } from './client';

export const metadata: Metadata = buildMetadata({
  title: 'Student Loan Refinancing Savings Calculator 2026',
  description:
    'Calculate how much you could save by refinancing your student loans. See monthly savings, lifetime interest savings, and your break-even point — free calculator.',
  path: '/calculators/refinance-savings',
  type: 'article',
});

export default function RefinanceSavingsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: BASE_URL },
          { name: 'Calculators', url: `${BASE_URL}/calculators` },
          { name: 'Refinance Savings', url: `${BASE_URL}/calculators/refinance-savings` },
        ])}
      />
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900">
          Student Loan Refinancing Savings Calculator
        </h1>
        <p className="mt-3 text-gray-600">
          See exactly how much you could save by refinancing to a lower rate. Enter your current
          loan details and compare scenarios.
        </p>
        <RefinanceSavingsClient />
      </div>
    </>
  );
}
