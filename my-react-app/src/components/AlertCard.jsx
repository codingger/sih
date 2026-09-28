import React from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AlertCard({ alert, onAcknowledge }) {
  const { id, severity, title, subsystem, timestamp, message, acknowledged, recommendedAction } = alert;

  const severityConfig = {
    critical: {
      border: 'border-rose-500/40 bg-rose-950/20',
      badge: 'bg-rose-950/80 text-rose-300 border-rose-500/50',
      icon: AlertCircle,
      iconColor: 'text-rose-400'
    },
    warning: {
      border: 'border-amber-500/30 bg-amber-950/15',
      badge: 'bg-amber-950/80 text-amber-300 border-amber-500/50',
      icon: AlertTriangle,
      iconColor: 'text-amber-400'
    },
    info: {
      border: 'border-cyan-500/20 bg-cyan-950/10',
      badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
      icon: Info,
      iconColor: 'text-cyan-400'
    }
  };

  const config = severityConfig[severity] || severityConfig.info;
  const Icon = config.icon;

  return (
    <div className={`rounded-xl p-4 border transition-all duration-200 glass-panel ${config.border}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 p-1.5 rounded-lg bg-slate-900/80 border border-slate-700/50">
            <Icon className={`w-4 h-4 ${config.iconColor} ${severity === 'critical' ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full border ${config.badge}`}>
                {severity}
              </span>
              <span className="text-[11px] font-mono text-cyan-400">
                {subsystem}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                • {timestamp}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-1">
              {title}
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {message}
            </p>

            {recommendedAction && (
              <div className="mt-2.5 p-2 rounded-lg bg-slate-900/70 border border-cyan-500/20 text-[11px] text-cyan-200 flex items-start gap-1.5">
                <span className="font-bold font-mono text-cyan-400 uppercase shrink-0">ACTION:</span>
                <span>{recommendedAction}</span>
              </div>
            )}
          </div>
        </div>

        {/* Acknowledge Button */}
        <div className="shrink-0">
          {acknowledged ? (
            <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-1 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ACK</span>
            </div>
          ) : (
            <button
              onClick={() => onAcknowledge && onAcknowledge(id)}
              className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/30 text-cyan-300 transition-all cursor-pointer"
            >
              Acknowledge
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
