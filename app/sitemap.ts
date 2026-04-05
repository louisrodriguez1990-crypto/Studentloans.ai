import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/constants';

const SERVICER_SLUGS = [
  'aidvantage',
  'mohela',
  'nelnet',
  'edfinancial',
  'pheaa',
  'osla',
  'great-lakes',
  'ecsi',
  'granite-state',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const servicerPages: MetadataRoute.Sitemap = SERVICER_SLUGS.map((slug) => ({
    url: `${BASE_URL}/servicer/${slug}`,
    lastModified: new Date('2026-04-05'),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/assess`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/learn/save-plan`,
      lastModified: new Date('2026-04-05'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date('2026-04-05'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/compare/refinance-lenders`,
      lastModified: new Date('2026-04-05'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/calculators/idr-payment`,
      lastModified: new Date('2026-04-05'),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/calculators/refinance-savings`,
      lastModified: new Date('2026-04-05'),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/tools/pslf-tracker`,
      lastModified: new Date('2026-04-05'),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/compare/refinance-options`,
      lastModified: new Date('2026-04-05'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/compare/forgiveness-paths`,
      lastModified: new Date('2026-04-05'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date('2026-04-05'),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date('2026-04-05'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date('2026-04-05'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    ...servicerPages,
  ];
}
