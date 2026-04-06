'use client';

import { type UseFormReturn } from 'react-hook-form';
import { type IntakeDataInput } from '@/lib/validations';

// Step 4 — 2026-specific timing questions
interface StepEmploymentProps {
  form: UseFormReturn<IntakeDataInput>;
}

export function StepEmployment({ form }: StepEmploymentProps) {
  const { watch, setValue, formState: { errors } } = form;
  const disbursed = watch('disbursedAfterJuly2026');
  const enrolledInSAVE = watch('enrolledInSAVE');

  function setDisbursed(val: boolean | null) {
    setValue('disbursedAfterJuly2026', val, { shouldValidate: true });
  }

  function setEnrolledInSAVE(val: boolean | null) {
    setValue('enrolledInSAVE', val, { shouldValidate: true });
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-[#1a1f36]">A few 2026-specific questions</h2>
        <p className="mt-1 text-sm text-gray-500">
          Recent policy changes hinge on specific dates. These help us apply the right rules.
        </p>
      </div>

      {/* Disbursement date */}
      <div>
        <h3 className="text-base font-medium text-[#1a1f36]">
          Were any of your loans first disbursed or consolidated on or after July 1, 2026?
        </h3>
        <p className="mt-0.5 text-xs text-gray-500">
          You can find disbursement dates in your loan details at studentaid.gov.
        </p>
        <div className="mt-3 flex gap-3">
          {[
            { label: 'Yes', value: true },
            { label: 'No', value: false },
            { label: "I'm not sure", value: null },
          ].map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => setDisbursed(opt.value)}
              className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                disbursed === opt.value
                  ? 'border-[#00C9A7] bg-[#e6faf6] font-medium text-[#00b396]'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {errors.disbursedAfterJuly2026 && (
          <p className="mt-1 text-sm text-red-600">{errors.disbursedAfterJuly2026.message}</p>
        )}
      </div>

      {/* SAVE enrollment */}
      <div>
        <h3 className="text-base font-medium text-[#1a1f36]">
          Are you currently enrolled in the SAVE Plan (Saving on a Valuable Education)?
        </h3>
        <p className="mt-0.5 text-xs text-gray-500">
          SAVE replaced REPAYE in 2023. Check your current plan on your servicer's website or
          studentaid.gov.
        </p>
        <div className="mt-3 flex gap-3">
          {[
            { label: 'Yes', value: true },
            { label: 'No', value: false },
            { label: "I'm not sure", value: null },
          ].map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => setEnrolledInSAVE(opt.value)}
              className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                enrolledInSAVE === opt.value
                  ? 'border-[#00C9A7] bg-[#e6faf6] font-medium text-[#00b396]'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {errors.enrolledInSAVE && (
          <p className="mt-1 text-sm text-red-600">{errors.enrolledInSAVE.message}</p>
        )}
      </div>
    </div>
  );
}
