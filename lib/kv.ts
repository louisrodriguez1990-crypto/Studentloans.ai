// lib/kv.ts
// Vercel KV (Redis) client singleton with typed wrappers.
//
// TODO: @vercel/kv is deprecated; migrate to @vercel/redis (Upstash-backed) when needed.
// The API surface is identical, so migration is a drop-in replacement.
// See: https://vercel.com/docs/storage/vercel-kv

import { kv } from '@vercel/kv';
import {
  KV_SESSION_PREFIX,
  KV_REPORT_PREFIX,
  SESSION_TTL_SECONDS,
  REPORT_CACHE_TTL_SECONDS,
} from './constants';
import type { AssessmentResult, Report } from '@/engine/types';

export { kv };

// ─── Session ─────────────────────────────────────────────────────────────────

export async function setSession(sessionId: string, result: AssessmentResult): Promise<void> {
  await kv.set(`${KV_SESSION_PREFIX}${sessionId}`, result, { ex: SESSION_TTL_SECONDS });
}

export async function getSession(sessionId: string): Promise<AssessmentResult | null> {
  return kv.get<AssessmentResult>(`${KV_SESSION_PREFIX}${sessionId}`);
}

// ─── Report Cache ─────────────────────────────────────────────────────────────

export async function setReport(assessmentHash: string, report: Report): Promise<void> {
  await kv.set(`${KV_REPORT_PREFIX}${assessmentHash}`, report, {
    ex: REPORT_CACHE_TTL_SECONDS,
  });
}

export async function getReport(assessmentHash: string): Promise<Report | null> {
  return kv.get<Report>(`${KV_REPORT_PREFIX}${assessmentHash}`);
}
