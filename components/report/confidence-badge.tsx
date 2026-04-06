import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, ShieldAlert, ShieldQuestion, ArrowRight } from 'lucide-react';
import type { ConfidenceLevel } from '@/engine/types';

const CONFIG: Record<
  ConfidenceLevel,
  {
    label: string;
    variant: 'success' | 'warning' | 'destructive';
    description: string;
    icon: React.ElementType;
    showSpecialistCTA: boolean;
  }
> = {
  high: {
    label: 'High confidence',
    variant: 'success',
    description: 'All key inputs were provided clearly.',
    icon: ShieldCheck,
    showSpecialistCTA: false,
  },
  medium: {
    label: 'Medium confidence',
    variant: 'warning',
    description: 'Some inputs were uncertain — results may be less precise.',
    icon: ShieldAlert,
    showSpecialistCTA: false,
  },
  low: {
    label: 'Low confidence',
    variant: 'destructive',
    description: 'Several inputs were marked "not sure."',
    icon: ShieldQuestion,
    showSpecialistCTA: true,
  },
};

interface ConfidenceBadgeProps {
  confidence: ConfidenceLevel;
}

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  const cfg = CONFIG[confidence];
  const Icon = cfg.icon;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${
          cfg.variant === 'success' ? 'text-green-600' :
          cfg.variant === 'warning' ? 'text-amber-600' :
          'text-red-600'
        }`} />
        <Badge variant={cfg.variant}>{cfg.label}</Badge>
        <span className="text-xs text-gray-500">{cfg.description}</span>
      </div>
      {cfg.showSpecialistCTA && (
        <Link
          href="/advisors"
          className="inline-flex items-center gap-1 text-xs font-medium text-[#00C9A7] hover:text-[#00b396] transition-colors"
        >
          Consider consulting a specialist for personalized guidance
          <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}
