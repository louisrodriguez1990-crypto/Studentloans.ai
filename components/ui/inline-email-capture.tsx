'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';

interface InlineEmailCaptureProps {
  segment: string;
  prompt?: string;
  buttonLabel?: string;
}

export function InlineEmailCapture({
  segment,
  prompt = 'Get notified when policy changes affect this calculation:',
  buttonLabel = 'Notify me',
}: InlineEmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
        body: JSON.stringify({ email, segment }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
        <p className="text-sm font-medium text-emerald-800">
          You&apos;re subscribed — we&apos;ll let you know when anything changes.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-lg border border-teal-200 bg-teal-50 p-4">
      <div className="flex items-start gap-2">
        <Bell className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800 mb-2">{prompt}</p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-teal-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-60 shrink-0 transition-colors"
            >
              {loading ? '…' : buttonLabel}
            </button>
          </form>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
