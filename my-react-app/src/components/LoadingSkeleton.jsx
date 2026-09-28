import React from 'react';

export function LoadingSkeleton({ className = '', variant = 'rect' }) {
  const baseClasses = 'animate-pulse bg-slate-800/60 rounded';
  if (variant === 'circle') {
    return <div className={`${baseClasses} rounded-full ${className}`} />;
  }
  if (variant === 'text') {
    return <div className={`${baseClasses} h-3 rounded-md ${className}`} />;
  }
  return <div className={`${baseClasses} ${className}`} />;
}

export function PageLoader() {
  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header skeleton */}
      <div className="border-b border-cyan-500/20 pb-4">
        <LoadingSkeleton variant="text" className="w-48 h-3 mb-2" />
        <LoadingSkeleton variant="text" className="w-72 h-7 mb-1" />
        <LoadingSkeleton variant="text" className="w-96 h-3" />
      </div>

      {/* 4 StatCard skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-panel rounded-xl p-5 border border-cyan-500/10 space-y-3">
            <div className="flex items-center justify-between">
              <LoadingSkeleton variant="text" className="w-24 h-3" />
              <LoadingSkeleton variant="rect" className="w-8 h-8 rounded-lg" />
            </div>
            <LoadingSkeleton variant="text" className="w-20 h-8" />
            <div className="flex items-center justify-between">
              <LoadingSkeleton variant="text" className="w-16 h-3" />
              <LoadingSkeleton variant="text" className="w-12 h-4 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Chart area skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-5 border border-cyan-500/10">
          <LoadingSkeleton variant="text" className="w-40 h-3 mb-2" />
          <LoadingSkeleton variant="text" className="w-60 h-5 mb-4" />
          <LoadingSkeleton variant="rect" className="w-full h-48 rounded-lg" />
        </div>
        <div className="glass-panel rounded-xl p-5 border border-cyan-500/10">
          <LoadingSkeleton variant="text" className="w-40 h-3 mb-2" />
          <LoadingSkeleton variant="text" className="w-60 h-5 mb-4" />
          <LoadingSkeleton variant="rect" className="w-full h-48 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
