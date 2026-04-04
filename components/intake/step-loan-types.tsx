'use client';

import { type UseFormReturn } from 'react-hook-form';
import { type IntakeDataInput } from '@/lib/validations';
import { type LoanType, type BalanceRange, type RepaymentStatus } from '@/engine/types';

const LOAN_TYPE_OPTIONS: { value: LoanType; label: string; description: string }[] = [
  {
    value: 'federal_direct',
    label: 'Federal Direct Loans',
    description: 'Subsidized, Unsubsidized, PLUS, or Grad PLUS loans from the U.S. Department of Education',
  },
  {
    value: 'ffel',
    label: 'FFEL Loans',
    description: 'Federal Family Education Loans — made by private lenders before 2010',
  },
  {
    value: 'perkins',
    label: 'Perkins Loans',
    description: 'Campus-based loans issued by your school (program ended in 2017)',
  },
  {
    value: 'private',
    label: 'Private Student Loans',
    description: 'Loans from banks, credit unions, or other private lenders',
  },
  {
    value: 'unknown',
    label: "I'm not sure",
    description: "You can find your federal loan types at studentaid.gov/aid-summary",
  },
];

const BALANCE_OPTIONS: { value: BalanceRange; label: string }[] = [
  { value: 'under_10k', label: 'Under $10,000' },
  { value: '10k_30k', label: '$10,000 – $30,000' },
  { value: '30k_60k', label: '$30,000 – $60,000' },
  { value: '60k_100k', label: '$60,000 – $100,000' },
  { value: 'over_100k', label: 'Over $100,000' },
];

const STATUS_OPTIONS: { value: RepaymentStatus; label: string }[] = [
  { value: 'in_repayment', label: 'Currently making payments' },
  { value: 'grace_period', label: 'In grace period (recently graduated)' },
  { value: 'forbearance_deferment', label: 'In forbearance or deferment' },
  { value: 'in_default', label: 'In default' },
  { value: 'unknown', label: "I'm not sure" },
];

interface StepLoanTypesProps {
  form: UseFormReturn<IntakeDataInput>;
}

export function StepLoanTypes({ form }: StepLoanTypesProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const selectedTypes = watch('loanTypes') ?? [];
  const selectedBalance = watch('balanceRange');
  const selectedStatus = watch('repaymentStatus');

  function toggleLoanType(value: LoanType) {
    const current = selectedTypes;
    if (current.includes(value)) {
      setValue('loanTypes', current.filter((t) => t !== value), { shouldValidate: true });
    } else {
      setValue('loanTypes', [...current, value], { shouldValidate: true });
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">What types of student loans do you have?</h2>
        <p className="mt-1 text-sm text-gray-500">Select all that apply.</p>
      </div>

      {/* Loan type checkboxes */}
      <div className="space-y-3">
        {LOAN_TYPE_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
              selectedTypes.includes(opt.value)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600"
              checked={selectedTypes.includes(opt.value)}
              onChange={() => toggleLoanType(opt.value)}
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{opt.label}</p>
              <p className="text-xs text-gray-500">{opt.description}</p>
            </div>
          </label>
        ))}
        {errors.loanTypes && (
          <p className="text-sm text-red-600">{errors.loanTypes.message}</p>
        )}
      </div>

      {/* Balance range */}
      <div>
        <h3 className="text-base font-medium text-gray-900">Approximate total balance</h3>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {BALANCE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 text-sm transition-colors ${
                selectedBalance === opt.value
                  ? 'border-blue-500 bg-blue-50 font-medium text-blue-700'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                className="sr-only"
                value={opt.value}
                {...register('balanceRange')}
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.balanceRange && (
          <p className="mt-1 text-sm text-red-600">{errors.balanceRange.message}</p>
        )}
      </div>

      {/* Repayment status */}
      <div>
        <h3 className="text-base font-medium text-gray-900">Current repayment status</h3>
        <div className="mt-3 space-y-2">
          {STATUS_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors ${
                selectedStatus === opt.value
                  ? 'border-blue-500 bg-blue-50 font-medium text-blue-700'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                className="h-4 w-4 border-gray-300 text-blue-600"
                value={opt.value}
                {...register('repaymentStatus')}
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.repaymentStatus && (
          <p className="mt-1 text-sm text-red-600">{errors.repaymentStatus.message}</p>
        )}
      </div>
    </div>
  );
}
