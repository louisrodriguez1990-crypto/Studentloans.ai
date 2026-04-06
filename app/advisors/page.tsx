import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/open-graph';
import { AdvisorsPageClient } from './client';

export const metadata: Metadata = buildMetadata({
  title: 'Find a Student Loan Advisor',
  description:
    'Get matched with a fee-only student loan advisor who can review your full situation and give you a clear repayment plan. Free to request.',
});

export default function AdvisorsPage() {
  return <AdvisorsPageClient />;
}
