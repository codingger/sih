import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dropdown p-3 rounded-lg border border-cyan-500/40 text-xs shadow-xl">
        <div className="font-mono text-cyan-400 font-bold mb-1.5">{label} UTC</div>
        <div className="space-y-1 font-mono">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-bold text-white">{entry.value} kW</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

export default function EnergyChart({ data, stationId = 'maitri' }) {
  const chartData = data || [];
  const isMaitri = stationId === 'maitri';

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="dieselGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.5} />
          <XAxis
            dataKey="time"
            stroke="#64748b"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={{ stroke: '#334155' }}
          />
          <YAxis
            stroke="#64748b"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={{ stroke: '#334155' }}
            unit="kW"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
          />

          <Area
            type="monotone"
            dataKey={isMaitri ? 'maitriDiesel' : 'bharatiDiesel'}
            name="Diesel Generation"
            stroke="#38bdf8"
            fillOpacity={1}
            fill="url(#dieselGrad)"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey={isMaitri ? 'maitriSolar' : 'bharatiSolar'}
            name="Solar PV"
            stroke="#00f0ff"
            fillOpacity={1}
            fill="url(#solarGrad)"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey={isMaitri ? 'maitriDemand' : 'bharatiDemand'}
            name="Station Demand"
            stroke="#f59e0b"
            strokeDasharray="4 4"
            fillOpacity={1}
            fill="url(#demandGrad)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
