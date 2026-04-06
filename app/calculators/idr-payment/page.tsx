import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/open-graph';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { LastReviewed } from '@/components/ui/last-reviewed';
import { InlineEmailCapture } from '@/components/ui/inline-email-capture';
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
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: 'Calculators', href: '/calculators/idr-payment' },
          { label: 'IDR Payment Calculator', href: '/calculators/idr-payment' },
        ]}
        className="mb-6"
      />

      <LastReviewed className="mb-4" />

      <h1 className="text-3xl font-bold text-[#1a1f36]">
        Income-Driven Repayment Calculator
      </h1>
      <p className="mt-3 text-[#4a5568]">
        Estimate your monthly student loan payment under IBR, SAVE, and PAYE. Updated for
        2026 federal policy — including the SAVE Plan court injunction that has paused
        payments for enrolled borrowers.
      </p>

      <IDRCalculatorClient />

      <InlineEmailCapture
        segment="idr_calculator"
        prompt="Get notified when IDR policy changes affect your payment:"
      />
    </div>
  );
}
