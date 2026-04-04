import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getSession } from '@/lib/kv';
import { buildMetadata } from '@/components/seo/open-graph';
import { ReportDisplay } from '@/components/report/report-display';
import { Disclaimer } from '@/components/ui/disclaimer';
import { anthropic, REPORT_MODEL, REPORT_MAX_TOKENS } from '@/lib/anthropic';
import { buildUserPrompt, SYSTEM_PROMPT } from '@/lib/report-prompt';
import { hashAssessment } from '@/engine/hash';
import { getReport, setReport } from '@/lib/kv';
import type { Report } from '@/engine/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: 'Your Assessment Results',
  description: 'Your personalized student loan assessment from StudentDebt.ai.',
  path: '/assess/results',
});

async function fetchOrGenerateReport(assessment: Awaited<ReturnType<typeof getSession>>): Promise<Report> {
  if (!assessment) throw new Error('No assessment');

  const assessmentHash = hashAssessment(assessment);

  const cached = await getReport(assessmentHash);
  if (cached) return cached;

  const message = await anthropic.messages.create({
    model: REPORT_MODEL,
    max_tokens: REPORT_MAX_TOKENS,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildUserPrompt(assessment) }],
  });

  const content = message.content[0];
  if (content.type !== 'text') throw new Error('Unexpected LLM response');

  const report: Report = {
    sessionId: assessment.sessionId,
    assessmentHash,
    markdown: content.text,
    generatedAt: new Date().toISOString(),
    modelVersion: REPORT_MODEL,
  };

  await setReport(assessmentHash, report);
  return report;
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>;
}) {
  const { session: sessionId } = await searchParams;

  if (!sessionId) {
    redirect('/assess');
  }

  const assessment = await getSession(sessionId);
  if (!assessment) {
    redirect('/assess?expired=1');
  }

  let report: Report;
  try {
    report = await fetchOrGenerateReport(assessment);
  } catch {
    redirect('/assess?error=1');
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your assessment</h1>
        <p className="mt-1 text-sm text-gray-500">
          Generated {new Date(report.generatedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>

      <ReportDisplay assessment={assessment} initialReport={report} />

      <Disclaimer className="mt-12" />
    </div>
  );
}
