'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ConfidenceBadge } from './confidence-badge';
import { WarningsList } from './warnings-list';
import { RoutingCTA } from './routing-cta';
import { RegenerateButton } from './regenerate-button';
import { ResultsEmailCapture } from './results-email-capture';
import type { AssessmentResult, Report } from '@/engine/types';

interface ReportDisplayProps {
  assessment: AssessmentResult;
  initialReport: Report;
}

export function ReportDisplay({ assessment, initialReport }: ReportDisplayProps) {
  const [markdown, setMarkdown] = useState(initialReport.markdown);

  return (
    <div className="space-y-8">
      {/* Meta: confidence + regenerate */}
      <div className="flex items-center justify-between">
        <ConfidenceBadge confidence={assessment.confidence} />
        <RegenerateButton
          sessionId={assessment.sessionId}
          onRegenerated={(md) => setMarkdown(md)}
        />
      </div>

      {/* Structural warnings (from rules engine) — always shown */}
      <WarningsList warnings={assessment.warnings} />

      {/* LLM-generated report prose */}
      <div className="prose prose-gray max-w-none prose-headings:font-semibold prose-h2:text-lg prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>

      {/* Routing CTAs — driven by engine routing tags */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Your next steps</h2>
        <RoutingCTA routingTags={assessment.routingTags} />
      </div>

      {/* Sticky email capture — appears after scrolling 60% */}
      <ResultsEmailCapture sessionId={assessment.sessionId} routingTags={assessment.routingTags} />
    </div>
  );
}
