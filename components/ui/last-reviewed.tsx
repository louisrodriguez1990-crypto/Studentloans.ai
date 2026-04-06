import { CalendarCheck, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { POLICY_AS_OF_DATE } from '@/lib/constants';

interface LastReviewedProps {
  date?: string;
  source?: string;
  sourceUrl?: string;
  className?: string;
}

export function LastReviewed({
  date = POLICY_AS_OF_DATE,
  source = 'studentaid.gov',
  sourceUrl = 'https://studentaid.gov',
  className,
}: LastReviewedProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-500',
        className,
      )}
    >
      <CalendarCheck className="h-3.5 w-3.5 text-[#00C9A7]" />
      <span>
        Last reviewed {date}
      </span>
      <span className="text-gray-300">|</span>
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-0.5 text-[#00C9A7] hover:text-[#00b396] transition-colors"
      >
        {source}
        <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}
