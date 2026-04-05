import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Users, GraduationCap, Heart, Shield, AlertTriangle } from 'lucide-react';
import { buildMetadata } from '@/components/seo/open-graph';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';
import { BASE_URL } from '@/lib/constants';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: 'Student Loan Forgiveness Paths Compared 2026',
  description:
    'Compare every federal student loan forgiveness program side-by-side: PSLF, IDR forgiveness, Teacher Loan Forgiveness, Perkins cancellation, and more. Timelines, eligibility, and what you need to do.',
  path: '/compare/forgiveness-paths',
  type: 'article',
});

const PATHS = [
  {
    id: 'pslf',
    icon: Users,
    color: 'bg-emerald-100 text-emerald-600',
    border: 'border-emerald-200',
    name: 'Public Service Loan Forgiveness (PSLF)',
    timeline: '10 years (120 payments)',
    forgivenAmount: '100% of remaining balance — tax-free',
    eligibility: 'Full-time employment at a government agency or 501(c)(3) nonprofit',
    requirements: [
      'Direct Loans only (consolidate FFEL/Perkins first)',
      'Enrolled in an income-driven repayment plan (IBR or ICR)',
      '120 qualifying monthly payments — does not need to be consecutive',
      'Employer certified as qualifying government or nonprofit',
    ],
    warning: 'SAVE Plan borrowers: payments do not count toward PSLF during the court injunction. Switch to IBR immediately.',
    cta: { label: 'Track your PSLF payments', href: '/tools/pslf-tracker' },
    badge: 'Best for public sector workers',
  },
  {
    id: 'idr',
    icon: Clock,
    color: 'bg-blue-100 text-blue-600',
    border: 'border-blue-200',
    name: 'IDR Forgiveness (IBR / ICR)',
    timeline: '20–25 years of payments',
    forgivenAmount: '100% of remaining balance — may be taxable income',
    eligibility: 'Any employment — this is the forgiveness for private-sector borrowers',
    requirements: [
      'Enrolled in IBR (new: 20 years, old: 25 years) or ICR (25 years)',
      'Consistent annual income recertification',
      'Does not require qualifying employment type',
      'SAVE Plan borrowers: switch to IBR — SAVE is blocked and payments paused',
    ],
    warning:
      'IDR forgiveness is currently taxable as income in most states (federal tax exclusion expired 2025). Plan for the tax bill.',
    cta: { label: 'Calculate your forgiveness timeline', href: '/calculators/forgiveness-timeline' },
    badge: 'Best for private-sector borrowers',
  },
  {
    id: 'teacher',
    icon: GraduationCap,
    color: 'bg-violet-100 text-violet-600',
    border: 'border-violet-200',
    name: 'Teacher Loan Forgiveness',
    timeline: '5 years of teaching',
    forgivenAmount: 'Up to $17,500 (highly qualified math/science teachers) or $5,000 (other subjects)',
    eligibility: 'Full-time teacher at a Title I low-income school for 5 consecutive years',
    requirements: [
      'Direct Loans or FFEL Loans (not Perkins)',
      'Title I school designation required',
      'Must be highly qualified in your subject area',
      'Can be combined with PSLF — but the 5 years must also count toward PSLF',
    ],
    warning:
      'Loans must have been taken out before you started your 5-year teaching period. Perkins Cancellation is often better for teachers — see below.',
    cta: { label: 'Teacher student loan guide', href: '/loans/teacher' },
    badge: 'Best for eligible teachers',
  },
  {
    id: 'perkins',
    icon: Heart,
    color: 'bg-amber-100 text-amber-600',
    border: 'border-amber-200',
    name: 'Perkins Loan Cancellation',
    timeline: '5 years of qualifying service',
    forgivenAmount: 'Up to 100% of Perkins Loan balance (15% per year for years 1–2, 20% for years 3–4, 30% year 5)',
    eligibility: 'Teachers, nurses, firefighters, law enforcement, and other qualifying professions',
    requirements: [
      'Must have Perkins Loans specifically (not Direct or FFEL)',
      'Must work full-time in a qualifying profession',
      'Contact your loan servicer or school — Perkins Loans are held by schools, not federal servicers',
    ],
    warning:
      'The Perkins Loan program ended in 2017. Only borrowers with existing Perkins Loans from before September 30, 2017 are eligible.',
    cta: { label: 'See profession-specific guides', href: '/loans/teacher' },
    badge: 'For existing Perkins Loan holders',
  },
  {
    id: 'disability',
    icon: Shield,
    color: 'bg-red-100 text-red-600',
    border: 'border-red-200',
    name: 'Total & Permanent Disability (TPD) Discharge',
    timeline: 'Immediate upon approval',
    forgivenAmount: '100% of remaining balance — tax-free (federally)',
    eligibility:
      'Borrowers who are totally and permanently disabled based on SSA determination, VA rating, or physician certification',
    requirements: [
      'Social Security Administration disability determination, OR',
      'VA service-connected disability rating of 100%, OR',
      'Physician certification of total and permanent disability',
      'Apply at disabilitydischarge.com',
    ],
    warning:
      'The 3-year monitoring period was eliminated in 2023 — you no longer need to re-earn below $100k for 3 years after discharge.',
    cta: { label: 'Learn more at studentaid.gov', href: 'https://studentaid.gov/manage-loans/forgiveness-cancellation/disability-discharge' },
    badge: 'For disabled borrowers',
  },
];

