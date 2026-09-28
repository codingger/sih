import React from 'react';
import Map from '../components/Map';
import StatCard from '../components/StatCard';
import { Compass, Box, Home, Shield, Flame, Radio, Droplet } from 'lucide-react';
import { STATIONS } from '../data/mockData';

export default function Infrastructure({ currentStationId, stationData, onSelectStation }) {
  const station = stationData || STATIONS[currentStationId] || STATIONS.maitri;
  const isMaitri = currentStationId === 'maitri';

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
            PHYSICAL ASSETS & UTILIDORS • {station.name.toUpperCase()}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Infrastructure & Facilities
          </h1>
          <p className="text-xs text-slate-400">
            Geospatial station building modules, trace-heated utilidor pipelines, and emergency life-support shelters
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            {isMaitri ? 'Schirmacher Oasis Block 1-8' : 'Larsemann Promontory Pods 1-12'}
          </span>
        </div>
      </div>

      {/* Geospatial Map */}
      <Map
        currentStationId={currentStationId}
        onSelectStation={(id) => onSelectStation && onSelectStation(id)}
      />

      {/* Infrastructure Facility Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-cyan-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400 uppercase font-bold">LIVING & LIFE SUPPORT</span>
            <Home className="w-4 h-4 text-cyan-400" />
          </div>
          <h3 className="text-base font-bold text-white">Main Living Quarters & Mess</h3>
          <p className="text-xs text-slate-300">
            Heated habitat pressurized to +19°C. Accommodates up to {station.crewCount} scientists and wintering expedition engineers.
          </p>
          <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 pt-2 border-t border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            HVAC Hydronic Balance: 100% Nominal
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-cyan-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400 uppercase font-bold">PIPELINE UTILIDOR</span>
            <Droplet className="w-4 h-4 text-cyan-400" />
          </div>
          <h3 className="text-base font-bold text-white">
            {isMaitri ? 'Lake Priyadarshini Potable Line' : 'Prydz Bay Desalination Feed'}
          </h3>
          <p className="text-xs text-slate-300">
            {isMaitri
              ? 'Insulated 1.2 km surface water pipeline equipped with self-regulating trace heating cables to prevent freezing at -50°C.'
              : 'Marine titanium intake line drawing polar seawater directly into the reverse osmosis desalination bays.'}
          </p>
          <div className="text-[11px] font-mono text-amber-400 flex items-center gap-1.5 pt-2 border-t border-slate-800">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Line Temp: 4.2°C (Trace Heat Active)
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-cyan-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400 uppercase font-bold">CRITICAL SAFETY</span>
            <Shield className="w-4 h-4 text-cyan-400" />
          </div>
          <h3 className="text-base font-bold text-white">Emergency Bunker & Life Shelters</h3>
          <p className="text-xs text-slate-300">
            Autonomous secondary retreat shelter with separate generator, satellite transceiver, and 90-day sealed rations.
          </p>
          <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 pt-2 border-t border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Survival Readiness: Verified Ready
          </div>
        </div>
      </div>
    </div>
  );
}
