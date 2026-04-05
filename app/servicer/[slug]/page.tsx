import { notFound } from 'next/navigation';
import { readdir, readFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/open-graph';
import { JsonLd, articleSchema, breadcrumbSchema } from '@/components/seo/json-ld';
import { BASE_URL } from '@/lib/constants';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { StickyAssessmentCTA } from '@/components/ui/sticky-assessment-cta';

export const revalidate = 3600;
export const dynamicParams = false;

const CONTENT_DIR = path.join(process.cwd(), 'content', 'servicers');

interface Frontmatter {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  servicerName: string;
}

async function getServicerPage(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  let raw: string;
  try {
    raw = await readFile(filePath, 'utf-8');
  } catch {
    return null;
  }
  const { data, content } = matter(raw);
  return { frontmatter: data as Frontmatter, content };
}

export async function generateStaticParams() {
  try {
    const files = await readdir(CONTENT_DIR);
    return files
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => ({ slug: f.replace(/\.mdx$/, '') }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getServicerPage(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.frontmatter.title,
    description: page.frontmatter.description,
    path: `/servicer/${slug}`,
    type: 'article',
  });
}

export default async function ServicerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getServicerPage(slug);
  if (!page) notFound();

  const { frontmatter, content } = page;

  return (
    <>
      <JsonLd
        data={articleSchema({
          url: `${BASE_URL}/servicer/${slug}`,
          title: frontmatter.title,
          description: frontmatter.description,
          datePublished: frontmatter.datePublished,
          dateModified: frontmatter.dateModified,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: BASE_URL },
          { name: 'Loan Servicers', url: `${BASE_URL}/servicer` },
          { name: frontmatter.servicerName, url: `${BASE_URL}/servicer/${slug}` },
        ])}
      />

      <div className="mx-auto max-w-3xl px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <header className="mb-8">
          <p className="text-sm text-gray-500 mb-2">
            Last updated{' '}
            {new Date(frontmatter.dateModified).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          <h1 className="text-3xl font-bold text-gray-900">{frontmatter.title}</h1>
          <p className="mt-3 text-lg text-gray-600">{frontmatter.description}</p>
        </header>

        <article className="prose prose-gray max-w-none prose-headings:font-semibold prose-a:text-blue-600 prose-strong:text-gray-900">
          <MDXRemote source={content} />
        </article>

        {/* Assessment CTA */}
        <div className="mt-12 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="font-semibold text-gray-900">
            See how {frontmatter.servicerName} affects your repayment options
          </h2>
          <p className="mt-1 text-sm text-gray-700">
            Get a personalized assessment based on your specific loans, income, and employment.
            We&apos;ll tell you exactly which plans you qualify for and what to do next.
          </p>
          <Link
            href="/assess"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700"
          >
            Get my free assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cross-links to other servicers */}
        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Looking for a different servicer?</p>
          <div className="flex flex-wrap gap-2 text-sm">
            {[
              { slug: 'aidvantage', name: 'Aidvantage' },
              { slug: 'mohela', name: 'MOHELA' },
              { slug: 'nelnet', name: 'Nelnet' },
              { slug: 'edfinancial', name: 'EdFinancial' },
              { slug: 'pheaa', name: 'PHEAA / FedLoan' },
              { slug: 'osla', name: 'OSLA' },
              { slug: 'great-lakes', name: 'Great Lakes' },
              { slug: 'ecsi', name: 'ECSI' },
              { slug: 'granite-state', name: 'Granite State' },
            ]
              .filter((s) => s.slug !== slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/servicer/${s.slug}`}
                  className="rounded-md bg-white border border-gray-200 px-3 py-1 text-gray-600 hover:text-gray-900 hover:border-gray-300"
                >
                  {s.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
      <StickyAssessmentCTA />
    </>
  );
}
