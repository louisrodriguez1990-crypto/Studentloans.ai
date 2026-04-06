import type { Metadata } from 'next';
import { ChatIntake } from '@/components/intake/chat-intake';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { buildMetadata } from '@/components/seo/open-graph';
import { Lock, Clock, ClipboardList } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Get Your Free Assessment',
  description:
    'Answer a few questions to get a personalized report on how 2026 student loan policy changes affect you.',
  path: '/assess',
});

export default function AssessPage() {
  return (
    <>
      {/* Page header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-6 pb-8">
        <div className="mx-auto max-w-2xl">
          <Breadcrumbs
            items={[{ label: 'Assessment', href: '/assess' }]}
            className="mb-6"
          />

          <h1 className="text-2xl font-bold text-[#1a1f36] sm:text-3xl">
            Your personalized assessment
          </h1>
          <p className="mt-2 text-sm text-[#4a5568]">
            Answer a few questions about your loans and we&apos;ll apply 2026 federal policy rules to
            your situation.
          </p>

          {/* Trust & info signals */}
          <div className="mt-5 flex flex-wrap gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#00C9A7]" />
              Takes about 3 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-[#00C9A7]" />
              Your answers are encrypted and never shared
            </span>
            <span className="flex items-center gap-1.5">
              <ClipboardList className="h-3.5 w-3.5 text-[#00C9A7]" />
              No exact numbers needed
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10">
        <ChatIntake />
      </div>
    </>
  );
}
