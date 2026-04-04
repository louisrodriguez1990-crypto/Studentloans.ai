import type { Metadata } from 'next';
import { IntakeForm } from '@/components/intake/intake-form';
import { buildMetadata } from '@/components/seo/open-graph';

export const metadata: Metadata = buildMetadata({
  title: 'Get Your Free Assessment',
  description:
    'Answer 4 questions to get a personalized report on how 2026 student loan policy changes affect you.',
  path: '/assess',
});

export default function AssessPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Your personalized assessment</h1>
        <p className="mt-2 text-gray-600">
          4 steps · 3 minutes · no account required
        </p>
      </div>
      <IntakeForm />
    </div>
  );
}