export default function ForgivenessPathsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: BASE_URL },
          { name: 'Compare', url: `${BASE_URL}/compare` },
          { name: 'Forgiveness Paths', url: `${BASE_URL}/compare/forgiveness-paths` },
        ])}
      />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to home
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Student Loan Forgiveness Paths Compared (2026)
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          There are six major federal forgiveness programs — and the right one depends on your
          employer, loan type, and timeline. Here&apos;s how they compare side-by-side.
        </p>

        {/* Quick comparison table */}
        <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Program</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Timeline</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Amount forgiven</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Key requirement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PATHS.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{p.name.split('(')[0].trim()}</td>
                  <td className="px-4 py-3 text-gray-600">{p.timeline}</td>
                  <td className="px-4 py-3 text-gray-600">{p.forgivenAmount.split('—')[0].trim()}</td>
                  <td className="px-4 py-3 text-gray-600">{p.eligibility.split('—')[0].split(',')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed cards */}
        <div className="mt-10 space-y-8">
          {PATHS.map((path) => (
            <div key={path.id} className={`rounded-xl border ${path.border} bg-white p-6`}>
              <div className="flex items-start gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${path.color}`}>
                  <path.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-900">{path.name}</h2>
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                      {path.badge}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">Timeline</p>
                      <p className="mt-0.5 font-semibold text-gray-900">{path.timeline}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs uppercase tracking-wide text-gray-400">Amount forgiven</p>
                      <p className="mt-0.5 font-semibold text-gray-900">{path.forgivenAmount}</p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-gray-600">
                    <strong>Who qualifies:</strong> {path.eligibility}
                  </p>

                  <ul className="mt-3 space-y-1.5">
                    {path.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                        {r}
                      </li>
                    ))}
                  </ul>

                  {path.warning && (
                    <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
                      <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                      <p className="text-xs text-amber-800">{path.warning}</p>
                    </div>
                  )}

                  <div className="mt-4">
                    {path.cta.href.startsWith('http') ? (
                      <a
                        href={path.cta.href}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 underline"
                      >
                        {path.cta.label} <ArrowRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        href={path.cta.href}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 underline"
                      >
                        {path.cta.label} <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Assessment CTA */}
        <div className="mt-12 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 p-8 text-center text-white">
          <h2 className="text-xl font-bold">Not sure which path applies to you?</h2>
          <p className="mt-2 text-emerald-100 text-sm">
            Our free assessment analyzes your loan types, employment, and repayment history to tell
            you exactly which forgiveness programs you qualify for — and what to do next.
          </p>
          <Link
            href="/assess"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            Get my free assessment <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-2 text-xs text-emerald-200">Free · 3 minutes · No account required</p>
        </div>
      </div>
    </>
  );
}
