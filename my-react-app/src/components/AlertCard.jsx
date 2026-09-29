import React from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, Wrench, ShieldAlert } from 'lucide-react';

export default function AlertCard({ alert, onAcknowledge }) {
  const { id, severity, title, subsystem, timestamp, message, acknowledged, recommendedAction } = alert;

  const severityConfig = {
    critical: {
      cardBg: 'bg-rose-950/20 border-rose-500/40 border-l-4 border-l-rose-500',
      badge: 'bg-rose-950/90 text-rose-300 border-rose-500/50',
      icon: ShieldAlert,
      iconColor: 'text-rose-400',
      actionBg: 'bg-rose-950/50 border-rose-500/30 text-rose-200'
    },
    warning: {
      cardBg: 'bg-amber-950/15 border-amber-500/30 border-l-4 border-l-amber-500',
      badge: 'bg-amber-950/90 text-amber-300 border-amber-500/50',
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
      actionBg: 'bg-amber-950/40 border-amber-500/30 text-amber-200'
    },
    info: {
      cardBg: 'bg-cyan-950/10 border-cyan-500/20 border-l-4 border-l-cyan-500',
      badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
      icon: Info,
      iconColor: 'text-cyan-400',
      actionBg: 'bg-cyan-950/40 border-cyan-500/20 text-cyan-200'
    }
  };

  const config = severityConfig[severity] || severityConfig.info;
  const Icon = config.icon;

  return (
    <div className={`rounded-xl p-3.5 sm:p-4 border glass-panel transition-all duration-200 hover:border-cyan-400/40 shadow-sm ${config.cardBg}`}>
      <div className="flex items-start justify-between gap-3">
        {/* Left Side: Icon & Details */}
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="mt-0.5 p-1.5 rounded-lg bg-slate-900/90 border border-slate-700/60 shrink-0">
            <Icon className={`w-4 h-4 ${config.iconColor} ${severity === 'critical' ? 'animate-pulse' : ''}`} />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            {/* Badges & Subsystem Header */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[9px] sm:text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full border ${config.badge}`}>
                {severity}
              </span>
              <span className="text-[11px] font-mono font-medium text-cyan-400 truncate">
                {subsystem}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                • {timestamp}
              </span>
            </div>

            {/* Title */}
            <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
              {title}
            </h4>

            {/* Message */}
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-sans">
              {message}
            </p>

            {/* Recommended Action Strip */}
            {recommendedAction && (
              <div className={`mt-2 p-1.5 px-2.5 rounded-md border text-[10px] sm:text-[11px] font-mono flex items-center gap-1.5 ${config.actionBg}`}>
                <Wrench className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="font-bold uppercase text-cyan-300 shrink-0">Action:</span>
                <span className="truncate">{recommendedAction}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Acknowledge Button */}
        <div className="shrink-0 pt-0.5">
          {acknowledged ? (
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-1 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ACK</span>
            </div>
          ) : (
            <button
              onClick={() => onAcknowledge && onAcknowledge(id)}
              className="text-[10px] sm:text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 border border-cyan-500/40 text-cyan-300 transition-all cursor-pointer shadow-sm"
            >
              Acknowledge
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
