'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
import { KPIMetric } from '@/lib/types';
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  cn,
} from '@/lib/utils';

interface MetricCardProps extends KPIMetric {
  index?: number;
}

function useAnimatedCounter(
  target: number,
  duration: number = 1000
): number {
  const [current, setCurrent] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    startTime.current = null;

    const step = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(eased * target);

      if (progress < 1) {
        rafId.current = requestAnimationFrame(step);
      }
    };

    rafId.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId.current);
  }, [target, duration]);

  return current;
}

function formatAnimatedValue(value: number, format: KPIMetric['format']): string {
  switch (format) {
    case 'currency':
      return formatCurrency(Math.round(value));
    case 'number':
      return formatNumber(Math.round(value));
    case 'percent':
      return formatPercent(value);
    case 'score':
      return Math.round(value).toString();
    default:
      return Math.round(value).toString();
  }
}

export default function MetricCard({
  label,
  value,
  change,
  changeType,
  format,
  sparklineData,
  index = 0,
}: MetricCardProps) {
  const animatedValue = useAnimatedCounter(value, 1200);

  const sparkData = sparklineData.map((v, i) => ({ value: v, index: i }));

  const lineColor =
    changeType === 'positive' ? '#10b981' : '#f43f5e';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 font-body">
            {label}
          </p>
          <p className="mt-2 text-2xl lg:text-3xl font-bold font-heading text-slate-900">
            {formatAnimatedValue(animatedValue, format)}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                changeType === 'positive'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-rose-50 text-rose-700'
              )}
            >
              {changeType === 'positive' ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              {changeType === 'positive' ? '+' : ''}
              {change}%
            </span>
          </div>
        </div>
        <div className="w-16 h-8 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={lineColor}
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
