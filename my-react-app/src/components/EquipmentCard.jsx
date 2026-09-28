import React from 'react';
import { Wrench, Clock, Activity, AlertOctagon, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function EquipmentCard({ equipment, onInspect }) {
  const {
    id,
    name,
    category,
    status,
    health,
    load,
    runtimeHours,
    lastServiced,
    nextServiceDue,
    serial,
    location
  } = equipment;

  const statusConfig = {
    normal: {
      border: 'border-cyan-500/20 hover:border-cyan-400/40',
      badge: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40',
      dot: 'bg-emerald-400'
    },
    warning: {
      border: 'border-amber-500/30 hover:border-amber-400/50',
      badge: 'bg-amber-950/60 text-amber-400 border-amber-500/40',
      dot: 'bg-amber-400'
    },
    critical: {
      border: 'border-rose-500/40 hover:border-rose-400/70',
      badge: 'bg-rose-950/70 text-rose-300 border-rose-500/50 pulse-critical',
      dot: 'bg-rose-500'
    }
  }[status] || {
    border: 'border-cyan-500/20',
    badge: 'bg-slate-800 text-slate-300 border-slate-700',
    dot: 'bg-slate-400'
  };

  return (
    <div className={`glass-panel rounded-xl p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between ${statusConfig.border}`}>
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase">
            {category}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`} />
            <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full border ${statusConfig.badge}`}>
              {status}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white tracking-tight">
          {name}
        </h3>
        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
          SN: {serial} • {location}
        </div>

        {/* Health & Load bars */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-1">
              <span>HEALTH</span>
              <span className={`font-bold ${health < 50 ? 'text-rose-400' : health < 80 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {health}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${health < 50 ? 'bg-rose-500' : health < 80 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                style={{ width: `${health}%` }}
              />
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-1">
              <span>LOAD</span>
              <span className={`font-bold ${load > 90 ? 'text-rose-400' : 'text-cyan-400'}`}>
                {load}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${load > 90 ? 'bg-rose-500' : 'bg-cyan-400'}`}
                style={{ width: `${load}%` }}
              />
            </div>
          </div>
        </div>

        {/* Details list */}
        <div className="space-y-1.5 text-xs font-mono text-slate-300 py-1">
          <div className="flex justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Runtime:
            </span>
            <span className="font-semibold text-white">{runtimeHours.toLocaleString()} hrs</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-cyan-400" />
              Next Due:
            </span>
            <span className={`font-semibold ${nextServiceDue.includes('OVERDUE') ? 'text-rose-400 font-bold' : 'text-slate-200'}`}>
              {nextServiceDue}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 font-mono">
          Last serviced: {lastServiced}
        </span>
        <button
          onClick={() => onInspect && onInspect(equipment)}
          className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/30 text-cyan-300 transition-all cursor-pointer"
        >
          Diagnostics
        </button>
      </div>
    </div>
  );
}
