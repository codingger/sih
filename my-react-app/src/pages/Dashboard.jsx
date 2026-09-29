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
  Maximize2,
  CheckCircle2
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { StaggerContainer, StaggerItem } from '../components/StaggerContainer';
import AlertCard from '../components/AlertCard';
import EnergyChart from '../components/EnergyChart';
import EnvironmentChart from '../components/EnvironmentChart';
import Map from '../components/Map';
import { STATIONS, HOURLY_TELEMETRY, ALERTS_LIST } from '../data/mockData';

export default function Dashboard({ currentStationId, stationData, onSelectStation, alerts = ALERTS_LIST, onAcknowledgeAlert }) {
  const navigate = useNavigate();
  const station = stationData || STATIONS[currentStationId] || STATIONS.maitri;
  const isMaitri = currentStationId === 'maitri';

  // Alerts for active station
  const stationAlerts = alerts.filter(a => a.station === currentStationId);
  const unackCritical = stationAlerts.filter(a => a.severity === 'critical' && !a.acknowledged).length;

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
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StaggerItem>
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
        </StaggerItem>

        <StaggerItem>
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
        </StaggerItem>

        <StaggerItem>
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
        </StaggerItem>

        <StaggerItem>
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
        </StaggerItem>
      </StaggerContainer>

      {/* Middle Row: Digital Twin Interactive Panel + Active Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Digital Twin Hero Preview Card (7 cols) */}
        <div className="lg:col-span-7 glass-panel-glow rounded-xl p-5 border border-cyan-500/30 flex flex-col justify-between relative overflow-hidden">
          {/* Top Label & Quick Navigation Links */}
          <div>
            <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                </span>
                <span className="text-xs font-mono font-extrabold tracking-wider text-cyan-300 uppercase">
                  DIGITAL TWINS • MAITRI & BHARATI STATIONS
                </span>
              </div>

              {/* Station Quick Link Buttons */}
              <div className="flex items-center gap-2 font-mono text-xs">
                <button
                  onClick={() => navigate('/maitri')}
                  className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/30 text-cyan-300 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                  title="Open Maitri Station Telemetry"
                >
                  <span>Maitri ↗</span>
                </button>
                <button
                  onClick={() => navigate('/bharati')}
                  className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/30 text-cyan-300 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                  title="Open Bharati Station Telemetry"
                >
                  <span>Bharati ↗</span>
                </button>
                <button
                  onClick={() => navigate('/infrastructure')}
                  className="px-2 py-0.5 rounded bg-cyan-950/80 hover:bg-cyan-400 hover:text-slate-950 border border-cyan-400/50 text-cyan-200 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                  title="Open 3D Infrastructure SCADA"
                >
                  <span>3D Hotspots</span>
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Graphic Schematic Representation */}
            <div className="w-full rounded-xl bg-slate-950/80 border border-slate-800 p-4 sm:p-5 relative flex flex-col items-center justify-center gap-3.5 group transition-all duration-300 overflow-hidden">
              {/* Polar Grid Backdrop */}
              <div className="absolute inset-0 polar-grid opacity-30 pointer-events-none rounded-xl" />

              {/* Vertical Stacked Dual Station Blueprint Boxes */}
              <div className="w-full flex flex-col gap-4 relative z-10">
                {/* 1. Maitri Station Blueprint Box */}
                <div className="w-full border border-cyan-500/30 rounded-xl p-4 bg-slate-900/85 backdrop-blur-md shadow-lg shadow-black/40 text-left">
                  <div
                    onClick={() => navigate('/maitri')}
                    className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3 cursor-pointer hover:text-cyan-300 transition-colors"
                    title="Click to open Maitri Station telemetry page"
                  >
                    <div className="flex items-center gap-2 font-bold text-white text-xs tracking-wider font-mono">
                      <span className="text-cyan-400">🏔️</span>
                      <span>MAITRI STATION COMPLEX BLUEPRINT</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 font-bold hover:bg-cyan-500 hover:text-slate-950 transition-colors">
                      IN-MAI • SCADA ACTIVE ↗
                    </span>
                  </div>

                  {/* Logically Linked Subsystem Nodes for Maitri */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] sm:text-xs font-mono">
                    <div
                      onClick={(e) => { e.stopPropagation(); navigate('/equipment'); }}
                      className="p-2 rounded-lg bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400 hover:bg-slate-700/90 transition-all cursor-pointer group/node"
                      title="Inspect Generator #01 Equipment Status (/equipment)"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mb-1" />
                      <div className="text-slate-200 font-medium group-hover/node:text-cyan-300">Generator #01</div>
                      <div className="text-emerald-400 font-bold">68% Load</div>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); navigate('/infrastructure'); }}
                      className="p-2 rounded-lg bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400 hover:bg-slate-700/90 transition-all cursor-pointer group/node"
                      title="Inspect Central Heating Loop (/infrastructure)"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mb-1" />
                      <div className="text-slate-200 font-medium group-hover/node:text-cyan-300">Central Heating</div>
                      <div className="text-emerald-400 font-bold">64°C Glycol</div>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); navigate('/inventory'); }}
                      className="p-2 rounded-lg bg-slate-800/90 border border-slate-700/80 hover:border-amber-400 hover:bg-slate-700/90 transition-all cursor-pointer group/node"
                      title="Inspect Lake Water Reserves (/inventory)"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mb-1" />
                      <div className="text-slate-200 font-medium group-hover/node:text-amber-300">Lake Water Line</div>
                      <div className="text-amber-400 font-bold">Trace Heat</div>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); navigate('/energy'); }}
                      className="p-2 rounded-lg bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400 hover:bg-slate-700/90 transition-all cursor-pointer group/node"
                      title="Inspect BESS Battery Storage (/energy)"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mb-1" />
                      <div className="text-slate-200 font-medium group-hover/node:text-cyan-300">Battery BESS</div>
                      <div className="text-cyan-400 font-bold">82% SOC</div>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); navigate('/equipment'); }}
                      className="p-2 rounded-lg bg-rose-950/30 border border-rose-500/50 hover:border-rose-400 hover:bg-rose-900/40 transition-all cursor-pointer group/node"
                      title="Inspect Generator #02 Critical Diagnostic Fault (/equipment)"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-rose-500 pulse-critical mb-1" />
                      <div className="text-slate-200 font-medium group-hover/node:text-rose-300">Generator #02</div>
                      <div className="text-rose-400 font-bold">104°C CRIT</div>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); navigate('/infrastructure'); }}
                      className="p-2 rounded-lg bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400 hover:bg-slate-700/90 transition-all cursor-pointer group/node"
                      title="Inspect Polar Radome Comms (/infrastructure)"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mb-1" />
                      <div className="text-slate-200 font-medium group-hover/node:text-cyan-300">Polar Radome</div>
                      <div className="text-cyan-400 font-bold">48 Mbps</div>
                    </div>
                  </div>
                </div>

                {/* 2. Bharati Station Blueprint Box */}
                <div className="w-full border border-cyan-500/30 rounded-xl p-4 bg-slate-900/85 backdrop-blur-md shadow-lg shadow-black/40 text-left">
                  <div
                    onClick={() => navigate('/bharati')}
                    className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3 cursor-pointer hover:text-emerald-300 transition-colors"
                    title="Click to open Bharati Station telemetry page"
                  >
                    <div className="flex items-center gap-2 font-bold text-white text-xs tracking-wider font-mono">
                      <span className="text-cyan-400">🌊</span>
                      <span>BHARATI STATION COMPLEX BLUEPRINT</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 font-bold hover:bg-emerald-500 hover:text-slate-950 transition-colors">
                      IN-BHA • SCADA ACTIVE ↗
                    </span>
                  </div>

                  {/* Logically Linked Subsystem Nodes for Bharati */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] sm:text-xs font-mono">
                    <div
                      onClick={(e) => { e.stopPropagation(); navigate('/equipment'); }}
                      className="p-2 rounded-lg bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400 hover:bg-slate-700/90 transition-all cursor-pointer group/node"
                      title="Inspect MAN Genset A Equipment (/equipment)"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mb-1" />
                      <div className="text-slate-200 font-medium group-hover/node:text-cyan-300">MAN Genset A</div>
                      <div className="text-emerald-400 font-bold">58% Load</div>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); navigate('/infrastructure'); }}
                      className="p-2 rounded-lg bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400 hover:bg-slate-700/90 transition-all cursor-pointer group/node"
                      title="Inspect SWRO Desalination Plant (/infrastructure)"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mb-1" />
                      <div className="text-slate-200 font-medium group-hover/node:text-cyan-300">SWRO Desal</div>
                      <div className="text-emerald-400 font-bold">2.8 m³/d</div>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); navigate('/energy'); }}
                      className="p-2 rounded-lg bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400 hover:bg-slate-700/90 transition-all cursor-pointer group/node"
                      title="Inspect Wind Turbines Microgrid (/energy)"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mb-1" />
                      <div className="text-slate-200 font-medium group-hover/node:text-cyan-300">Wind Turbines</div>
                      <div className="text-cyan-400 font-bold">38 kW</div>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); navigate('/energy'); }}
                      className="p-2 rounded-lg bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400 hover:bg-slate-700/90 transition-all cursor-pointer group/node"
                      title="Inspect Solar PV Field (/energy)"
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mb-1" />
                      <div className="text-slate-200 font-medium group-hover/node:text-cyan-300">Solar Array</div>
                      <div className="text-cyan-400 font-bold">68 kW</div>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); navigate('/equipment'); }}
                      className="p-2 rounded-lg bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400 hover:bg-slate-700/90 transition-all cursor-pointer group/node"
                      title="Inspect MAN Genset B Standby Status (/equipment)"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mb-1" />
                      <div className="text-slate-200 font-medium group-hover/node:text-cyan-300">MAN Genset B</div>
                      <div className="text-emerald-400 font-bold">Standby Ready</div>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); navigate('/infrastructure'); }}
                      className="p-2 rounded-lg bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400 hover:bg-slate-700/90 transition-all cursor-pointer group/node"
                      title="Inspect ISRO Satellite Downlink Station (/infrastructure)"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mb-1" />
                      <div className="text-slate-200 font-medium group-hover/node:text-cyan-300">ISRO Ground Station</div>
                      <div className="text-cyan-400 font-bold">120 Mbps</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button Pill */}
              <div
                onClick={() => navigate('/infrastructure')}
                className="relative z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono hover:bg-cyan-900/80 hover:border-cyan-300 hover:text-white transition-all shadow-md shadow-cyan-950/50 mt-2 cursor-pointer group/pill"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse shrink-0" />
                <span>Click any subsystem node or blueprint box to launch full 3D SCADA diagnostics</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/pill:translate-x-1 transition-transform shrink-0" />
              </div>
            </div>
          </div>

          {/* Live Readout Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 pt-3.5 border-t border-cyan-500/20 text-center font-mono">
            <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800/80">
              <div className="text-[10px] text-slate-400 font-medium">TEMP</div>
              <div className="text-xs font-bold text-white mt-0.5">{station.telemetry.temperature}°C</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800/80">
              <div className="text-[10px] text-slate-400 font-medium">WIND</div>
              <div className="text-xs font-bold text-cyan-300 mt-0.5">{station.telemetry.windSpeed} km/h</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800/80">
              <div className="text-[10px] text-slate-400 font-medium">POWER</div>
              <div className="text-xs font-bold text-white mt-0.5">{station.telemetry.powerGeneration} kW</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800/80">
              <div className="text-[10px] text-slate-400 font-medium">FUEL</div>
              <div className="text-xs font-bold text-amber-400 mt-0.5">{station.telemetry.fuelLevel}%</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800/80 col-span-2 sm:col-span-1">
              <div className="text-[10px] text-slate-400 font-medium">WATER</div>
              <div className="text-xs font-bold text-emerald-400 mt-0.5">{station.telemetry.waterReserve}%</div>
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
              {stationAlerts.length === 0 ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
                  <p className="text-xs text-slate-200 font-semibold font-mono">ALL SYSTEMS NOMINAL</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">No critical or warning alerts active for {station.name}.</p>
                </div>
              ) : (
                stationAlerts.slice(0, 3).map(alert => (
                  <AlertCard key={alert.id} alert={alert} onAcknowledge={onAcknowledgeAlert} />
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Automated Telemetry Sentry: ON</span>
            <span className={unackCritical > 0 ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>
              {unackCritical} Unacknowledged Critical
            </span>
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
