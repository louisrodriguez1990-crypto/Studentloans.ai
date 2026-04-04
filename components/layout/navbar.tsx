import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

export function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4"
        aria-label="Main navigation"
      >
        <Link href="/" className="text-lg font-bold text-gray-900 hover:text-blue-600">
          {SITE_NAME}
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/learn/save-plan" className="text-gray-600 hover:text-gray-900">
            Learn
          </Link>
          <Link href="/faq" className="text-gray-600 hover:text-gray-900">
            FAQ
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">
            About
          </Link>
          <Link
            href="/assess"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Get My Assessment
          </Link>
        </div>
      </nav>
    </header>
  );
}
