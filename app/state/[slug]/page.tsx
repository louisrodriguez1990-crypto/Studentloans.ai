import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Users, DollarSign, BookOpen } from 'lucide-react';
import { buildMetadata } from '@/components/seo/open-graph';
import { JsonLd, articleSchema, breadcrumbSchema } from '@/components/seo/json-ld';
import { BASE_URL } from '@/lib/constants';
import { STATES, getStateBySlug, formatBorrowerCount } from '@/lib/state-data';

export const revalidate = 86400; // ISR: daily
export const dynamicParams = false;

export async function generateStaticParams() {
  return STATES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return {};
  return buildMetadata({
    title: `${state.name} Student Loan Help — Forgiveness, IDR & 2026 Changes`,
    description: `${formatBorrowerCount(state.borrowerCount)} federal student loan borrowers in ${state.name}. Learn about forgiveness options, income-driven repayment, and how the 2026 policy changes affect you.`,
    path: `/state/${slug}`,
    type: 'article',
  });
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  const avgDebtFormatted = state.avgDebt.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <>
      <JsonLd
        data={articleSchema({
          url: `${BASE_URL}/state/${slug}`,
          title: `${state.name} Student Loan Help`,
          description: `Federal student loan repayment options for ${state.name} borrowers in 2026.`,
          datePublished: '2026-04-01',
          dateModified: '2026-04-05',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: BASE_URL },
          { name: 'By State', url: `${BASE_URL}/state` },
          { name: state.name, url: `${BASE_URL}/state/${slug}` },
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
            {state.name} Student Loan Help — 2026 Guide
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            What {state.name} borrowers need to know about income-driven repayment, PSLF, and
            the 2026 federal policy changes.
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
            <Users className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-900">{formatBorrowerCount(state.borrowerCount)}</p>
            <p className="text-xs text-gray-500">federal borrowers</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
            <DollarSign className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-900">{avgDebtFormatted}</p>
            <p className="text-xs text-gray-500">avg debt per borrower</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
            <BookOpen className="h-5 w-5 text-violet-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-900">${state.totalDebt}B</p>
            <p className="text-xs text-gray-500">total federal debt</p>
          </div>
        </div>

        <article className="prose prose-gray max-w-none prose-headings:font-semibold prose-a:text-blue-600">
          <h2>The 2026 Policy Changes That Affect {state.name} Borrowers</h2>
          <p>
            Federal student loan policy changed significantly in 2026 — and these changes affect
            every borrower in {state.name} regardless of which state you live in. Here&apos;s what
            you need to know:
          </p>

          <h3>The SAVE Plan Is Currently Blocked</h3>
          <p>
            The SAVE Plan — which would have provided the lowest payments for most income-driven
            repayment borrowers — is under a federal court injunction. If you are enrolled in SAVE,
            your payments are paused (administrative forbearance), but{' '}
            <strong>those paused months do not count toward IDR forgiveness or PSLF</strong>.
          </p>
          <p>
            If you&apos;re in {state.name} and enrolled in SAVE, the best path for most borrowers
            is to switch to IBR (Income-Based Repayment), which is fully operational and qualifies
            for both IDR forgiveness (after 20–25 years) and PSLF (after 120 payments for public
            service workers).
          </p>

          <h3>Federal Options Available to {state.name} Borrowers</h3>
          <ul>
            <li>
              <strong>IBR (Income-Based Repayment):</strong> 10% of discretionary income if your
              first loan was after July 1, 2014; 15% if before. Forgiveness after 20 or 25 years.
              Open to all eligible federal borrowers regardless of state.
            </li>
            <li>
              <strong>ICR (Income-Contingent Repayment):</strong> 20% of discretionary income or
              fixed 12-year payment, whichever is lower. Available for Parent PLUS loans after
              consolidation.
            </li>
            <li>
              <strong>PSLF (Public Service Loan Forgiveness):</strong> If you work for a government
              or nonprofit employer in {state.name} (or anywhere), you may qualify for forgiveness
              after 120 qualifying payments. All three branches of {state.name} state government
              are qualifying employers.
            </li>
          </ul>

          {state.stateProgramName && (
            <>
              <h2>{state.name}-Specific Programs</h2>
              <p>
                In addition to federal programs, {state.name} has its own loan assistance program:
              </p>
              <div className="not-prose rounded-lg border border-emerald-200 bg-emerald-50 p-4 my-4">
                <p className="font-semibold text-gray-900">{state.stateProgramName}</p>
                <p className="mt-1 text-sm text-gray-700">{state.stateProgramNote}</p>
                {state.stateProgramUrl && (
                  <a
                    href={state.stateProgramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm text-emerald-700 hover:text-emerald-800"
                  >
                    Learn more about this program →
                  </a>
                )}
              </div>
            </>
          )}

          <h2>Who Qualifies for PSLF in {state.name}?</h2>
          <p>
            PSLF is available to borrowers with Direct federal loans who work full-time for a
            qualifying employer. Qualifying employers in {state.name} include:
          </p>
          <ul>
            <li>All {state.name} state government agencies and offices</li>
            <li>All {state.name} county and city government employers</li>
            <li>Public schools and school districts in {state.name}</li>
            <li>Public colleges and universities in {state.name}</li>
            <li>501(c)(3) nonprofit organizations registered in {state.name}</li>
            <li>Public hospitals and health systems</li>
          </ul>
          <p>
            Federal employees in {state.name} also qualify — this includes U.S. military members,
            federal agency employees, and USPS workers.
          </p>

          <h2>Finding Your Loan Servicer in {state.name}</h2>
          <p>
            Your loan servicer is the company that sends you bills and manages your repayment. Most
            {state.name} borrowers are serviced by one of these four servicers:
          </p>
          <ul>
            <li>
              <Link href="/servicer/aidvantage">Aidvantage</Link> — formerly Navient federal
              portfolio
            </li>
            <li>
              <Link href="/servicer/mohela">MOHELA</Link> — official PSLF servicer for all borrowers
            </li>
            <li>
              <Link href="/servicer/nelnet">Nelnet</Link>
            </li>
            <li>
              <Link href="/servicer/edfinancial">EdFinancial</Link>
            </li>
          </ul>
          <p>
            Not sure who services your loans? Log in to{' '}
            <a
              href="https://studentaid.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              studentaid.gov
            </a>{' '}
            with your FSA ID to see all your federal loan details in one place.
          </p>

          <h2>Should {state.name} Borrowers Refinance?</h2>
          <p>
            Refinancing federal loans into a private loan is irreversible — you permanently lose
            access to IDR plans, PSLF, federal forbearance, and any future forgiveness programs.
            For most {state.name} borrowers with federal loans, refinancing is not recommended
            unless you:
          </p>
          <ul>
            <li>Work in the private sector (not government or nonprofit)</li>
            <li>Have stable, high income</li>
            <li>Do not need PSLF or IDR forgiveness</li>
            <li>Have loans above approximately 5% interest</li>
          </ul>
          <p>
            If you have private loans, refinancing those is a separate decision and does not
            affect your federal loan protections.
          </p>
        </article>

        {/* Assessment CTA */}
        <div className="mt-10 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="font-semibold text-gray-900">
            See exactly what applies to your {state.name} loans
          </h2>
          <p className="mt-1 text-sm text-gray-700">
            Our free assessment applies 2026 federal policy rules to your specific loan types,
            income, and employment — and tells you exactly what to do next.
          </p>
          <Link
            href="/assess"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700 text-sm"
          >
            Get my free assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Tool cross-links */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            href="/calculators/idr-payment"
            className="rounded-lg border border-gray-200 bg-white p-4 hover:border-gray-300 hover:shadow-sm"
          >
            <p className="font-medium text-gray-900 text-sm">IDR Payment Calculator</p>
            <p className="mt-0.5 text-xs text-gray-500">Estimate your IBR payment based on your income</p>
          </Link>
          <Link
            href="/tools/pslf-tracker"
            className="rounded-lg border border-gray-200 bg-white p-4 hover:border-gray-300 hover:shadow-sm"
          >
            <p className="font-medium text-gray-900 text-sm">PSLF Payment Tracker</p>
            <p className="mt-0.5 text-xs text-gray-500">Track your progress toward 120 qualifying payments</p>
          </Link>
        </div>
      </div>
    </>
  );
}
