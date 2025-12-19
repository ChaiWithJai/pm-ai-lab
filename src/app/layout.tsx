import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'PM AI Lab | Where AI Fails Product Managers',
    template: '%s | PM AI Lab',
  },
  description:
    'We analyzed 14,208 AI-generated questions and found 29.1% fail basic quality standards. Learn the patterns that separate good AI from bad.',
  keywords: [
    'product management',
    'AI tools',
    'PM resources',
    'user research',
    'customer discovery',
    'AI failures',
    'AI for PMs',
    'product manager AI',
    'AI coaching',
  ],
  authors: [{ name: 'Chai with Jai', url: 'https://chaiwithjai.com' }],
  creator: 'Jai Bhagat',
  publisher: 'Chai with Jai',
  metadataBase: new URL('https://pmailab.chaiwithjai.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PM AI Lab | Where AI Fails Product Managers',
    description:
      'We analyzed 14,208 AI-generated questions and found 29.1% fail basic quality standards.',
    url: 'https://pmailab.chaiwithjai.com',
    siteName: 'PM AI Lab',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PM AI Lab | Where AI Fails Product Managers',
    description:
      'We analyzed 14,208 AI-generated questions and found 29.1% fail basic quality standards.',
    creator: '@chaiwithjai',
    site: '@chaiwithjai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
