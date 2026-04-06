'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Calculator,
  TrendingDown,
  Award,
  Users,
  Menu,
  X,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';

const TOOLS_LINKS = [
  {
    href: '/calculators/idr-payment',
    label: 'IDR Payment Calculator',
    desc: 'Estimate your monthly IDR payment',
    icon: Calculator,
  },
  {
    href: '/calculators/refinance-savings',
    label: 'Refinance Calculator',
    desc: 'Compare refinance vs. federal savings',
    icon: TrendingDown,
  },
  {
    href: '/calculators/forgiveness-timeline',
    label: 'Forgiveness Timeline',
    desc: 'Estimate your forgiveness date',
    icon: Award,
  },
  {
    href: '/tools/pslf-tracker',
    label: 'PSLF Tracker',
    desc: 'Track qualifying payments',
    icon: ShieldCheck,
  },
  {
    href: '/compare/refinance-lenders',
    label: 'Compare Lenders',
    desc: 'Side-by-side lender comparison',
    icon: Scale,
  },
];

const NAV_LINKS = [
  { href: '/learn/save-plan', label: 'Learn' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
];

function LogoMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <path
        d="M12 2L3 7v6c0 5.25 3.75 10.13 9 11.25C17.25 23.13 21 18.25 21 13V7l-9-5z"
        fill="#00C9A7"
        opacity="0.15"
      />
      <path
        d="M12 2L3 7v6c0 5.25 3.75 10.13 9 11.25C17.25 23.13 21 18.25 21 13V7l-9-5z"
        stroke="#00C9A7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="#00C9A7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setToolsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className={`border-b border-gray-100 sticky top-0 z-40 transition-all duration-200 ${
        scrolled ? 'glass-nav shadow-sm' : 'bg-white'
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-extrabold text-[#1a1f36] hover:text-[#2d3561] transition-colors"
        >
          <LogoMark />
          {SITE_NAME}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {/* Tools dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setToolsOpen((v) => !v)}
              className="flex items-center gap-1 text-gray-600 hover:text-[#1a1f36] transition-colors font-medium"
              aria-expanded={toolsOpen}
              aria-haspopup="true"
            >
              Tools
              <ChevronDown
                className={`h-4 w-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {toolsOpen && (
              <div className="absolute left-0 top-full z-50 mt-3 w-72 rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
                {TOOLS_LINKS.map(({ href, label, desc, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setToolsOpen(false)}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e6faf6] mt-0.5">
                      <Icon className="h-4 w-4 text-[#00C9A7]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1a1f36]">{label}</p>
                      <p className="text-xs text-gray-400">{desc}</p>
                    </div>
                  </Link>
                ))}
                <div className="border-t border-gray-100 mt-1 pt-1 px-4 py-2">
                  <Link
                    href="/assess"
                    onClick={() => setToolsOpen(false)}
                    className="text-xs font-medium text-[#00C9A7] hover:text-[#00b396] transition-colors"
                  >
                    Or get a full assessment →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-medium transition-colors ${
                isActive(href) ? 'text-[#00C9A7]' : 'text-gray-600 hover:text-[#1a1f36]'
              }`}
            >
              {label}
            </Link>
          ))}

          <span className="text-gray-200">|</span>

          <Link
            href="/about#affiliates"
            className="text-xs text-gray-400 hover:text-[#00C9A7] transition-colors"
          >
            How we make money
          </Link>

          <Link
            href="/assess"
            className="rounded-full bg-[#00C9A7] px-5 py-2 text-sm font-semibold text-white hover:bg-[#00b396] transition-colors shadow-sm hover:shadow-md"
          >
            Get Free Assessment
          </Link>
        </div>

        {/* Mobile: hamburger + CTA */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/assess"
            className="rounded-full bg-[#00C9A7] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#00b396] transition-colors"
          >
            Free Assessment
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="p-1 text-gray-600 hover:text-[#1a1f36] transition-colors"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
          {/* Tools section */}
          <div className="pt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
              Tools
            </p>
            {TOOLS_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-2.5 text-sm text-gray-700 hover:text-[#1a1f36] transition-colors"
              >
                <Icon className="h-4 w-4 text-[#00C9A7] shrink-0" />
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
                className={`block py-2.5 text-sm font-medium transition-colors ${
                  isActive(href) ? 'text-[#00C9A7]' : 'text-gray-700 hover:text-[#1a1f36]'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* How we make money */}
          <div className="mt-3 border-t border-gray-100 pt-3">
            <Link
              href="/about#affiliates"
              onClick={() => setMobileOpen(false)}
              className="text-xs text-gray-400 hover:text-[#00C9A7] transition-colors"
            >
              How we make money →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
