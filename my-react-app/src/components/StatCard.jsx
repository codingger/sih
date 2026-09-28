import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function StatCard({
  title,
  value,
  unit = '',
  icon: Icon,
  trend,
  trendDirection = 'neutral', // 'up' | 'down' | 'neutral'
  trendLabel = 'vs yesterday',
  status = 'normal', // 'normal' | 'warning' | 'critical'
  subtext,
  sparklineData,
  onClick
}) {
  const statusBorderClasses = {
    normal: 'border-cyan-500/20 hover:border-cyan-400/50 shadow-cyan-950/20',
    warning: 'border-amber-500/30 hover:border-amber-400/60 shadow-amber-950/20',
    critical: 'border-rose-500/40 hover:border-rose-400/70 shadow-rose-950/30'
  };

  const statusGlowClasses = {
    normal: 'text-emerald-400 bg-emerald-950/50 border-emerald-500/30',
    warning: 'text-amber-400 bg-amber-950/50 border-amber-500/30',
    critical: 'text-rose-400 bg-rose-950/50 border-rose-500/30 pulse-critical'
  };

  const trendColor = {
    up: 'text-emerald-400',
    down: 'text-rose-400',
    neutral: 'text-slate-400'
  }[trendDirection];

  const TrendIcon = trendDirection === 'up' ? ArrowUpRight : trendDirection === 'down' ? ArrowDownRight : Minus;

  return (
    <div
      onClick={onClick}
      className={`glass-panel rounded-xl p-4 sm:p-5 border transition-all duration-300 relative overflow-hidden group ${
        statusBorderClasses[status] || statusBorderClasses.normal
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Top subtle light reflection */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      {/* Header with Title and Icon */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-mono tracking-wider text-cyan-300/80 uppercase font-semibold">
          {title}
        </span>
        {Icon && (
          <div className="p-2 rounded-lg bg-slate-800/80 border border-cyan-500/20 text-cyan-400 group-hover:text-cyan-300 group-hover:scale-105 transition-all">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Primary Value & Optional Sparkline */}
      <div className="flex items-center justify-between my-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
            {value}
          </span>
          {unit && (
            <span className="text-sm font-semibold text-slate-400 font-mono">
              {unit}
            </span>
          )}
        </div>

        {sparklineData && sparklineData.length > 1 && (
          <div className="w-16 h-8 opacity-80 group-hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 60 30" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id={`grad-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={status === 'critical' ? '#ef4444' : status === 'warning' ? '#f59e0b' : '#00f0ff'} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={status === 'critical' ? '#ef4444' : status === 'warning' ? '#f59e0b' : '#00f0ff'} stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {(() => {
                const min = Math.min(...sparklineData);
                const max = Math.max(...sparklineData);
                const range = max - min || 1;
                const points = sparklineData.map((val, idx) => {
                  const x = (idx / (sparklineData.length - 1)) * 58 + 1;
                  const y = 28 - ((val - min) / range) * 24;
                  return `${x},${y}`;
                }).join(' ');

                const firstX = 1;
                const lastX = 59;
                const areaPoints = `${firstX},29 ${points} ${lastX},29`;

                return (
                  <>
                    <polygon
                      points={areaPoints}
                      fill={`url(#grad-${title.replace(/\s+/g, '')})`}
                    />
                    <polyline
                      fill="none"
                      stroke={status === 'critical' ? '#ef4444' : status === 'warning' ? '#f59e0b' : '#00f0ff'}
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={points}
                    />
                  </>
                );
              })()}
            </svg>
          </div>
        )}
      </div>

      {/* Trend or Subtext */}
      <div className="flex items-center justify-between mt-3 text-xs">
        {trend && (
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <span className={`flex items-center font-bold ${trendColor}`}>
              <TrendIcon className="w-3 h-3 mr-0.5" />
              {trend}
            </span>
            <span className="text-slate-400 text-[10px]">{trendLabel}</span>
          </div>
        )}

        {subtext && !trend && (
          <span className="text-[11px] text-slate-400">{subtext}</span>
        )}

        {/* Small Status indicator pill */}
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold uppercase border ${statusGlowClasses[status]}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
