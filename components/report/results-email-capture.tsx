'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, CheckCircle, X, Loader2 } from 'lucide-react';
import type { RoutingTag } from '@/engine/types';

interface ResultsEmailCaptureProps {
  sessionId: string;
  routingTags: RoutingTag[];
}

// Map routing tag to subscribe segment
function getSegment(tags: RoutingTag[]): string {
  if (tags.includes('refinance_candidate')) return 'refinance_candidate';
  if (tags.includes('forgiveness_candidate')) return 'forgiveness_candidate';
  if (tags.includes('deadline_sensitive')) return 'deadline_sensitive';
  return 'needs_specialist';
}

const DISMISS_KEY = 'results_email_dismissed';

export function ResultsEmailCapture({ sessionId, routingTags }: ResultsEmailCaptureProps) {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const barRef = useRef<HTMLDivElement>(null);

  // Show bar after user scrolls 60% down the page
  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === '1') return;
    } catch {}

    function onScroll() {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total > 0.6) setVisible(true);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function dismiss() {
    try { localStorage.setItem(DISMISS_KEY, '1'); } catch {}
    setVisible(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, sessionId, segment: getSegment(routingTags) }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error ?? 'Failed to subscribe');
      }
      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  if (!visible) return null;

  return (
    <div
      ref={barRef}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#00C9A7]/20 bg-[#e6faf6] px-4 py-3 shadow-lg"
    >
      <div className="mx-auto max-w-3xl flex items-center gap-3">
        <Bell className="h-4 w-4 text-[#00C9A7] shrink-0" />

        {status === 'success' ? (
          <div className="flex flex-1 items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
            <p className="text-sm text-gray-800 font-medium">
              Saved. We&apos;ll notify you when policy changes affect your situation.
            </p>
          </div>
        ) : (
          <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-2">
            <p className="text-sm text-gray-800 font-medium shrink-0">
              Save your results — get notified when policy changes:
            </p>
            <form onSubmit={handleSubmit} className="flex flex-1 gap-2 min-w-0">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-[#00C9A7] focus:outline-none focus:ring-1 focus:ring-[#00C9A7]/30"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="shrink-0 rounded-md bg-[#00C9A7] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#00b396] disabled:opacity-60 flex items-center gap-1.5"
              >
                {status === 'loading' ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
                ) : (
                  'Save results'
                )}
              </button>
            </form>
            {status === 'error' && <p className="text-xs text-red-600 shrink-0">{errorMsg}</p>}
          </div>
        )}

        <button
          onClick={dismiss}
          className="shrink-0 text-gray-400 hover:text-gray-600"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="text-center text-xs text-gray-400 mt-1">No spam. Unsubscribe any time.</p>
    </div>
  );
}
