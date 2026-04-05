import { NextRequest, NextResponse } from 'next/server';

// Content-Security-Policy allows Supabase, PostHog, Sentry, and our own OG image API.
// 'unsafe-inline' is required for Next.js style injection; remove when migrating to CSS modules.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.posthog.com https://us.posthog.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self'",
  "connect-src 'self' https://*.supabase.co https://app.posthog.com https://us.posthog.com https://o*.ingest.sentry.io https://sentry.io",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join('; ');

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  // CSP — skip for API routes (they set their own headers) and static files
  const pathname = request.nextUrl.pathname;
  if (!pathname.startsWith('/api/') && !pathname.startsWith('/_next/')) {
    response.headers.set('Content-Security-Policy', CSP);
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files, images, and favicon
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
