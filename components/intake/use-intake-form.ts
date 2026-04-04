'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';
import { IntakeDataSchema, type IntakeDataInput } from '@/lib/validations';

const TOTAL_STEPS = 4;

// Fields validated at each step (used for per-step validation before advancing)
const STEP_FIELDS: (keyof IntakeDataInput)[][] = [
  ['loanTypes', 'balanceRange', 'repaymentStatus'],                    // Step 1
  ['employmentType', 'incomeRange', 'familySize', 'yearsInRepayment'], // Step 2
  ['intent'],                                                           // Step 3
  ['disbursedAfterJuly2026', 'enrolledInSAVE'],                        // Step 4
];

export function useIntakeForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Session ID generated once on mount — never stored to localStorage or cookies
  const [sessionId] = useState(() => nanoid(21));

  const form = useForm<IntakeDataInput>({
    resolver: zodResolver(IntakeDataSchema),
    defaultValues: {
      loanTypes: [],
      intent: [],
      familySize: 1,
      yearsInRepayment: 0,
      disbursedAfterJuly2026: null,
      enrolledInSAVE: null,
    },
    mode: 'onBlur',
  });

  const goNext = useCallback(async () => {
    const fieldsToValidate = STEP_FIELDS[step - 1];
    const valid = await form.trigger(fieldsToValidate);
    if (valid && step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    }
  }, [form, step]);

  const goBack = useCallback(() => {
    setStep((s) => Math.max(1, s - 1));
  }, []);

  const onSubmit = useCallback(
    async (data: IntakeDataInput) => {
      setIsSubmitting(true);
      setSubmitError(null);

      const payload = {
        ...data,
        sessionId,
        timestamp: new Date().toISOString(),
      };

      try {
        const res = await fetch('/api/assess', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error ?? 'Assessment failed. Please try again.');
        }

        router.push(`/assess/results?session=${sessionId}`);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Something went wrong.');
        setIsSubmitting(false);
      }
    },
    [router, sessionId],
  );

  return {
    form,
    step,
    totalSteps: TOTAL_STEPS,
    isSubmitting,
    submitError,
    goNext,
    goBack,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
