'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
} from 'recharts';
import DateRangeSelector from '@/components/ui/DateRangeSelector';
import MetricCard from '@/components/ui/MetricCard';
import Badge from '@/components/ui/Badge';
import {
  kpiMetrics,
  monthlyRevenue,
  customers,
  aiInsights,
} from '@/lib/data';
import {
  formatCurrency,
  formatNumber,
  formatCompactCurrency,
  cn,
} from '@/lib/utils';

type ChartType = 'Area' | 'Line' | 'Bar';

const chartTypes: ChartType[] = ['Area', 'Line', 'Bar'];

const severityBorderColor: Record<string, string> = {
  critical: 'border-l-rose-500',
  warning: 'border-l-amber-500',
  info: 'border-l-emerald-500',
};

const severityDotColor: Record<string, string> = {
  critical: 'bg-rose-500',
  warning: 'bg-amber-500',
  info: 'bg-emerald-500',
};

const severityBadgeVariant: Record<string, 'critical' | 'warning' | 'info'> = {
  critical: 'critical',
  warning: 'warning',
  info: 'info',
};

function planBadgeVariant(plan: string): 'enterprise' | 'growth' | 'starter' {
  return plan.toLowerCase() as 'enterprise' | 'growth' | 'starter';
}

function getHealthBarColor(score: number): string {
  if (score > 70) return 'bg-emerald-brand';
  if (score >= 40) return 'bg-amber-brand';
  return 'bg-rose-brand';
}

// Custom tooltip for the revenue chart
interface RevenueTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
  }>;
  label?: string;
}

function RevenueTooltip({ active, payload, label }: RevenueTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white shadow-lg rounded-lg border border-slate-200 px-4 py-3">
      <p className="text-sm font-medium font-heading text-slate-900">{label}</p>
      <p className="text-sm font-body text-slate-600 mt-1">
        Revenue: <span className="font-semibold text-slate-900">{formatCurrency(payload[0].value)}</span>
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const [chartType, setChartType] = useState<ChartType>('Area');

  // Today's date formatted
  const todayFormatted = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  // Revenue stats
  const totalRevenue = useMemo(
    () => monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0),
    []
  );

  const bestMonth = useMemo(() => {
    const best = monthlyRevenue.reduce(
      (max, m) => (m.revenue > max.revenue ? m : max),
      monthlyRevenue[0]
    );
    return best;
  }, []);

  const avgMonthlyGrowth = useMemo(() => {
    let totalGrowth = 0;
    for (let i = 1; i < monthlyRevenue.length; i++) {
      totalGrowth +=
        ((monthlyRevenue[i].revenue - monthlyRevenue[i - 1].revenue) /
          monthlyRevenue[i - 1].revenue) *
        100;
    }
    return (totalGrowth / (monthlyRevenue.length - 1)).toFixed(1);
  }, []);

  // Top 5 customers
  const topCustomers = useMemo(
    () => customers.slice(0, 5),
    []
  );

  // First 3 AI insights
  const topInsights = useMemo(() => aiInsights.slice(0, 3), []);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">
            Good morning, Jane
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-body">{todayFormatted}</p>
        </div>
        <DateRangeSelector />
      </div>

      {/* KPI CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {kpiMetrics.map((metric, i) => (
          <MetricCard key={metric.label} {...metric} index={i} />
        ))}
      </div>

      {/* REVENUE CHART */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold font-heading text-slate-900">
            Revenue Overview
          </h2>
          <div className="inline-flex items-center gap-1 rounded-lg bg-slate-100/60 p-1">
            {chartTypes.map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium font-body rounded-lg transition-colors',
                  chartType === type
                    ? 'bg-indigo-brand text-white'
                    : 'text-slate-500 hover:bg-slate-100'
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'Area' ? (
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v: number) => formatCompactCurrency(v)}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<RevenueTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="#6366f1"
                  fillOpacity={0.1}
                />
              </AreaChart>
            ) : chartType === 'Line' ? (
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v: number) => formatCompactCurrency(v)}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<RevenueTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            ) : (
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v: number) => formatCompactCurrency(v)}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<RevenueTooltip />} />
                <Bar
                  dataKey="revenue"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Mini stat boxes */}
        <div className="flex flex-wrap gap-8 border-t border-slate-200 pt-4 mt-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 font-body">
              Total Revenue
            </p>
            <p className="mt-1 text-lg font-bold font-heading text-slate-900">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 font-body">
              Best Month
            </p>
            <p className="mt-1 text-lg font-bold font-heading text-slate-900">
              {bestMonth.month} &middot; {formatCurrency(bestMonth.revenue)}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 font-body">
              Avg Monthly Growth
            </p>
            <p className="mt-1 text-lg font-bold font-heading text-slate-900">
              {avgMonthlyGrowth}%
            </p>
          </div>
        </div>
      </div>

      {/* AI INSIGHTS QUICK SECTION */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-brand" />
          <h2 className="text-lg font-semibold font-heading text-slate-900">
            AI Insights
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {topInsights.map((insight, i) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className={cn(
                'bg-white rounded-xl border border-slate-200 shadow-sm p-4 border-l-4',
                severityBorderColor[insight.severity]
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={cn(
                    'h-2 w-2 rounded-full flex-shrink-0',
                    severityDotColor[insight.severity]
                  )}
                />
                <Badge variant={severityBadgeVariant[insight.severity]}>
                  {insight.category}
                </Badge>
              </div>
              <h3 className="text-sm font-semibold font-heading text-slate-900 mb-1">
                {insight.title}
              </h3>
              <p className="text-sm text-slate-600 font-body line-clamp-2">
                {insight.description}
              </p>
              <button className="mt-3 text-sm font-medium text-indigo-brand hover:text-indigo-700 transition-colors">
                View Details &rarr;
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CUSTOMER HEALTH TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold font-heading text-slate-900">
            Top Customers
          </h2>
          <button className="text-sm font-medium text-indigo-brand hover:text-indigo-700 transition-colors">
            View All &rarr;
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-wider font-body">
                <th className="py-3 px-4 text-left font-medium">Company</th>
                <th className="py-3 px-4 text-left font-medium">Plan</th>
                <th className="py-3 px-4 text-left font-medium">MRR</th>
                <th className="py-3 px-4 text-left font-medium">Users</th>
                <th className="py-3 px-4 text-left font-medium">Health Score</th>
                <th className="py-3 px-4 text-left font-medium">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-t border-slate-100 even:bg-slate-50/50 hover:bg-slate-100/50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm font-medium font-body text-slate-900">
                    {customer.name}
                  </td>
                  <td className="py-3 px-4 text-sm font-body">
                    <Badge variant={planBadgeVariant(customer.plan)}>
                      {customer.plan}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm font-body text-slate-700">
                    {formatCurrency(customer.mrr)}
                  </td>
                  <td className="py-3 px-4 text-sm font-body text-slate-700">
                    {formatNumber(customer.users)}
                  </td>
                  <td className="py-3 px-4 text-sm font-body">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-slate-100 max-w-[100px]">
                        <div
                          className={cn(
                            'h-2 rounded-full',
                            getHealthBarColor(customer.healthScore)
                          )}
                          style={{ width: `${customer.healthScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-600 w-7 text-right">
                        {customer.healthScore}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm font-body text-slate-500">
                    {customer.lastActive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
