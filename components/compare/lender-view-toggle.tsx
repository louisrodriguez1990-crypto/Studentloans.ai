'use client';

import { useState } from 'react';
import { ExternalLink, CheckCircle, LayoutList, Table2 } from 'lucide-react';
import type { Lender } from '@/lib/lenders';

interface LenderViewToggleProps {
  lenders: Lender[];
}

export function LenderViewToggle({ lenders }: LenderViewToggleProps) {
  const [view, setView] = useState<'card' | 'table'>('card');

  return (
    <div>
      {/* Toggle — desktop only (table isn't great on mobile) */}
      <div className="hidden sm:flex items-center justify-end mb-4 gap-2">
        <span className="text-xs text-gray-500">View:</span>
        <button
          onClick={() => setView('card')}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            view === 'card'
              ? 'bg-gray-900 text-white'
              : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          <LayoutList className="h-3.5 w-3.5" /> Cards
        </button>
        <button
          onClick={() => setView('table')}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            view === 'table'
              ? 'bg-gray-900 text-white'
              : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Table2 className="h-3.5 w-3.5" /> Table
        </button>
      </div>

      {/* Card view */}
      {(view === 'card') && (
        <div className="space-y-6">
          {lenders.map((lender, index) => (
            <div
              key={lender.id}
              className={`rounded-xl border p-6 ${
                index === 0
                  ? 'border-emerald-300 bg-white shadow-sm ring-1 ring-emerald-200'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {lender.badge && (
                <span className="inline-block mb-3 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-medium text-emerald-700">
                  {lender.badge}
                </span>
              )}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">{lender.name}</h2>
                  <p className="mt-0.5 text-sm text-gray-500">{lender.tagline}</p>
                  <div className="mt-3 flex flex-wrap gap-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Rate range</p>
                      <p className="mt-0.5 text-base font-semibold text-gray-900">{lender.rateRange}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Min. credit score</p>
                      <p className="mt-0.5 text-base font-semibold text-gray-900">{lender.minCreditScore}+</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Loan range</p>
                      <p className="mt-0.5 text-base font-semibold text-gray-900">
                        ${(lender.minLoanAmount / 1000).toFixed(0)}K – ${(lender.maxLoanAmount / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-1">
                    {lender.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sm:shrink-0">
                  <a
                    href={lender.affiliateHref}
                    target="_blank"
                    rel={`noopener noreferrer nofollow${lender.isAffiliate ? ' sponsored' : ''}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
                  >
                    {lender.ctaLabel}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <p className="mt-2 text-xs text-gray-400 text-center">
                    Soft credit check · No commitment
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table view — desktop only */}
      {view === 'table' && (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Lender</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Rate range</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Min. credit</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Max loan</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Standout feature</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {lenders.map((lender, index) => (
                <tr key={lender.id} className={index === 0 ? 'bg-emerald-50/50' : 'hover:bg-gray-50'}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-900">{lender.name}</div>
                    {lender.badge && (
                      <span className="text-xs text-emerald-600">{lender.badge}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{lender.rateRange}</td>
                  <td className="px-4 py-3 text-gray-700">{lender.minCreditScore}+</td>
                  <td className="px-4 py-3 text-gray-700">${(lender.maxLoanAmount / 1000).toFixed(0)}K</td>
                  <td className="px-4 py-3 text-gray-600 max-w-[200px]">{lender.features[0]}</td>
                  <td className="px-4 py-3">
                    <a
                      href={lender.affiliateHref}
                      target="_blank"
                      rel={`noopener noreferrer nofollow${lender.isAffiliate ? ' sponsored' : ''}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 whitespace-nowrap"
                    >
                      Check rate <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="px-4 py-3 text-xs text-gray-400 border-t border-gray-100">
            Soft credit check only · No commitment to apply
          </p>
        </div>
      )}
    </div>
  );
}
