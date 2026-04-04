'use client';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface FormNavigationProps {
  step: number;
  totalSteps: number;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
  isLastStep: boolean;
}

export function FormNavigation({
  step,
  totalSteps,
  isSubmitting,
  onBack,
  onNext,
  isLastStep,
}: FormNavigationProps) {
  return (
    <div className="space-y-4">
      <Progress current={step} total={totalSteps} />

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          disabled={step === 1 || isSubmitting}
          size="md"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>

        {isLastStep ? (
          <Button type="submit" disabled={isSubmitting} size="lg">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Get My Assessment'
            )}
          </Button>
        ) : (
          <Button type="button" onClick={onNext} disabled={isSubmitting} size="md">
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
