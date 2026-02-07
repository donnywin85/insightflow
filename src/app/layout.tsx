import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import MobileNav from '@/components/layout/MobileNav';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'InsightFlow | AI-Powered Business Analytics',
  description:
    'InsightFlow is an AI-powered SaaS business analytics dashboard providing real-time insights into revenue, customers, engagement, and growth metrics.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${sourceSans.variable}`}>
      <body className="font-body antialiased bg-slate-50 text-slate-900">
        <Sidebar />
        <TopBar />
        <main className="lg:pl-64 pt-16 pb-20 lg:pb-0 min-h-screen">
          {children}
        </main>
        <MobileNav />
      </body>
    </html>
  );
}
