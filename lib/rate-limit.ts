/**
 * Simple IP-based rate limiter using Vercel KV (Redis).
 * Uses a sliding-window counter. Non-fatal: if KV is not configured,
 * rate limiting is skipped silently.
 */

import type { NextRequest } from 'next/server';

interface RateLimitResult {
  success: boolean;
  remaining: number;
  limit: number;
}

/**
 * Check and increment rate limit for a given identifier.
 * @param identifier - unique key (e.g. IP address + route)
 * @param limit - max requests per window
 * @param windowSeconds - window duration in seconds
 */
export async function checkRateLimit(
  identifier: string,
  limit: number = 10,
  windowSeconds: number = 60,
): Promise<RateLimitResult> {
  try {
    const { kv } = await import('@/lib/kv');
    const key = `rl:${identifier}`;

    // Use INCR + EXPIRE for atomic sliding window
    const count = await kv.incr(key);
    if (count === 1) {
      // First request in window — set expiry
      await kv.expire(key, windowSeconds);
    }

    const remaining = Math.max(0, limit - count);
    return { success: count <= limit, remaining, limit };
  } catch {
    // KV not configured or error — allow the request
    return { success: true, remaining: limit, limit };
  }
}

/**
 * Get client IP from request headers (Vercel sets x-forwarded-for).
 */
export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}
