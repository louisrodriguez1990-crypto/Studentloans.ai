import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { SaveAlertBanner } from '@/components/layout/save-alert-banner';
import { AnalyticsProvider } from '@/components/layout/analytics-provider';
import { SITE_NAME, BASE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Understand how 2026 federal student loan policy changes affect you. Get a free, personalized report in 3 minutes. No jargon. No guessing. Just answers.',
  metadataBase: new URL(BASE_URL),
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'ai-content-declaration':
      'Assessment reports are AI-formatted from deterministic engine output. Policy rules are human-maintained.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-gray-900 font-sans">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#1a1f36] focus:shadow-lg">
          Skip to content
        </a>
        <AnalyticsProvider>
          <Navbar />
          <SaveAlertBanner />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
