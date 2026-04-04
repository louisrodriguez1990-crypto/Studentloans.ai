import { NextRequest, NextResponse } from 'next/server';
import { TrackRequestSchema } from '@/lib/validations';
import { trackEvent } from '@/lib/posthog';

export const runtime = 'nodejs';

// Proxy for client-side event tracking.
// Using a server-side proxy prevents ad blockers from blocking PostHog.
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = TrackRequestSchema.safeParse(body);
  if (!parsed.success) {
    // Silently ignore invalid tracking calls — never block the user for analytics failures
    return NextResponse.json({ ok: true });
  }

  const { event, sessionId, properties } = parsed.data;
  const distinctId = sessionId ?? 'anonymous';

  // Never log PII — sessionId is not PII (it's a random ID, not tied to identity)
  await trackEvent(distinctId, event, properties).catch(() => {});

  return NextResponse.json({ ok: true });
}
