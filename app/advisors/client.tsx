'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle, Users, Shield, Clock } from 'lucide-react';

const SITUATIONS = [
  'I have both federal and private loans and need a strategy',
  'I might qualify for PSLF but also considering refinancing',
  'I\'m in default or seriously behind on payments',
  'I have Parent PLUS loans and need to understand my options',
  'I\'m self-employed with complicated income for IDR',
  'I\'m not sure which repayment plan is right for me',
  'Something else',
];

interface FormState {
  name: string;
  email: string;
  situation: string;
  details: string;
}

export function AdvisorRequestForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    situation: '',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.includes('@') || !form.situation) {
      setError('Please fill in your name, email, and situation.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/advisor-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle className="h-10 w-10 text-emerald-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900">Request received</h3>
        <p className="mt-2 text-gray-600">
          We'll match you with a fee-only student loan advisor within 1–2 business days.
          Check your inbox for a confirmation email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your name
        </label>
        <input
          type="text"
          placeholder="Jane Smith"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What best describes your situation?
        </label>
        <select
          value={form.situation}
          onChange={(e) => setForm((s) => ({ ...s, situation: e.target.value }))}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
        >
          <option value="">Select your situation…</option>
          {SITUATIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Any other details? <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="e.g. $85k in loans, 7 years as a teacher, currently on SAVE…"
          value={form.details}
          onChange={(e) => setForm((s) => ({ ...s, details: e.target.value }))}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none resize-none"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? 'Sending…' : (
          <>Request a match <ArrowRight className="h-4 w-4" /></>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Free to request. We only match you with fee-only advisors — no commission-based salespeople.
      </p>
    </form>
  );
}

export function AdvisorsPageClient() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-sm text-emerald-700 mb-6">
          <Users className="h-3.5 w-3.5" />
          Fee-only advisor matching
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Get matched with a student loan specialist
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          Some situations need more than a calculator. We match you with a fee-only advisor
          who can review your full picture and give you a clear plan.
        </p>
      </div>

      {/* Trust signals */}
      <div className="grid gap-4 sm:grid-cols-3 mb-12">
        {[
          {
            icon: Shield,
            title: 'Fee-only advisors',
            desc: 'No commissions. Advisors are paid by you, not by lenders.',
          },
          {
            icon: Clock,
            title: '1–2 day match',
            desc: 'We respond within 1–2 business days with an advisor recommendation.',
          },
          {
            icon: CheckCircle,
            title: 'Free to request',
            desc: 'No cost to submit a request. Advisor consultation fees vary.',
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-lg border border-gray-200 bg-white p-5 text-center">
            <Icon className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900 text-sm">{title}</p>
            <p className="mt-1 text-xs text-gray-500">{desc}</p>
          </div>
        ))}
      </div>

      {/* When to use */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 mb-10">
        <h2 className="font-semibold text-gray-900 mb-3">When an advisor makes sense</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          {[
            'You have a mix of federal and private loans and aren\'t sure what to tackle first',
            'You\'re weighing PSLF eligibility against refinancing and the math is unclear',
            'You\'re in default or behind on payments and need a recovery plan',
            'You have Parent PLUS loans and want to understand income-contingent options',
            'You\'re self-employed and IDR income recertification is complicated',
            'You want a second opinion before making an irreversible decision (like refinancing)',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Request an advisor match</h2>
        <p className="text-sm text-gray-500 mb-6">
          Tell us a little about your situation and we'll find the right person.
        </p>
        <AdvisorRequestForm />
      </div>
    </div>
  );
}
