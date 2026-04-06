import type { Metadata } from 'next';
import { ChatIntake } from '@/components/intake/chat-intake';
import { buildMetadata } from '@/components/seo/open-graph';

export const metadata: Metadata = buildMetadata({
  title: 'Get Your Free Assessment',
  description:
    'Answer a few questions to get a personalized report on how 2026 student loan policy changes affect you.',
  path: '/assess',
});

export default function AssessPage() {
  return (
    <>
      {/* Page header band — matches homepage hero */}
      <div className="bg-gradient-to-br from-teal-700 via-teal-600 to-blue-800 px-4 py-10 text-center">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Your personalized assessment</h1>
        <p className="mt-2 text-sm text-teal-100">
          ~3 minutes · no account required
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10">
        <ChatIntake />
      </div>
    </>
  );
}
