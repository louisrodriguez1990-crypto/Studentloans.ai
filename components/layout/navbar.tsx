import Link from 'next/link';

export function Navbar() {
  return (
    <header className="border-b border-gray-200 border-t-[3px] border-t-emerald-500 bg-white">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4"
        aria-label="Main navigation"
      >
        <Link href="/" className="text-lg font-bold hover:opacity-80">
          <span className="text-gray-900">StudentDebt</span>
          <span className="text-emerald-600">.ai</span>
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
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Get My Assessment
          </Link>
        </div>
      </nav>
    </header>
  );
}
