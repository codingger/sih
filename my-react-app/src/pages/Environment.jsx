import React from 'react';
import EnvironmentChart from '../components/EnvironmentChart';
import SensorCard from '../components/SensorCard';
import {
  Thermometer,
  Wind,
  Compass,
  Sun,
  AlertTriangle,
  CloudSnow,
  Droplets,
  Gauge,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { STATIONS, HOURLY_TELEMETRY } from '../data/mockData';

export default function Environment({ currentStationId, stationData }) {
  const station = stationData || STATIONS[currentStationId] || STATIONS.maitri;
  const isMaitri = currentStationId === 'maitri';

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
            POLAR METEOROLOGY & ATMOSPHERE • {station.name.toUpperCase()}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Environmental Monitoring
          </h1>
          <p className="text-xs text-slate-400">
            Automated weather station (AWS) surface telemetry, katabatic wind currents, and blizzard early-warning
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            WEATHER STATION AWS-01: ONLINE
          </span>
        </div>
      </div>

      {/* Blizzard Early Warning Banner */}
      <div className="glass-panel rounded-xl p-4 border border-amber-500/40 bg-amber-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-400">
            <CloudSnow className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-amber-400">
                BLIZZARD ADVISORY: LEVEL 2 WATCH
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Valid next 36 hours
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Katabatic frontal system tracking North-East off Polar Plateau. Wind gusts expected to peak at 85 km/h. Outdoor traversing restricted to tether lines.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-amber-950 border border-amber-500/50 text-amber-300 font-mono text-xs font-bold">
            Condition: Yellow Alert
          </span>
        </div>
      </div>

      {/* Weather Sensor Gauges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SensorCard
          title="Ambient Temperature"
          value={station.telemetry.temperature}
          unit="°C"
          min={-60}
          max={0}
          status={station.telemetry.temperature < -40 ? 'critical' : station.telemetry.temperature < -30 ? 'warning' : 'normal'}
          icon={Thermometer}
          subtitle={`Feels like ${station.telemetry.feelsLike}°C with wind chill`}
          thresholdLabel="Min: -52°C"
        />

        <SensorCard
          title="Wind Velocity & Gusts"
          value={station.telemetry.windSpeed}
          unit="km/h"
          min={0}
          max={150}
          status={station.telemetry.windSpeed > 60 ? 'critical' : station.telemetry.windSpeed > 30 ? 'warning' : 'normal'}
          icon={Wind}
          subtitle={`Gusts up to ${station.telemetry.windGust} km/h • ${station.telemetry.windDirection}`}
          thresholdLabel="Gust limit 120"
        />

        <SensorCard
          title="Barometric Pressure"
          value={station.telemetry.pressure}
          unit="hPa"
          min={920}
          max={1040}
          status="normal"
          icon={Gauge}
          subtitle="Polar depression isobar steady"
          thresholdLabel="Nominal 986"
        />

        <SensorCard
          title="Relative Humidity"
          value={station.telemetry.humidity}
          unit="%"
          min={0}
          max={100}
          status="normal"
          icon={Droplets}
          subtitle="Ultra-dry polar desert air"
          thresholdLabel="Dew point -38°C"
        />
      </div>

      {/* 24-Hour Environment Trend Chart */}
      <div className="glass-panel rounded-xl p-5 border border-cyan-500/20">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-bold">
              METEOROLOGICAL PROFILE
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              Ambient Temperature vs. Katabatic Wind Speed (24h)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">AWS Station 01</span>
        </div>
        <EnvironmentChart data={HOURLY_TELEMETRY} stationId={currentStationId} />
      </div>

      {/* Solar Radiation & Observation Outlook */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
          <div className="text-[10px] text-cyan-400 font-bold uppercase mb-1">SOLAR INSOLATION</div>
          <div className="text-2xl font-bold text-white">{station.telemetry.solarInsolation} <span className="text-xs text-slate-400">W/m²</span></div>
          <div className="text-[11px] text-slate-400 mt-1">Glacial Albedo Multiplier: +18%</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
          <div className="text-[10px] text-cyan-400 font-bold uppercase mb-1">UV INDEX</div>
          <div className="text-2xl font-bold text-cyan-300">{station.telemetry.uvIndex} <span className="text-xs text-slate-400">UV</span></div>
          <div className="text-[11px] text-slate-400 mt-1">Ozone Column Density: 290 DU</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
          <div className="text-[10px] text-cyan-400 font-bold uppercase mb-1">ATMOSPHERIC VISIBILITY</div>
          <div className="text-2xl font-bold text-emerald-400">25 <span className="text-xs text-slate-400">km</span></div>
          <div className="text-[11px] text-slate-400 mt-1">Horizon Whiteout: Low</div>
        </div>
      </div>
    </div>
  );
}
