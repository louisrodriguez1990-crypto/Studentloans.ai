import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/open-graph';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { LastReviewed } from '@/components/ui/last-reviewed';
import { InlineEmailCapture } from '@/components/ui/inline-email-capture';
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
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: 'Calculators', href: '/calculators/refinance-savings' },
          { label: 'Refinance Savings', href: '/calculators/refinance-savings' },
        ]}
        className="mb-6"
      />

      <LastReviewed className="mb-4" />

      <h1 className="text-3xl font-bold text-[#1a1f36]">
        Student Loan Refinancing Savings Calculator
      </h1>
      <p className="mt-3 text-[#4a5568]">
        See exactly how much you could save by refinancing to a lower rate. Enter your current
        loan details and compare scenarios.
      </p>

      <RefinanceSavingsClient />

      <InlineEmailCapture
        segment="refinance_calculator"
        prompt="Get notified when refinance rates change:"
      />
    </div>
  );
}
