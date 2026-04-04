'use client';

import { useIntakeForm } from './use-intake-form';
import { StepLoanTypes } from './step-loan-types';
import { StepFinancial } from './step-financial';
import { StepIntent } from './step-intent';
import { StepEmployment } from './step-employment';
import { FormNavigation } from './form-navigation';
import { Card, CardContent } from '@/components/ui/card';

export function IntakeForm() {
  const { form, step, totalSteps, isSubmitting, submitError, goNext, goBack, onSubmit } =
    useIntakeForm();

  return (
    <form onSubmit={onSubmit} noValidate>
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-8">
          <div className="min-h-[400px]">
            {step === 1 && <StepLoanTypes form={form} />}
            {step === 2 && <StepFinancial form={form} />}
            {step === 3 && <StepIntent form={form} />}
            {step === 4 && <StepEmployment form={form} />}
          </div>

          {submitError && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <div className="mt-8">
            <FormNavigation
              step={step}
              totalSteps={totalSteps}
              isSubmitting={isSubmitting}
              onBack={goBack}
              onNext={goNext}
              isLastStep={step === totalSteps}
            />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
