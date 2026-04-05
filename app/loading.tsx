'use client';

import { useEffect, useState } from 'react';

const MESSAGES = [
  'Applying 2026 federal policy rules to your loan profile\u2026',
  'Checking PSLF and IDR eligibility\u2026',
  'Analyzing SAVE Plan injunction impact\u2026',
  'Generating your personalized report\u2026',
];

export default function Loading() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center px-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      <div>
        <p className="text-lg font-semibold text-gray-900">Analyzing your situation&hellip;</p>
        <p className="mt-1 text-sm text-gray-500 max-w-xs">{MESSAGES[msgIndex]}</p>
        <p className="mt-3 text-xs text-gray-400">This usually takes 15–20 seconds on your first visit.</p>
      </div>
    </div>
  );
}
