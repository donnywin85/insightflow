'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ArrowUp, ArrowDown, Minus, ChevronDown } from 'lucide-react';
import DateRangeSelector from '@/components/ui/DateRangeSelector';
import {
  userMetrics,
  funnelData,
  engagementHeatmap,
  featureUsage,
} from '@/lib/data';
import { formatNumber } from '@/lib/utils';
import type { FeatureUsage } from '@/lib/types';

/* ------------------------------------------------------------------ */
/*  Custom Tooltip for the User Growth chart                          */
/* ------------------------------------------------------------------ */
interface UserTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function UserChartTooltip({ active, payload, label }: UserTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="mb-1 text-sm font-medium text-slate-900">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-xs text-slate-600">
          <span
            className="mr-1.5 inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}: {formatNumber(entry.value)}
        </p>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Analytics Page                                                    */
/* ------------------------------------------------------------------ */

type SortField = keyof Pick<FeatureUsage, 'name' | 'adoption' | 'trend' | 'userCount'>;
type SortDirection = 'asc' | 'desc';

export default function AnalyticsPage() {
  /* ---------- User Growth legend toggles ---------- */
  const [showActiveUsers, setShowActiveUsers] = useState(true);
  const [showNewSignups, setShowNewSignups] = useState(true);
  const [showChurned, setShowChurned] = useState(true);

  /* ---------- Feature table sort ---------- */
  const [sortField, setSortField] = useState<SortField>('adoption');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedFeatures = useMemo(() => {
    const copy = [...featureUsage];
    copy.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') {
        cmp = a.name.localeCompare(b.name);
      } else if (sortField === 'trend') {
        const order = { up: 2, stable: 1, down: 0 };
        cmp = order[a.trend] - order[b.trend];
      } else {
        cmp = a[sortField] - b[sortField];
      }
      return sortDirection === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [sortField, sortDirection]);

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  }

  /* ---------- Heatmap helpers ---------- */
  const heatmapCounts = engagementHeatmap.map((d) => d.count);
  const heatMin = Math.min(...heatmapCounts);
  const heatMax = Math.max(...heatmapCounts);

  function heatColor(count: number) {
    const ratio = heatMax === heatMin ? 0 : (count - heatMin) / (heatMax - heatMin);
    if (ratio < 0.2) return 'bg-slate-100';
    if (ratio < 0.4) return 'bg-indigo-100';
    if (ratio < 0.6) return 'bg-indigo-300';
    if (ratio < 0.8) return 'bg-indigo-500';
    return 'bg-indigo-700';
  }

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  /* ---------- Funnel max for proportional sizing ---------- */
  const funnelMax = funnelData[0]?.count ?? 1;

  /* ---------- Sort indicator ---------- */
  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ArrowUp className="ml-1 inline h-3 w-3" />
    ) : (
      <ArrowDown className="ml-1 inline h-3 w-3" />
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* ====== Header ====== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">Analytics</h1>
          <p className="mt-1 text-sm text-slate-500 font-body">
            Deep dive into your product analytics and user behavior patterns.
          </p>
        </div>
        <DateRangeSelector />
      </div>

      {/* ====== User Growth Chart ====== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold font-heading text-slate-900">User Growth</h2>
          {/* Custom Legend */}
          <div className="flex items-center gap-5 flex-wrap">
            <button
              onClick={() => setShowActiveUsers((v) => !v)}
              className={`flex items-center gap-1.5 text-xs font-medium font-body transition-opacity ${
                showActiveUsers ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
              Active Users
            </button>
            <button
              onClick={() => setShowNewSignups((v) => !v)}
              className={`flex items-center gap-1.5 text-xs font-medium font-body transition-opacity ${
                showNewSignups ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              New Signups
            </button>
            <button
              onClick={() => setShowChurned((v) => !v)}
              className={`flex items-center gap-1.5 text-xs font-medium font-body transition-opacity ${
                showChurned ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
              Churned
            </button>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={userMetrics} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="signupGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="churnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => formatNumber(v)}
              />
              <Tooltip content={<UserChartTooltip />} />
              {showActiveUsers && (
                <Area
                  type="monotone"
                  dataKey="activeUsers"
                  name="Active Users"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#activeGrad)"
                />
              )}
              {showNewSignups && (
                <Area
                  type="monotone"
                  dataKey="newSignups"
                  name="New Signups"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#signupGrad)"
                />
              )}
              {showChurned && (
                <Area
                  type="monotone"
                  dataKey="churned"
                  name="Churned"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  fill="url(#churnGrad)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* ====== Conversion Funnel ====== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold font-heading text-slate-900 mb-6">
          Conversion Funnel
        </h2>

        <div className="space-y-1">
          {funnelData.map((stage, idx) => {
            const widthPct = Math.max((stage.count / funnelMax) * 100, 8);
            const solidColors = [
              'bg-indigo-600',
              'bg-indigo-500',
              'bg-indigo-400',
              'bg-indigo-400',
              'bg-indigo-300',
            ];
            return (
              <div key={stage.name}>
                <div className="flex items-center gap-4">
                  <span className="w-20 shrink-0 text-sm font-medium text-slate-700 font-body">
                    {stage.name}
                  </span>
                  <div className="flex-1 flex items-center gap-3">
                    <div
                      className={`h-9 rounded-lg ${solidColors[idx] ?? 'bg-indigo-400'} transition-all`}
                      style={{ width: `${widthPct}%` }}
                    />
                    <div className="shrink-0 text-right">
                      <span className="text-sm font-semibold text-slate-900 font-body">
                        {formatNumber(stage.count)}
                      </span>
                      {stage.conversionRate !== null && (
                        <span className="ml-2 text-xs text-slate-500 font-body">
                          ({stage.conversionRate}%)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {/* Arrow between stages */}
                {idx < funnelData.length - 1 && (
                  <div className="flex items-center gap-4 py-1">
                    <span className="w-20 shrink-0" />
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <ChevronDown className="h-3 w-3" />
                      {funnelData[idx + 1].conversionRate !== null && (
                        <span>{funnelData[idx + 1].conversionRate}% conversion</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ====== Engagement Heatmap ====== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <div className="mb-1">
          <h2 className="text-lg font-semibold font-heading text-slate-900">
            Engagement Heatmap
          </h2>
          <p className="text-sm text-slate-500 font-body">Activity by day and hour</p>
        </div>

        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[540px]">
            {/* Hour column labels */}
            <div className="flex items-center mb-1">
              <span className="w-10 shrink-0" />
              <div className="flex flex-1 justify-between">
                {hours
                  .filter((h) => h % 3 === 0)
                  .map((h) => (
                    <span key={h} className="text-xs text-slate-400 w-4 text-center font-body">
                      {h}
                    </span>
                  ))}
              </div>
            </div>

            {/* Day rows */}
            {days.map((day) => (
              <div key={day} className="flex items-center gap-1 mb-1">
                <span className="w-10 shrink-0 text-xs text-slate-500 font-body">{day}</span>
                <div className="flex gap-[3px]">
                  {hours.map((hour) => {
                    const cell = engagementHeatmap.find(
                      (d) => d.day === day && d.hour === hour
                    );
                    const count = cell?.count ?? 0;
                    return (
                      <div
                        key={hour}
                        title={`${day} ${hour}:00 — ${formatNumber(count)} sessions`}
                        className={`w-3.5 h-3.5 rounded-sm cursor-default ${heatColor(count)}`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Color legend */}
            <div className="flex items-center gap-2 mt-3 ml-10">
              <span className="text-xs text-slate-500 font-body">Less</span>
              <div className="flex gap-[2px]">
                {['bg-slate-100', 'bg-indigo-100', 'bg-indigo-300', 'bg-indigo-500', 'bg-indigo-700'].map(
                  (c) => (
                    <div key={c} className={`w-3.5 h-3.5 rounded-sm ${c}`} />
                  )
                )}
              </div>
              <span className="text-xs text-slate-500 font-body">More</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ====== Feature Adoption Table ====== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm"
      >
        <div className="p-6 pb-0">
          <h2 className="text-lg font-semibold font-heading text-slate-900">Feature Adoption</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                {(
                  [
                    ['name', 'Feature'],
                    ['adoption', 'Adoption'],
                    ['trend', 'Trend'],
                    ['userCount', 'Users'],
                  ] as [SortField, string][]
                ).map(([field, label]) => (
                  <th
                    key={field}
                    onClick={() => handleSort(field)}
                    className="cursor-pointer select-none px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 font-body"
                  >
                    {label}
                    <SortIcon field={field} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedFeatures.map((f, i) => (
                <tr
                  key={f.name}
                  className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50/50' : ''}`}
                >
                  <td className="px-6 py-3 text-sm font-medium text-slate-900 font-body">
                    {f.name}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 rounded-full bg-slate-100">
                        <div
                          className="h-2 rounded-full bg-indigo-600"
                          style={{ width: `${f.adoption}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-600 font-body">{f.adoption}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    {f.trend === 'up' && (
                      <span className="flex items-center gap-1 text-xs font-medium text-emerald-500">
                        <ArrowUp className="h-3 w-3" /> Up
                      </span>
                    )}
                    {f.trend === 'down' && (
                      <span className="flex items-center gap-1 text-xs font-medium text-rose-500">
                        <ArrowDown className="h-3 w-3" /> Down
                      </span>
                    )}
                    {f.trend === 'stable' && (
                      <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                        <Minus className="h-3 w-3" /> Stable
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-700 font-body">
                    {formatNumber(f.userCount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
