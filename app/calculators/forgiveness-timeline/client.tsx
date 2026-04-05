'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, Award, ArrowRight } from 'lucide-react';
import { InlineEmailCapture } from '@/components/ui/inline-email-capture';

// 2026 Federal Poverty Lines (48 contiguous states)
const POVERTY_BASE = 15060;
const POVERTY_PER_ADDITIONAL = 5380;

function getPovertyLine(familySize: number): number {
  return POVERTY_BASE + Math.max(0, familySize - 1) * POVERTY_PER_ADDITIONAL;
}

function calcIBRPayment(agi: number, familySize: number, newBorrower: boolean): number {
  const povertyLine = getPovertyLine(familySize);
  const discretionary = Math.max(0, agi - povertyLine * 1.5);
  const pct = newBorrower ? 0.1 : 0.15;
  return Math.round((discretionary * pct) / 12);
}

function calcICRPayment(agi: number, balance: number): number {
  const discretionary = Math.max(0, agi - getPovertyLine(1));
  const icr = Math.round((discretionary * 0.2) / 12);
  // 12-year fixed payment (simplified)
  const fixed = Math.round((balance * (0.05 / 12)) / (1 - Math.pow(1 + 0.05 / 12, -144)));
  return Math.min(icr, fixed);
}

function projectBalance(
  balance: number,
  annualRate: number,
  monthlyPayment: number,
  totalMonths: number,
): number {
  let b = balance;
  for (let i = 0; i < totalMonths; i++) {
    b = b * (1 + annualRate / 12) - monthlyPayment;
    if (b <= 0) return 0;
  }
  return Math.max(0, b);
}

