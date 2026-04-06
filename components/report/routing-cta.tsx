import Link from 'next/link';
import {
  ExternalLink,
  Mail,
  TrendingDown,
  Award,
  Users,
  CheckCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure';
import type { RoutingTag } from '@/engine/types';

interface CTAConfig {
  icon: React.ElementType;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  isAffiliate?: boolean;
  isExternal?: boolean;
}

const CTA_CONFIG: Record<RoutingTag, CTAConfig> = {
  refinance_candidate: {
    icon: TrendingDown,
    title: 'Compare refinancing rates — 5 lenders',
    description:
      'Based on your income and employment, refinancing may lower your monthly payment. ' +
      "Compare 5 lenders side-by-side — including rates, fees, and the federal benefits you'd give up.",
    actionLabel: 'Compare rates from 5 lenders',
    actionHref: '/compare/refinance-lenders',
    isAffiliate: true,
    isExternal: false,
  },
  forgiveness_candidate: {
    icon: Award,
    title: 'Track your PSLF qualifying payments',
    description:
      'You appear eligible for Public Service Loan Forgiveness. Use our free PSLF Tracker ' +
      'to log payments, estimate your forgiveness date, and stay on top of 2026 rule changes.',
    actionLabel: 'Open PSLF Tracker',
    actionHref: '/tools/pslf-tracker',
    isExternal: false,
  },
  needs_specialist: {
    icon: Users,
    title: 'Get matched with a student loan advisor',
    description:
      'Your situation has complexity that benefits from personalized guidance. ' +
      "We'll match you with a fee-only advisor who can review your full picture — free to request.",
    actionLabel: 'Request an advisor match',
    actionHref: '/advisors',
  },
  confusion_high: {
    icon: Mail,
    title: 'Want us to walk you through this?',
    description:
      'Save your assessment and receive a personalized follow-up guide. ' +
      "We'll send you a plain-English breakdown of your options.",
    actionLabel: 'Save my assessment',
    actionHref: '/assess/save',
  },
  no_action_needed: {
    icon: CheckCircle,
    title: "You're in good shape",
    description:
      "Your current repayment path looks appropriate. Stay informed as policy changes — " +
      "we'll send you updates when anything relevant changes.",
    actionLabel: 'Get policy updates',
    actionHref: '/assess/save',
  },
  deadline_sensitive: {
    icon: Clock,
    title: 'Time-sensitive: check your SAVE Plan status',
    description:
      'Your SAVE Plan payments are currently paused due to a court injunction. ' +
      'Visit studentaid.gov to confirm your current plan status and forbearance details.',
    actionLabel: 'Check status at studentaid.gov',
    actionHref: 'https://studentaid.gov/announcements-events/save-plan',
    isExternal: true,
  },
};

interface RoutingCTAProps {
  routingTags: RoutingTag[];
}

export function RoutingCTA({ routingTags }: RoutingCTAProps) {
  if (routingTags.length === 0) return null;

  const [primary, ...secondary] = routingTags;
  const primaryConfig = CTA_CONFIG[primary];
  const hasAffiliate = routingTags.some((t) => CTA_CONFIG[t]?.isAffiliate);

  return (
    <div className="space-y-4">
      {hasAffiliate && <AffiliateDisclosure />}

      {/* Primary CTA */}
      <div className="rounded-xl border-2 border-[#00C9A7]/30 bg-[#e6faf6] p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00C9A7]/20">
            <primaryConfig.icon className="h-5 w-5 text-[#00C9A7]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[#1a1f36]">{primaryConfig.title}</h3>
            <p className="mt-1 text-sm text-[#4a5568]">{primaryConfig.description}</p>
            <div className="mt-4">
              {primaryConfig.isExternal ? (
                <a
                  href={primaryConfig.actionHref}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={primaryConfig.isAffiliate ? 'sponsored' : undefined}
                >
                  <Button size="md">
                    {primaryConfig.actionLabel}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              ) : (
                <Link href={primaryConfig.actionHref}>
                  <Button size="md">
                    {primaryConfig.actionLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary CTAs */}
      {secondary.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {secondary.map((tag) => {
            const cfg = CTA_CONFIG[tag];
            return (
              <div
                key={tag}
                className="rounded-lg border border-gray-200 bg-white p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <cfg.icon className="h-5 w-5 shrink-0 text-[#00C9A7]" />
                  <div>
                    <p className="text-sm font-medium text-[#1a1f36]">{cfg.title}</p>
                    <div className="mt-2">
                      {cfg.isExternal ? (
                        <a
                          href={cfg.actionHref}
                          target="_blank"
                          rel={`noopener noreferrer nofollow${cfg.isAffiliate ? ' sponsored' : ''}`}
                          className="inline-flex items-center gap-1 text-sm text-[#00C9A7] hover:text-[#00b396] font-medium transition-colors"
                        >
                          {cfg.actionLabel}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <Link
                          href={cfg.actionHref}
                          className="inline-flex items-center gap-1 text-sm text-[#00C9A7] hover:text-[#00b396] font-medium transition-colors"
                        >
                          {cfg.actionLabel}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
