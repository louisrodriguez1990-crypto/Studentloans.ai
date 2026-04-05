'use client';

import { useEffect, useState } from 'react';
import { ReportDisplay } from './report-display';
import { ReportSkeleton } from './report-skeleton';
import type { AssessmentResult, Report } from '@/engine/types';

interface ResultsLoaderProps {
  sessionId: string;
}

export function ResultsLoader({ sessionId }: ResultsLoaderProps) {
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let raw: string | null = null;
    try {
      raw = sessionStorage.getItem(`assessment_${sessionId}`);
    } catch {
      // sessionStorage not available (e.g. private browsing with strict settings)
    }

    if (!raw) {
      setError('Your session was not found. This can happen if you opened the results in a new tab or cleared your browser storage.');
      return;
    }

    let parsed: AssessmentResult;
    try {
      parsed = JSON.parse(raw) as AssessmentResult;
    } catch {
      setError('Your session data was corrupted. Please retake the assessment.');
      return;
    }

    setAssessment(parsed);

    fetch('/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, assessment: parsed }),
    })
      .then((res) => res.json())
      .then((data: { error?: string } & Partial<Report>) => {
        if (data.error) throw new Error(data.error);
        setReport(data as Report);
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : 'Failed to generate report.';
        setError(msg);
      });
  }, [sessionId]);

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        <p className="font-medium">Something went wrong</p>
        <p className="mt-1">{error}</p>
        <a href="/assess" className="mt-3 inline-block underline hover:text-red-900">
          Start over →
        </a>
      </div>
    );
  }

  if (!report || !assessment) {
    return (
      <div>
        <p className="mb-6 text-sm text-gray-500 animate-pulse">
          Generating your personalized report…
        </p>
        <ReportSkeleton />
      </div>
    );
  }

  return <ReportDisplay assessment={assessment} initialReport={report} />;
}
