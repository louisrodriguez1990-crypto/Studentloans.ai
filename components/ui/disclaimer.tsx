import { cn } from '@/lib/utils';
import { NOT_FINANCIAL_ADVICE_DISCLAIMER } from '@/lib/constants';

interface DisclaimerProps {
  className?: string;
  text?: string;
}

export function Disclaimer({ className, text = NOT_FINANCIAL_ADVICE_DISCLAIMER }: DisclaimerProps) {
  return (
    <p
      className={cn(
        'text-xs text-gray-500 border-t border-gray-200 pt-4 mt-4 leading-relaxed',
        className,
      )}
    >
      <strong>Disclaimer:</strong> {text}
    </p>
  );
}
