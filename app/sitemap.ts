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

const STATE_SLUGS = [
  'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado',
  'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho',
  'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana',
  'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota', 'mississippi',
  'missouri', 'montana', 'nebraska', 'nevada', 'new-hampshire', 'new-jersey',
  'new-mexico', 'new-york', 'north-carolina', 'north-dakota', 'ohio',
  'oklahoma', 'oregon', 'pennsylvania', 'rhode-island', 'south-carolina',
  'south-dakota', 'tennessee', 'texas', 'utah', 'vermont', 'virginia',
  'washington', 'west-virginia', 'wisconsin', 'wyoming',
];

const PROFESSION_SLUGS = [
  'teacher', 'nurse', 'social-worker', 'firefighter', 'police-officer',
  'doctor', 'librarian', 'nonprofit-employee', 'federal-employee',
  'military', 'public-defender', 'government-attorney',
];

const LEARN_SLUGS = [
  'save-plan', 'ibr-guide', 'pslf-guide', 'consolidation-guide',
  'default-guide', 'refinancing-guide',
];

const LAST_MODIFIED = new Date('2026-04-05');

export default function sitemap(): MetadataRoute.Sitemap {
  const servicerPages: MetadataRoute.Sitemap = SERVICER_SLUGS.map((slug) => ({
    url: `${BASE_URL}/servicer/${slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const statePages: MetadataRoute.Sitemap = STATE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/state/${slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  const professionPages: MetadataRoute.Sitemap = PROFESSION_SLUGS.map((slug) => ({
    url: `${BASE_URL}/loans/${slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  const learnPages: MetadataRoute.Sitemap = LEARN_SLUGS.map((slug) => ({
    url: `${BASE_URL}/learn/${slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'weekly',
    priority: 0.75,
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
      url: `${BASE_URL}/advisors`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/compare/refinance-lenders`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/calculators/idr-payment`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/calculators/refinance-savings`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/calculators/forgiveness-timeline`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/tools/pslf-tracker`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/compare/refinance-options`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/compare/forgiveness-paths`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    ...learnPages,
    ...servicerPages,
    ...statePages,
    ...professionPages,
  ];
}
