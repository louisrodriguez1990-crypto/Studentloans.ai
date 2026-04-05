import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  // MDX page extensions
  pageExtensions: ['ts', 'tsx', 'mdx'],

  // Images: allow external sources if needed in the future
  images: {
    remotePatterns: [],
  },

  // Experimental features
  experimental: {},
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: true,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
