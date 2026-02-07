'use client';

import { usePathname } from 'next/navigation';
import { Search, Bell, Menu } from 'lucide-react';
import { navigationItems } from '@/lib/data';

interface TopBarProps {
  onMenuToggle?: () => void;
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
  const pathname = usePathname();

  const currentPage = navigationItems.find((item) => item.href === pathname);
  const pageTitle = currentPage?.label ?? 'Dashboard';

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white border-b border-slate-200 z-20">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left: Mobile menu + Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-700 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">InsightFlow</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-medium">{pageTitle}</span>
          </div>
        </div>

        {/* Right: Search, Notification, Upgrade */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden sm:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-48 lg:w-64 pl-9 pr-3 py-2 bg-slate-100 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Notification Bell */}
          <button className="relative p-2 text-slate-500 hover:text-slate-700 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-brand rounded-full" />
          </button>

          {/* Upgrade Button */}
          <button className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-brand to-purple-500 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-sm">
            Upgrade
          </button>
        </div>
      </div>
    </header>
  );
}
