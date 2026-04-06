import Link from 'next/link';
import { SITE_NAME, POLICY_AS_OF_DATE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-[#1a1f36] text-gray-300 mt-16">
      <div className="mx-auto max-w-5xl px-4 pt-12 pb-8">
        {/* Brand row */}
        <div className="mb-10 border-b border-white/10 pb-8">
          <p className="text-xl font-extrabold text-white">{SITE_NAME}</p>
          <p className="mt-1.5 text-sm text-gray-400 max-w-sm">
            Personalized federal student loan guidance, powered by current policy. Free, no account needed.
          </p>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Product */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Product</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/assess" className="hover:text-white transition-colors">Get Free Assessment</Link></li>
              <li><Link href="/calculators/idr-payment" className="hover:text-white transition-colors">IDR Calculator</Link></li>
              <li><Link href="/calculators/refinance-savings" className="hover:text-white transition-colors">Refinance Calculator</Link></li>
              <li><Link href="/tools/pslf-tracker" className="hover:text-white transition-colors">PSLF Tracker</Link></li>
              <li><Link href="/compare/refinance-lenders" className="hover:text-white transition-colors">Compare Lenders</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Resources</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/learn/save-plan" className="hover:text-white transition-colors">SAVE Plan Guide</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/learn/save-plan" className="hover:text-white transition-colors">2026 Policy Changes</Link></li>
              <li><Link href="/state/california" className="hover:text-white transition-colors">State Guides</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Company</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/advisors" className="hover:text-white transition-colors">For Advisors</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Legal</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/about#affiliates" className="hover:text-white transition-colors">Affiliate Disclosure</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6 space-y-2">
          <p className="text-xs text-gray-500">
            {SITE_NAME} provides educational information only. Nothing on this site constitutes financial or legal advice.
            Affiliate relationships are{' '}
            <Link href="/about#affiliates" className="underline hover:text-gray-300 transition-colors">
              disclosed
            </Link>{' '}
            and do not influence assessment results.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
            <p>Policy information as of {POLICY_AS_OF_DATE}.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
