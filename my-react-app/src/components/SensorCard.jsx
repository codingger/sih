import React from 'react';

export default function SensorCard({
  title,
  value,
  unit,
  min = 0,
  max = 100,
  currentPercentage,
  status = 'normal', // 'normal' | 'warning' | 'critical'
  icon: Icon,
  subtitle,
  thresholdLabel
}) {
  const percentage = currentPercentage !== undefined
    ? currentPercentage
    : Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const statusColors = {
    normal: {
      bar: 'bg-emerald-400',
      text: 'text-emerald-400',
      glow: 'shadow-emerald-500/20'
    },
    warning: {
      bar: 'bg-amber-400',
      text: 'text-amber-400',
      glow: 'shadow-amber-500/20'
    },
    critical: {
      bar: 'bg-rose-500',
      text: 'text-rose-400',
      glow: 'shadow-rose-500/30'
    }
  }[status] || {
    bar: 'bg-cyan-400',
    text: 'text-cyan-400',
    glow: 'shadow-cyan-500/20'
  };

  return (
    <div className="glass-panel rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-mono text-cyan-300 font-semibold tracking-wider uppercase">
          {title}
        </span>
        {Icon && <Icon className="w-4 h-4 text-cyan-400" />}
      </div>

      <div className="flex items-baseline gap-1 my-1 font-mono">
        <span className="text-2xl sm:text-3xl font-black text-white">
          {value}
        </span>
        <span className="text-xs text-slate-400 font-bold">{unit}</span>
      </div>

      {/* Progress / Threshold Bar */}
      <div className="mt-3">
        <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${statusColors.bar}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-1.5">
          <span>{min} {unit}</span>
          {thresholdLabel && <span className={statusColors.text}>{thresholdLabel}</span>}
          <span>{max} {unit}</span>
        </div>
      </div>

      {subtitle && (
        <div className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800">
          {subtitle}
        </div>
      )}
    </div>
  );
}
