import React from 'react';
import { Ship, Anchor, CheckCircle2, Navigation, Clock, Box, Fuel, Cpu, Wrench } from 'lucide-react';
import { EXPEDITION_VOYAGE } from '../data/mockData';

export default function LogisticsTracker() {
  const voyage = EXPEDITION_VOYAGE;

  return (
    <div className="space-y-6">
      {/* Vessel Header Card */}
      <div className="glass-panel rounded-xl p-5 border border-cyan-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Ship className="w-32 h-32 text-cyan-400" />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 uppercase font-bold">
                {voyage.callsign}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {voyage.expedition}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              {voyage.vesselName}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Current Status: <span className="text-cyan-400 font-semibold">{voyage.currentStatus}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-400">POSITION</div>
              <div className="font-bold text-white mt-0.5">{voyage.coordinates.lat}° S, {voyage.coordinates.lng}° E</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-400">SPEED</div>
              <div className="font-bold text-cyan-400 mt-0.5">{voyage.speedKnots} Knots</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-400">ETA BHARATI</div>
              <div className="font-bold text-emerald-400 mt-0.5">{voyage.etaBharati.split(' ')[0]}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-400">ETA MAITRI</div>
              <div className="font-bold text-cyan-300 mt-0.5">{voyage.etaMaitri.split(' ')[0]}</div>
            </div>
          </div>
        </div>

        {/* Ice Condition Banner */}
        <div className="mt-4 p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-200 flex items-center gap-2">
          <Anchor className="w-4 h-4 text-cyan-400 shrink-0" />
          <span><strong className="font-semibold text-white">Ice Pack Advisory:</strong> {voyage.iceConditions}</span>
        </div>
      </div>

      {/* Voyage Route Stepper */}
      <div className="glass-panel rounded-xl p-5 border border-cyan-500/20">
        <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase mb-4">
          EXPEDITION NAVIGATION WAYPOINTS
        </h3>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-4 right-4 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {voyage.routeWaypoints.slice(0, 4).map((wp, idx) => {
              const isDone = wp.status === 'completed';
              const isActive = wp.status === 'active';

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    isActive
                      ? 'bg-cyan-950/70 border-cyan-400/80 shadow-md shadow-cyan-500/20'
                      : isDone
                      ? 'bg-slate-900/70 border-slate-700/60'
                      : 'bg-slate-950/50 border-slate-800/80 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-slate-400">{wp.date}</span>
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : isActive ? (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                      </span>
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </div>
                  <div className="font-bold text-white">{wp.name}</div>
                  <div className="text-[10px] font-mono text-cyan-400/80 mt-1">
                    {wp.lat}° S, {wp.lng}° E
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cargo Payload Manifest Breakdown */}
      <div className="glass-panel rounded-xl p-5 border border-cyan-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
            CARGO MANIFEST PAYLOAD ({voyage.totalCargoWeightTons} METRIC TONS)
          </h3>
          <span className="text-xs font-mono text-slate-400">100% Secure Stowed</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {voyage.cargoCategories.map((c, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-200">{c.name}</span>
                <span className="font-mono text-cyan-400 font-bold">{c.weight}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full"
                  style={{ width: `${c.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
