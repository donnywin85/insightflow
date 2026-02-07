'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import { aiInsights } from '@/lib/data';
import { cn, formatCompactCurrency } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Severity colours & helpers                                         */
/* ------------------------------------------------------------------ */
type SeverityFilter = 'all' | 'critical' | 'warning' | 'info';

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

const severityBadgeStyles: Record<string, string> = {
  critical: 'bg-rose-50 text-rose-700',
  warning: 'bg-amber-50 text-amber-700',
  info: 'bg-emerald-50 text-emerald-700',
};

const filterOptions: { value: SeverityFilter; label: string; dotColor?: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'critical', label: 'Critical', dotColor: 'bg-rose-500' },
  { value: 'warning', label: 'Warning', dotColor: 'bg-amber-500' },
  { value: 'info', label: 'Info', dotColor: 'bg-emerald-500' },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function AIInsightsPage() {
  const [activeFilter, setActiveFilter] = useState<SeverityFilter>('all');

  // Computed counts
  const criticalCount = useMemo(
    () => aiInsights.filter((i) => i.severity === 'critical').length,
    []
  );
  const infoCount = useMemo(
    () => aiInsights.filter((i) => i.severity === 'info').length,
    []
  );
  const totalImpact = useMemo(
    () =>
      aiInsights
        .filter((i) => i.impactValue > 0)
        .reduce((sum, i) => sum + i.impactValue, 0),
    []
  );

  // Filtered insights
  const filteredInsights = useMemo(
    () =>
      activeFilter === 'all'
        ? aiInsights
        : aiInsights.filter((i) => i.severity === activeFilter),
    [activeFilter]
  );

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* PAGE HEADER */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold font-heading text-slate-900">
            AI-Powered Insights
          </h1>
          <Sparkles className="h-6 w-6 text-indigo-brand" />
        </div>
        <p className="mt-1 text-sm text-slate-500 font-body">
          Actionable recommendations to grow your business
        </p>
      </div>

      {/* INSIGHTS SUMMARY ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Critical Issues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl border border-rose-200 shadow-sm p-5"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-rose-50">
              <AlertTriangle className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <p className="text-2xl font-bold font-heading text-slate-900">
                {criticalCount}
              </p>
              <p className="text-sm text-slate-500 font-body">Critical Issues</p>
            </div>
          </div>
        </motion.div>

        {/* Growth Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-xl border border-emerald-200 shadow-sm p-5"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-50">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold font-heading text-slate-900">
                {infoCount}
              </p>
              <p className="text-sm text-slate-500 font-body">
                Growth Opportunities
              </p>
            </div>
          </div>
        </motion.div>

        {/* Estimated Total Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-50">
              <DollarSign className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold font-heading text-emerald-600">
                {formatCompactCurrency(totalImpact)}
              </p>
              <p className="text-sm text-slate-500 font-body">
                Estimated Total Impact
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SEVERITY FILTER */}
      <div className="flex items-center gap-2 flex-wrap">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setActiveFilter(opt.value)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
              activeFilter === opt.value
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            )}
          >
            {opt.dotColor && (
              <span
                className={cn('w-2 h-2 rounded-full', opt.dotColor)}
              />
            )}
            {opt.label}
          </button>
        ))}
      </div>

      {/* INSIGHT CARDS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInsights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={cn(
              'bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4',
              severityBorderColor[insight.severity]
            )}
          >
            <div className="p-5">
              {/* Top: severity badge + category tag */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
                    severityBadgeStyles[insight.severity]
                  )}
                >
                  <span
                    className={cn(
                      'w-1.5 h-1.5 rounded-full',
                      severityDotColor[insight.severity]
                    )}
                  />
                  {insight.severity}
                </span>
                <span className="bg-slate-100 text-slate-700 rounded-full text-xs px-2.5 py-0.5 font-medium">
                  {insight.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold font-heading text-slate-900 mt-2">
                {insight.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 font-body mt-1 leading-relaxed">
                {insight.description}
              </p>

              {/* Recommended Action */}
              <div className="bg-slate-50 rounded-lg p-3 mt-3">
                <p className="text-xs uppercase tracking-wider text-slate-500 font-body mb-1">
                  Recommended Action
                </p>
                <p className="text-sm text-slate-700 font-body">
                  {insight.recommendedAction}
                </p>
              </div>

              {/* Impact + Buttons */}
              <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                <p className="text-sm font-semibold text-emerald-600">
                  {insight.estimatedImpact}
                </p>
                <div className="flex items-center gap-2">
                  <button className="bg-indigo-brand text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-indigo-700 transition-colors">
                    Implement
                  </button>
                  <button className="border border-slate-200 text-slate-600 rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
