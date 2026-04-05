'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';
import type { IntakeDataInput } from '@/lib/validations';
import type {
  LoanType,
  BalanceRange,
  RepaymentStatus,
  EmploymentType,
  IncomeRange,
  UserIntent,
} from '@/engine/types';

// ─── Question config ──────────────────────────────────────────────────────────

export type QuestionType = 'multi-select' | 'single-select' | 'number' | 'boolean' | 'email';

export interface ChatOption {
  value: string;
  label: string;
  description?: string;
}

export interface ChatQuestion {
  id: keyof IntakeDataInput | 'email';
  type: QuestionType;
  botMessage: string;
  options?: ChatOption[];
  min?: number;
  max?: number;
}

const LOAN_TYPE_OPTIONS: ChatOption[] = [
  { value: 'federal_direct', label: 'Federal Direct Loans', description: 'Subsidized, Unsubsidized, PLUS, or Grad PLUS' },
  { value: 'ffel',           label: 'FFEL Loans',           description: 'Federal loans made by private lenders before 2010' },
  { value: 'perkins',        label: 'Perkins Loans',        description: 'Campus-based loans (program ended 2017)' },
  { value: 'private',        label: 'Private Loans',        description: 'From banks, credit unions, or other lenders' },
  { value: 'unknown',        label: "I'm not sure",         description: 'Check studentaid.gov/aid-summary to find out' },
];

const BALANCE_OPTIONS: ChatOption[] = [
  { value: 'under_10k',  label: 'Under $10,000' },
  { value: '10k_30k',    label: '$10,000 – $30,000' },
  { value: '30k_60k',    label: '$30,000 – $60,000' },
  { value: '60k_100k',   label: '$60,000 – $100,000' },
  { value: 'over_100k',  label: 'Over $100,000' },
];

const STATUS_OPTIONS: ChatOption[] = [
  { value: 'in_repayment',          label: 'Currently making payments' },
  { value: 'grace_period',          label: 'In grace period (recently graduated)' },
  { value: 'forbearance_deferment', label: 'In forbearance or deferment' },
  { value: 'in_default',            label: 'In default' },
  { value: 'unknown',               label: "I'm not sure" },
];

const EMPLOYMENT_OPTIONS: ChatOption[] = [
  { value: 'government_nonprofit', label: 'Government or nonprofit' },
  { value: 'private_sector',       label: 'For a company or business' },
  { value: 'self_employed',        label: 'Self-employed' },
  { value: 'unemployed',           label: 'Not currently employed' },
];

const INCOME_OPTIONS: ChatOption[] = [
  { value: 'under_30k',  label: 'Under $30,000' },
  { value: '30k_50k',    label: '$30,000 – $50,000' },
  { value: '50k_75k',    label: '$50,000 – $75,000' },
  { value: '75k_100k',   label: '$75,000 – $100,000' },
  { value: 'over_100k',  label: 'Over $100,000' },
];

const INTENT_OPTIONS: ChatOption[] = [
  { value: 'save_plan_impact',        label: 'Understand my SAVE Plan status' },
  { value: 'refinance_consideration', label: 'Consider refinancing' },
  { value: 'forgiveness_eligibility', label: 'Check forgiveness eligibility' },
  { value: 'best_repayment_plan',     label: 'Find the best repayment plan' },
  { value: 'consolidation',           label: 'Learn about consolidation' },
  { value: 'understand_options',      label: 'Understand all my options' },
];

