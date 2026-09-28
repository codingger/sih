import React, { useState } from 'react';
import AlertCard from '../components/AlertCard';
import EmptyState from '../components/EmptyState';
import { useToast } from '../context/ToastContext';
import { AlertTriangle, AlertCircle, Info, CheckCircle2, Search, Filter } from 'lucide-react';
import { ALERTS_LIST, STATIONS } from '../data/mockData';
import { api } from '../services/api';

export default function Alerts({ currentStationId, alerts: globalAlerts, onAcknowledgeAlert }) {
  const { addToast } = useToast();
  const [localAlerts, setLocalAlerts] = useState(() => ALERTS_LIST);
  const alerts = globalAlerts || localAlerts;
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [search, setSearch] = useState('');

  const station = STATIONS[currentStationId] || STATIONS.maitri;

  const handleAcknowledge = async (id) => {
    await api.acknowledgeAlert(id);
    const targetAlert = alerts.find(a => a.id === id);
    addToast({
      title: `Incident ${id} Acknowledged`,
      message: targetAlert ? targetAlert.title : 'Incident marked acknowledged by Command HQ operator.',
      type: 'info',
      duration: 4000
    });
    if (onAcknowledgeAlert) {
      onAcknowledgeAlert(id);
    } else {
      setLocalAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true, acknowledgedBy: 'HQ Operator' } : a));
    }
  };

  const filteredAlerts = alerts.filter(a => {
    const matchesStation = !currentStationId || a.station === currentStationId;
    const matchesSeverity = filterSeverity === 'ALL' || a.severity === filterSeverity.toLowerCase();
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
                          a.message.toLowerCase().includes(search.toLowerCase()) ||
                          a.subsystem.toLowerCase().includes(search.toLowerCase());
    return matchesStation && matchesSeverity && matchesSearch;
  });

  const criticalCount = alerts.filter(a => a.station === currentStationId && a.severity === 'critical' && !a.acknowledged).length;
  const warningCount = alerts.filter(a => a.station === currentStationId && a.severity === 'warning' && !a.acknowledged).length;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
            INCIDENT RESPONSE & SENTINEL QUEUE • {station.name.toUpperCase()}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Active Mission Alerts
          </h1>
          <p className="text-xs text-slate-400">
            Real-time SCADA threshold deviations, thermal alerts, mechanical anomalies, and telemetry events
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-500/50 text-rose-300 font-bold">
            {criticalCount} CRITICAL
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/50 text-amber-300 font-bold">
            {warningCount} WARNING
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search alerts, subsystems, error codes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'CRITICAL', 'WARNING', 'INFO'].map(sev => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded-md text-xs font-mono whitespace-nowrap cursor-pointer transition-all ${
                filterSeverity === sev
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Stream List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <EmptyState
            title="All Clear — No Active Alerts"
            message={`No telemetry threshold deviations or active alarms match your criteria for ${station.name}. All systems operating nominally.`}
            icon="inbox"
            actionLabel={search || filterSeverity !== 'ALL' ? 'Reset Filters' : undefined}
            onAction={() => {
              setSearch('');
              setFilterSeverity('ALL');
            }}
          />
        ) : (
          filteredAlerts.map(alert => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onAcknowledge={handleAcknowledge}
            />
          ))
        )}
      </div>
    </div>
  );
}
