'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Calculator, TrendingDown, Award, Users } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';

const TOOLS_LINKS = [
  { href: '/calculators/idr-payment', label: 'IDR Payment Calculator', icon: Calculator },
  { href: '/calculators/refinance-savings', label: 'Refinance Calculator', icon: TrendingDown },
  { href: '/calculators/forgiveness-timeline', label: 'Forgiveness Timeline', icon: Award },
  { href: '/tools/pslf-tracker', label: 'PSLF Tracker', icon: Award },
  { href: '/compare/refinance-lenders', label: 'Compare Lenders', icon: Users },
];

export function Navbar() {
  const [toolsOpen, setToolsOpen] = useState(false);
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
              <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
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
