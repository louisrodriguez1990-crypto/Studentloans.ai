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
import { ArrowLeft } from 'lucide-react';

export const revalidate = 3600;
export const dynamicParams = false;

const CONTENT_DIR = path.join(process.cwd(), 'content', 'compare');

interface Frontmatter {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
}

async function getComparePage(slug: string) {
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
  const page = await getComparePage(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.frontmatter.title,
    description: page.frontmatter.description,
    path: `/compare/${slug}`,
    type: 'article',
  });
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getComparePage(slug);
  if (!page) notFound();

  const { frontmatter, content } = page;

  return (
    <>
      <JsonLd
        data={articleSchema({
          url: `${BASE_URL}/compare/${slug}`,
          title: frontmatter.title,
          description: frontmatter.description,
          datePublished: frontmatter.datePublished,
          dateModified: frontmatter.dateModified,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: BASE_URL },
          { name: 'Compare', url: `${BASE_URL}/compare` },
          { name: frontmatter.title, url: `${BASE_URL}/compare/${slug}` },
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

        <div className="mt-12 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="font-semibold text-gray-900">See how this applies to your loans</h2>
          <p className="mt-1 text-sm text-gray-700">
            Get a personalized assessment based on your specific loan types, employment, and
            situation.
          </p>
          <Link
            href="/assess"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Get my free assessment
          </Link>
        </div>
      </div>
    </>
  );
}
