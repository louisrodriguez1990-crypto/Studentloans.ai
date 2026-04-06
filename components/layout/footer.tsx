import Link from 'next/link';
import { Lock, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { SITE_NAME, POLICY_AS_OF_DATE, AFFILIATE_DISCLOSURE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="mt-16">
      {/* ── Pre-footer CTA Band ──────────────────────────── */}
      <div className="bg-[#e6faf6] border-y border-[#00C9A7]/20 px-4 py-10">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-lg font-semibold text-[#1a1f36]">Not sure what to do next?</p>
            <p className="mt-1 text-sm text-[#4a5568]">
              Get a free, personalized assessment in 3 minutes — no account required.
            </p>
          </div>
          <Link
            href="/assess"
            className="inline-flex items-center gap-2 rounded-xl bg-[#00C9A7] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#00b396] transition-colors shrink-0"
          >
            Get my assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ── Main Footer ──────────────────────────────────── */}
      <div className="bg-[#1a1f36] text-gray-300">
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-8">
          {/* Brand row */}
          <div className="mb-10 border-b border-white/10 pb-8">
            <p className="text-xl font-extrabold text-white">{SITE_NAME}</p>
            <p className="mt-1.5 text-sm text-gray-400 max-w-md">
              Personalized federal student loan guidance, powered by current policy and a
              deterministic rules engine. Free, no account needed.
            </p>
          </div>

          {/* 4-column grid */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {/* Product */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Product
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/assess" className="hover:text-white transition-colors">
                    Get Free Assessment
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/idr-payment" className="hover:text-white transition-colors">
                    IDR Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/refinance-savings" className="hover:text-white transition-colors">
                    Refinance Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/pslf-tracker" className="hover:text-white transition-colors">
                    PSLF Tracker
                  </Link>
                </li>
                <li>
                  <Link href="/compare/refinance-lenders" className="hover:text-white transition-colors">
                    Compare Lenders
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Resources
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/learn/save-plan" className="hover:text-white transition-colors">
                    SAVE Plan Guide
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/learn/save-plan" className="hover:text-white transition-colors">
                    2026 Policy Changes
                  </Link>
                </li>
                <li>
                  <Link href="/state/california" className="hover:text-white transition-colors">
                    State Guides
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Company
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About &amp; Methodology
                  </Link>
                </li>
                <li>
                  <Link href="/about#affiliates" className="hover:text-white transition-colors">
                    How We Make Money
                  </Link>
                </li>
                <li>
                  <Link href="/advisors" className="hover:text-white transition-colors">
                    For Advisors
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Legal
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/about#affiliates" className="hover:text-white transition-colors">
                    Affiliate Disclosure
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Trust badges row */}
          <div className="mt-10 border-t border-white/10 pt-6 flex flex-wrap gap-6 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-[#00C9A7]" /> 256-bit encryption
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#00C9A7]" /> Your data is never sold
            </span>
            <span className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-[#00C9A7]" /> All sources cited
            </span>
          </div>

          {/* How we make money */}
          <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-gray-400">
              <strong className="text-gray-300">How we make money:</strong> {AFFILIATE_DISCLOSURE}
            </p>
          </div>

          {/* Bottom bar */}
          <div className="mt-6 space-y-2">
            <p className="text-xs text-gray-500">
              {SITE_NAME} provides educational information only. Nothing on this site constitutes
              financial or legal advice. Affiliate relationships are{' '}
              <Link
                href="/about#affiliates"
                className="underline hover:text-gray-300 transition-colors"
              >
                disclosed
              </Link>{' '}
              and do not influence assessment results.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs text-gray-500">
              <p>
                &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
              </p>
              <p>Policy information as of {POLICY_AS_OF_DATE}.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
