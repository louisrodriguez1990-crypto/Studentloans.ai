import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all major search and AI crawlers explicitly
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Slurp',
          'DuckDuckBot',
          'Baiduspider',
          // AI crawlers — explicitly allow for GEO optimization
          'GPTBot',
          'ChatGPT-User',
          'CCBot',
          'anthropic-ai',
          'Claude-Web',
          'ClaudeBot',
          'PerplexityBot',
          'Applebot',
          'facebookexternalhit',
          'Twitterbot',
          'LinkedInBot',
        ],
        allow: '/',
      },
      {
        // Block high-frequency commercial scrapers (not useful for our SEO)
        userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot'],
        disallow: '/',
      },
      {
        // Block admin page from all crawlers
        userAgent: '*',
        disallow: ['/admin', '/api/'],
        allow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
