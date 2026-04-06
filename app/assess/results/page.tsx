import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/open-graph';
import { ResultsLoader } from '@/components/report/results-loader';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Disclaimer } from '@/components/ui/disclaimer';
import { POLICY_AS_OF_DATE } from '@/lib/constants';
import { CalendarCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: 'Your Assessment Results',
  description: 'Your personalized student loan assessment from StudentDebt.ai.',
  path: '/assess/results',
});

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>;
}) {
  const { session: sessionId } = await searchParams;

  if (!sessionId) {
    redirect('/assess');
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: 'Assessment', href: '/assess' },
          { label: 'Your Results', href: '/assess/results' },
        ]}
        className="mb-6"
      />

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a1f36] sm:text-3xl">Your assessment</h1>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <p className="text-sm text-[#4a5568]">
            Personalized based on your answers
          </p>
          <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs text-gray-500">
            <CalendarCheck className="h-3 w-3 text-[#00C9A7]" />
            Policy as of {POLICY_AS_OF_DATE}
          </span>
        </div>
      </div>

      <ResultsLoader sessionId={sessionId} />

      <Disclaimer className="mt-12" />
    </div>
  );
}
