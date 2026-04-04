import { Badge } from '@/components/ui/badge';
import type { ConfidenceLevel } from '@/engine/types';

const CONFIG: Record<
  ConfidenceLevel,
  { label: string; variant: 'success' | 'warning' | 'destructive'; description: string }
> = {
  high: {
    label: 'High confidence',
    variant: 'success',
    description: 'All key inputs were provided clearly.',
  },
  medium: {
    label: 'Medium confidence',
    variant: 'warning',
    description: 'Some inputs were uncertain — results may be less precise.',
  },
  low: {
    label: 'Low confidence',
    variant: 'destructive',
    description:
      'Several inputs were marked "not sure." Consider consulting a specialist for personalized guidance.',
  },
};

interface ConfidenceBadgeProps {
  confidence: ConfidenceLevel;
}

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  const cfg = CONFIG[confidence];
  return (
    <div className="flex items-start gap-2">
      <Badge variant={cfg.variant}>{cfg.label}</Badge>
      <span className="text-xs text-gray-500">{cfg.description}</span>
    </div>
  );
}
