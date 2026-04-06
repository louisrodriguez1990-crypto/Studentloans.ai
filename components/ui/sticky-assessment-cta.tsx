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
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#1a1f36] px-4 py-3 shadow-2xl">
      <div className="mx-auto max-w-5xl flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate">
            See how 2026 changes affect your loans — free 3-min assessment
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            ⭐⭐⭐⭐⭐ Trusted by 50,000+ borrowers
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/assess"
            className="flex items-center gap-1.5 rounded-full bg-[#00C9A7] px-5 py-1.5 text-sm font-semibold text-white hover:bg-[#00b396] transition-colors"
          >
            Get my assessment <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={dismiss}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
