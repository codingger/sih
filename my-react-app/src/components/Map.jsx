import React from 'react';
import { MapPin, Navigation, Radio, Compass, Snowflake, ShieldCheck } from 'lucide-react';
import { STATIONS, EXPEDITION_VOYAGE } from '../data/mockData';

export default function Map({ currentStationId, onSelectStation }) {
  const maitri = STATIONS.maitri;
  const bharati = STATIONS.bharati;

  return (
    <div className="glass-panel rounded-xl p-5 border border-cyan-500/20 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase">
            GEOSPATIAL SITUATIONAL AWARENESS
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">
            Antarctic Continent Station Network
          </h3>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>POLAR STEREOGRAPHIC GRID</span>
        </div>
      </div>

      {/* Stylized SVG Polar Map */}
      <div className="relative w-full h-80 sm:h-96 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center overflow-hidden">
        {/* Radar Concentric Latitude Rings */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="polarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.08" />
              <stop offset="60%" stopColor="#00f0ff" stopOpacity="0.02" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glow backdrop */}
          <rect width="600" height="400" fill="url(#polarGlow)" />

          {/* Latitude circles */}
          <circle cx="300" cy="200" r="170" fill="none" stroke="#1e293b" strokeDasharray="3 3" />
          <circle cx="300" cy="200" r="120" fill="none" stroke="#334155" strokeDasharray="4 4" />
          <circle cx="300" cy="200" r="70" fill="none" stroke="#475569" strokeDasharray="2 2" />
          <circle cx="300" cy="200" r="20" fill="none" stroke="#64748b" />

          {/* Grid lines */}
          <line x1="300" y1="20" x2="300" y2="380" stroke="#1e293b" strokeDasharray="2 2" />
          <line x1="120" y1="200" x2="480" y2="200" stroke="#1e293b" strokeDasharray="2 2" />

          {/* Stylized Antarctic coastline */}
          <path
            d="M 210,130 Q 240,90 300,90 Q 380,95 420,150 Q 460,220 420,290 Q 360,330 280,320 Q 200,310 160,250 Q 140,190 210,130 Z"
            fill="rgba(15, 23, 42, 0.6)"
            stroke="#0284c7"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />

          {/* Ice Shelf Details */}
          <path
            d="M 230,120 Q 280,105 330,110 Q 390,140 405,180"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeOpacity="0.6"
          />

          {/* Route path of MV Vasiliy Golovnin from Cape Town down */}
          <path
            d="M 310,30 Q 330,70 350,110"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* South Pole Marker */}
          <circle cx="300" cy="200" r="3" fill="#94a3b8" />
          <text x="306" y="204" fill="#64748b" fontSize="8" fontFamily="monospace">
            SOUTH POLE (90° S)
          </text>
        </svg>

        {/* Maitri Station Pin */}
        <div
          onClick={() => onSelectStation('maitri')}
          style={{ left: '34%', top: '35%' }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all z-20 ${
            currentStationId === 'maitri' ? 'scale-110' : 'opacity-85 hover:opacity-100'
          }`}
        >
          <div className="relative">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border-2 border-white shadow-lg shadow-cyan-500/50"></span>
            </span>

            {/* Label box */}
            <div className={`absolute left-5 -top-3 w-44 p-2 rounded-lg text-xs font-mono glass-dropdown border transition-all ${
              currentStationId === 'maitri' ? 'border-cyan-400 bg-cyan-950/90' : 'border-slate-700 bg-slate-900/90'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">MAITRI BASE</span>
                <span className="text-[10px] text-cyan-400">{maitri.telemetry.temperature}°C</span>
              </div>
              <div className="text-[10px] text-slate-300">Queen Maud Land</div>
              <div className="text-[9px] text-amber-400 mt-0.5">Alert: Gen #02 Vibe</div>
            </div>
          </div>
        </div>

        {/* Bharati Station Pin */}
        <div
          onClick={() => onSelectStation('bharati')}
          style={{ left: '68%', top: '42%' }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all z-20 ${
            currentStationId === 'bharati' ? 'scale-110' : 'opacity-85 hover:opacity-100'
          }`}
        >
          <div className="relative">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white shadow-lg shadow-emerald-500/50"></span>
            </span>

            {/* Label box */}
            <div className={`absolute right-5 -top-3 w-44 p-2 rounded-lg text-xs font-mono glass-dropdown border transition-all ${
              currentStationId === 'bharati' ? 'border-emerald-400 bg-emerald-950/90' : 'border-slate-700 bg-slate-900/90'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">BHARATI BASE</span>
                <span className="text-[10px] text-emerald-400">{bharati.telemetry.temperature}°C</span>
              </div>
              <div className="text-[10px] text-slate-300">Larsemann Hills</div>
              <div className="text-[9px] text-emerald-400 mt-0.5">Status: All Optimal</div>
            </div>
          </div>
        </div>

        {/* Expedition Ship Pin */}
        <div
          style={{ left: '54%', top: '24%' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
        >
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-amber-950/80 border border-amber-500/50 text-amber-300 text-[10px] font-mono">
            <Navigation className="w-3 h-3 text-amber-400 rotate-45" />
            <span>MV Vasiliy Golovnin (12.8 kn)</span>
          </div>
        </div>

        {/* Lat/Long Footer overlay */}
        <div className="absolute bottom-2 left-3 right-3 flex justify-between text-[10px] font-mono text-slate-500 pointer-events-none">
          <span>70°00'S 11°44'E (Maitri)</span>
          <span>ANTARCTIC SECTOR 4</span>
          <span>69°24'S 76°11'E (Bharati)</span>
        </div>
      </div>
    </div>
  );
}
