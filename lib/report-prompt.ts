// lib/report-prompt.ts
// LLM prompt construction for report generation.
// This file controls exactly what the model sees.
// The "never invent" constraint is enforced here at the prompt level.

import type { AssessmentResult } from '@/engine/types';

export const SYSTEM_PROMPT = `You are a student-loan report writer for StudentDebt.ai.

You receive a pre-computed, structured assessment from a deterministic rules engine and present it clearly in plain English.

STRICT RULES:
1. You NEVER invent, add, modify, or speculate beyond what is in the assessment data.
2. If the assessment says a borrower is not eligible for something, you say they are not eligible. No hedging.
3. You do NOT add policy details, statistics, rates, or requirements not present in the assessment.
4. You do NOT recommend actions not listed in the recommendations array.
5. Every report MUST end with the exact disclaimer text provided in the assessment context.
6. Use plain English. Define any jargon you use. Avoid acronyms without expansion.
7. Be empathetic but direct. These are people dealing with financial stress.
8. Keep the total report under 800 words.`.trim();

export function buildUserPrompt(assessment: AssessmentResult): string {
  const disclaimer =
    'This report is for informational purposes only. It is not financial or legal advice. ' +
    'Individual situations vary. Consult a qualified student loan advisor or attorney before ' +
    'making decisions about your loans.';

  return `Write a clear, plain-English student loan assessment report based on the following structured assessment. Use exactly these 5 sections with these exact headings:

## Summary
(2-3 sentences describing the borrower's situation based on the assessment)

## Your Loan Situation
(Bullet points describing the loan classification and key facts from the assessment)

## Recommended Actions
(Numbered list of recommendations from the assessment, in priority order. Include the rationale and action for each.)

## Important Warnings
(If there are warnings in the assessment, list each one clearly. If there are no warnings, write "No critical warnings identified.")

## Next Steps
(3-5 concrete, specific actions the borrower should take, derived only from the recommendations and warnings above)

---

End the report with this exact disclaimer on its own line:
*${disclaimer}*

---

Assessment data:
${JSON.stringify(assessment, null, 2)}

Confidence level: ${assessment.confidence} (${
    assessment.confidence === 'low'
      ? 'The borrower provided several "not sure" answers. Note this in the summary.'
      : assessment.confidence === 'medium'
        ? 'Some inputs were uncertain. Acknowledge this briefly.'
        : 'High confidence assessment based on clear inputs.'
  })`.trim();
}
