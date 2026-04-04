'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface RegenerateButtonProps {
  sessionId: string;
  onRegenerated: (markdown: string) => void;
}

export function RegenerateButton({ sessionId, onRegenerated }: RegenerateButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegenerate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, bust: true }),
      });
      if (!res.ok) throw new Error('Failed to regenerate report');
      const data = await res.json();
      onRegenerated(data.markdown);
    } catch {
      setError('Could not regenerate. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="sm" onClick={handleRegenerate} disabled={loading}>
        <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
        {loading ? 'Regenerating...' : 'Rephrase this report'}
      </Button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
