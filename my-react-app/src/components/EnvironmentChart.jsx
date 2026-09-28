import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dropdown p-3 rounded-lg border border-cyan-500/40 text-xs shadow-xl font-mono">
        <div className="text-cyan-400 font-bold mb-1.5">{label} UTC</div>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-bold text-white">
                {entry.value} {entry.unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

export default function EnvironmentChart({ data, stationId = 'maitri' }) {
  const chartData = data || [];
  const isMaitri = stationId === 'maitri';

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.5} />
          <XAxis
            dataKey="time"
            stroke="#64748b"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={{ stroke: '#334155' }}
          />
          <YAxis
            yAxisId="left"
            stroke="#00f0ff"
            tick={{ fill: '#00f0ff', fontSize: 11 }}
            axisLine={{ stroke: '#334155' }}
            unit="°C"
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#38bdf8"
            tick={{ fill: '#38bdf8', fontSize: 11 }}
            axisLine={{ stroke: '#334155' }}
            unit="km/h"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
          />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey={isMaitri ? 'maitriTemp' : 'bharatiTemp'}
            name="Ambient Temperature"
            stroke="#00f0ff"
            strokeWidth={2.5}
            dot={{ r: 2, fill: '#00f0ff' }}
            activeDot={{ r: 5, fill: '#00f0ff' }}
            unit="°C"
          />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey={isMaitri ? 'windMaitri' : 'windBharati'}
            name="Wind Speed"
            stroke="#38bdf8"
            strokeWidth={2}
            strokeDasharray="3 3"
            dot={{ r: 2, fill: '#38bdf8' }}
            activeDot={{ r: 5, fill: '#38bdf8' }}
            unit="km/h"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
