import Anthropic from '@anthropic-ai/sdk';

// Singleton Anthropic client — import this everywhere, don't instantiate directly.
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Model to use for report generation.
// Claude Sonnet 4.6 balances quality and cost well for structured report formatting.
export const REPORT_MODEL = 'claude-sonnet-4-6';
export const REPORT_MAX_TOKENS = 1200;
