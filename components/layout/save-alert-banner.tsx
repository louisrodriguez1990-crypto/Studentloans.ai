'use client';

import Link from 'next/link';
import { useState } from 'react';
import { X } from 'lucide-react';

export function SaveAlertBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem('save_banner_v1') === '1'; } catch { return false; }
  });

  if (dismissed) return null;

  return (
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-2">
      <div className="mx-auto max-w-5xl flex items-center justify-between gap-3">
        <p className="text-sm text-amber-800 min-w-0">
          ⚠️ <strong>SAVE Plan blocked by court injunction.</strong>{' '}
          <Link
            href="/learn/save-plan"
            className="underline underline-offset-2 hover:text-amber-900 transition-colors"
          >
            See what this means for you →
          </Link>
        </p>
        <button
          onClick={() => {
            try { localStorage.setItem('save_banner_v1', '1'); } catch {}
            setDismissed(true);
          }}
          className="text-amber-500 hover:text-amber-700 shrink-0 transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
