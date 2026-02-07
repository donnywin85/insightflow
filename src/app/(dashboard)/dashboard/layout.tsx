import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | InsightFlow',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
