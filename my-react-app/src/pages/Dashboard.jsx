import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Thermometer,
  Zap,
  Fuel,
  Activity,
  ArrowRight,
  ShieldAlert,
  Radio,
  Wind,
  Droplets,
  Layers,
  Sparkles,
  Maximize2
} from 'lucide-react';
import StatCard from '../components/StatCard';
import AlertCard from '../components/AlertCard';
import EnergyChart from '../components/EnergyChart';
import EnvironmentChart from '../components/EnvironmentChart';
import Map from '../components/Map';
import { STATIONS, HOURLY_TELEMETRY, ALERTS_LIST } from '../data/mockData';

export default function Dashboard({ currentStationId, stationData, onSelectStation }) {
  const navigate = useNavigate();
  const station = stationData || STATIONS[currentStationId] || STATIONS.maitri;
  const isMaitri = currentStationId === 'maitri';

  // Alerts for active station
  const stationAlerts = ALERTS_LIST.filter(a => a.station === currentStationId);

  return (
    <div className="space-y-6">
      {/* Top Banner & Station Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
              MISSION CONTROL • {station.name}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-slate-900 border border-slate-700 text-slate-300">
              {station.code}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Station Command Overview
          </h1>
          <p className="text-xs text-slate-400">
            {station.location} ({station.coordinates.lat}° S, {station.coordinates.lng}° E) • Polar Wintering Crew: {station.crewCount} personnel
          </p>
        </div>

        {/* Action Button & Live Telemetry Pill */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>SATCOM UPLINK: 48 Mbps</span>
          </div>

          <button
            onClick={() => navigate(isMaitri ? '/maitri' : '/bharati')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-cyan-500/20 cursor-pointer transition-all"
          >
            <span>LAUNCH DIGITAL TWIN</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Hero StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Ambient Temp"
          value={station.telemetry.temperature}
          unit="°C"
          icon={Thermometer}
          trend="-2.4°C"
          trendDirection="down"
          trendLabel="wind chill -46°C"
          status={station.telemetry.temperature < -35 ? 'warning' : 'normal'}
          subtext={`Feels like ${station.telemetry.feelsLike}°C`}
          sparklineData={[-36, -37, -38, -36, -33, -31, -30, -31, -32]}
          onClick={() => navigate('/environment')}
        />

        <StatCard
          title="Energy Storage (BESS)"
          value={station.telemetry.batterySOC}
          unit="%"
          icon={Zap}
          trend="+1.2%"
          trendDirection="up"
          trendLabel="net charging"
          status="normal"
          subtext={`Solar: ${station.telemetry.solarShare}% | Diesel: ${station.telemetry.dieselShare}%`}
          sparklineData={[86, 85, 84, 83, 82, 82, 83, 84, 82]}
          onClick={() => navigate('/energy')}
        />

        <StatCard
          title="Fuel Reserves"
          value={station.telemetry.fuelLevel}
          unit="%"
          icon={Fuel}
          trend="-0.8%"
          trendDirection="neutral"
          trendLabel="142 days remaining"
          status={station.telemetry.fuelLevel < 50 ? 'warning' : 'normal'}
          subtext={`${station.telemetry.fuelVolumeLiters.toLocaleString()} L Jet A-1`}
          sparklineData={[67.4, 67.3, 67.2, 67.2, 67.1, 67.0, 67.0]}
          onClick={() => navigate('/inventory')}
        />

        <StatCard
          title="Station Health Index"
          value={station.healthScore}
          unit="/100"
          icon={Activity}
          trend={isMaitri ? '-4 pts' : 'Stable'}
          trendDirection={isMaitri ? 'down' : 'neutral'}
          trendLabel={isMaitri ? 'Gen #02 fault' : 'Optimal'}
          status={station.healthScore < 85 ? 'critical' : station.healthScore < 95 ? 'warning' : 'normal'}
          subtext={isMaitri ? 'Secondary Genset Bearing Anomaly' : 'All systems 100% nominal'}
          sparklineData={isMaitri ? [98, 98, 97, 96, 95, 94] : [98, 98, 98, 99, 98]}
          onClick={() => navigate('/equipment')}
        />
      </div>

      {/* Middle Row: Digital Twin Interactive Panel + Active Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Digital Twin Hero Preview Card (7 cols) */}
        <div className="lg:col-span-7 glass-panel-glow rounded-xl p-5 border border-cyan-500/30 flex flex-col justify-between relative overflow-hidden">
          {/* Top Label */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                </span>
                <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
                  DIGITAL TWIN • {station.name.toUpperCase()}
                </span>
              </div>

              <button
                onClick={() => navigate(isMaitri ? '/maitri' : '/bharati')}
                className="text-xs font-mono text-cyan-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Full Telemetry Model</span>
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Graphic Schematic Representation */}
            <div
              onClick={() => navigate(isMaitri ? '/maitri' : '/bharati')}
              className="w-full h-56 rounded-xl bg-slate-950/70 border border-slate-800 p-4 relative flex flex-col items-center justify-center cursor-pointer group hover:border-cyan-500/50 transition-all"
            >
              {/* Polar Grid Backdrop */}
              <div className="absolute inset-0 polar-grid opacity-30 pointer-events-none rounded-xl" />

              {/* Station Blueprint Wireframe Graphic */}
              <div className="relative z-10 w-full max-w-md border border-cyan-500/30 rounded-xl p-4 bg-slate-900/60 backdrop-blur-sm group-hover:scale-[1.02] transition-transform">
                <div className="text-center font-bold text-white text-xs tracking-wider mb-3">
                  🏢 {station.name.toUpperCase()} MAIN HABITAT COMPLEX
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                  <div className="p-2 rounded bg-slate-800/80 border border-slate-700">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mb-1" />
                    <div className="text-slate-200">Generator #01</div>
                    <div className="text-emerald-400">68% Load</div>
                  </div>

                  <div className="p-2 rounded bg-slate-800/80 border border-slate-700">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mb-1" />
                    <div className="text-slate-200">Central Heating</div>
                    <div className="text-emerald-400">64°C Glycol</div>
                  </div>

                  <div className="p-2 rounded bg-slate-800/80 border border-slate-700">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mb-1" />
                    <div className="text-slate-200">{isMaitri ? 'Lake Water Line' : 'SWRO Desal'}</div>
                    <div className="text-amber-400">{isMaitri ? 'Trace Heat' : '2.8 m³/d'}</div>
                  </div>

                  <div className="p-2 rounded bg-slate-800/80 border border-slate-700">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mb-1" />
                    <div className="text-slate-200">Battery BESS</div>
                    <div className="text-cyan-400">{station.telemetry.batterySOC}% SOC</div>
                  </div>

                  <div className="p-2 rounded bg-slate-800/80 border border-slate-700">
                    <span className={`inline-block w-2 h-2 rounded-full mb-1 ${isMaitri ? 'bg-rose-500 pulse-critical' : 'bg-emerald-400'}`} />
                    <div className="text-slate-200">Generator #02</div>
                    <div className={isMaitri ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      {isMaitri ? '104°C CRIT' : 'Standby'}
                    </div>
                  </div>

                  <div className="p-2 rounded bg-slate-800/80 border border-slate-700">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mb-1" />
                    <div className="text-slate-200">Polar Radome</div>
                    <div className="text-cyan-400">48 Mbps</div>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-cyan-400 font-mono mt-3 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Click to inspect interactive 3D blueprint hotspots & diagnostics</span>
              </div>
            </div>
          </div>

          {/* Live Readout Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 pt-3 border-t border-cyan-500/20 text-center font-mono">
            <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] text-slate-400">TEMP</div>
              <div className="text-xs font-bold text-white">{station.telemetry.temperature}°C</div>
            </div>
            <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] text-slate-400">WIND</div>
              <div className="text-xs font-bold text-cyan-300">{station.telemetry.windSpeed} km/h</div>
            </div>
            <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] text-slate-400">POWER</div>
              <div className="text-xs font-bold text-white">{station.telemetry.powerGeneration} kW</div>
            </div>
            <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] text-slate-400">FUEL</div>
              <div className="text-xs font-bold text-amber-400">{station.telemetry.fuelLevel}%</div>
            </div>
            <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800 col-span-2 sm:col-span-1">
              <div className="text-[10px] text-slate-400">WATER</div>
              <div className="text-xs font-bold text-emerald-400">{station.telemetry.waterReserve}%</div>
            </div>
          </div>
        </div>

        {/* Active Alerts Panel (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-xl p-5 border border-cyan-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                  ACTIVE CRITICAL & WARNING ALERTS
                </h3>
              </div>
              <button
                onClick={() => navigate('/alerts')}
                className="text-xs font-mono text-cyan-400 hover:text-white transition-colors cursor-pointer"
              >
                View All ({ALERTS_LIST.length})
              </button>
            </div>

            <div className="space-y-3">
              {stationAlerts.slice(0, 3).map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Automated Telemetry Sentry: ON</span>
            <span className="text-emerald-400">0 Unacknowledged Critical</span>
          </div>
        </div>
      </div>

      {/* Two Telemetry Charts Below */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Generation vs Consumption */}
        <div className="glass-panel rounded-xl p-5 border border-cyan-500/20">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-bold">
                MICROGRID TELEMETRY
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                24-Hour Energy Generation vs. Station Demand
              </h3>
            </div>
            <button
              onClick={() => navigate('/energy')}
              className="text-xs font-mono text-cyan-400 hover:text-white cursor-pointer"
            >
              Analyze →
            </button>
          </div>
          <EnergyChart data={HOURLY_TELEMETRY} stationId={currentStationId} />
        </div>

        {/* Ambient Temperature & Wind Profile */}
        <div className="glass-panel rounded-xl p-5 border border-cyan-500/20">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-bold">
                METEOROLOGICAL SENSORS
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                24-Hour Ambient Temperature & Wind Speed
              </h3>
            </div>
            <button
              onClick={() => navigate('/environment')}
              className="text-xs font-mono text-cyan-400 hover:text-white cursor-pointer"
            >
              Meteorology →
            </button>
          </div>
          <EnvironmentChart data={HOURLY_TELEMETRY} stationId={currentStationId} />
        </div>
      </div>

      {/* Antarctica Geospatial Map */}
      <Map
        currentStationId={currentStationId}
        onSelectStation={(id) => {
          if (onSelectStation) onSelectStation(id);
        }}
      />
    </div>
  );
}