export const QUESTIONS: ChatQuestion[] = [
  {
    id: 'loanTypes',
    type: 'multi-select',
    botMessage: "Hi! I'll help you understand how 2026 student loan changes affect your situation. First — what types of student loans do you have? Select all that apply.",
    options: LOAN_TYPE_OPTIONS,
  },
  {
    id: 'balanceRange',
    type: 'single-select',
    botMessage: "What's your approximate total student loan balance?",
    options: BALANCE_OPTIONS,
  },
  {
    id: 'repaymentStatus',
    type: 'single-select',
    botMessage: "What's your current repayment status?",
    options: STATUS_OPTIONS,
  },
  {
    id: 'employmentType',
    type: 'single-select',
    botMessage: "What best describes your current employment?",
    options: EMPLOYMENT_OPTIONS,
  },
  {
    id: 'incomeRange',
    type: 'single-select',
    botMessage: "What's your approximate annual income?",
    options: INCOME_OPTIONS,
  },
  {
    id: 'familySize',
    type: 'number',
    botMessage: "How many people are in your household, including yourself?",
    min: 1,
    max: 20,
  },
  {
    id: 'yearsInRepayment',
    type: 'number',
    botMessage: "How many years have you been in repayment?",
    min: 0,
    max: 40,
  },
  {
    id: 'intent',
    type: 'multi-select',
    botMessage: "What are you most trying to figure out? Select all that apply.",
    options: INTENT_OPTIONS,
  },
  {
    id: 'disbursedAfterJuly2026',
    type: 'boolean',
    botMessage: "Were any of your loans first disbursed after July 1, 2026?",
  },
  {
    id: 'enrolledInSAVE',
    type: 'boolean',
    botMessage: "Are you currently enrolled in the SAVE Plan, or were you enrolled before the court injunction paused it?",
  },
  {
    id: 'email',
    type: 'email',
    botMessage: "Last step — enter your email to unlock your personalized assessment. We'll also send you updates when policy changes affect your situation. We never spam.",
  },
];

// ─── State ────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: 'bot' | 'user';
  text: string;
  key: string;
}

