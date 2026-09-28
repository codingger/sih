import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { BarChart3, TrendingUp, Zap, Fuel, Activity, Compass } from 'lucide-react';
import { STATIONS } from '../data/mockData';

const COMPARISON_DATA = [
  { metric: 'Avg Temp (°C)', maitri: -32, bharati: -24 },
  { metric: 'Peak Wind (km/h)', maitri: 32, bharati: 42 },
  { metric: 'Power Gen (kW)', maitri: 182, bharati: 215 },
  { metric: 'Renewable (%)', maitri: 24, bharati: 46 },
  { metric: 'Fuel Reserves (%)', maitri: 67, bharati: 74 },
  { metric: 'Health Score', maitri: 94, bharati: 98 }
];

export default function Analytics() {
  const maitri = STATIONS.maitri;
  const bharati = STATIONS.bharati;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
            CROSS-STATION TELEMETRY & HISTORICAL COMPARISON
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Polar Operations Analytics
          </h1>
          <p className="text-xs text-slate-400">
            Comparative performance between Maitri Base (Inland Oasis) and Bharati Base (Coastal Promontory)
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
            Telemetry Database: 2.4 TB Synced
          </span>
        </div>
      </div>

      {/* Cross Station Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Maitri Profile Card */}
        <div className="glass-panel rounded-xl p-5 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">STATION IN-MAI</span>
              <h2 className="text-xl font-bold text-white mt-0.5">Maitri Research Base</h2>
              <div className="text-xs text-slate-400 font-mono">Schirmacher Oasis, Queen Maud Land • Est. 1989</div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-amber-400 font-bold">Health: 94/100</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
              <div className="text-slate-400 text-[10px]">MICROGRID RENEWABLE</div>
              <div className="text-xl font-bold text-cyan-300 mt-0.5">{maitri.telemetry.solarShare}%</div>
              <div className="text-[10px] text-slate-400">Bifacial Polar Solar Only</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
              <div className="text-slate-400 text-[10px]">FUEL CONSUMPTION</div>
              <div className="text-xl font-bold text-white mt-0.5">53 L/h</div>
              <div className="text-[10px] text-amber-400">142 Days Remaining</div>
            </div>
          </div>
        </div>

        {/* Bharati Profile Card */}
        <div className="glass-panel rounded-xl p-5 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">STATION IN-BHA</span>
              <h2 className="text-xl font-bold text-white mt-0.5">Bharati Research Base</h2>
              <div className="text-xs text-slate-400 font-mono">Larsemann Hills, East Antarctica • Est. 2012</div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-emerald-400 font-bold">Health: 98/100</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
              <div className="text-slate-400 text-[10px]">MICROGRID RENEWABLE</div>
              <div className="text-xl font-bold text-emerald-400 mt-0.5">{bharati.telemetry.solarShare + (bharati.telemetry.windShare || 0)}%</div>
              <div className="text-[10px] text-slate-400">Wind 14% + Solar 32%</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
              <div className="text-slate-400 text-[10px]">FUEL CONSUMPTION</div>
              <div className="text-xl font-bold text-white mt-0.5">42 L/h</div>
              <div className="text-[10px] text-emerald-400">188 Days Remaining</div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Bar Chart */}
      <div className="glass-panel rounded-xl p-5 border border-cyan-500/20">
        <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase mb-4">
          SIDE-BY-SIDE METRIC BENCHMARKING
        </h3>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={COMPARISON_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="metric" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#0b1528', borderColor: '#00f0ff', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
              />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '10px' }} />
              <Bar dataKey="maitri" name="Maitri Base" fill="#00f0ff" radius={[4, 4, 0, 0]} />
              <Bar dataKey="bharati" name="Bharati Base" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
