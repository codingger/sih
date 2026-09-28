import React from 'react';
import LogisticsTracker from '../components/LogisticsTracker';
import { Ship, Plane, Navigation, Calendar, Box, ShieldCheck } from 'lucide-react';
import { EXPEDITION_VOYAGE } from '../data/mockData';

export default function Logistics() {
  const voyage = EXPEDITION_VOYAGE;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
            SUPPLY CHAIN & FLEET OPERATIONS • 44TH ISEA
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Polar Logistics & Resupply
          </h1>
          <p className="text-xs text-slate-400">
            Charter vessel voyage tracking, sea-ice edge navigation, aviation airlift links, and cargo manifests
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            VESSEL AIS TRANSPONDER: ONLINE
          </span>
        </div>
      </div>

      {/* Main Logistics Tracker Component */}
      <LogisticsTracker />

      {/* Aviation & Airfield Logistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-5 border border-cyan-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                DROMLAN AIR BRIDGE (NOVO RUNWAY)
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Novo Blue Ice Runway</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Intercontinental flights operate from Cape Town International (CPT) to Novolazarevskaya blue-ice runway (70 km from Maitri) via ski-equipped Ilyushin IL-76TD and Basler BT-67 aircraft.
          </p>

          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Next Scheduled Flight:</span>
              <span className="text-white font-bold">DROMLAN Flight #04 (Oct 14)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Payload:</span>
              <span className="text-cyan-300">12 Incoming Scientists + Fresh Food</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Runway Surface Friction:</span>
              <span className="text-emerald-400 font-bold">0.38 (Good)</span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 border border-cyan-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                SHIP-TO-SHORE HELICOPTER OPS
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400">Helo Deck Clear</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Kamov Ka-32 heavy-lift coaxial helicopters will conduct 45 sling load sorties from *MV Vasiliy Golovnin* to Bharati helipad upon arrival at Larsemann Hills fast ice.
          </p>

          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Sorties Planned:</span>
              <span className="text-white font-bold">45 Sling Runs (4 Tons each)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Aviation Fuel (Jet A-1):</span>
              <span className="text-cyan-300">80,000 Liters Reserved</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Weather Window:</span>
              <span className="text-emerald-400 font-bold">Optimal (Wind &lt; 25 kn)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
