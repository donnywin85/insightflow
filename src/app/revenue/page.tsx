'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import DateRangeSelector from '@/components/ui/DateRangeSelector';
import { monthlyRevenue, customerSegments } from '@/lib/data';
import { formatCurrency, formatCompactCurrency, cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Custom Tooltip for MRR Movement chart                             */
/* ------------------------------------------------------------------ */
interface MrrTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function MrrTooltip({ active, payload, label }: MrrTooltipProps) {
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
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Revenue Page                                                      */
/* ------------------------------------------------------------------ */

const SEGMENT_COLORS: Record<string, string> = {
  Enterprise: '#6366f1',
  Growth: '#10b981',
  Starter: '#f59e0b',
};

export default function RevenuePage() {
  /* ---------- Revenue table with running totals ---------- */
  const revenueRows = useMemo(() => {
    const rows: {
      month: string;
      startingMRR: number;
      newMRR: number;
      expansion: number;
      contraction: number;
      churn: number;
      netNew: number;
      endingMRR: number;
    }[] = [];

    monthlyRevenue.forEach((m, idx) => {
      const startingMRR = idx === 0 ? 600000 : rows[idx - 1].endingMRR;
      const netNew = m.newMRR + m.expansion - m.contraction - m.churn;
      const endingMRR = startingMRR + netNew;
      rows.push({
        month: m.month,
        startingMRR,
        newMRR: m.newMRR,
        expansion: m.expansion,
        contraction: m.contraction,
        churn: m.churn,
        netNew,
        endingMRR,
      });
    });

    return rows;
  }, []);

  /* ---------- Totals row ---------- */
  const totals = useMemo(() => {
    return revenueRows.reduce(
      (acc, r) => ({
        newMRR: acc.newMRR + r.newMRR,
        expansion: acc.expansion + r.expansion,
        contraction: acc.contraction + r.contraction,
        churn: acc.churn + r.churn,
        netNew: acc.netNew + r.netNew,
      }),
      { newMRR: 0, expansion: 0, contraction: 0, churn: 0, netNew: 0 }
    );
  }, [revenueRows]);

  /* ---------- Segment pie data ---------- */
  const totalMRR = customerSegments.reduce((s, seg) => s + seg.mrr, 0);

  /* ---------- Growth metrics ---------- */
  const growthCards: {
    label: string;
    value: string;
    change: number;
    changeType: 'positive' | 'negative' | 'neutral';
  }[] = [
    { label: 'Net Revenue Retention', value: '112%', change: 4.2, changeType: 'positive' },
    { label: 'Gross Margin', value: '78.5%', change: 2.1, changeType: 'positive' },
    { label: 'LTV', value: '$2,847', change: 8.5, changeType: 'positive' },
    { label: 'CAC', value: '$385', change: 0.3, changeType: 'neutral' },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* ====== Header ====== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">Revenue</h1>
          <p className="mt-1 text-sm text-slate-500 font-body">
            Track your revenue streams, MRR growth, and financial performance.
          </p>
        </div>
        <DateRangeSelector />
      </div>

      {/* ====== MRR Movement Chart ====== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold font-heading text-slate-900 mb-6">MRR Movement</h2>

        {/* Legend */}
        <div className="flex items-center gap-5 flex-wrap mb-4">
          {[
            { label: 'New MRR', color: '#10b981' },
            { label: 'Expansion', color: '#6366f1' },
            { label: 'Contraction', color: '#f59e0b' },
            { label: 'Churn', color: '#f43f5e' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5 text-xs font-medium font-body text-slate-600">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
              {item.label}
            </div>
          ))}
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
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
                tickFormatter={(v: number) => formatCompactCurrency(v)}
              />
              <Tooltip content={<MrrTooltip />} />
              <Bar dataKey="newMRR" name="New MRR" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
              <Bar dataKey="expansion" name="Expansion" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
              <Bar dataKey="contraction" name="Contraction" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
              <Bar dataKey="churn" name="Churn" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* ====== Segment Analysis (Donut) ====== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold font-heading text-slate-900 mb-6">
          Revenue by Segment
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Donut chart */}
          <div className="relative w-64 h-64 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerSegments}
                  dataKey="mrr"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                  strokeWidth={0}
                >
                  {customerSegments.map((seg) => (
                    <Cell key={seg.name} fill={SEGMENT_COLORS[seg.name]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number | undefined) => value != null ? formatCurrency(value) : ''}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-500 font-body">Total MRR</span>
              <span className="text-xl font-bold text-slate-900 font-heading">
                {formatCurrency(totalMRR)}
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-4">
            {customerSegments.map((seg) => (
              <div key={seg.name} className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full shrink-0"
                  style={{ backgroundColor: SEGMENT_COLORS[seg.name] }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900 font-body">{seg.name}</span>
                    <span className="text-sm font-semibold text-slate-900 font-body">
                      {formatCurrency(seg.mrr)}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-body">
                      {seg.customerCount} customers
                    </span>
                    <span className="text-xs text-slate-500 font-body">{seg.percentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ====== Revenue Table ====== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm"
      >
        <div className="p-6 pb-0">
          <h2 className="text-lg font-semibold font-heading text-slate-900">
            Monthly Revenue Breakdown
          </h2>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr>
                {[
                  'Month',
                  'Starting MRR',
                  'New',
                  'Expansion',
                  'Contraction',
                  'Churn',
                  'Net New',
                  'Ending MRR',
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 font-body"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {revenueRows.map((r, i) => (
                <tr
                  key={r.month}
                  className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50/50' : ''}`}
                >
                  <td className="px-6 py-3 text-sm font-medium text-slate-900 font-body">
                    {r.month}
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-700 font-body">
                    {formatCurrency(r.startingMRR)}
                  </td>
                  <td className="px-6 py-3 text-sm text-emerald-600 font-body">
                    +{formatCurrency(r.newMRR)}
                  </td>
                  <td className="px-6 py-3 text-sm text-indigo-600 font-body">
                    +{formatCurrency(r.expansion)}
                  </td>
                  <td className="px-6 py-3 text-sm text-rose-600 font-body">
                    -{formatCurrency(r.contraction)}
                  </td>
                  <td className="px-6 py-3 text-sm text-rose-600 font-body">
                    -{formatCurrency(r.churn)}
                  </td>
                  <td
                    className={cn(
                      'px-6 py-3 text-sm font-medium font-body',
                      r.netNew >= 0 ? 'text-emerald-600' : 'text-rose-600'
                    )}
                  >
                    {r.netNew >= 0 ? '+' : '-'}
                    {formatCurrency(Math.abs(r.netNew))}
                  </td>
                  <td className="px-6 py-3 text-sm font-semibold text-slate-900 font-body">
                    {formatCurrency(r.endingMRR)}
                  </td>
                </tr>
              ))}
              {/* Totals row */}
              <tr className="border-t-2 border-slate-200 bg-slate-50 font-bold">
                <td className="px-6 py-3 text-sm text-slate-900 font-body">Total</td>
                <td className="px-6 py-3 text-sm text-slate-700 font-body" />
                <td className="px-6 py-3 text-sm text-emerald-600 font-body">
                  +{formatCurrency(totals.newMRR)}
                </td>
                <td className="px-6 py-3 text-sm text-indigo-600 font-body">
                  +{formatCurrency(totals.expansion)}
                </td>
                <td className="px-6 py-3 text-sm text-rose-600 font-body">
                  -{formatCurrency(totals.contraction)}
                </td>
                <td className="px-6 py-3 text-sm text-rose-600 font-body">
                  -{formatCurrency(totals.churn)}
                </td>
                <td
                  className={cn(
                    'px-6 py-3 text-sm font-body',
                    totals.netNew >= 0 ? 'text-emerald-600' : 'text-rose-600'
                  )}
                >
                  {totals.netNew >= 0 ? '+' : '-'}
                  {formatCurrency(Math.abs(totals.netNew))}
                </td>
                <td className="px-6 py-3 text-sm text-slate-900 font-body">
                  {formatCurrency(revenueRows[revenueRows.length - 1]?.endingMRR ?? 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ====== Growth Metrics ====== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {growthCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
          >
            <p className="text-xs uppercase tracking-wider text-slate-500 font-body">
              {card.label}
            </p>
            <p className="mt-2 text-xl font-bold text-slate-900 font-heading">{card.value}</p>
            <div className="mt-2 flex items-center gap-1">
              {card.changeType === 'positive' && (
                <>
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-600">
                    +{card.change}%
                  </span>
                </>
              )}
              {card.changeType === 'negative' && (
                <>
                  <TrendingDown className="h-3.5 w-3.5 text-rose-600" />
                  <span className="text-xs font-medium text-rose-600">
                    -{card.change}%
                  </span>
                </>
              )}
              {card.changeType === 'neutral' && (
                <>
                  <Minus className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-xs font-medium text-slate-400">
                    {card.change}%
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
