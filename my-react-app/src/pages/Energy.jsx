import React, { useState } from 'react';
import EnergyChart from '../components/EnergyChart';
import StatCard from '../components/StatCard';
import SensorCard from '../components/SensorCard';
import { useToast } from '../context/ToastContext';
import { Zap, Sun, Gauge, BatteryCharging, Sparkles, AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { STATIONS, HOURLY_TELEMETRY } from '../data/mockData';

export default function Energy({ currentStationId, stationData }) {
  const { addToast } = useToast();
  const [isOptimized, setIsOptimized] = useState(false);
  const station = stationData || STATIONS[currentStationId] || STATIONS.maitri;
  const isMaitri = currentStationId === 'maitri';

  const handleApplyOptimization = () => {
    setIsOptimized(true);
    addToast({
      title: 'Microgrid Dispatch Optimization Applied',
      message: isMaitri
        ? 'Secondary load shed engaged: 24 kW diverted to BESS Bank #1. Gen #02 temperature stabilizing.'
        : 'Wind-Solar hybrid balancing profile dispatched to station PLC (harmonic distortion < 0.8%).',
      type: 'success',
      duration: 5000
    });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
            ENERGY & MICROGRID • {station.name.toUpperCase()}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Polar Energy & Renewable Dispatch
          </h1>
          <p className="text-xs text-slate-400">
            Real-time renewable penetration, diesel genset fuel rate, and battery storage buffering
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            Grid Stability: 50.02 Hz ± 0.05
          </span>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Instant Generation"
          value={station.telemetry.powerGeneration}
          unit="kW"
          icon={Zap}
          trend="+8 kW"
          trendDirection="up"
          trendLabel="vs avg"
          status="normal"
          subtext="Station Demand: 164 kW"
        />
        <StatCard
          title="Renewable Share"
          value={station.telemetry.solarShare + (station.telemetry.windShare || 0)}
          unit="%"
          icon={Sun}
          trend="+5.4%"
          trendDirection="up"
          trendLabel="solar albedo gain"
          status="normal"
          subtext={isMaitri ? 'Solar Field: 44 kW' : 'Solar 68 kW + Wind 38 kW'}
        />
        <StatCard
          title="Battery Storage (BESS)"
          value={station.telemetry.batterySOC}
          unit="%"
          icon={BatteryCharging}
          trend="+2.1%"
          trendDirection="up"
          trendLabel="charging"
          status="normal"
          subtext="Capacity: 240 kWh LiFePO4"
        />
        <StatCard
          title="Diesel Genset Fuel Burn"
          value={isMaitri ? '53' : '42'}
          unit="L/hr"
          icon={Gauge}
          trend={isMaitri ? '+14%' : '-2%'}
          trendDirection={isMaitri ? 'down' : 'up'}
          trendLabel={isMaitri ? 'Gen #02 friction' : 'optimal efficiency'}
          status={isMaitri ? 'warning' : 'normal'}
          subtext="Fuel Level: 67% (142 Days)"
        />
      </div>

      {/* Generation vs Consumption Chart */}
      <div className="glass-panel rounded-xl p-5 border border-cyan-500/20">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-bold">
              HOURLY TELEMETRY
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              Generation Breakdown (Solar + Diesel) vs. Station Demand
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">24h History</span>
        </div>
        <EnergyChart data={HOURLY_TELEMETRY} stationId={currentStationId} />
      </div>

      {/* Energy Flow & AI Optimization Suggestion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Source Breakdown (1 col) */}
        <div className="glass-panel rounded-xl p-5 border border-cyan-500/20 space-y-4">
          <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
            ENERGY MIX BREAKDOWN
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Arctic Diesel Gensets</span>
                <span className="font-bold text-white">{station.telemetry.dieselShare}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-400 h-full rounded-full" style={{ width: `${station.telemetry.dieselShare}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Bifacial Solar Photovoltaics</span>
                <span className="font-bold text-cyan-400">{station.telemetry.solarShare}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${station.telemetry.solarShare}%` }} />
              </div>
            </div>

            {station.telemetry.windShare && (
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Coastal Wind Turbines</span>
                  <span className="font-bold text-emerald-400">{station.telemetry.windShare}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${station.telemetry.windShare}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI Microgrid Optimizer (2 cols) */}
        <div className="lg:col-span-2 glass-panel-glow rounded-xl p-5 border border-cyan-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                AI SMART MICROGRID DISPATCH SUGGESTION
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              {isMaitri
                ? 'Thermal Peak Shaving & Generator #02 De-Loading Strategy'
                : 'Wind-Solar Hybrid Load Balancing Optimized'}
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {isMaitri
                ? 'Telemetry indicates Generator #02 is bearing 94% load at 104°C. The AI dispatch controller advises shedding 24 kW of non-essential geophysical labs and discharging Battery BESS Bank #1 for 3.5 hours until solar peak insolation at 11:00 UTC.'
                : 'Coastal katabatic winds are forecasted to sustain 26 km/h. Wind turbine generation can safely substitute 18% of diesel baseload without threatening grid harmonic distortion.'}
            </p>

            <div className="mt-4 p-3 rounded-lg bg-slate-900/80 border border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div>
                <div className="text-[10px] text-slate-400">ESTIMATED FUEL SAVING</div>
                <div className="text-emerald-400 font-bold mt-0.5">+48 L/day</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">CARBON EMISSION REDUCTION</div>
                <div className="text-cyan-300 font-bold mt-0.5">-128 kg CO₂/day</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">GEN #02 THERMAL DROP</div>
                <div className="text-rose-300 font-bold mt-0.5">-16°C Relief</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-cyan-500/20 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Recommendation Confidence: 96.4%</span>
            {isOptimized ? (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Optimization Active</span>
              </span>
            ) : (
              <button
                onClick={handleApplyOptimization}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono cursor-pointer transition-all shadow-md shadow-cyan-500/20"
              >
                Apply Microgrid Optimization
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
