import React from 'react';
import { Snowflake, Search, AlertCircle, Inbox } from 'lucide-react';

const iconMap = {
  search: Search,
  alert: AlertCircle,
  inbox: Inbox,
  default: Snowflake
};

export default function EmptyState({
  title = 'No Data Available',
  message = 'No telemetry records match the current filter configuration.',
  icon = 'default',
  actionLabel,
  onAction
}) {
  const Icon = iconMap[icon] || iconMap.default;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-cyan-500/20 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-cyan-400/60" />
      </div>
      <h3 className="text-sm font-bold text-slate-200 mb-1">{title}</h3>
      <p className="text-xs text-slate-400 max-w-sm leading-relaxed">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold hover:bg-cyan-900/60 cursor-pointer transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
