import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-gray-900">
        <AnalyticsProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
