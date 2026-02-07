'use client';

import { cn } from '@/lib/utils';

type BadgeVariant =
  | 'enterprise'
  | 'growth'
  | 'starter'
  | 'info'
  | 'warning'
  | 'critical';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  enterprise: 'bg-indigo-50 text-indigo-700',
  growth: 'bg-emerald-50 text-emerald-700',
  starter: 'bg-amber-50 text-amber-700',
  info: 'bg-blue-50 text-blue-700',
  warning: 'bg-amber-50 text-amber-700',
  critical: 'bg-rose-50 text-rose-700',
};

export default function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant]
      )}
    >
      {children}
    </span>
  );
}
