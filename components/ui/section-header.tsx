import { cn } from '@/lib/utils';
import { Badge } from './badge';
import type { BadgeVariant } from './badge';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: BadgeVariant;
  align?: 'center' | 'left';
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  badgeVariant = 'default',
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-left', 'mb-12', className)}>
      {badge && (
        <Badge variant={badgeVariant} className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl font-bold text-[#1a1f36] tracking-tight">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            'mt-3 text-[#4a5568] leading-relaxed',
            align === 'center' && 'max-w-xl mx-auto',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
