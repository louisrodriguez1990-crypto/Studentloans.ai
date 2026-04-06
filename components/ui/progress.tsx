import { cn } from '@/lib/utils';

interface ProgressProps {
  current: number;
  total: number;
  className?: string;
}

export function Progress({ current, total, className }: ProgressProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex justify-between text-xs text-gray-500">
        <span>
          Step {current} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-200">
        <div
          className="h-1.5 rounded-full bg-[#00C9A7] transition-all duration-300"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
