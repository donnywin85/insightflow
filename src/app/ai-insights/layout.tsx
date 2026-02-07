import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Insights | InsightFlow',
};

export default function AIInsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
