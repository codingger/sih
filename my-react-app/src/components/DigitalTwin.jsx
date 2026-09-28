import React, { useState } from 'react';
import {
  Zap,
  Thermometer,
  Wind,
  Droplets,
  Fuel,
  Radio,
  X,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Sliders,
  RotateCw,
  Eye,
  ShieldAlert,
  Snowflake
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export default function DigitalTwin({ stationData, stationId = 'maitri' }) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [showFlows, setShowFlows] = useState(true);
  const [auroraActive, setAuroraActive] = useState(true);
  const [remediationTriggered, setRemediationTriggered] = useState(false);

  const station = stationData || {};
  const telemetry = station.telemetry || {
    temperature: -32,
    windSpeed: 18,
    powerGeneration: 182,
    fuelLevel: 67,
    waterReserve: 91,
    pressure: 986
  };

  const hotspots = station.hotspots || [];
  const isMaitri = (station.id || stationId) === 'maitri';

  const handleHotspotClick = (hotspot) => {
    setSelectedHotspot(hotspot);
    setRemediationTriggered(false);
  };

  const handleExecuteRemediation = () => {
    setRemediationTriggered(true);
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedHotspot(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="space-y-4 relative">
      {/* Top Digital Twin Header */}
      <div className="glass-panel-glow rounded-xl p-4 sm:p-5 border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              {station.name ? station.name.toUpperCase() : 'ANTARCTIC RESEARCH BASE'}
            </span>
            <span className="text-slate-500">|</span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold tracking-wider">LIVE DIGITAL TWIN ● ONLINE</span>
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
            {isMaitri ? 'Schirmacher Oasis Habitat & Utility Core' : 'Larsemann Hills Coastal Aerodynamic Complex'}
          </h2>
          <p className="text-xs text-slate-400">
            Click any interactive sub-system node to inspect real-time telemetry, thermal signatures, and AI remediation.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setShowFlows(!showFlows)}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
              showFlows
                ? 'bg-cyan-950/80 border-cyan-400/50 text-cyan-300'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Power Bus: {showFlows ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setAuroraActive(!auroraActive)}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
              auroraActive
                ? 'bg-cyan-950/80 border-cyan-400/50 text-cyan-300'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Aurora Effect</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div className="relative w-full h-[540px] sm:h-[600px] rounded-2xl bg-slate-950 border border-cyan-500/30 overflow-hidden shadow-2xl">
        {/* Subtle Animated Aurora / Polar Night Background */}
        {auroraActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
            <div className="absolute -top-20 -left-20 w-[600px] h-[300px] bg-gradient-to-r from-emerald-500/20 via-cyan-500/30 to-blue-500/10 blur-3xl rounded-full transform -rotate-12 animate-pulse" />
            <div className="absolute top-1/4 right-0 w-[500px] h-[250px] bg-gradient-to-l from-cyan-400/20 via-teal-500/20 to-transparent blur-3xl rounded-full transform rotate-6" />
          </div>
        )}

        {/* Ambient Polar Grid Lines */}
        <div className="absolute inset-0 polar-grid opacity-25 pointer-events-none" />

        {/* Subtle Snow Particles Falling */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="snow-layer absolute inset-0 opacity-40">
            {/* CSS-drawn subtle snowflakes */}
            <div className="absolute top-10 left-[15%] w-1 h-1 bg-white rounded-full animate-ping" />
            <div className="absolute top-28 left-[45%] w-1.5 h-1.5 bg-cyan-200 rounded-full opacity-60" />
            <div className="absolute top-44 left-[75%] w-1 h-1 bg-white rounded-full opacity-50" />
            <div className="absolute top-72 left-[25%] w-1 h-1 bg-white rounded-full opacity-70" />
            <div className="absolute top-96 left-[60%] w-1.5 h-1.5 bg-cyan-100 rounded-full opacity-40" />
          </div>
        </div>

        {/* Interactive SVG Schematic Graphic */}
        <svg
          className="absolute inset-0 w-full h-full select-none"
          viewBox="0 0 1000 650"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="habitatGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            <linearGradient id="solarFieldGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="lakeWaterGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0369a1" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#082f49" stopOpacity="0.8" />
            </linearGradient>

            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* BACKGROUND LANDSCAPE / TERRAIN */}
          {isMaitri ? (
            /* Maitri: Schirmacher Oasis rocky permafrost & Lake Priyadarshini */
            <g id="maitri-terrain">
              {/* Lake Priyadarshini water boundary */}
              <path
                d="M 620,100 C 720,80 880,120 920,240 C 950,340 850,380 750,360 C 680,340 600,280 620,100 Z"
                fill="url(#lakeWaterGrad)"
                stroke="#0284c7"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <text x="750" y="220" fill="#38bdf8" fontSize="14" fontFamily="monospace" opacity="0.6" textAnchor="middle">
                LAKE PRIYADARSHINI (FRESHWATER)
              </text>
              <text x="750" y="240" fill="#0284c7" fontSize="11" fontFamily="monospace" opacity="0.7" textAnchor="middle">
                Sub-ice water extraction line: 4.2°C
              </text>

              {/* Water pipeline traced line */}
              <path
                d="M 750,220 L 530,220 L 530,320"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeDasharray="6 3"
                className="animate-pulse"
              />

              {/* Schirmacher bedrock contour */}
              <path
                d="M 80,480 Q 250,420 500,450 T 950,460"
                fill="none"
                stroke="#334155"
                strokeWidth="1"
                strokeDasharray="2 4"
              />
            </g>
          ) : (
            /* Bharati: Larsemann Hills promontory coastline & Prydz Bay */
            <g id="bharati-terrain">
              <path
                d="M 680,40 C 780,100 840,240 820,380 C 800,520 890,580 960,620 L 1000,620 L 1000,0 L 680,0 Z"
                fill="url(#lakeWaterGrad)"
                stroke="#0ea5e9"
                strokeWidth="1.5"
              />
              <text x="860" y="160" fill="#38bdf8" fontSize="14" fontFamily="monospace" opacity="0.6" textAnchor="middle">
                PRYDZ BAY (SOUTHERN OCEAN)
              </text>

              {/* SWRO Desalination Seawater intake line */}
              <path
                d="M 840,260 L 650,260 L 650,330"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="2.5"
                strokeDasharray="5 3"
              />
            </g>
          )}

          {/* ELECTRICAL / BUS FLOW LINES (Animated) */}
          {showFlows && (
            <g id="energy-flow-lines" opacity="0.6">
              {/* Generator to Main Station */}
              <path
                d="M 350,390 L 450,390 L 450,320"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Secondary Gen to Battery */}
              <path
                d="M 650,430 L 520,430 L 520,380"
                fill="none"
                stroke={isMaitri ? '#ef4444' : '#10b981'}
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              {/* Solar array to Main Inverter */}
              <path
                d="M 180,160 L 320,160 L 420,260"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="1.5"
                strokeDasharray="5 5"
              />
            </g>
          )}

          {/* MAIN HABITAT COMPLEX ARCHITECTURE */}
          {isMaitri ? (
            /* Maitri Main Station (Hexagonal block & modular steel containers) */
            <g id="maitri-main-building" transform="translate(380, 240)">
              {/* Outer shadow base */}
              <rect x="-10" y="-10" width="260" height="150" rx="16" fill="rgba(2, 6, 23, 0.7)" />

              {/* Station Module Frame */}
              <rect
                x="0"
                y="0"
                width="240"
                height="130"
                rx="12"
                fill="url(#habitatGrad)"
                stroke="#38bdf8"
                strokeWidth="1.5"
                filter="url(#neonGlow)"
              />

              {/* Module Partition Grid */}
              <line x1="80" y1="0" x2="80" y2="130" stroke="#334155" strokeWidth="1.5" />
              <line x1="160" y1="0" x2="160" y2="130" stroke="#334155" strokeWidth="1.5" />
              <line x1="0" y1="65" x2="240" y2="65" stroke="#334155" strokeWidth="1.5" />

              {/* Labels */}
              <text x="120" y="38" fill="#e2e8f0" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                MAITRI HABITAT CORE
              </text>
              <text x="40" y="95" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                LAB BAY
              </text>
              <text x="120" y="95" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                LIVING QTRS
              </text>
              <text x="200" y="95" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                SURGERY
              </text>

              {/* Thermal HVAC glow */}
              <circle cx="120" cy="65" r="14" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="1" />
              <text x="120" y="69" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                +19°C
              </text>
            </g>
          ) : (
            /* Bharati Modern Elevated Container Structure */
            <g id="bharati-main-building" transform="translate(360, 220)">
              {/* Elevated stilts shadow */}
              <ellipse cx="140" cy="170" rx="150" ry="30" fill="rgba(2, 6, 23, 0.8)" />

              {/* Structural Stilts / Pylons */}
              <line x1="40" y1="120" x2="40" y2="160" stroke="#64748b" strokeWidth="4" />
              <line x1="140" y1="120" x2="140" y2="165" stroke="#64748b" strokeWidth="4" />
              <line x1="240" y1="120" x2="240" y2="160" stroke="#64748b" strokeWidth="4" />

              {/* Aerodynamic Elevated Pod Structure (134 ISO Containers integrated) */}
              <rect
                x="10"
                y="10"
                width="260"
                height="110"
                rx="20"
                fill="url(#habitatGrad)"
                stroke="#00f0ff"
                strokeWidth="2"
                filter="url(#neonGlow)"
              />

              {/* Modern Glass Observation Deck */}
              <path
                d="M 210,30 L 260,30 L 260,90 L 210,90 Z"
                fill="rgba(0, 240, 255, 0.2)"
                stroke="#00f0ff"
                strokeWidth="1.5"
              />

              <text x="125" y="48" fill="#ffffff" fontSize="13" fontWeight="black" fontFamily="monospace" textAnchor="middle">
                BHARATI ELEVATED BASE
              </text>
              <text x="125" y="68" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                ISO 134-Container Monocoque Shell
              </text>
              <text x="125" y="86" fill="#10b981" fontSize="9" fontFamily="monospace" textAnchor="middle">
                Aerodynamic Katabatic Wind Diverter
              </text>
            </g>
          )}

          {/* SOLAR ARRAY FIELD SCHEMATIC */}
          <g id="solar-field" transform="translate(100, 110)">
            <rect x="0" y="0" width="160" height="90" rx="8" fill="url(#solarFieldGrad)" stroke="#0284c7" strokeWidth="1" />
            <line x1="40" y1="0" x2="40" y2="90" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="80" y1="0" x2="80" y2="90" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="120" y1="0" x2="120" y2="90" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="0" y1="45" x2="160" y2="45" stroke="#0284c7" strokeWidth="1" />
            <text x="80" y="105" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle">
              {isMaitri ? 'BIFACIAL SOLAR FIELD' : 'PERMAFROST SOLAR ARRAY'}
            </text>
          </g>

          {/* FUEL TANK BUND FARM */}
          <g id="fuel-tanks" transform="translate(760, 430)">
            <rect x="0" y="0" width="140" height="90" rx="10" fill="rgba(15, 23, 42, 0.9)" stroke="#475569" strokeWidth="1.5" />
            <circle cx="45" cy="45" r="28" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="95" cy="45" r="28" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="70" y="105" fill="#f59e0b" fontSize="10" fontFamily="monospace" textAnchor="middle">
              ARCTIC JET A-1 BUND
            </text>
          </g>

          {/* COMMS RADOME & MAST */}
          <g id="comms-mast" transform="translate(480, 50)">
            <circle cx="20" cy="20" r="22" fill="#0f172a" stroke="#00f0ff" strokeWidth="1.5" />
            <line x1="20" y1="42" x2="20" y2="70" stroke="#64748b" strokeWidth="2.5" />
            <line x1="10" y1="70" x2="30" y2="70" stroke="#64748b" strokeWidth="2.5" />
            <circle cx="20" cy="20" r="8" fill="#00f0ff" opacity="0.4" className="animate-ping" />
            <text x="20" y="85" fill="#00f0ff" fontSize="10" fontFamily="monospace" textAnchor="middle">
              ISRO / SATCOM RADOME
            </text>
          </g>

          {/* WIND TURBINE GRAPHIC (FOR BHARATI) */}
          {!isMaitri && (
            <g id="wind-turbines-graphic" transform="translate(140, 200)">
              <circle cx="25" cy="25" r="18" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="25" y1="25" x2="25" y2="70" stroke="#94a3b8" strokeWidth="3" />
              <line x1="15" y1="25" x2="35" y2="25" stroke="#00f0ff" strokeWidth="2" className="animate-spin" />
              <text x="25" y="85" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                WTG-01 TURBINE
              </text>
            </g>
          )}

          {/* INTERACTIVE HOTSPOTS WITH GLOWING DOTS */}
          {hotspots.map((hotspot) => {
            const isSelected = selectedHotspot?.id === hotspot.id;
            const isCritical = hotspot.status === 'critical';
            const isWarning = hotspot.status === 'warning';

            // Coordinates mapping onto the 1000x650 SVG viewbox
            const cx = (hotspot.x / 100) * 1000;
            const cy = (hotspot.y / 100) * 650;

            const dotColor = isCritical ? '#ef4444' : isWarning ? '#f59e0b' : '#10b981';

            return (
              <g
                key={hotspot.id}
                onClick={() => handleHotspotClick(hotspot)}
                className="cursor-pointer group"
                transform={`translate(${cx}, ${cy})`}
              >
                {/* Pulsing ring for critical or active */}
                {(isCritical || isSelected) && (
                  <circle
                    cx="0"
                    cy="0"
                    r="22"
                    fill="none"
                    stroke={dotColor}
                    strokeWidth="2"
                    opacity="0.7"
                    className="animate-ping"
                  />
                )}

                {/* Outer Glow Halo */}
                <circle
                  cx="0"
                  cy="0"
                  r={isSelected ? 16 : 13}
                  fill={dotColor}
                  fillOpacity="0.25"
                  stroke={dotColor}
                  strokeWidth="1.5"
                  className="group-hover:scale-125 transition-transform"
                />

                {/* Core Dot */}
                <circle
                  cx="0"
                  cy="0"
                  r={isSelected ? 7 : 5}
                  fill={dotColor}
                  className="group-hover:scale-110 transition-transform"
                />

                {/* Status Label on SVG */}
                <rect
                  x="-50"
                  y="18"
                  width="100"
                  height="22"
                  rx="6"
                  fill="rgba(5, 11, 20, 0.85)"
                  stroke={isSelected ? '#00f0ff' : 'rgba(56, 189, 248, 0.3)'}
                  strokeWidth="1"
                  className="group-hover:stroke-cyan-400 transition-colors"
                />
                <text
                  x="0"
                  y="33"
                  fill="#ffffff"
                  fontSize="9.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {hotspot.name.split(' ')[0]} {hotspot.name.split(' ')[1] || ''}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Top-Right Hotspot Quick Count Badge */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg glass-dropdown border border-cyan-500/30 text-xs font-mono">
          <span className="text-slate-400">HOTSPOTS:</span>
          <span className="text-emerald-400 font-bold">{hotspots.filter(h => h.status === 'normal').length} OK</span>
          <span className="text-amber-400 font-bold">{hotspots.filter(h => h.status === 'warning').length} WARN</span>
          <span className="text-rose-400 font-bold">{hotspots.filter(h => h.status === 'critical').length} CRIT</span>
        </div>

        {/* BOTTOM LIVE READOUT STRIP */}
        <div className="absolute bottom-0 left-0 right-0 glass-panel border-t border-cyan-500/30 p-3 sm:px-6 z-20">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-center">
            <div className="flex items-center justify-center gap-2 p-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <Thermometer className="w-4 h-4 text-cyan-400" />
              <div className="text-left">
                <div className="text-[9px] text-slate-400 uppercase">TEMPERATURE</div>
                <div className="text-sm font-bold text-white">{telemetry.temperature}°C</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 p-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <Wind className="w-4 h-4 text-cyan-300" />
              <div className="text-left">
                <div className="text-[9px] text-slate-400 uppercase">WIND SPEED</div>
                <div className="text-sm font-bold text-cyan-300">{telemetry.windSpeed} km/h</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 p-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <Zap className="w-4 h-4 text-amber-400" />
              <div className="text-left">
                <div className="text-[9px] text-slate-400 uppercase">POWER LOAD</div>
                <div className="text-sm font-bold text-white">{telemetry.powerGeneration} kW</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 p-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <Fuel className="w-4 h-4 text-amber-400" />
              <div className="text-left">
                <div className="text-[9px] text-slate-400 uppercase">FUEL LEVEL</div>
                <div className="text-sm font-bold text-amber-400">{telemetry.fuelLevel}%</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 p-1.5 rounded-lg bg-slate-900/60 border border-slate-800 col-span-2 sm:col-span-1">
              <Droplets className="w-4 h-4 text-emerald-400" />
              <div className="text-left">
                <div className="text-[9px] text-slate-400 uppercase">WATER STORES</div>
                <div className="text-sm font-bold text-emerald-400">{telemetry.waterReserve}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* SIDE DETAIL DRAWER (SLIDE-OVER ON CLICK) */}
        {selectedHotspot && (
          <div className="absolute top-0 right-0 bottom-0 w-full sm:w-96 glass-dropdown border-l border-cyan-500/40 p-5 z-30 overflow-y-auto flex flex-col justify-between shadow-2xl animate-in slide-in-from-right-8 duration-200">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between pb-3 border-b border-cyan-500/20">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-semibold">
                    SUB-SYSTEM TELEMETRY
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {selectedHotspot.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 my-3 font-mono text-xs">
                <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase border ${
                  selectedHotspot.status === 'critical'
                    ? 'bg-rose-950/80 text-rose-300 border-rose-500/50 pulse-critical'
                    : selectedHotspot.status === 'warning'
                    ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                    : 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40'
                }`}>
                  STATUS: {selectedHotspot.status}
                </span>
                <span className="text-slate-400 text-[11px]">
                  TYPE: {selectedHotspot.type.toUpperCase()}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {selectedHotspot.description}
              </p>

              {/* Diagnostic Key Values */}
              <div className="grid grid-cols-2 gap-2 font-mono text-xs mb-4">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] text-slate-400">OPERATING LOAD</div>
                  <div className="text-base font-bold text-cyan-300 mt-0.5">{selectedHotspot.load}%</div>
                </div>

                {selectedHotspot.temp !== undefined && (
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">BEARING / CELL TEMP</div>
                    <div className={`text-base font-bold mt-0.5 ${selectedHotspot.temp > 95 ? 'text-rose-400' : 'text-white'}`}>
                      {selectedHotspot.temp}°C
                    </div>
                  </div>
                )}

                {selectedHotspot.vibration && (
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">VIBRATION (RMS)</div>
                    <div className={`text-base font-bold mt-0.5 ${parseFloat(selectedHotspot.vibration) > 2 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {selectedHotspot.vibration}
                    </div>
                  </div>
                )}

                {selectedHotspot.flowRate && (
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">FLOW VELOCITY</div>
                    <div className="text-base font-bold text-white mt-0.5">{selectedHotspot.flowRate}</div>
                  </div>
                )}

                {selectedHotspot.runtimeHours && (
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 col-span-2">
                    <div className="text-[10px] text-slate-400">ACCUMULATED RUNTIME</div>
                    <div className="text-xs font-bold text-slate-200 mt-0.5">{selectedHotspot.runtimeHours.toLocaleString()} Hours</div>
                  </div>
                )}
              </div>

              {/* Mini Trend Area Chart */}
              {selectedHotspot.history && (
                <div className="mb-4">
                  <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold mb-1">
                    TELEMETRY HISTORY (LAST 6 HOURS)
                  </div>
                  <div className="h-28 w-full p-1 rounded-lg bg-slate-900/60 border border-slate-800">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={selectedHotspot.history} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="miniChartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 9 }} />
                        <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 9 }} />
                        <Tooltip
                          contentStyle={{ background: '#0b1528', borderColor: '#00f0ff', borderRadius: '8px', fontSize: '11px' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#00f0ff" fill="url(#miniChartGrad)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* AI Recommended Remediation Action */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>RECOMMENDED REMEDIATION</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {selectedHotspot.action}
                </p>

                {remediationTriggered ? (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 p-2 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Protocol Dispatched to Polar Scada PLC</span>
                  </div>
                ) : (
                  <button
                    onClick={handleExecuteRemediation}
                    className="w-full mt-2 py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20 transition-all"
                  >
                    <span>EXECUTE REMEDIATION PROTOCOL</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 font-mono flex items-center justify-between">
              <span>NCPOR SCADA V3.8</span>
              <span>250ms Polling</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
