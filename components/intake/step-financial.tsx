'use client';

import { type UseFormReturn } from 'react-hook-form';
import { type IntakeDataInput } from '@/lib/validations';
import { type EmploymentType, type IncomeRange } from '@/engine/types';

const EMPLOYMENT_OPTIONS: { value: EmploymentType; label: string }[] = [
  { value: 'government_nonprofit', label: 'Government or nonprofit' },
  { value: 'private_sector', label: 'Private sector' },
  { value: 'self_employed', label: 'Self-employed or freelance' },
  { value: 'unemployed', label: 'Not currently employed' },
];

const INCOME_OPTIONS: { value: IncomeRange; label: string }[] = [
  { value: 'under_30k', label: 'Under $30,000' },
  { value: '30k_50k', label: '$30,000 – $50,000' },
  { value: '50k_75k', label: '$50,000 – $75,000' },
  { value: '75k_100k', label: '$75,000 – $100,000' },
  { value: 'over_100k', label: 'Over $100,000' },
];

interface StepFinancialProps {
  form: UseFormReturn<IntakeDataInput>;
}

export function StepFinancial({ form }: StepFinancialProps) {
  const { register, watch, formState: { errors } } = form;
  const selectedEmployment = watch('employmentType');
  const selectedIncome = watch('incomeRange');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-[#1a1f36]">Your financial situation</h2>
        <p className="mt-1 text-sm text-gray-500">
          This helps determine which repayment options apply to you.
        </p>
      </div>

      {/* Employment type */}
      <div>
        <h3 className="text-base font-medium text-[#1a1f36]">Employment type</h3>
        <div className="mt-3 space-y-2">
          {EMPLOYMENT_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors ${
                selectedEmployment === opt.value
                  ? 'border-[#00C9A7] bg-[#e6faf6] font-medium text-[#00b396]'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                className="h-4 w-4 border-gray-300 accent-[#00C9A7]"
                value={opt.value}
                {...register('employmentType')}
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.employmentType && (
          <p className="mt-1 text-sm text-red-600">{errors.employmentType.message}</p>
        )}
      </div>

      {/* Annual income */}
      <div>
        <h3 className="text-base font-medium text-[#1a1f36]">Approximate annual income</h3>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {INCOME_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 text-sm transition-colors ${
                selectedIncome === opt.value
                  ? 'border-[#00C9A7] bg-[#e6faf6] font-medium text-[#00b396]'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                className="sr-only"
                value={opt.value}
                {...register('incomeRange')}
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.incomeRange && (
          <p className="mt-1 text-sm text-red-600">{errors.incomeRange.message}</p>
        )}
      </div>

      {/* Family size */}
      <div>
        <label className="text-base font-medium text-[#1a1f36]" htmlFor="familySize">
          Family size (including yourself)
        </label>
        <p className="mt-0.5 text-xs text-gray-500">
          Used to calculate income-driven repayment eligibility thresholds.
        </p>
        <input
          id="familySize"
          type="number"
          min={1}
          max={20}
          className="mt-2 block w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#00C9A7] focus:outline-none focus:ring-1 focus:ring-[#00C9A7]/30"
          {...register('familySize', { valueAsNumber: true })}
        />
        {errors.familySize && (
          <p className="mt-1 text-sm text-red-600">{errors.familySize.message}</p>
        )}
      </div>

      {/* Years in repayment */}
      <div>
        <label className="text-base font-medium text-[#1a1f36]" htmlFor="yearsInRepayment">
          Years since you first entered repayment
        </label>
        <p className="mt-0.5 text-xs text-gray-500">
          Approximate is fine. Enter 0 if you haven't started repayment yet.
        </p>
        <input
          id="yearsInRepayment"
          type="number"
          min={0}
          max={40}
          className="mt-2 block w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#00C9A7] focus:outline-none focus:ring-1 focus:ring-[#00C9A7]/30"
          {...register('yearsInRepayment', { valueAsNumber: true })}
        />
        {errors.yearsInRepayment && (
          <p className="mt-1 text-sm text-red-600">{errors.yearsInRepayment.message}</p>
        )}
      </div>
    </div>
  );
}
