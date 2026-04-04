'use client';

import { Analytics } from '@vercel/analytics/react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';

function PostHogInit({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com';
    if (key && !posthog.__loaded) {
      posthog.init(key, {
        api_host: host,
        // Route events through our server proxy to avoid ad blockers
        ui_host: host,
        capture_pageview: false, // We capture manually
        capture_pageleave: true,
        // Never capture PII
        sanitize_properties: (props) => {
          delete props.$email;
          delete props.$name;
          return props;
        },
      });
    }
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogInit>
      {children}
      <Analytics />
    </PostHogInit>
  );
}
