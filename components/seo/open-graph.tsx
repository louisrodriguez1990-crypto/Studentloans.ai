import { BASE_URL, SITE_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

interface OpenGraphOptions {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  ogType?: 'article' | 'tool' | 'servicer' | 'default';
}

export function buildMetadata({
  title,
  description,
  path = '',
  type = 'website',
  ogType = 'default',
}: OpenGraphOptions): Metadata {
  const url = `${BASE_URL}${path}`;
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(fullTitle)}&type=${ogType}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}
