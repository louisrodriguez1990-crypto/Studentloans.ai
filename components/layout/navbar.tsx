'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Calculator, TrendingDown, Award, Users, Menu, X } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';

const TOOLS_LINKS = [
  { href: '/calculators/idr-payment', label: 'IDR Payment Calculator', icon: Calculator },
  { href: '/calculators/refinance-savings', label: 'Refinance Calculator', icon: TrendingDown },
  { href: '/calculators/forgiveness-timeline', label: 'Forgiveness Timeline', icon: Award },
  { href: '/tools/pslf-tracker', label: 'PSLF Tracker', icon: Award },
  { href: '/compare/refinance-lenders', label: 'Compare Lenders', icon: Users },
];

const NAV_LINKS = [
  { href: '/learn/save-plan', label: 'Learn' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close Tools dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile menu on route change (escape key)
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setMobileOpen(false); setToolsOpen(false); }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <header className="border-b border-gray-200 bg-white relative z-40">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="text-lg font-extrabold text-gray-900 hover:text-teal-600 transition-colors">
          {SITE_NAME}
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6 text-sm">
          {/* Tools dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setToolsOpen((v) => !v)}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
              aria-expanded={toolsOpen}
              aria-haspopup="true"
            >
              Tools
              <ChevronDown className={`h-4 w-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>
            {toolsOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white py-1 shadow-xl">
                {TOOLS_LINKS.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setToolsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Icon className="h-4 w-4 text-gray-400 shrink-0" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="text-gray-600 hover:text-gray-900">
              {label}
            </Link>
          ))}

          <Link
            href="/assess"
            className="rounded-full bg-teal-600 px-5 py-2 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
          >
            Get My Assessment
          </Link>
        </div>

        {/* Mobile: hamburger + CTA */}
        <div className="flex sm:hidden items-center gap-3">
          <Link
            href="/assess"
            className="rounded-full bg-teal-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-teal-700 transition-colors"
          >
            Free Assessment
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="p-1 text-gray-600 hover:text-gray-900"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 pb-4">
          {/* Tools section */}
          <div className="pt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Tools</p>
            {TOOLS_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-2.5 text-sm text-gray-700 hover:text-blue-600"
              >
                <Icon className="h-4 w-4 text-gray-400 shrink-0" />
                {label}
              </Link>
            ))}
          </div>

          {/* Nav links */}
          <div className="mt-3 border-t border-gray-100 pt-3 space-y-0.5">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 text-sm text-gray-700 hover:text-blue-600"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
