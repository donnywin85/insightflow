'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  dailyActiveUsers,
  sessionMetrics,
  featureUsage,
} from '@/lib/data';
import { formatNumber, cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Custom Tooltip for DAU Chart                                      */
/* ------------------------------------------------------------------ */
interface DAUTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function DAUTooltip({ active, payload, label }: DAUTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white shadow-lg rounded-lg border border-slate-200 px-4 py-3">
      <p className="text-sm font-medium font-heading text-slate-900">{label}</p>
      <p className="text-sm font-body text-slate-600 mt-1">
        Users:{' '}
        <span className="font-semibold text-slate-900">
          {formatNumber(payload[0].value)}
        </span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  User Flow data                                                     */
/* ------------------------------------------------------------------ */
const userFlowData = {
  source: { label: 'Landing Page', percent: 100, users: 34521 },
  middle: [
    { label: 'Dashboard', percent: 45, users: 15534 },
    { label: 'Reports', percent: 30, users: 10356 },
    { label: 'Settings', percent: 15, users: 5178 },
    { label: 'Other', percent: 10, users: 3453 },
  ],
  destinations: [
    { label: 'Conversion', percent: 46, users: 15882, type: 'positive' as const },
    { label: 'Drop-off', percent: 18, users: 6214, type: 'negative' as const },
  ],
  connections: [
    { from: 0, to: 0, value: 28 },
    { from: 1, to: 0, value: 18 },
    { from: 2, to: 1, value: 10 },
    { from: 3, to: 1, value: 8 },
  ],
};

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function EngagementPage() {
  const sortedFeatures = useMemo(
    () => [...featureUsage].sort((a, b) => b.adoption - a.adoption),
    []
  );

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-slate-900">
          Engagement
        </h1>
      </div>

      {/* DAILY ACTIVE USERS CHART */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <div className="mb-4">
          <h2 className="text-lg font-semibold font-heading text-slate-900">
            Daily Active Users
          </h2>
          <p className="text-sm text-slate-500 font-body">Last 30 days</p>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyActiveUsers}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
                interval={4}
              />
              <YAxis
                tickFormatter={(v: number) => formatNumber(v)}
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<DAUTooltip />} />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#6366f1"
                strokeWidth={2}
                fill="#6366f1"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* SESSION METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sessionMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
          >
            <p className="text-xs uppercase tracking-wider text-slate-500 font-body">
              {metric.label}
            </p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-xl font-bold font-heading text-slate-900">
                {metric.value}
              </p>
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                  metric.changeType === 'positive'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-rose-50 text-rose-700'
                )}
              >
                {metric.changeType === 'positive' ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {metric.change > 0 ? '+' : ''}
                {metric.change}%
              </span>
            </div>
            <div className="w-full h-10 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={metric.sparklineData.map((v, i) => ({
                    value: v,
                    index: i,
                  }))}
                >
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FEATURE USAGE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold font-heading text-slate-900 mb-5">
          Feature Usage
        </h2>
        <div className="space-y-4">
          {sortedFeatures.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium font-body text-slate-700">
                  {feature.name}
                </span>
                <span className="text-sm font-semibold font-heading text-slate-900">
                  {feature.adoption}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div
                  className="bg-indigo-brand rounded-full h-3 transition-all duration-700"
                  style={{ width: `${feature.adoption}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 font-body mt-1">
                {formatNumber(feature.userCount)} users
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* USER FLOW VISUALIZATION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold font-heading text-slate-900 mb-6">
          User Flow
        </h2>

        {/* Desktop: horizontal flow */}
        <div className="hidden md:flex items-stretch gap-0 relative">
          {/* LEFT COLUMN: Source */}
          <div className="flex flex-col justify-center w-1/4 pr-2">
            <div className="rounded-lg bg-indigo-600 text-white p-4 text-center">
              <p className="text-sm font-semibold font-heading">
                {userFlowData.source.label}
              </p>
              <p className="text-2xl font-bold font-heading mt-1">
                {userFlowData.source.percent}%
              </p>
              <p className="text-xs opacity-80 mt-0.5">
                {formatNumber(userFlowData.source.users)} users
              </p>
            </div>
          </div>

          {/* CONNECTOR LINES: Source -> Middle */}
          <div className="flex flex-col justify-center w-[8%]">
            {userFlowData.middle.map((_, i) => (
              <div key={i} className="flex items-center h-1/4 py-1">
                <div className="w-full h-0.5 bg-slate-300" />
              </div>
            ))}
          </div>

          {/* MIDDLE COLUMN: Pages */}
          <div className="flex flex-col justify-center gap-3 w-1/4">
            {userFlowData.middle.map((node) => (
              <div
                key={node.label}
                className="rounded-lg bg-indigo-100 text-indigo-900 p-3 text-center"
              >
                <p className="text-sm font-semibold font-heading">
                  {node.label}
                </p>
                <p className="text-lg font-bold font-heading">{node.percent}%</p>
                <p className="text-xs text-indigo-600">
                  {formatNumber(node.users)} users
                </p>
              </div>
            ))}
          </div>

          {/* CONNECTOR LINES: Middle -> Destinations */}
          <div className="flex flex-col justify-center w-[8%]">
            {userFlowData.middle.map((_, i) => (
              <div key={i} className="flex items-center h-1/4 py-1">
                <div className="w-full h-0.5 bg-slate-300" />
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: Destinations */}
          <div className="flex flex-col justify-center gap-3 w-1/4 pl-2">
            <div className="rounded-lg bg-emerald-100 text-emerald-900 p-4 text-center">
              <p className="text-sm font-semibold font-heading">Conversion</p>
              <p className="text-2xl font-bold font-heading">46%</p>
              <p className="text-xs text-emerald-600">
                {formatNumber(15882)} users
              </p>
            </div>
            <div className="rounded-lg bg-rose-100 text-rose-900 p-4 text-center">
              <p className="text-sm font-semibold font-heading">Drop-off</p>
              <p className="text-2xl font-bold font-heading">18%</p>
              <p className="text-xs text-rose-600">
                {formatNumber(6214)} users
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: vertical flow */}
        <div className="md:hidden space-y-3">
          {/* Source */}
          <div className="rounded-lg bg-indigo-600 text-white p-4 text-center">
            <p className="text-sm font-semibold font-heading">
              {userFlowData.source.label}
            </p>
            <p className="text-2xl font-bold font-heading mt-1">
              {userFlowData.source.percent}%
            </p>
            <p className="text-xs opacity-80 mt-0.5">
              {formatNumber(userFlowData.source.users)} users
            </p>
          </div>

          {/* Vertical connector */}
          <div className="flex justify-center">
            <div className="w-0.5 h-6 bg-slate-300" />
          </div>

          {/* Middle nodes */}
          <div className="grid grid-cols-2 gap-2">
            {userFlowData.middle.map((node) => (
              <div
                key={node.label}
                className="rounded-lg bg-indigo-100 text-indigo-900 p-3 text-center"
              >
                <p className="text-xs font-semibold font-heading">
                  {node.label}
                </p>
                <p className="text-lg font-bold font-heading">{node.percent}%</p>
                <p className="text-xs text-indigo-600">
                  {formatNumber(node.users)}
                </p>
              </div>
            ))}
          </div>

          {/* Vertical connector */}
          <div className="flex justify-center">
            <div className="w-0.5 h-6 bg-slate-300" />
          </div>

          {/* Destination nodes */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-emerald-100 text-emerald-900 p-4 text-center">
              <p className="text-sm font-semibold font-heading">Conversion</p>
              <p className="text-xl font-bold font-heading">46%</p>
              <p className="text-xs text-emerald-600">
                {formatNumber(15882)} users
              </p>
            </div>
            <div className="rounded-lg bg-rose-100 text-rose-900 p-4 text-center">
              <p className="text-sm font-semibold font-heading">Drop-off</p>
              <p className="text-xl font-bold font-heading">18%</p>
              <p className="text-xs text-rose-600">
                {formatNumber(6214)} users
              </p>
            </div>
          </div>
        </div>

        {/* Flow breakdown details */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-body">
                Dashboard
              </p>
              <p className="text-sm font-semibold text-slate-900 mt-1">
                45% &rarr; 28% convert
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-body">
                Reports
              </p>
              <p className="text-sm font-semibold text-slate-900 mt-1">
                30% &rarr; 18% convert
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-body">
                Settings
              </p>
              <p className="text-sm font-semibold text-slate-900 mt-1">
                15% &rarr; 10% drop
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-body">
                Other
              </p>
              <p className="text-sm font-semibold text-slate-900 mt-1">
                10% &rarr; 8% drop
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