interface ChatState {
  messages: ChatMessage[];
  currentQuestionIndex: number;
  answers: Partial<IntakeDataInput>;
  pendingMultiSelect: string[];
  pendingNumber: string;
  email: string;
  isSubmitting: boolean;
  submitError: string | null;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useChatIntake() {
  const router = useRouter();
  const [sessionId] = useState(() => nanoid(21));
  const msgCounter = useRef(0);

  function nextKey(): string {
    return `msg-${++msgCounter.current}`;
  }

  const [state, setState] = useState<ChatState>(() => ({
    messages: [{ role: 'bot', text: QUESTIONS[0].botMessage, key: nextKey() }],
    currentQuestionIndex: 0,
    answers: {},
    pendingMultiSelect: [],
    pendingNumber: '1',
    email: '',
    isSubmitting: false,
    submitError: null,
  }));

  const currentQuestion = QUESTIONS[state.currentQuestionIndex];

  // Advance to the next question, appending bot + user messages
  const advance = useCallback((userLabel: string, partialAnswers: Partial<IntakeDataInput>) => {
    setState((prev) => {
      const nextIndex = prev.currentQuestionIndex + 1;
      const nextQ = QUESTIONS[nextIndex];
      const newMessages: ChatMessage[] = [
        ...prev.messages,
        { role: 'user', text: userLabel, key: nextKey() },
        ...(nextQ ? [{ role: 'bot' as const, text: nextQ.botMessage, key: nextKey() }] : []),
      ];
      return {
        ...prev,
        messages: newMessages,
        currentQuestionIndex: nextIndex,
        answers: { ...prev.answers, ...partialAnswers },
        pendingMultiSelect: [],
        pendingNumber: nextQ?.type === 'number' ? String(nextQ.min ?? 0) : '1',
        submitError: null,
      };
    });
  }, []);

  // Initialize pendingNumber for the first number question
  useEffect(() => {
    if (currentQuestion?.type === 'number' && state.pendingNumber === '1') {
      setState((prev) => ({
        ...prev,
        pendingNumber: String(currentQuestion.min ?? 1),
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentQuestionIndex]);

  // ── Answer handlers ──────────────────────────────────────────────────────────

  const handleSingleSelect = useCallback((value: string, label: string) => {
    const q = QUESTIONS[state.currentQuestionIndex];
    advance(label, { [q.id]: value } as Partial<IntakeDataInput>);
  }, [state.currentQuestionIndex, advance]);

  const handleBoolean = useCallback((value: boolean) => {
    const q = QUESTIONS[state.currentQuestionIndex];
    advance(value ? 'Yes' : 'No', { [q.id]: value } as Partial<IntakeDataInput>);
  }, [state.currentQuestionIndex, advance]);

  const toggleMultiSelect = useCallback((value: string) => {
    setState((prev) => {
      const current = prev.pendingMultiSelect;
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, pendingMultiSelect: updated };
    });
  }, []);

  const confirmMultiSelect = useCallback(() => {
    const q = QUESTIONS[state.currentQuestionIndex];
    const values = state.pendingMultiSelect;
    if (values.length === 0) return;

    const labels = q.options
      ?.filter((o) => values.includes(o.value))
      .map((o) => o.label)
      .join(', ') ?? values.join(', ');

    if (q.id === 'loanTypes') {
      advance(labels, { loanTypes: values as LoanType[] });
    } else if (q.id === 'intent') {
      advance(labels, { intent: values as UserIntent[] });
    }
  }, [state.currentQuestionIndex, state.pendingMultiSelect, advance]);

  const setNumberValue = useCallback((value: string) => {
    setState((prev) => ({ ...prev, pendingNumber: value }));
  }, []);

  const confirmNumber = useCallback(() => {
    const q = QUESTIONS[state.currentQuestionIndex];
    const num = parseInt(state.pendingNumber, 10);
    const min = q.min ?? 0;
    const max = q.max ?? 999;
    if (isNaN(num) || num < min || num > max) return;

    if (q.id === 'familySize') {
      advance(String(num), { familySize: num });
    } else if (q.id === 'yearsInRepayment') {
      advance(String(num) + (num === 1 ? ' year' : ' years'), { yearsInRepayment: num });
    }
  }, [state.currentQuestionIndex, state.pendingNumber, advance]);

  const setEmail = useCallback((value: string) => {
    setState((prev) => ({ ...prev, email: value, submitError: null }));
  }, []);

  // ── Submission ───────────────────────────────────────────────────────────────

  const submitChat = useCallback(async () => {
    const email = state.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setState((prev) => ({ ...prev, submitError: 'Please enter a valid email address.' }));
      return;
    }

    setState((prev) => ({ ...prev, isSubmitting: true, submitError: null }));

    const answers = state.answers as IntakeDataInput;
    const payload = { ...answers, sessionId, timestamp: new Date().toISOString() };

    try {
      const [assessResult, subscribeResult] = await Promise.allSettled([
        fetch('/api/assess', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }),
        fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, sessionId }),
        }),
      ]);

      // Assess is required — block on it
      if (assessResult.status === 'rejected') {
        throw new Error('Assessment failed. Please try again.');
      }
      if (!assessResult.value.ok) {
        const err = await assessResult.value.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? 'Assessment failed. Please try again.');
      }

      // Subscribe is best-effort — log failure but don't block the user
      if (subscribeResult.status === 'rejected' || !subscribeResult.value.ok) {
        console.warn('[chat] Subscribe call failed — user will still see results');
      }

      router.push(`/assess/results?session=${sessionId}`);
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        submitError: err instanceof Error ? err.message : 'Something went wrong.',
      }));
    }
  }, [state.answers, state.email, sessionId, router]);

  return {
    messages: state.messages,
    currentQuestion,
    currentQuestionIndex: state.currentQuestionIndex,
    totalQuestions: QUESTIONS.length,
    pendingMultiSelect: state.pendingMultiSelect,
    pendingNumber: state.pendingNumber,
    email: state.email,
    isSubmitting: state.isSubmitting,
    submitError: state.submitError,
    isDone: state.currentQuestionIndex >= QUESTIONS.length,
    handleSingleSelect,
    handleBoolean,
    toggleMultiSelect,
    confirmMultiSelect,
    setNumberValue,
    confirmNumber,
    setEmail,
    submitChat,
  };
}
