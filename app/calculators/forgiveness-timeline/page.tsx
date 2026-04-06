import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/open-graph';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { LastReviewed } from '@/components/ui/last-reviewed';
import { InlineEmailCapture } from '@/components/ui/inline-email-capture';
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
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: 'Calculators', href: '/calculators/forgiveness-timeline' },
          { label: 'Forgiveness Timeline', href: '/calculators/forgiveness-timeline' },
        ]}
        className="mb-6"
      />

      <LastReviewed className="mb-4" />

      <h1 className="text-3xl font-bold text-[#1a1f36]">Forgiveness Timeline Calculator</h1>
      <p className="mt-3 text-[#4a5568]">
        Enter your loan details to see exactly when your loans would be forgiven under IBR or
        PSLF — and how much would be wiped out.
      </p>

      <ForgivenessTimelineClient />

      <InlineEmailCapture
        segment="forgiveness_calculator"
        prompt="Get notified when forgiveness policy changes:"
      />
    </div>
  );
}
