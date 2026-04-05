'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Award, ArrowRight, Info, RotateCcw } from 'lucide-react';

const TOTAL_PAYMENTS = 120;
const STORAGE_KEY = 'pslf_tracker_v1';

interface TrackerState {
  qualifyingPayments: number;
  employmentStartMonth: string; // YYYY-MM
  currentPlan: string;
  loanBalance: string;
  enrolledInSAVE: boolean;
}

const DEFAULT_STATE: TrackerState = {
  qualifyingPayments: 0,
  employmentStartMonth: '',
  currentPlan: 'ibr',
  loanBalance: '',
  enrolledInSAVE: false,
};

function formatDollars(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function monthsToDate(startMonth: string, additionalMonths: number): string {
  if (!startMonth) return '';
  const [year, month] = startMonth.split('-').map(Number);
  const d = new Date(year, month - 1 + additionalMonths, 1);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function monthsBetween(startMonth: string): number {
  if (!startMonth) return 0;
  const [year, month] = startMonth.split('-').map(Number);
  const start = new Date(year, month - 1, 1);
  const now = new Date();
  const nowMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const diff = (nowMonth.getFullYear() - start.getFullYear()) * 12 + (nowMonth.getMonth() - start.getMonth());
  return Math.max(0, diff);
}

export function PSLFTrackerClient() {
  const [state, setState] = useState<TrackerState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as TrackerState;
        setState(parsed);
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state, loaded]);

  const paymentsRemaining = Math.max(0, TOTAL_PAYMENTS - state.qualifyingPayments);
  const progressPct = Math.min(100, (state.qualifyingPayments / TOTAL_PAYMENTS) * 100);
  const monthsInService = monthsBetween(state.employmentStartMonth);
  const balance = parseFloat(state.loanBalance.replace(/,/g, '')) || 0;

  const forgivenessMo = monthToDate(state.employmentStartMonth, paymentsRemaining);

  function monthToDate(startMonth: string, remainingMonths: number): string {
    if (!startMonth || !remainingMonths) return '';
    return monthsToDate(startMonth, monthsInService + remainingMonths);
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmailError('');
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, segment: 'forgiveness_candidate' }),
      });
      if (res.ok) {
        setEmailSubmitted(true);
      } else {
        setEmailError('Something went wrong. Please try again.');
      }
    } catch {
      setEmailError('Something went wrong. Please try again.');
    }
  }

  function handleReset() {
    if (confirm('Reset your tracker? This will clear all saved progress.')) {
      setState(DEFAULT_STATE);
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return (
    <div className="mt-8 space-y-8">
      {/* SAVE injunction warning */}
      {state.enrolledInSAVE && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>SAVE Plan is currently blocked.</strong> Payments made during the court
            injunction forbearance do not count toward PSLF. Consider switching to IBR so your
            payments resume counting. Your qualifying payment count above should only include
            payments that actually counted.
          </p>
        </div>
      )}

      {/* Progress bar */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700">Qualifying payments</p>
          <p className="text-sm text-gray-500">{state.qualifyingPayments} / {TOTAL_PAYMENTS}</p>
        </div>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-4 bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-400">0</p>
          <p className="text-xs text-gray-400">120</p>
        </div>

        {state.qualifyingPayments >= TOTAL_PAYMENTS && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-4">
            <Award className="h-5 w-5 text-emerald-600 shrink-0" />
            <p className="text-sm font-medium text-emerald-800">
              You&apos;ve reached 120 qualifying payments! Apply for PSLF at studentaid.gov now.
            </p>
          </div>
        )}

        {paymentsRemaining > 0 && (
          <p className="mt-4 text-center text-gray-600">
            <span className="text-2xl font-bold text-gray-900">{paymentsRemaining}</span>{' '}
            qualifying payments remaining
            {forgivenessMo && (
              <> · <span className="text-emerald-700 font-medium">Est. forgiveness: {forgivenessMo}</span></>
            )}
          </p>
        )}
      </div>

      {/* Inputs */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
        <h2 className="font-semibold text-gray-900">Your PSLF Details</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Qualifying payments made so far
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setState((s) => ({ ...s, qualifyingPayments: Math.max(0, s.qualifyingPayments - 1) }))}
              className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
            >
              −
            </button>
            <input
              type="number"
              min="0"
              max="120"
              value={state.qualifyingPayments}
              onChange={(e) => setState((s) => ({ ...s, qualifyingPayments: Math.min(120, Math.max(0, parseInt(e.target.value) || 0)) }))}
              className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-center text-sm focus:border-emerald-500 focus:outline-none"
            />
            <button
              onClick={() => setState((s) => ({ ...s, qualifyingPayments: Math.min(120, s.qualifyingPayments + 1) }))}
              className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
            >
              +
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-400">
            Only count payments made on time while on a qualifying plan (IBR, PAYE, ICR) working for a qualifying employer.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Qualifying employment start date
          </label>
          <input
            type="month"
            value={state.employmentStartMonth}
            onChange={(e) => setState((s) => ({ ...s, employmentStartMonth: e.target.value }))}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-gray-400">
            When did you start working for a qualifying government or nonprofit employer?
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current repayment plan
          </label>
          <select
            value={state.currentPlan}
            onChange={(e) => setState((s) => ({ ...s, currentPlan: e.target.value, enrolledInSAVE: e.target.value === 'save' }))}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
          >
            <option value="ibr">IBR (Income-Based Repayment)</option>
            <option value="paye">PAYE (closed to new enrollees)</option>
            <option value="icr">ICR (Income-Contingent Repayment)</option>
            <option value="save">SAVE (currently blocked by injunction)</option>
            <option value="standard">Standard 10-year</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimated remaining loan balance
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">$</span>
            <input
              type="number"
              placeholder="45000"
              value={state.loanBalance}
              onChange={(e) => setState((s) => ({ ...s, loanBalance: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 pl-7 pr-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">
            Used to estimate your forgiven amount — the amount forgiven under PSLF is tax-free.
          </p>
        </div>
      </div>

      {/* Stats */}
      {(state.employmentStartMonth || balance > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {state.employmentStartMonth && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Months in service</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{monthsInService}</p>
              <p className="text-xs text-gray-400">since {new Date(state.employmentStartMonth + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
            </div>
          )}
          {balance > 0 && paymentsRemaining === 0 && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Est. forgiven (tax-free)</p>
              <p className="mt-1 text-2xl font-bold text-emerald-700">{formatDollars(balance)}</p>
              <p className="text-xs text-gray-400">current balance</p>
            </div>
          )}
          {balance > 0 && paymentsRemaining > 0 && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Current balance</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{formatDollars(balance)}</p>
              <p className="text-xs text-gray-400">forgiven tax-free at 120 payments</p>
            </div>
          )}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Progress</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{Math.round(progressPct)}%</p>
            <p className="text-xs text-gray-400">toward forgiveness</p>
          </div>
        </div>
      )}

      {/* PSLF Requirements reminder */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 flex items-start gap-3">
        <Info className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
        <div className="text-xs text-gray-500 space-y-1">
          <p><strong>PSLF requires all 4:</strong></p>
          <ol className="list-decimal pl-4 space-y-0.5">
            <li>Direct Loans (not FFEL — consolidate first if needed)</li>
            <li>Qualifying employer: government or 501(c)(3) nonprofit</li>
            <li>Full-time employment (or multiple part-time qualifying jobs totaling full-time)</li>
            <li>Qualifying repayment plan: IBR, PAYE, or ICR — <strong>not SAVE during the current injunction</strong></li>
          </ol>
        </div>
      </div>

      {/* Email capture for monthly updates */}
      {!emailSubmitted && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="font-semibold text-gray-900">Get monthly PSLF policy updates</p>
          <p className="mt-1 text-sm text-gray-600">
            PSLF rules and court decisions change. We&apos;ll notify you when anything relevant to your
            tracker changes — including when the SAVE injunction resolves.
          </p>
          {showEmailCapture ? (
            <form onSubmit={handleEmailSubmit} className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowEmailCapture(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700 text-sm"
            >
              Get PSLF updates <ArrowRight className="h-4 w-4" />
            </button>
          )}
          {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
        </div>
      )}

      {emailSubmitted && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-medium text-emerald-800">
            You&apos;re subscribed. We&apos;ll notify you of PSLF policy changes.
          </p>
        </div>
      )}

      {/* Reset */}
      <div className="flex justify-end">
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset tracker
        </button>
      </div>

      {/* CTA to full assessment */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
        <p className="font-semibold text-gray-900">Not sure if you qualify for PSLF?</p>
        <p className="mt-1 text-sm text-gray-600">
          Our free assessment checks your employer type, loan types, and repayment plan to confirm
          your PSLF eligibility and tell you exactly what to do next.
        </p>
        <Link
          href="/assess"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 text-sm"
        >
          Check my PSLF eligibility <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
