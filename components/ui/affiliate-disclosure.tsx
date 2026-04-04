import { cn } from '@/lib/utils';
import { AFFILIATE_DISCLOSURE } from '@/lib/constants';

interface AffiliateDisclosureProps {
  className?: string;
}

export function AffiliateDisclosure({ className }: AffiliateDisclosureProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800',
        className,
      )}
      role="note"
      aria-label="Affiliate disclosure"
    >
      <strong>Disclosure:</strong> {AFFILIATE_DISCLOSURE}
    </div>
  );
}
