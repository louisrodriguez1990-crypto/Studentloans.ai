import { readFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/open-graph';
import { JsonLd, faqPageSchema, type FAQItem } from '@/components/seo/json-ld';
import { BASE_URL } from '@/lib/constants';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Frequently Asked Questions',
    description:
      'Answers to common questions about the SAVE Plan injunction, PSLF, IDR forgiveness, and the 2026 student loan policy changes.',
    path: '/faq',
  }),
  other: {
    'article:modified_time': '2026-04-01',
    'article:published_time': '2026-04-01',
  },
};

interface FAQFrontmatter {
  title: string;
  description: string;
  faqs: FAQItem[];
}

async function getFAQData(): Promise<FAQFrontmatter> {
  const filePath = path.join(process.cwd(), 'content', 'faq.mdx');
  const raw = await readFile(filePath, 'utf-8');
  const { data } = matter(raw);
  return data as FAQFrontmatter;
}

export default async function FAQPage() {
  const { faqs } = await getFAQData();

  return (
    <>
      <JsonLd data={faqPageSchema(faqs)} />

      <div className="mx-auto max-w-3xl px-4 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="mt-3 text-gray-600">
            Common questions about student loan repayment, the 2026 policy changes, and how our
            assessment works.
          </p>
        </header>

        <div className="space-y-8">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-200 pb-8 last:border-0">
              <h2 className="text-lg font-semibold text-gray-900">{faq.question}</h2>
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="font-semibold text-gray-900">Still have questions about your situation?</h2>
          <p className="mt-1 text-sm text-gray-700">
            Our free assessment applies these rules to your specific loan situation.
          </p>
          <Link
            href="/assess"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Get my free assessment
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
