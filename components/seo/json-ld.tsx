interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── Schema helpers ───────────────────────────────────────────────────────────

export function websiteSchema(url: string, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name,
  };
}

export function organizationSchema(url: string, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url,
    name,
    description:
      'StudentDebt.ai helps federal student loan borrowers understand how 2026 policy changes affect their repayment options.',
  };
}

export function articleSchema({
  url,
  title,
  description,
  datePublished,
  dateModified,
}: {
  url: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    url,
    headline: title,
    description,
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: 'StudentDebt.ai',
      url: 'https://studentdebt.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'StudentDebt.ai',
      url: 'https://studentdebt.ai',
    },
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function faqPageSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
