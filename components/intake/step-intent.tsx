'use client';

import { type UseFormReturn } from 'react-hook-form';
import { type IntakeDataInput } from '@/lib/validations';
import { type UserIntent } from '@/engine/types';

const INTENT_OPTIONS: { value: UserIntent; label: string; description: string }[] = [
  {
    value: 'save_plan_impact',
    label: 'How the SAVE Plan changes affect me',
    description: 'The SAVE Plan is currently subject to a court injunction',
  },
  {
    value: 'refinance_consideration',
    label: 'Whether I should refinance',
    description: 'Understand the trade-offs of refinancing federal vs. private loans',
  },
  {
    value: 'forgiveness_eligibility',
    label: 'Whether I qualify for forgiveness',
    description: 'PSLF, IDR forgiveness, or other cancellation programs',
  },
  {
    value: 'best_repayment_plan',
    label: 'What repayment plan is best for me',
    description: 'Compare income-driven, standard, and other plans',
  },
  {
    value: 'consolidation',
    label: 'Whether I should consolidate',
    description: 'Understand when consolidation helps or hurts',
  },
  {
    value: 'understand_options',
    label: 'I just want to understand my options',
    description: "Get a full picture of what's available to you",
  },
];

interface StepIntentProps {
  form: UseFormReturn<IntakeDataInput>;
}

export function StepIntent({ form }: StepIntentProps) {
  const { watch, setValue, formState: { errors } } = form;
  const selected = watch('intent') ?? [];

  function toggleIntent(value: UserIntent) {
    if (selected.includes(value)) {
      setValue('intent', selected.filter((i) => i !== value), { shouldValidate: true });
    } else {
      setValue('intent', [...selected, value], { shouldValidate: true });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#1a1f36]">What are you trying to figure out?</h2>
        <p className="mt-1 text-sm text-gray-500">Select all that apply.</p>
      </div>

      <div className="space-y-3">
        {INTENT_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
              selected.includes(opt.value)
                ? 'border-[#00C9A7] bg-[#e6faf6]'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#00C9A7]"
              checked={selected.includes(opt.value)}
              onChange={() => toggleIntent(opt.value)}
            />
            <div>
              <p className="text-sm font-medium text-[#1a1f36]">{opt.label}</p>
              <p className="text-xs text-gray-500">{opt.description}</p>
            </div>
          </label>
        ))}
        {errors.intent && (
          <p className="text-sm text-red-600">{errors.intent.message}</p>
        )}
      </div>
    </div>
  );
}
