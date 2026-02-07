export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-pulse">
      <div className="h-3 w-24 bg-slate-100 rounded mb-3" />
      <div className="h-7 w-32 bg-slate-100 rounded mb-2" />
      <div className="h-4 w-16 bg-slate-100 rounded" />
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-pulse">
      <div className="h-4 w-40 bg-slate-100 rounded mb-2" />
      <div className="h-3 w-24 bg-slate-100 rounded mb-4" />
      <div className="h-80 w-full bg-slate-100 rounded-xl" />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm animate-pulse">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-4">
        <div className="h-4 w-32 bg-slate-100 rounded" />
        <div className="h-4 w-20 bg-slate-100 rounded ml-auto" />
      </div>
      {/* Rows */}
      <div className="p-4 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-3 w-28 bg-slate-100 rounded" />
            <div className="h-3 w-16 bg-slate-100 rounded" />
            <div className="h-3 w-20 bg-slate-100 rounded" />
            <div className="h-3 w-12 bg-slate-100 rounded" />
            <div className="h-3 flex-1 bg-slate-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
