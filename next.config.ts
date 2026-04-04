import type { NextConfig } from 'next';

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

export default nextConfig;
