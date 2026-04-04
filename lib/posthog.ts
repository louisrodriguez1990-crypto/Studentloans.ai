import { PostHog } from 'posthog-node';

// Server-side PostHog client for anonymous event tracking from API routes.
// For browser-side tracking, use the posthog-js client via analytics-provider.tsx.
let posthogClient: PostHog | null = null;

export function getPostHog(): PostHog {
  if (!posthogClient) {
    posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return posthogClient;
}

export async function trackEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>,
): Promise<void> {
  const ph = getPostHog();
  ph.capture({ distinctId, event, properties });
  await ph.flush();
}
