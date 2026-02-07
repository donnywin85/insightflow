'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  DollarSign,
  Users,
  Activity,
  Sparkles,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigationItems } from '@/lib/data';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  BarChart3,
  DollarSign,
  Users,
  Activity,
  Sparkles,
};

export default function Sidebar() {
  const pathname = usePathname();

  // Group navigation items by section
  const sections = navigationItems.reduce<Record<string, typeof navigationItems>>(
    (acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item);
      return acc;
    },
    {}
  );

  return (
    <aside className="hidden lg:flex lg:flex-col fixed left-0 top-0 bottom-0 w-64 bg-sidebar-dark z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-brand to-purple-500">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-heading font-bold text-white tracking-tight">
          InsightFlow
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {Object.entries(sections).map(([section, items]) => (
          <div key={section}>
            <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {section}
            </p>
            <ul className="space-y-1">
              {items.map((item) => {
                const Icon = iconMap[item.icon];
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-white/10 text-white border-l-[3px] border-indigo-500'
                          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border-l-[3px] border-transparent'
                      )}
                    >
                      {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-600 text-white text-sm font-semibold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Jane Davis</p>
            <p className="text-xs text-slate-400">Admin</p>
          </div>
          <button className="p-1.5 text-slate-400 hover:text-slate-200 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
