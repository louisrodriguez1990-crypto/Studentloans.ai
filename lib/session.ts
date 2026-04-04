// lib/session.ts
// Session ID generation and KV helpers.
// Sessions are anonymous — no PII unless the user provides email separately.

import { nanoid } from 'nanoid';
import { setSession, getSession, setReport, getReport } from './kv';
import type { AssessmentResult, Report } from '@/engine/types';

export function generateSessionId(): string {
  return nanoid(21); // 21 chars = ~126 bits of entropy, URL-safe
}

export { setSession, getSession, setReport, getReport };

// ─── Convenience helpers ─────────────────────────────────────────────────────

export async function saveAssessment(result: AssessmentResult): Promise<void> {
  await setSession(result.sessionId, result);
}

export async function loadAssessment(sessionId: string): Promise<AssessmentResult | null> {
  return getSession(sessionId);
}

export async function saveReport(assessmentHash: string, report: Report): Promise<void> {
  await setReport(assessmentHash, report);
}

export async function loadReport(assessmentHash: string): Promise<Report | null> {
  return getReport(assessmentHash);
}
