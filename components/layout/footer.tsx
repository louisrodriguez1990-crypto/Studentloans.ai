import Link from 'next/link';
import { SITE_NAME, POLICY_AS_OF_DATE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <p className="font-extrabold text-gray-900">{SITE_NAME}</p>
            <p className="mt-2 text-xs text-gray-500">
              Policy information as of {POLICY_AS_OF_DATE}.
            </p>
            <p className="mt-1 text-xs text-gray-400">
              © {new Date().getFullYear()} {SITE_NAME}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Learn</p>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-500">
              <li>
                <Link href="/learn/save-plan" className="hover:text-gray-700">
                  SAVE Plan
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gray-700">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Tools</p>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-500">
              <li>
                <Link href="/calculators/idr-payment" className="hover:text-gray-700">
                  IDR Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/refinance-savings" className="hover:text-gray-700">
                  Refinance Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/pslf-tracker" className="hover:text-gray-700">
                  PSLF Tracker
                </Link>
              </li>
              <li>
                <Link href="/compare/refinance-lenders" className="hover:text-gray-700">
                  Compare Lenders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Servicers</p>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-500">
              <li><Link href="/servicer/aidvantage" className="hover:text-gray-700">Aidvantage</Link></li>
              <li><Link href="/servicer/mohela" className="hover:text-gray-700">MOHELA</Link></li>
              <li><Link href="/servicer/nelnet" className="hover:text-gray-700">Nelnet</Link></li>
              <li><Link href="/servicer/edfinancial" className="hover:text-gray-700">EdFinancial</Link></li>
              <li><Link href="/servicer/great-lakes" className="hover:text-gray-700">Great Lakes</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Company</p>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-500">
              <li>
                <Link href="/about" className="hover:text-gray-700">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-700">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-xs text-gray-400">
            {SITE_NAME} provides educational information only. Nothing on this site constitutes
            financial or legal advice. Affiliate relationships are{' '}
            <Link href="/about#affiliates" className="underline hover:text-gray-600">
              disclosed
            </Link>{' '}
            and do not influence assessment results.
          </p>
        </div>
      </div>
    </footer>
  );
}
