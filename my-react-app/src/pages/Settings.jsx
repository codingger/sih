import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

export default function Settings() {
  const { addToast } = useToast();
  const [lowBandwidth, setLowBandwidth] = useState(
    () => localStorage.getItem('ncpor_low_bandwidth') === 'true'
  );
  const [refreshRate, setRefreshRate] = useState(
    () => localStorage.getItem('ncpor_refresh_rate') || '2500'
  );

  const handleLowBandwidthToggle = (val) => {
    setLowBandwidth(val);
    localStorage.setItem('ncpor_low_bandwidth', String(val));
    window.dispatchEvent(new Event('ncpor-settings-changed'));
    addToast({
      title: val ? 'Low-Bandwidth Mode Active' : 'Standard Bandwidth Restored',
      message: val
        ? 'Telemetry polling throttled to 6.0s. Graphic animations optimized for Iridium/BGAN.'
        : 'Standard real-time telemetry streaming active (full animations enabled).',
      type: 'info',
      duration: 4000
    });
  };

  const handleRefreshChange = (val) => {
    setRefreshRate(val);
    localStorage.setItem('ncpor_refresh_rate', val);
    window.dispatchEvent(new Event('ncpor-settings-changed'));
    addToast({
      title: 'Telemetry Jitter Rate Updated',
      message: `SCADA polling rate set to ${val / 1000}s interval. Real-time stream synchronized.`,
      type: 'info',
      duration: 3500
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
            COMMUNICATION & TELEMETRY PREFERENCES
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">
            Mission Control Settings
          </h1>
          <p className="text-xs text-slate-400">
            Configure polar satellite link bandwidth, refresh intervals, and display optimizations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div className="glass-panel rounded-xl p-5 border border-cyan-500/20 space-y-4">
          <div className="text-sm font-semibold text-white">Satellite Bandwidth Optimization</div>
          <p className="text-xs text-slate-400">
            When operating on high-latency polar links (e.g. Inmarsat BGAN / Iridium Certus), reduce graphic animation workload and polling frequency.
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-200">Low-Bandwidth Mode</span>
            <button
              onClick={() => handleLowBandwidthToggle(!lowBandwidth)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lowBandwidth
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {lowBandwidth ? 'ENABLED (6s POLL)' : 'DISABLED (NORMAL)'}
            </button>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 border border-cyan-500/20 space-y-4">
          <div className="text-sm font-semibold text-white">Telemetry Jitter Rate</div>
          <p className="text-xs text-slate-400">
            Configure the simulated telemetry stream interval for sensors and load readings.
          </p>
          <select
            value={refreshRate}
            onChange={(e) => handleRefreshChange(e.target.value)}
            className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-lg px-3 py-2 text-xs text-slate-200 cursor-pointer"
          >
            <option value="1500">Fast Stream (1.5 Seconds)</option>
            <option value="2500">Standard Telemetry (2.5 Seconds)</option>
            <option value="5000">Slow Telemetry (5.0 Seconds)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
