'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle, TrendingDown } from 'lucide-react';

function monthlyPayment(principal: number, annualRate: number, months: number): number {
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function totalInterest(payment: number, months: number, principal: number): number {
  return Math.max(0, payment * months - principal);
}

function formatDollars(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

export function RefinanceSavingsClient() {
  const [balance, setBalance] = useState('');
  const [currentRate, setCurrentRate] = useState('');
  const [newRate, setNewRate] = useState('');
  const [remainingMonths, setRemainingMonths] = useState('120');
  const [calculated, setCalculated] = useState(false);

  const principal = parseFloat(balance.replace(/,/g, '')) || 0;
  const oldRate = parseFloat(currentRate) || 0;
  const refRate = parseFloat(newRate) || 0;
  const months = parseInt(remainingMonths) || 120;

  const canCalculate = principal > 0 && oldRate > 0 && refRate > 0 && refRate < oldRate;

  const oldPayment = canCalculate ? monthlyPayment(principal, oldRate, months) : 0;
  const newPayment = canCalculate ? monthlyPayment(principal, refRate, months) : 0;
  const monthlySavings = oldPayment - newPayment;
  const oldTotal = totalInterest(oldPayment, months, principal);
  const newTotal = totalInterest(newPayment, months, principal);
  const lifetimeSavings = oldTotal - newTotal;

  return (
    <div className="mt-8 space-y-8">
      {/* Federal benefit warning */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
        <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          <strong>Important:</strong> Refinancing federal loans to private means permanently giving
          up IBR, PSLF, and forgiveness protections. Only use this calculator if you've already
          confirmed refinancing makes sense for your situation.{' '}
          <Link href="/assess" className="underline">Take our free assessment first →</Link>
        </p>
      </div>

      {/* Inputs */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current loan balance
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">$</span>
            <input
              type="number"
              placeholder="45000"
              value={balance}
              onChange={(e) => { setBalance(e.target.value); setCalculated(false); }}
              className="w-full rounded-lg border border-gray-300 pl-7 pr-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current interest rate
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                placeholder="6.54"
                value={currentRate}
                onChange={(e) => { setCurrentRate(e.target.value); setCalculated(false); }}
                className="w-full rounded-lg border border-gray-300 px-3 pr-8 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">%</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New rate (after refi)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                placeholder="5.25"
                value={newRate}
                onChange={(e) => { setNewRate(e.target.value); setCalculated(false); }}
                className="w-full rounded-lg border border-gray-300 px-3 pr-8 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">%</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Remaining repayment term
          </label>
          <select
            value={remainingMonths}
            onChange={(e) => { setRemainingMonths(e.target.value); setCalculated(false); }}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
          >
            <option value="60">5 years (60 months)</option>
            <option value="84">7 years (84 months)</option>
            <option value="120">10 years (120 months)</option>
            <option value="180">15 years (180 months)</option>
            <option value="240">20 years (240 months)</option>
          </select>
        </div>

        {refRate > 0 && oldRate > 0 && refRate >= oldRate && (
          <p className="text-sm text-red-600">New rate must be lower than your current rate to show savings.</p>
        )}

        <button
          onClick={() => setCalculated(true)}
          disabled={!canCalculate}
          className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-medium text-white hover:bg-emerald-700 disabled:opacity-40 transition-colors"
        >
          Calculate savings
        </button>
      </div>

      {/* Results */}
      {calculated && canCalculate && (
        <div className="space-y-4">
          <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg font-semibold text-gray-900">Your estimated savings</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Monthly savings</p>
                <p className="mt-1 text-2xl font-bold text-emerald-700">{formatDollars(monthlySavings)}</p>
                <p className="text-xs text-gray-400">/month</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Total interest saved</p>
                <p className="mt-1 text-2xl font-bold text-emerald-700">{formatDollars(lifetimeSavings)}</p>
                <p className="text-xs text-gray-400">over {Math.round(months / 12)} years</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Rate reduction</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {(oldRate - refRate).toFixed(2)}%
                </p>
                <p className="text-xs text-gray-400">{oldRate}% → {refRate}%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs text-gray-500 mb-1">Current monthly payment</p>
              <p className="text-xl font-bold text-gray-700">{formatDollars(Math.round(oldPayment))}</p>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-white p-4">
              <p className="text-xs text-gray-500 mb-1">New monthly payment</p>
              <p className="text-xl font-bold text-gray-900">{formatDollars(Math.round(newPayment))}</p>
            </div>
          </div>

          {/* CTA to lender comparison */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
            <p className="font-semibold text-gray-900">
              Ready to lock in a lower rate? Compare 5 lenders side-by-side.
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Check rates from ELFI, Earnest, SoFi, Laurel Road, and Splash — most do a soft credit check first.
            </p>
            <Link
              href="/compare/refinance-lenders"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700"
            >
              Compare refinancing lenders <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
