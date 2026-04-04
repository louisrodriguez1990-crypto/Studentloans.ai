import Link from 'next/link';
import { ExternalLink, Mail, TrendingDown, Award, Users, CheckCircle, Clock } from 'lucide-react';
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
    title: 'You may qualify for a lower rate',
    description:
      'Based on your income and loan profile, refinancing to a private loan could lower your ' +
      'monthly payment. Note: refinancing means giving up IDR plans and forgiveness protections permanently.',
    actionLabel: 'See if you qualify at ELFI',
    actionHref: 'https://www.elfi.com/?code=39533',
    isAffiliate: true,
    isExternal: true,
  },
  forgiveness_candidate: {
    icon: Award,
    title: 'Check your PSLF payment count',
    description:
      "You appear eligible for Public Service Loan Forgiveness. Use the FSA's PSLF Help Tool " +
      'to verify your employer and track your qualifying payments.',
    actionLabel: 'Open PSLF Help Tool',
    actionHref: 'https://studentaid.gov/pslf/',
    isExternal: true,
  },
  needs_specialist: {
    icon: Users,
    title: 'Talk to a student-loan advisor',
    description:
      'Your situation has complexity that benefits from personalized guidance. ' +
      'A fee-only student loan advisor can review your full picture.',
    actionLabel: 'Find an advisor',
    actionHref: '/compare/forgiveness-paths',
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

  // Show primary CTA (first tag) prominently, others as secondary
  const [primary, ...secondary] = routingTags;
  const primaryConfig = CTA_CONFIG[primary];
  const hasAffiliate = routingTags.some((t) => CTA_CONFIG[t]?.isAffiliate);

  return (
    <div className="space-y-4">
      {hasAffiliate && <AffiliateDisclosure />}

      {/* Primary CTA */}
      <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6">
        <div className="flex items-start gap-4">
          <primaryConfig.icon className="h-6 w-6 shrink-0 text-blue-600" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{primaryConfig.title}</h3>
            <p className="mt-1 text-sm text-gray-700">{primaryConfig.description}</p>
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
                  <Button size="md">{primaryConfig.actionLabel}</Button>
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
              <div key={tag} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-start gap-3">
                  <cfg.icon className="h-5 w-5 shrink-0 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{cfg.title}</p>
                    <div className="mt-2">
                      {cfg.isExternal ? (
                        <a
                          href={cfg.actionHref}
                          target="_blank"
                          rel={`noopener noreferrer nofollow${cfg.isAffiliate ? ' sponsored' : ''}`}
                          className="text-sm text-blue-600 underline hover:text-blue-700"
                        >
                          {cfg.actionLabel}
                        </a>
                      ) : (
                        <Link
                          href={cfg.actionHref}
                          className="text-sm text-blue-600 underline hover:text-blue-700"
                        >
                          {cfg.actionLabel}
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
