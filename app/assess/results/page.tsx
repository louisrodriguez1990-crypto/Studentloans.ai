import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/open-graph';
import { ResultsLoader } from '@/components/report/results-loader';
import { Disclaimer } from '@/components/ui/disclaimer';

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
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your assessment</h1>
        <p className="mt-1 text-sm text-gray-500">Personalized based on your answers</p>
      </div>

      <ResultsLoader sessionId={sessionId} />

      <Disclaimer className="mt-12" />
    </div>
  );
}
