import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { Cpu, AlertTriangle, Clock, Calendar, CheckCircle2, ArrowRight, ShieldCheck, Activity, Sparkles } from 'lucide-react';
import { PREDICTIVE_MAINTENANCE, STATIONS } from '../data/mockData';

export default function Maintenance({ currentStationId }) {
  const { addToast } = useToast();
  const [items, setItems] = useState(() => PREDICTIVE_MAINTENANCE);
  const [scheduledId, setScheduledId] = useState(null);

  const station = STATIONS[currentStationId] || STATIONS.maitri;
  const stationItems = items.filter(i => i.station === currentStationId);

  const handleScheduleService = (item) => {
    setScheduledId(item.id);
    addToast({
      title: `Work Order WO-${item.id} Logged`,
      message: `Polar maintenance depot notified for ${item.equipmentName}. Required spares reserved from Spares Bin #P-44.`,
      type: 'success',
      duration: 5000
    });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>AI DIAGNOSTICS & PROGNOSTICS • {station.name.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Predictive Maintenance Engine
          </h1>
          <p className="text-xs text-slate-400">
            Acoustic FFT harmonic vibration modeling, oil debris analysis, and pre-failure failure probability scoring
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
            AI Prognostics Model: ResNet-Polar v4.2
          </span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
          <div className="text-[10px] text-slate-400 uppercase">HIGH RISK ANOMALIES</div>
          <div className="text-2xl font-bold text-rose-400 mt-1">
            {stationItems.filter(i => i.urgency === 'high').length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Immediate intervention required</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
          <div className="text-[10px] text-slate-400 uppercase">AVG PRE-FAILURE ADVANCE NOTICE</div>
          <div className="text-2xl font-bold text-cyan-300 mt-1">18.4 Days</div>
          <div className="text-[11px] text-slate-400 mt-1">Sufficient lead time for spares prep</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
          <div className="text-[10px] text-slate-400 uppercase">AI FORECAST ACCURACY</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">94.8%</div>
          <div className="text-[11px] text-slate-400 mt-1">Validated against 14 seasons telemetry</div>
        </div>
      </div>

      {/* Predictive Items List */}
      <div className="space-y-4">
        {stationItems.map(item => {
          const isHigh = item.urgency === 'high';
          const isMedium = item.urgency === 'medium';

          return (
            <div
              key={item.id}
              className={`glass-panel rounded-xl p-5 border transition-all ${
                isHigh ? 'border-rose-500/40 bg-rose-950/15' : isMedium ? 'border-amber-500/30 bg-amber-950/10' : 'border-cyan-500/20'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                      isHigh
                        ? 'bg-rose-950 text-rose-300 border-rose-500/50 pulse-critical'
                        : isMedium
                        ? 'bg-amber-950 text-amber-300 border-amber-500/50'
                        : 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                    }`}>
                      URGENCY: {item.urgency}
                    </span>
                    <span className="text-xs font-mono text-cyan-400">{item.equipmentId}</span>
                    <span className="text-xs font-mono text-slate-400">• Component: <strong className="text-slate-200">{item.component}</strong></span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {item.equipmentName}
                  </h3>

                  {/* Indicators List */}
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
                    <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase">
                      TELEMETRY ANOMALY INDICATORS
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                      {item.indicators.map((ind, idx) => (
                        <li key={idx} className="leading-relaxed">{ind}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Action */}
                  <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200">
                    <strong className="font-mono text-cyan-400 uppercase block mb-0.5">RECOMMENDED PROTOCOL:</strong>
                    {item.recommendedAction}
                  </div>
                </div>

                {/* Right Side: Probability Gauge & Action */}
                <div className="lg:w-64 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between shrink-0 font-mono text-xs space-y-3">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">FAILURE PROBABILITY</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className={`text-3xl font-black ${item.failureProbability > 75 ? 'text-rose-400' : item.failureProbability > 50 ? 'text-amber-400' : 'text-cyan-300'}`}>
                        {item.failureProbability}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                      <div
                        className={`h-full rounded-full ${item.failureProbability > 75 ? 'bg-rose-500' : item.failureProbability > 50 ? 'bg-amber-400' : 'bg-cyan-400'}`}
                        style={{ width: `${item.failureProbability}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Projected Run:</span>
                      <span className="text-white font-bold">{item.projectedFailureDays} Days Left</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Recommended Date:</span>
                      <span className="text-cyan-400">{item.recommendedServiceDate}</span>
                    </div>
                  </div>

                  {scheduledId === item.id ? (
                    <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-bold text-[11px]">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Work Order Created</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleScheduleService(item)}
                      className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs cursor-pointer shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Schedule Work Order</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
