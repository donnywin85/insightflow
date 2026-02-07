import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Revenue | InsightFlow',
};

export default function RevenueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