function formatDollars(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function addMonths(months: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

interface Results {
  plan: string;
  monthlyPayment: number;
  forgivenessMonths: number;
  projectedForgivenAmount: number;
  totalPaid: number;
  forgivenessDate: string;
  isTaxFree: boolean;
  isBlocked: boolean;
}

export function ForgivenessTimelineClient() {
  const [agi, setAgi] = useState('');
  const [familySize, setFamilySize] = useState(1);
  const [balance, setBalance] = useState('');
  const [yearsInRepayment, setYearsInRepayment] = useState(0);
  const [plan, setPlan] = useState<'ibr_new' | 'ibr_old' | 'icr' | 'pslf' | 'save'>('ibr_new');
  const [interestRate, setInterestRate] = useState('5.5');
  const [results, setResults] = useState<Results[] | null>(null);

  function calculate() {
    const agiN = parseFloat(agi.replace(/,/g, '')) || 0;
    const balN = parseFloat(balance.replace(/,/g, '')) || 0;
    const rateN = parseFloat(interestRate) / 100 || 0.055;
    const monthsAlready = yearsInRepayment * 12;

    if (agiN <= 0 || balN <= 0) return;

    const output: Results[] = [];

    if (plan === 'pslf') {
      const payment = calcIBRPayment(agiN, familySize, true);
      const remainingMonths = Math.max(0, 120 - monthsAlready);
      const forgiven = projectBalance(balN, rateN, payment, remainingMonths);
      output.push({
        plan: 'PSLF (IBR + Public Service)',
        monthlyPayment: payment,
        forgivenessMonths: remainingMonths,
        projectedForgivenAmount: forgiven,
        totalPaid: payment * remainingMonths,
        forgivenessDate: addMonths(remainingMonths),
        isTaxFree: true,
        isBlocked: false,
      });
    } else if (plan === 'save') {
      output.push({
        plan: 'SAVE Plan',
        monthlyPayment: 0,
        forgivenessMonths: 0,
        projectedForgivenAmount: 0,
        totalPaid: 0,
        forgivenessDate: '',
        isTaxFree: false,
        isBlocked: true,
      });
    } else if (plan === 'ibr_new') {
      const payment = calcIBRPayment(agiN, familySize, true);
      const totalMonths = 240; // 20 years
      const remainingMonths = Math.max(0, totalMonths - monthsAlready);
      const forgiven = projectBalance(balN, rateN, payment, remainingMonths);
      output.push({
        plan: 'IBR (New Borrower, 10%)',
        monthlyPayment: payment,
        forgivenessMonths: remainingMonths,
        projectedForgivenAmount: forgiven,
        totalPaid: payment * remainingMonths,
        forgivenessDate: addMonths(remainingMonths),
        isTaxFree: false,
        isBlocked: false,
      });
    } else if (plan === 'ibr_old') {
      const payment = calcIBRPayment(agiN, familySize, false);
      const totalMonths = 300; // 25 years
      const remainingMonths = Math.max(0, totalMonths - monthsAlready);
      const forgiven = projectBalance(balN, rateN, payment, remainingMonths);
      output.push({
        plan: 'IBR (Old Borrower, 15%)',
        monthlyPayment: payment,
        forgivenessMonths: remainingMonths,
        projectedForgivenAmount: forgiven,
        totalPaid: payment * remainingMonths,
        forgivenessDate: addMonths(remainingMonths),
        isTaxFree: false,
        isBlocked: false,
      });
    } else if (plan === 'icr') {
      const payment = calcICRPayment(agiN, balN);
      const totalMonths = 300; // 25 years
      const remainingMonths = Math.max(0, totalMonths - monthsAlready);
      const forgiven = projectBalance(balN, rateN, payment, remainingMonths);
      output.push({
        plan: 'ICR (Income-Contingent Repayment)',
        monthlyPayment: payment,
        forgivenessMonths: remainingMonths,
        projectedForgivenAmount: forgiven,
        totalPaid: payment * remainingMonths,
        forgivenessDate: addMonths(remainingMonths),
        isTaxFree: false,
        isBlocked: false,
      });
    }

    setResults(output);
  }

  const result = results?.[0];

  return (
    <div className="mt-8 space-y-6">
      {/* Inputs */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Your Loan Details</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual income (AGI)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">$</span>
              <input
                type="number"
                placeholder="55000"
                value={agi}
                onChange={(e) => setAgi(e.target.value)}
                className="w-full rounded-lg border border-gray-300 pl-7 pr-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Family size</label>
            <select
              value={familySize}
              onChange={(e) => setFamilySize(parseInt(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan balance</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">$</span>
              <input
                type="number"
                placeholder="45000"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full rounded-lg border border-gray-300 pl-7 pr-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interest rate
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                placeholder="5.5"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Years already in repayment
            </label>
            <input
              type="number"
              min="0"
              max="25"
              value={yearsInRepayment}
              onChange={(e) => setYearsInRepayment(parseInt(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Repayment plan
            </label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value as typeof plan)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            >
              <option value="ibr_new">IBR — New Borrower (10%)</option>
              <option value="ibr_old">IBR — Old Borrower (15%)</option>
              <option value="icr">ICR — Income-Contingent</option>
              <option value="pslf">PSLF Track (IBR + Public Service)</option>
              <option value="save">SAVE Plan (currently blocked)</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculate}
          className="mt-2 w-full rounded-lg bg-emerald-600 py-2.5 font-medium text-white hover:bg-emerald-700"
        >
          Calculate my forgiveness timeline
        </button>
      </div>

      {/* Results */}
      {result && (
        <>
          {result.isBlocked ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">SAVE Plan is currently blocked</p>
                  <p className="mt-1 text-sm text-gray-700">
                    The SAVE Plan is under a court injunction. Borrowers on SAVE are in
                    administrative forbearance — payments are paused and do not count toward
                    forgiveness. Select IBR above to see your forgiveness timeline.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Main result card */}
              <div className="rounded-xl border border-emerald-200 bg-white p-6">
                <div className="flex items-start gap-3 mb-5">
                  <Award className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">{result.plan}</p>
                    {result.isTaxFree && (
                      <span className="inline-block mt-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        Tax-free forgiveness
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Monthly payment</p>
                    <p className="mt-1 text-xl font-bold text-gray-900">
                      {formatDollars(result.monthlyPayment)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Months remaining</p>
                    <p className="mt-1 text-xl font-bold text-gray-900">
                      {result.forgivenessMonths}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Est. forgiven</p>
                    <p className="mt-1 text-xl font-bold text-emerald-600">
                      {result.projectedForgivenAmount > 0
                        ? formatDollars(result.projectedForgivenAmount)
                        : '$0'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Forgiveness date</p>
                    <p className="mt-1 text-sm font-bold text-gray-900">{result.forgivenessDate}</p>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-gray-100 text-xs text-gray-400">
                  Total paid before forgiveness: {formatDollars(result.totalPaid)}.
                  {!result.isTaxFree && result.projectedForgivenAmount > 0 && (
                    <> IDR forgiveness may be taxable as ordinary income.</>
                  )}
                  {' '}Calculation assumes constant income and interest rate. Actual amounts will vary.
                </div>
              </div>

              {/* PSLF upsell if on IDR but not PSLF */}
              {plan !== 'pslf' && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm font-medium text-gray-900">
                    Work for a government or nonprofit?
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    Switch to PSLF above to see if you could get forgiveness in 10 years instead
                    of 20–25, completely tax-free.
                  </p>
                </div>
              )}

              {/* Refinancing upsell if balance is large and income is high */}
              {parseFloat(agi) > 80000 && (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      With your income, refinancing might save more
                    </p>
                    <p className="mt-1 text-xs text-gray-600">
                      Compare your options — refinancing vs. staying federal.
                    </p>
                  </div>
                  <Link
                    href="/calculators/refinance-savings"
                    className="shrink-0 inline-flex items-center gap-1 rounded-md bg-white border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-300"
                  >
                    Compare <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Email capture */}
          {!result.isBlocked && (
            <InlineEmailCapture
              segment={plan === 'pslf' ? 'forgiveness_candidate' : 'deadline_sensitive'}
              prompt="Get notified when the SAVE injunction resolves or IBR rules change:"
            />
          )}
        </>
      )}

      {/* Get full assessment CTA */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
        <p className="font-semibold text-gray-900">Want a personalized assessment?</p>
        <p className="mt-1 text-sm text-gray-700">
          Our free tool checks your exact eligibility, warns you of risks, and gives you a
          step-by-step action plan — not just a number.
        </p>
        <Link
          href="/assess"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700 text-sm"
        >
          Get my free assessment <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
