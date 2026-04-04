import { AlertTriangle, Info, XCircle } from 'lucide-react';
import type { Warning } from '@/engine/types';

const SEVERITY_CONFIG = {
  critical: {
    icon: XCircle,
    containerClass: 'border-red-200 bg-red-50',
    iconClass: 'text-red-600',
    titleClass: 'text-red-900',
    textClass: 'text-red-800',
  },
  warning: {
    icon: AlertTriangle,
    containerClass: 'border-yellow-200 bg-yellow-50',
    iconClass: 'text-yellow-600',
    titleClass: 'text-yellow-900',
    textClass: 'text-yellow-800',
  },
  info: {
    icon: Info,
    containerClass: 'border-blue-200 bg-blue-50',
    iconClass: 'text-blue-600',
    titleClass: 'text-blue-900',
    textClass: 'text-blue-800',
  },
};

interface WarningsListProps {
  warnings: Warning[];
}

export function WarningsList({ warnings }: WarningsListProps) {
  if (warnings.length === 0) return null;

  // Sort: critical first
  const sorted = [...warnings].sort((a, b) => {
    const order = { critical: 0, warning: 1, info: 2 };
    return order[a.severity] - order[b.severity];
  });

  return (
    <div className="space-y-3">
      {sorted.map((warning) => {
        const cfg = SEVERITY_CONFIG[warning.severity];
        const Icon = cfg.icon;
        return (
          <div
            key={warning.id}
            className={`rounded-lg border p-4 ${cfg.containerClass}`}
            role="alert"
          >
            <div className="flex items-start gap-3">
              <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${cfg.iconClass}`} />
              <div>
                <p className={`text-sm font-medium ${cfg.titleClass}`}>{warning.title}</p>
                <p className={`mt-1 text-sm ${cfg.textClass}`}>{warning.detail}</p>
                {warning.source && (
                  <a
                    href={warning.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-1 block text-xs underline ${cfg.textClass}`}
                  >
                    Source: {warning.source}
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
