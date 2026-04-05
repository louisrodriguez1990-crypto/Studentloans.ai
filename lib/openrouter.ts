// lib/openrouter.ts
// OpenRouter client for LLM report generation.
// OpenRouter provides access to multiple models via an OpenAI-compatible API.
// Docs: https://openrouter.ai/docs

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

export const REPORT_MODEL = 'x-ai/grok-4.1-fast';
export const REPORT_MAX_TOKENS = 1200;

interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenRouterResponse {
  choices: Array<{
    message: { content: string };
    finish_reason: string;
  }>;
}

export async function generateChatCompletion(
  system: string,
  userMessage: string,
  maxTokens: number = REPORT_MAX_TOKENS,
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY is not set');

  const messages: OpenRouterMessage[] = [
    { role: 'system', content: system },
    { role: 'user', content: userMessage },
  ];

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL ?? 'https://studentdebt.ai',
      'X-Title': 'StudentDebt.ai',
    },
    body: JSON.stringify({
      model: REPORT_MODEL,
      messages,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error ${response.status}: ${error}`);
  }

  const data = (await response.json()) as OpenRouterResponse;
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('Empty response from OpenRouter');
  return content;
}
