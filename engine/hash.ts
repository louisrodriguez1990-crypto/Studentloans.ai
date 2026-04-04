// engine/hash.ts
// Deterministic SHA-256 hash of an AssessmentResult.
// Used as the cache key for LLM-generated reports:
//   - Same inputs → same hash → same cached report (no redundant LLM calls)
//   - Bumping POLICY_VERSION changes the hash → automatic cache invalidation

import { createHash } from 'crypto';
import type { AssessmentResult } from './types';

export function hashAssessment(result: AssessmentResult): string {
  const canonical = JSON.stringify(result);
  return createHash('sha256').update(canonical, 'utf8').digest('hex');
}
