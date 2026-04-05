'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle, Info } from 'lucide-react';

// Federal poverty line 2026 (48 contiguous states + DC)
// Source: https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines
const POVERTY_LINE_2026_BASE = 15_060; // for family of 1
const POVERTY_LINE_2026_PER_ADDITIONAL = 5_380; // per additional person

function getPovertyLine(familySize: number): number {
  return POVERTY_LINE_2026_BASE + Math.max(0, familySize - 1) * POVERTY_LINE_2026_PER_ADDITIONAL;
}

// IDR payment calculations
function calcIBRNew(agi: number, familySize: number): number {
  // IBR for new borrowers (post-July 2014): 10% of discretionary income
  // Discretionary income = AGI minus 150% of poverty line
  const discretionary = Math.max(0, agi - 1.5 * getPovertyLine(familySize));
  return Math.round((discretionary * 0.10) / 12);
}

function calcIBROld(agi: number, familySize: number): number {
  // IBR for older borrowers: 15% of discretionary income (minus 150% poverty)
  const discretionary = Math.max(0, agi - 1.5 * getPovertyLine(familySize));
  return Math.round((discretionary * 0.15) / 12);
}

function calcSAVE(agi: number, familySize: number): number {
  // SAVE: 10% of discretionary income, but discretionary = AGI minus 225% poverty line
  // NOTE: SAVE is currently blocked by court injunction (April 2026)
  const discretionary = Math.max(0, agi - 2.25 * getPovertyLine(familySize));
  return Math.round((discretionary * 0.10) / 12);
}

function calcPAYE(agi: number, familySize: number, balance: number): number {
  // PAYE: 10% of discretionary income (150% poverty), capped at standard 10yr payment
  // PAYE is closed to new enrollees as of July 1, 2024
  const discretionary = Math.max(0, agi - 1.5 * getPovertyLine(familySize));
  const payePayment = Math.round((discretionary * 0.10) / 12);
  // Standard 10-year payment cap (approx 6.5% average rate)
  const standardPayment = Math.round((balance * 0.065) / (12 * (1 - Math.pow(1 + 0.065 / 12, -120))));
  return Math.min(payePayment, standardPayment);
}

function formatDollars(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

type BorrowerType = 'new' | 'old';

export function IDRCalculatorClient() {
  const [income, setIncome] = useState('');
  const [familySize, setFamilySize] = useState('1');
  const [balance, setBalance] = useState('');
  const [borrowerType, setBorrowerType] = useState<BorrowerType>('new');
  const [calculated, setCalculated] = useState(false);

  const agi = parseFloat(income.replace(/,/g, '')) || 0;
  const family = parseInt(familySize) || 1;
  const bal = parseFloat(balance.replace(/,/g, '')) || 0;

  const results = calculated && agi > 0 ? {
    ibrNew: calcIBRNew(agi, family),
    ibrOld: calcIBROld(agi, family),
    save: calcSAVE(agi, family),
    paye: calcPAYE(agi, family, bal),
  } : null;

  return (
    <div className="mt-8 space-y-8">
      {/* Inputs */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual income (AGI)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">$</span>
            <input
              type="number"
              placeholder="55000"
              value={income}
              onChange={(e) => { setIncome(e.target.value); setCalculated(false); }}
              className="w-full rounded-lg border border-gray-300 pl-7 pr-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">Use your adjusted gross income from your tax return</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Household size
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={familySize}
            onChange={(e) => { setFamilySize(e.target.value); setCalculated(false); }}
            className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-gray-400">Include yourself + anyone you claim as a dependent</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total loan balance <span className="text-gray-400">(for PAYE cap only)</span>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            When did you take out your first federal loan?
          </label>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="borrowerType" value="new"
                checked={borrowerType === 'new'} onChange={() => { setBorrowerType('new'); setCalculated(false); }}
                className="text-emerald-600" />
              <span className="text-sm text-gray-700">After July 1, 2014 (new IBR rate)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="borrowerType" value="old"
                checked={borrowerType === 'old'} onChange={() => { setBorrowerType('old'); setCalculated(false); }}
                className="text-emerald-600" />
              <span className="text-sm text-gray-700">Before July 1, 2014 (old IBR rate)</span>
            </label>
          </div>
        </div>

        <button
          onClick={() => setCalculated(true)}
          disabled={!income || agi <= 0}
          className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-medium text-white hover:bg-emerald-700 disabled:opacity-40 transition-colors"
        >
          Calculate my payments
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Your estimated monthly payments</h2>

          {/* SAVE injunction warning */}
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>SAVE Plan is currently blocked.</strong> As of April 2026, a federal court
              injunction has paused all SAVE Plan payments. Borrowers enrolled in SAVE are in
              administrative forbearance — payments do not count toward forgiveness.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* IBR */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-sm font-medium text-emerald-800">
                IBR ({borrowerType === 'new' ? '10%' : '15%'})
              </p>
              <p className="mt-1 text-3xl font-bold text-gray-900">
                {formatDollars(borrowerType === 'new' ? results.ibrNew : results.ibrOld)}
                <span className="text-base font-normal text-gray-500">/mo</span>
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Income-Based Repayment · <strong>Open to new enrollees</strong>
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Forgiveness after {borrowerType === 'new' ? '20' : '25'} years of payments
              </p>
            </div>

            {/* SAVE */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 opacity-70">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-600">SAVE (blocked)</p>
                <span className="rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-xs text-amber-700">Injunction</span>
              </div>
              <p className="mt-1 text-3xl font-bold text-gray-900">
                {formatDollars(results.save)}
                <span className="text-base font-normal text-gray-500">/mo</span>
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Rate when available · Currently paused — no payments counting toward forgiveness
              </p>
            </div>

            {/* PAYE */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 opacity-70">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-600">PAYE (closed)</p>
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">No new enrollees</span>
              </div>
              <p className="mt-1 text-3xl font-bold text-gray-900">
                {formatDollars(results.paye)}
                <span className="text-base font-normal text-gray-500">/mo</span>
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Closed to new enrollees as of July 1, 2024
              </p>
            </div>

            {/* Standard 10-yr for reference */}
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-medium text-gray-700">Standard 10-year (for reference)</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">
                {bal > 0
                  ? formatDollars(Math.round(bal * 0.00665 / (1 - Math.pow(1.00665, -120))))
                  : '—'}
                <span className="text-base font-normal text-gray-500">/mo</span>
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Assumes ~8% average interest rate · No forgiveness
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 rounded-lg bg-gray-50 border border-gray-200 p-4">
            <Info className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500">
              These are estimates only. Actual payments depend on your exact loan balance,
              servicer calculations, and any accrued interest. Poverty line figures use 2026
              federal guidelines. SAVE and PAYE figures are shown for informational comparison only.
            </p>
          </div>

          {/* CTA */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
            <p className="font-medium text-gray-900">Get a personalized plan for your loans</p>
            <p className="mt-1 text-sm text-gray-600">
              Our free assessment analyzes your specific situation and tells you which plan is right for you.
            </p>
            <Link
              href="/assess"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700"
            >
              Get my free assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
