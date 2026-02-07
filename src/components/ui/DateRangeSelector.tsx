'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const ranges = ['7D', '30D', '90D', '12M'] as const;

type DateRange = (typeof ranges)[number];

export default function DateRangeSelector() {
  const [active, setActive] = useState<DateRange>('30D');

  return (
    <div className="inline-flex items-center gap-1 rounded-lg bg-slate-100/60 p-1">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => setActive(range)}
          className={cn(
            'px-3 py-1.5 text-sm font-medium font-body rounded-lg transition-colors',
            active === range
              ? 'bg-indigo-brand text-white'
              : 'text-slate-500 hover:bg-slate-100'
          )}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
