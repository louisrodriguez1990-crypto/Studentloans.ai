import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { buildMetadata } from '@/components/seo/open-graph';
import { JsonLd, articleSchema, breadcrumbSchema } from '@/components/seo/json-ld';
import { BASE_URL } from '@/lib/constants';
import { PROFESSIONS, getProfessionBySlug, formatSalary } from '@/lib/profession-data';
import { StickyAssessmentCTA } from '@/components/ui/sticky-assessment-cta';

export const revalidate = 86400;
export const dynamicParams = false;

export async function generateStaticParams() {
  return PROFESSIONS.map((p) => ({ profession: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ profession: string }>;
}): Promise<Metadata> {
  const { profession: slug } = await params;
  const prof = getProfessionBySlug(slug);
  if (!prof) return {};
  return buildMetadata({
    title: `Student Loan Forgiveness for ${prof.pluralName} — 2026 Guide`,
    description: `${prof.pluralName} often qualify for PSLF and other forgiveness programs. Learn how 2026 federal policy changes affect your ${prof.displayName.toLowerCase()} student loans — free, personalized assessment available.`,
    path: `/loans/${slug}`,
    type: 'article',
  });
}

export default async function ProfessionPage({
  params,
}: {
  params: Promise<{ profession: string }>;
}) {
  const { profession: slug } = await params;
  const prof = getProfessionBySlug(slug);
  if (!prof) notFound();

  return (
    <>
      <JsonLd
        data={articleSchema({
          url: `${BASE_URL}/loans/${slug}`,
          title: `Student Loan Forgiveness for ${prof.pluralName}`,
          description: prof.description,
          datePublished: '2026-04-01',
          dateModified: '2026-04-05',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: BASE_URL },
          { name: 'Loans by Profession', url: `${BASE_URL}/loans` },
          { name: prof.pluralName, url: `${BASE_URL}/loans/${slug}` },
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
          <p className="text-sm text-gray-500 mb-2">Updated April 2026</p>
          <h1 className="text-3xl font-bold text-gray-900">
            Student Loan Forgiveness for {prof.pluralName} — 2026 Guide
          </h1>
          <p className="mt-3 text-lg text-gray-600">{prof.description}</p>
        </header>

        {/* Quick facts */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 mb-10">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">PSLF Eligible</p>
            <p className="font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle className="h-4 w-4" /> Yes
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Median Salary</p>
            <p className="font-bold text-gray-900">{formatSalary(prof.medianSalary)}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Typical Debt</p>
            <p className="font-bold text-gray-900">{prof.commonLoanAmount}</p>
          </div>
        </div>

        <article className="prose prose-gray max-w-none prose-headings:font-semibold prose-a:text-blue-600">
          <h2>PSLF for {prof.pluralName}</h2>
          <p>{prof.pslfNote}</p>

          <h3>Qualifying {prof.displayName} Employers</h3>
          <ul>
            {prof.commonEmployers.map((employer) => (
              <li key={employer}>{employer}</li>
            ))}
          </ul>

          <h3>PSLF Requirements Checklist for {prof.pluralName}</h3>
          <ul>
            <li>
              <strong>Direct Loans:</strong> Only Direct federal loans qualify. FFEL and Perkins loans
              must be consolidated into a Direct Consolidation Loan first (note: consolidation resets
              your qualifying payment count).
            </li>
            <li>
              <strong>Full-time employment:</strong> You must work at least 30 hours/week for a
              qualifying employer. Two qualifying part-time jobs may add up to full-time.
            </li>
            <li>
              <strong>Qualifying repayment plan:</strong> IBR, PAYE (closed to new enrollees), or
              ICR. <strong>SAVE is currently blocked</strong> — payments during the SAVE
              forbearance do not count toward PSLF.
            </li>
            <li>
              <strong>120 qualifying payments:</strong> 10 years of on-time payments while meeting
              the above requirements. Payments don&apos;t have to be consecutive.
            </li>
          </ul>

          {prof.perkinsCancellation && prof.perkinsCancellationNote && (
            <>
              <h2>Perkins Loan Cancellation for {prof.pluralName}</h2>
              <p>{prof.perkinsCancellationNote}</p>
              <p>
                Perkins cancellation is <strong>separate from PSLF</strong> and can be more
                generous for those who have Perkins Loans. Contact your Perkins Loan servicer (often{' '}
                <Link href="/servicer/ecsi">ECSI</Link> or your school directly) to begin the
                cancellation process.
              </p>
            </>
          )}

          <h2>What the 2026 Policy Changes Mean for {prof.pluralName}</h2>

          <div className="not-prose rounded-lg border border-amber-200 bg-amber-50 p-4 my-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                <strong>SAVE Plan blocked (April 2026):</strong> If you are enrolled in SAVE, your
                payments are paused but <strong>do not count toward PSLF</strong>. Switch to IBR
                immediately to resume accumulating qualifying payments.
              </p>
            </div>
          </div>

          <p>
            For {prof.pluralName} pursuing PSLF, the SAVE Plan injunction means:
          </p>
          <ul>
            <li>
              <strong>If you were on SAVE:</strong> Switch to IBR now. Every month you stay in SAVE
              forbearance is a month that doesn&apos;t count toward your 120 payments.
            </li>
            <li>
              <strong>If you were already on IBR:</strong> You&apos;re unaffected — continue making
              payments and submit your annual Employer Certification Form.
            </li>
            <li>
              <strong>New {prof.pluralName} starting their loans:</strong> Enroll in IBR directly —
              don&apos;t enroll in SAVE while the injunction is active.
            </li>
          </ul>

          <h2>How Much Could a {prof.displayName} Save With PSLF?</h2>
          <p>
            The amount forgiven depends on your balance, income, and how long you&apos;ve been
            repaying. A {prof.displayName.toLowerCase()} with {prof.commonLoanAmount} in debt and
            a salary near the median of {formatSalary(prof.medianSalary)} would typically have a
            monthly IBR payment of roughly $
            {Math.round(
              Math.max(0, (prof.medianSalary - 22590) * 0.1) / 12,
            ).toLocaleString()}{' '}
            — often far less than the standard 10-year payment. The remaining balance after 10 years
            is forgiven tax-free.
          </p>
          <p>
            Use our{' '}
            <Link href="/calculators/idr-payment">IDR payment calculator</Link> to estimate your
            specific payment based on your income and family size.
          </p>

          <h2>Should {prof.pluralName} Refinance Their Loans?</h2>
          <p>
            For most {prof.pluralName} working at qualifying employers:{' '}
            <strong>no, do not refinance federal loans.</strong> Refinancing is irreversible and
            eliminates PSLF eligibility permanently. If you&apos;re on track for PSLF, the
            forgiveness you&apos;d give up is almost certainly worth more than the interest savings
            from refinancing.
          </p>
          <p>
            The exception: {prof.pluralName} who have moved to private-sector employment and will
            never qualify for PSLF may find refinancing worthwhile. Use our{' '}
            <Link href="/calculators/refinance-savings">refinance savings calculator</Link> to
            run the numbers.
          </p>
        </article>

        {/* Assessment CTA */}
        <div className="mt-10 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="font-semibold text-gray-900">
            Get a personalized PSLF assessment for your situation
          </h2>
          <p className="mt-1 text-sm text-gray-700">
            Our free tool checks your employer type, loan types, income, and repayment plan — and
            tells you exactly what to do to maximize your forgiveness.
          </p>
          <Link
            href="/assess"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700 text-sm"
          >
            Get my free assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cross-links to other professions */}
        <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Other professions:</p>
          <div className="flex flex-wrap gap-2 text-sm">
            {PROFESSIONS.filter((p) => p.slug !== slug).map((p) => (
              <Link
                key={p.slug}
                href={`/loans/${p.slug}`}
                className="rounded-md bg-white border border-gray-200 px-3 py-1 text-gray-600 hover:text-gray-900 hover:border-gray-300"
              >
                {p.pluralName}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <StickyAssessmentCTA />
    </>
  );
}
