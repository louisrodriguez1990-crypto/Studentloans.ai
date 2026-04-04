import { BASE_URL, SITE_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

interface OpenGraphOptions {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
}

export function buildMetadata({
  title,
  description,
  path = '',
  type = 'website',
}: OpenGraphOptions): Metadata {
  const url = `${BASE_URL}${path}`;
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}
