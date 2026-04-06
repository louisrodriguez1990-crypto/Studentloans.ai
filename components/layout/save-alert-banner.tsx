'use client';

import { useState } from 'react';
import { Bell, X } from 'lucide-react';

export function SaveAlertBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem('save_banner_v1') === '1'; } catch { return false; }
  });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (dismissed) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, segment: 'deadline_sensitive' }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Try again.');
      }
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-3">
      <div className="mx-auto max-w-5xl flex items-start gap-3 sm:items-center">
        <Bell className="h-4 w-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1 min-w-0">
          {submitted ? (
            <p className="text-sm text-amber-800 font-medium">
              You&apos;re signed up. We&apos;ll email you when the SAVE injunction resolves.
            </p>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="text-sm text-amber-800 shrink-0">
                <strong>SAVE Plan blocked.</strong> Get notified when the court injunction resolves:
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2 min-w-0">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-1 sm:w-48 rounded-full border border-amber-300 bg-white px-3 py-1.5 text-sm focus:border-amber-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-amber-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-60 shrink-0"
                >
                  {loading ? 'Saving…' : 'Notify me'}
                </button>
              </form>
              {error && <p className="text-xs text-red-600">{error}</p>}
            </div>
          )}
        </div>
        <button
          onClick={() => {
          try { localStorage.setItem('save_banner_v1', '1'); } catch {}
          setDismissed(true);
        }}
          className="text-amber-500 hover:text-amber-700 shrink-0"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
