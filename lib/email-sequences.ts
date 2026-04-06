/**
 * Segment-specific email drip sequences.
 * Sent via Resend scheduledAt after a subscriber is created.
 * Day 0 confirmation email is handled separately in /api/subscribe.
 */

export interface Drip {
  delayDays: number;
  subject: string;
  html: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://studentdebt.ai';

function wrap(body: string): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
      ${body}
      <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;" />
      <p style="font-size: 11px; color: #9ca3af;">
        StudentDebt.ai provides educational information only. Nothing in this email constitutes
        financial or legal advice. Affiliate relationships are disclosed at
        <a href="${BASE_URL}/about#affiliates">studentdebt.ai/about</a>.
        Reply "unsubscribe" to stop receiving emails.
      </p>
    </div>
  `.trim();
}

export const DRIP_SEQUENCES: Record<string, Drip[]> = {
  refinance_candidate: [
    {
      delayDays: 2,
      subject: 'How refinancing actually works — and when it\'s a bad idea',
      html: wrap(`
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">
          Refinancing 101: the trade-off you need to understand first
        </h2>
        <p>When you refinance federal loans to a private lender, you're exchanging federal
        protections for a lower interest rate.</p>
        <p>You <strong>gain:</strong> a lower rate, lower monthly payment, less interest paid over time.</p>
        <p>You <strong>permanently lose:</strong></p>
        <ul>
          <li>Income-driven repayment (IBR, PAYE, SAVE)</li>
          <li>Public Service Loan Forgiveness (PSLF)</li>
          <li>Federal forbearance and deferment options</li>
          <li>Income-driven forgiveness after 20–25 years</li>
        </ul>
        <p>If you work for a government or nonprofit employer and might qualify for PSLF,
        <strong>do not refinance</strong>. The forgiveness is worth more than any rate reduction.</p>
        <p>If you're in the private sector, have stable income, and your loans are above ~5%,
        refinancing is worth evaluating.</p>
        <p>
          <a href="${BASE_URL}/calculators/refinance-savings" style="color: #059669;">
            → See how much you could save with our free calculator
          </a>
        </p>
      `),
    },
    {
      delayDays: 5,
      subject: 'What rate could you actually get?',
      html: wrap(`
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">
          Calculate your potential savings before you apply
        </h2>
        <p>Before you apply to any lender, it helps to know your numbers — how much you'd save
        per month and over the life of your loans.</p>
        <p>Our refinancing calculator takes 30 seconds:</p>
        <p>
          <a href="${BASE_URL}/calculators/refinance-savings"
             style="display: inline-block; background: #059669; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Open the Refinance Savings Calculator →
          </a>
        </p>
        <p style="margin-top: 16px; font-size: 14px; color: #6b7280;">
          Tip: most lenders do a <strong>soft credit check</strong> for rate quotes — no impact
          to your credit score until you formally apply.
        </p>
      `),
    },
    {
      delayDays: 10,
      subject: '5 lenders compared — StudentDebt.ai\'s breakdown',
      html: wrap(`
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">
          Here's how the top refinancing lenders stack up
        </h2>
        <p>We compared 5 major student loan refinancing lenders on rates, fees, and borrower
        protections. Here's the short version:</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 16px 0;">
          <tr style="background: #f9fafb;">
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid #e5e7eb;">Lender</th>
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid #e5e7eb;">Rates from</th>
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid #e5e7eb;">Notable feature</th>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">ELFI</td>
            <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">~4.9% APR</td>
            <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">No fees, dedicated loan advisor</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">Earnest</td>
            <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">~5.1% APR</td>
            <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">Flexible payment options</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">SoFi</td>
            <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">~5.2% APR</td>
            <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">Unemployment protection</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">Laurel Road</td>
            <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">~5.3% APR</td>
            <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">Medical/dental professional bonus</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Splash</td>
            <td style="padding: 8px;">~5.0% APR</td>
            <td style="padding: 8px;">Matches offers from multiple lenders</td>
          </tr>
        </table>
        <p>
          <a href="${BASE_URL}/compare/refinance-lenders"
             style="display: inline-block; background: #059669; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Compare all 5 lenders side-by-side →
          </a>
        </p>
        <p style="font-size: 11px; color: #9ca3af; margin-top: 12px;">
          Affiliate disclosure: StudentDebt.ai may receive compensation if you apply through our
          lender links. This does not affect our ratings or recommendations.
        </p>
      `),
    },
    {
      delayDays: 21,
      subject: 'Still thinking about refinancing?',
      html: wrap(`
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">
          A quick check-in on your refinancing options
        </h2>
        <p>Rates change. If you haven't taken action yet, it's worth a quick look to see
        where rates stand today.</p>
        <p>The process is straightforward:</p>
        <ol>
          <li>Check rates with 2–3 lenders (soft credit check, no impact)</li>
          <li>Compare offers — look at APR, not just rate</li>
          <li>Apply with the best offer</li>
        </ol>
        <p>
          <a href="${BASE_URL}/compare/refinance-lenders" style="color: #059669;">
            → Check current rates from 5 lenders
          </a>
        </p>
      `),
    },
  ],

  forgiveness_candidate: [
    {
      delayDays: 3,
      subject: 'How to get your employer certified for PSLF — step by step',
      html: wrap(`
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">
          The PSLF Employer Certification Form: do this now
        </h2>
        <p>If you're pursuing PSLF, the most important thing you can do right now is submit
        an <strong>Employer Certification Form (ECF)</strong> through MOHELA, your PSLF servicer.</p>
        <p><strong>Why it matters:</strong> The ECF confirms your employer qualifies and
        officially starts your qualifying payment clock. Without it, MOHELA can't track
        your progress.</p>
        <p><strong>How to submit:</strong></p>
        <ol>
          <li>Go to studentaid.gov and log in with your FSA ID</li>
          <li>Find "PSLF Help Tool" — it guides you through employer verification</li>
          <li>Have your employer sign the form (HR department can usually do this)</li>
          <li>Submit to MOHELA — they'll confirm your payment count</li>
        </ol>
        <p>Submit annually and after every employer change.</p>
        <p>
          <a href="${BASE_URL}/tools/pslf-tracker" style="color: #059669;">
            → Track your qualifying payments with our free PSLF tracker
          </a>
        </p>
      `),
    },
    {
      delayDays: 7,
      subject: 'Track your 120 PSLF payments — free tool',
      html: wrap(`
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">
          How many PSLF payments have you made?
        </h2>
        <p>PSLF requires exactly 120 qualifying payments. Many borrowers lose track —
        or don't realize some months didn't count.</p>
        <p>Our PSLF tracker lets you:</p>
        <ul>
          <li>Record your qualifying payment count</li>
          <li>See how many months remain</li>
          <li>Get an estimated forgiveness date</li>
          <li>Track your forgiven balance amount</li>
        </ul>
        <p>Progress saves locally in your browser — no account needed.</p>
        <p>
          <a href="${BASE_URL}/tools/pslf-tracker"
             style="display: inline-block; background: #059669; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Open the PSLF Tracker →
          </a>
        </p>
      `),
    },
    {
      delayDays: 14,
      subject: 'What happens when the SAVE injunction resolves? Your PSLF timeline',
      html: wrap(`
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">
          The SAVE injunction and your PSLF clock
        </h2>
        <p>If you were enrolled in SAVE and are now in administrative forbearance, here's
        what you need to know:</p>
        <p><strong>During the injunction:</strong> Payments are paused and do not count
        toward PSLF. You are not making progress toward forgiveness.</p>
        <p><strong>What you should do now:</strong> Switch to IBR. IBR qualifies for PSLF
        and is fully operational. Your payment may be similar to what you'd pay on SAVE.</p>
        <p><strong>When the injunction resolves:</strong> SAVE may become available again
        (outcome unknown). But IBR payments you made in the meantime will count toward PSLF
        regardless of what happens to SAVE.</p>
        <p>Bottom line: <strong>don't wait on the injunction to start counting payments.</strong></p>
        <p>
          <a href="${BASE_URL}/servicer/mohela" style="color: #059669;">
            → Contact MOHELA to switch to IBR
          </a>
        </p>
      `),
    },
  ],

  deadline_sensitive: [
    {
      delayDays: 1,
      subject: 'The SAVE Plan injunction: what it means for your payments right now',
      html: wrap(`
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">
          Your SAVE payments are paused — here's what that actually means
        </h2>
        <p>As of April 2026, a federal court injunction has blocked the SAVE Plan.
        If you're enrolled in SAVE, you are in <strong>administrative forbearance</strong>.</p>
        <p><strong>What this means:</strong></p>
        <ul>
          <li>You do not owe a payment right now</li>
          <li>Interest is not accruing (as of the forbearance order)</li>
          <li>These months <strong>do not count</strong> toward IDR forgiveness or PSLF</li>
        </ul>
        <p><strong>Your options:</strong></p>
        <ol>
          <li><strong>Stay on SAVE:</strong> Wait for the injunction to resolve. You won't be charged, but you won't be making progress toward forgiveness.</li>
          <li><strong>Switch to IBR:</strong> Resume making qualifying payments. If you're pursuing PSLF, this is usually the right move.</li>
        </ol>
        <p>
          <a href="${BASE_URL}/calculators/idr-payment" style="color: #059669;">
            → Calculate your IBR payment with our free calculator
          </a>
        </p>
      `),
    },
    {
      delayDays: 3,
      subject: 'Should you switch from SAVE to IBR? Here\'s how',
      html: wrap(`
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">
          Switching from SAVE to IBR: the practical steps
        </h2>
        <p>If you've decided to switch to IBR while SAVE is blocked, here's how:</p>
        <ol>
          <li>Log in to your loan servicer's website (check studentaid.gov for your servicer)</li>
          <li>Navigate to "Repayment Plan" or "Income-Driven Repayment"</li>
          <li>Request enrollment in IBR</li>
          <li>You'll need your most recent tax return for income verification</li>
          <li>Processing typically takes 2–4 weeks</li>
        </ol>
        <p>You can also submit the IDR Plan Request form directly at studentaid.gov.</p>
        <p><strong>IBR rates:</strong> 10% of discretionary income (if your first loan was
        after July 1, 2014) or 15% (if before). Forgiveness after 20 or 25 years.</p>
        <p>
          <a href="${BASE_URL}/calculators/idr-payment" style="color: #059669;">
            → Estimate your IBR payment
          </a>
        </p>
      `),
    },
    {
      delayDays: 7,
      subject: 'Policy update: where the SAVE injunction stands today',
      html: wrap(`
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">
          SAVE Plan status as of April 2026
        </h2>
        <p>Here's the current state of the SAVE Plan litigation:</p>
        <ul>
          <li>The 8th Circuit Court of Appeals issued a preliminary injunction blocking SAVE</li>
          <li>The case challenges the Department of Education's authority to implement SAVE</li>
          <li>No final ruling date has been set — the process could take months to years</li>
          <li>Borrowers in SAVE remain in administrative forbearance until further notice</li>
        </ul>
        <p>We'll send you an update as soon as the situation changes. In the meantime,
        the safest path is to switch to IBR if you need your payments to count toward forgiveness.</p>
        <p>
          <a href="${BASE_URL}/assess" style="color: #059669;">
            → Get a personalized recommendation for your situation
          </a>
        </p>
      `),
    },
  ],

  needs_specialist: [
    {
      delayDays: 3,
      subject: 'Your student loan situation may need a specialist — here\'s how we can help',
      html: wrap(`
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">
          Some situations need more than a calculator
        </h2>
        <p>Based on your assessment, your situation has some complexity that benefits from
        one-on-one guidance. Signs you'd benefit from a specialist:</p>
        <ul>
          <li>You have both federal and private loans and aren't sure what to tackle first</li>
          <li>You're weighing PSLF eligibility against refinancing</li>
          <li>You're in default or behind on payments</li>
          <li>You have Parent PLUS loans</li>
          <li>You're self-employed with variable income for IDR recertification</li>
        </ul>
        <p>We match borrowers with <strong>fee-only</strong> student loan advisors —
        no commission-based salespeople. Free to request, 1–2 day response.</p>
        <p>
          <a href="${BASE_URL}/advisors"
             style="display: inline-block; background: #059669; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Request an advisor match →
          </a>
        </p>
      `),
    },
    {
      delayDays: 7,
      subject: 'The 5 student loan questions we get most often, answered',
      html: wrap(`
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">
          Your top student loan questions, answered plainly
        </h2>
        <p><strong>1. Should I refinance to a private loan?</strong><br/>
        Only if you're in the private sector, have stable income, and your rate is above ~5%.
        Never refinance if you're pursuing PSLF.</p>
        <p><strong>2. Will the SAVE Plan come back?</strong><br/>
        Unknown. The court case is ongoing. Plan as if it may not, and use IBR as your backup.</p>
        <p><strong>3. Do my forbearance months count toward forgiveness?</strong><br/>
        Most forbearance periods do not count — including the current SAVE forbearance.
        IBR payments at $0/month (if your income qualifies) do count.</p>
        <p><strong>4. Can I still get PSLF if I switch to IBR?</strong><br/>
        Yes. IBR fully qualifies for PSLF.</p>
        <p><strong>5. What if I have both federal and private loans?</strong><br/>
        Treat them separately. Keep federal loans federal (for IDR/forgiveness). Consider
        refinancing private loans only.</p>
        <p style="margin-top: 20px;">
          Still not sure what to do? We can match you with a fee-only advisor.
        </p>
        <p>
          <a href="${BASE_URL}/advisors" style="color: #059669;">
            → Request a free advisor match
          </a>
        </p>
      `),
    },
  ],
};

/**
 * Schedule drip emails for a subscriber segment using Resend's scheduledAt.
 * Call this after confirming the subscriber was successfully saved to Supabase.
 */
export async function scheduleDripEmails(
  email: string,
  segment: string,
  fromEmail: string,
  resend: { emails: { send: (opts: { from: string; to: string; subject: string; html: string; scheduledAt: string }) => Promise<unknown> } },
): Promise<void> {
  const sequence = DRIP_SEQUENCES[segment];
  if (!sequence || sequence.length === 0) return;

  const now = new Date();

  for (const drip of sequence) {
    const scheduledAt = new Date(now.getTime() + drip.delayDays * 24 * 60 * 60 * 1000);
    // Only schedule if at least 30 minutes in the future (Resend requirement)
    if (scheduledAt.getTime() - now.getTime() < 30 * 60 * 1000) continue;

    try {
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: drip.subject,
        html: drip.html,
        scheduledAt: scheduledAt.toISOString(),
      });
    } catch (err) {
      console.error(`[email-sequences] Failed to schedule drip (day ${drip.delayDays}) for segment ${segment}:`, err);
      // Non-fatal — continue scheduling remaining emails
    }
  }
}
