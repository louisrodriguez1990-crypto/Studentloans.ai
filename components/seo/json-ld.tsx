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
    logo: `${url}/logo.svg`,
  };
}

export function howToSchema({
  name,
  description,
  totalTime,
  steps,
}: {
  name: string;
  description: string;
  totalTime: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function financialServiceSchema(url: string, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    url,
    name,
    description:
      'Free student loan assessment tool that applies 2026 federal policy rules to generate personalized repayment recommendations.',
    areaServed: { '@type': 'Country', name: 'US' },
    serviceType: 'Student Loan Assessment',
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

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
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
