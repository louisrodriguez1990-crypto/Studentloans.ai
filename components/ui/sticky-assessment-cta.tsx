'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';

const DISMISS_KEY = 'sticky_cta_dismissed';

export function StickyAssessmentCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === '1') return;
    } catch {}

    function onScroll() {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total > 0.4) setVisible(true);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function dismiss() {
    try { localStorage.setItem(DISMISS_KEY, '1'); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-emerald-700 bg-emerald-600 px-4 py-3 shadow-lg">
      <div className="mx-auto max-w-5xl flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-white">
          See how this affects your loans — free 3-minute assessment
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/assess"
            className="flex items-center gap-1.5 rounded-lg bg-white px-4 py-1.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            Get my assessment <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={dismiss}
            className="text-emerald-200 hover:text-white"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
