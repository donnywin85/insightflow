import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers | InsightFlow',
};

export default function CustomersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
