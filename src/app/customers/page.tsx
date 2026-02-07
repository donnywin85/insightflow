'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
import {
  Search,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { customers, customerSegments } from '@/lib/data';
import { formatCurrency, formatNumber, cn } from '@/lib/utils';
import type { Customer } from '@/lib/types';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

type PlanFilter = 'All' | 'Enterprise' | 'Growth' | 'Starter';
type HealthFilter = 'All' | 'Healthy' | 'At Risk' | 'Critical';
type SortField = 'name' | 'plan' | 'mrr' | 'users' | 'healthScore' | 'lastActive';
type SortDir = 'asc' | 'desc';

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

const planBadgeVariant = (plan: Customer['plan']) => {
  const map = { Enterprise: 'enterprise', Growth: 'growth', Starter: 'starter' } as const;
  return map[plan];
};

const segmentBorderColor: Record<string, string> = {
  Enterprise: 'border-l-indigo-500',
  Growth: 'border-l-emerald-500',
  Starter: 'border-l-amber-500',
};

function healthColor(score: number) {
  if (score > 70) return 'bg-emerald-500';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-rose-500';
}

function healthTextColor(score: number) {
  if (score > 70) return 'text-emerald-600';
  if (score >= 40) return 'text-amber-600';
  return 'text-rose-600';
}

function healthCategory(score: number): 'Healthy' | 'At Risk' | 'Critical' {
  if (score > 70) return 'Healthy';
  if (score >= 40) return 'At Risk';
  return 'Critical';
}

/* ------------------------------------------------------------------ */
/*  Customers Page                                                    */
/* ------------------------------------------------------------------ */

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState<PlanFilter>('All');
  const [healthFilter, setHealthFilter] = useState<HealthFilter>('All');
  const [sortField, setSortField] = useState<SortField>('mrr');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* ---------- Filter + Sort ---------- */
  const filtered = useMemo(() => {
    let list = [...customers];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }

    // Plan filter
    if (planFilter !== 'All') {
      list = list.filter((c) => c.plan === planFilter);
    }

    // Health filter
    if (healthFilter !== 'All') {
      list = list.filter((c) => healthCategory(c.healthScore) === healthFilter);
    }

    // Sort
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'plan': {
          const order = { Enterprise: 3, Growth: 2, Starter: 1 };
          cmp = order[a.plan] - order[b.plan];
          break;
        }
        case 'mrr':
          cmp = a.mrr - b.mrr;
          break;
        case 'users':
          cmp = a.users - b.users;
          break;
        case 'healthScore':
          cmp = a.healthScore - b.healthScore;
          break;
        case 'lastActive':
          cmp = a.lastActive.localeCompare(b.lastActive);
          break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return list;
  }, [searchQuery, planFilter, healthFilter, sortField, sortDir]);

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return null;
    return sortDir === 'asc' ? (
      <ArrowUp className="ml-1 inline h-3 w-3" />
    ) : (
      <ArrowDown className="ml-1 inline h-3 w-3" />
    );
  }

  /* ---------- Pagination (static since we have 10 items) ---------- */
  const totalCustomers = filtered.length;
  const page = 1;
  const pageSize = 10;
  const paginatedCustomers = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* ====== Header ====== */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-slate-900">Customers</h1>
        <p className="mt-1 text-sm text-slate-500 font-body">
          Manage customer accounts, health scores, and segment analysis.
        </p>
      </div>

      {/* ====== Segment Overview Cards ====== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {customerSegments.map((seg) => (
          <motion.div
            key={seg.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'bg-white rounded-xl border border-slate-200 shadow-sm p-5 border-l-4',
              segmentBorderColor[seg.name]
            )}
          >
            <h3 className="text-sm font-semibold text-slate-900 font-heading">{seg.name}</h3>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div>
                <p className="text-xs text-slate-500 font-body">Customers</p>
                <p className="text-lg font-bold text-slate-900 font-heading">
                  {formatNumber(seg.customerCount)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-body">Total MRR</p>
                <p className="text-lg font-bold text-slate-900 font-heading">
                  {formatCurrency(seg.mrr)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-body">Avg Health</p>
                <p className={cn('text-lg font-bold font-heading', healthTextColor(seg.avgHealthScore))}>
                  {seg.avgHealthScore}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ====== Search & Filter Bar ====== */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-400 font-body focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
          />
        </div>

        {/* Plan filter pills */}
        <div className="flex items-center gap-1 rounded-lg bg-slate-100/60 p-1">
          {(['All', 'Enterprise', 'Growth', 'Starter'] as PlanFilter[]).map((p) => (
            <button
              key={p}
              onClick={() => setPlanFilter(p)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium font-body rounded-lg transition-colors',
                planFilter === p
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-500 hover:bg-slate-100'
              )}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Health filter pills */}
        <div className="flex items-center gap-1 rounded-lg bg-slate-100/60 p-1">
          {(['All', 'Healthy', 'At Risk', 'Critical'] as HealthFilter[]).map((h) => (
            <button
              key={h}
              onClick={() => setHealthFilter(h)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium font-body rounded-lg transition-colors',
                healthFilter === h
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-500 hover:bg-slate-100'
              )}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* ====== Customer Table ====== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[780px]">
            <thead>
              <tr>
                {(
                  [
                    ['name', 'Company'],
                    ['plan', 'Plan'],
                    ['mrr', 'MRR'],
                    ['users', 'Users'],
                    ['healthScore', 'Health Score'],
                    ['lastActive', 'Last Active'],
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
              {paginatedCustomers.map((c, i) => (
                <CustomerRow
                  key={c.id}
                  customer={c}
                  index={i}
                  isExpanded={expandedId === c.id}
                  onToggle={() => setExpandedId(expandedId === c.id ? null : c.id)}
                />
              ))}
              {paginatedCustomers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-slate-500 font-body">
                    No customers match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-3">
          <span className="text-sm text-slate-600 font-body">
            Showing {totalCustomers === 0 ? 0 : 1}-{totalCustomers} of {totalCustomers} customers
          </span>
          <div className="flex items-center gap-1">
            <button
              disabled
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-400 font-body disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
            <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-medium font-body">
              {page}
            </button>
            <button
              disabled
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-400 font-body disabled:opacity-50"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Customer Row (with expandable detail)                             */
/* ------------------------------------------------------------------ */

function CustomerRow({
  customer: c,
  index,
  isExpanded,
  onToggle,
}: {
  customer: Customer;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const trendData = c.trend.map((v, i) => ({ idx: i, mrr: v }));

  return (
    <>
      <tr
        onClick={onToggle}
        className={cn(
          'cursor-pointer border-t border-slate-100 transition-colors hover:bg-slate-100/50',
          index % 2 === 1 && !isExpanded ? 'bg-slate-50/50' : ''
        )}
      >
        <td className="px-6 py-3 text-sm font-medium text-slate-900 font-body">{c.name}</td>
        <td className="px-6 py-3">
          <Badge variant={planBadgeVariant(c.plan)}>{c.plan}</Badge>
        </td>
        <td className="px-6 py-3 text-sm text-slate-700 font-body">{formatCurrency(c.mrr)}</td>
        <td className="px-6 py-3 text-sm text-slate-700 font-body">{formatNumber(c.users)}</td>
        <td className="px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 rounded-full bg-slate-100">
              <div
                className={cn('h-2 rounded-full', healthColor(c.healthScore))}
                style={{ width: `${c.healthScore}%` }}
              />
            </div>
            <span className={cn('text-xs font-medium font-body', healthTextColor(c.healthScore))}>
              {c.healthScore}
            </span>
          </div>
        </td>
        <td className="px-6 py-3 text-sm text-slate-500 font-body">{c.lastActive}</td>
      </tr>

      {/* Expanded detail row */}
      <AnimatePresence>
        {isExpanded && (
          <tr>
            <td colSpan={6} className="p-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Mini sparkline */}
                    <div className="w-48 shrink-0">
                      <p className="text-xs text-slate-500 font-body mb-2">MRR Trend (5 months)</p>
                      <div className="h-16">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={trendData}>
                            <Line
                              type="monotone"
                              dataKey="mrr"
                              stroke="#6366f1"
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Key stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
                      <div>
                        <p className="text-xs text-slate-500 font-body">Plan</p>
                        <p className="text-sm font-semibold text-slate-900 font-body">{c.plan}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-body">Monthly MRR</p>
                        <p className="text-sm font-semibold text-slate-900 font-body">
                          {formatCurrency(c.mrr)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-body">Active Users</p>
                        <p className="text-sm font-semibold text-slate-900 font-body">
                          {formatNumber(c.users)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-body">Health Score</p>
                        <p className={cn('text-sm font-semibold font-body', healthTextColor(c.healthScore))}>
                          {c.healthScore}/100
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}
