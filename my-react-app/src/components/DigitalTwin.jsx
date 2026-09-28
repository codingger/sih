import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Snowflake,
  Compass
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
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
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
    setHoveredHotspot(null);
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

  // Compute adaptive micro-card tooltip placement so it never overflows viewport
  const getTooltipStyle = (hotspot) => {
    if (!hotspot) return {};
    const x = hotspot.x;
    const y = hotspot.y;
    let translateX = '-50%';
    if (x < 22) translateX = '0%';
    else if (x > 78) translateX = '-100%';

    let translateY = '24px';
    if (y > 55) translateY = 'calc(-100% - 24px)';

    return {
      left: `${x}%`,
      top: `${y}%`,
      transform: `translate(${translateX}, ${translateY})`,
    };
  };

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
            Hover over any telemetry hotspot for quick status or click to open diagnostic drawer & AI remediation.
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
            <style>{`
              @keyframes radar-sweep-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes turbine-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes wave-contour-flow-1 {
                0% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: -60; }
              }
              @keyframes wave-contour-flow-2 {
                0% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: -48; }
              }
              @keyframes wave-ripple-drift {
                0%, 100% { transform: translate(0px, 0px); opacity: 0.35; }
                50% { transform: translate(-6px, 3px); opacity: 0.75; }
              }
              @keyframes lake-shimmer-pulse {
                0%, 100% { opacity: 0.25; transform: scale(0.97); }
                50% { opacity: 0.65; transform: scale(1.03); }
              }
              @keyframes lake-ripple-dash {
                0% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: -40; }
              }
              @keyframes trace-heat-dash {
                0% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: -26; }
              }
              @keyframes water-flow-dash {
                0% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: -36; }
              }

              .radar-sweep-beam {
                transform-origin: 0px 0px;
                animation: radar-sweep-spin 3s linear infinite;
              }
              .wind-turbine-rotor {
                transform-origin: 0px 0px;
                animation: turbine-spin 3.2s linear infinite;
              }
              .wave-contour-1 {
                animation: wave-contour-flow-1 2.6s linear infinite;
              }
              .wave-contour-2 {
                animation: wave-contour-flow-2 3.6s linear infinite;
              }
              .wave-ripple {
                animation: wave-ripple-drift 4s ease-in-out infinite;
              }
              .lake-shimmer-ring {
                animation: lake-ripple-dash 3.2s linear infinite;
              }
              .lake-pulse-glow {
                transform-origin: 760px 230px;
                animation: lake-shimmer-pulse 4.5s ease-in-out infinite;
              }
              .trace-heat-flow {
                animation: trace-heat-dash 1.8s linear infinite;
              }
              .water-core-flow {
                animation: water-flow-dash 1.4s linear infinite;
              }
            `}</style>

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
              <stop offset="0%" stopColor="#0369a1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#082f49" stopOpacity="0.85" />
            </linearGradient>

            <radialGradient id="lakeGlowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#082f49" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="radarSweepGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
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
              {/* Lake Priyadarshini freshwater body boundary */}
              <path
                d="M 620,100 C 720,80 880,120 920,240 C 950,340 850,380 750,360 C 680,340 600,280 620,100 Z"
                fill="url(#lakeWaterGrad)"
                stroke="#0284c7"
                strokeWidth="1.8"
                strokeDasharray="5 3"
              />

              {/* Lake Priyadarshini Animated Water Shimmer & Glacial Ripples */}
              <g id="lake-shimmer-ripples">
                {/* Glacial core glow */}
                <ellipse cx="760" cy="230" rx="100" ry="60" fill="url(#lakeGlowGrad)" className="lake-pulse-glow" />

                {/* Shimmer water ripple contours */}
                <path
                  d="M 650,150 Q 750,135 850,165"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="12 8"
                  className="lake-shimmer-ring"
                  opacity="0.65"
                />
                <path
                  d="M 670,195 Q 770,175 880,205"
                  fill="none"
                  stroke="#7dd3fc"
                  strokeWidth="1.8"
                  strokeDasharray="16 10"
                  className="lake-shimmer-ring"
                  style={{ animationDuration: '4s' }}
                  opacity="0.6"
                />
                <path
                  d="M 680,250 Q 780,230 870,265"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="1.5"
                  strokeDasharray="14 8"
                  className="lake-shimmer-ring"
                  style={{ animationDuration: '3.5s' }}
                  opacity="0.55"
                />
                <path
                  d="M 700,295 Q 780,280 840,315"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                  strokeDasharray="10 6"
                  className="lake-shimmer-ring"
                  style={{ animationDuration: '2.8s' }}
                  opacity="0.5"
                />
              </g>

              <text x="760" y="145" fill="#38bdf8" fontSize="13" fontWeight="bold" fontFamily="monospace" opacity="0.85" textAnchor="middle">
                LAKE PRIYADARSHINI (FRESHWATER)
              </text>
              <text x="760" y="162" fill="#0284c7" fontSize="10" fontFamily="monospace" opacity="0.8" textAnchor="middle">
                Sub-ice water reservoir • 48,000 Liters (4.2°C)
              </text>

              {/* WATER PIPELINE WITH ANIMATED ELECTRICAL & TRACE-HEATING PULSE FLOW */}
              <g id="trace-heated-water-pipeline">
                {/* 1. Base thermal insulation casing */}
                <path
                  d="M 750,220 L 530,220 L 530,320"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* 2. Stainless conduit sleeve */}
                <path
                  d="M 750,220 L 530,220 L 530,320"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 3. Trace-heating thermal radiative glow */}
                <path
                  d="M 750,220 L 530,220 L 530,320"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.35"
                  className="animate-pulse"
                />

                {/* 4. Electrical Trace-Heating Pulsing Cable Dashes */}
                <path
                  d="M 750,220 L 530,220 L 530,320"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="6 5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="trace-heat-flow"
                />

                {/* 5. Core Potable Water Flow Dashes */}
                <path
                  d="M 750,220 L 530,220 L 530,320"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2.5"
                  strokeDasharray="9 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="water-core-flow"
                />

                {/* Sub-ice intake pump head */}
                <circle cx="750" cy="220" r="7" fill="#082f49" stroke="#00f0ff" strokeWidth="2" />
                <circle cx="750" cy="220" r="3" fill="#38bdf8" className="animate-ping" />

                {/* Thermal junction elbow */}
                <circle cx="530" cy="220" r="5" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />

                {/* Habitat inlet manifold */}
                <circle cx="530" cy="320" r="6" fill="#0f172a" stroke="#00f0ff" strokeWidth="2" />

                {/* Status readout label along pipeline */}
                <rect x="560" y="196" width="165" height="18" rx="4" fill="rgba(8, 15, 30, 0.9)" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="0.8" />
                <text x="642" y="209" fill="#f59e0b" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  ⚡ TRACE-HEAT: 8.4 kW [4.2°C INTAKE]
                </text>
              </g>

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
              {/* Prydz Bay ocean boundary */}
              <path
                d="M 680,40 C 780,100 840,240 820,380 C 800,520 890,580 960,620 L 1000,620 L 1000,0 L 680,0 Z"
                fill="url(#lakeWaterGrad)"
                stroke="#0ea5e9"
                strokeWidth="1.5"
              />

              {/* Subtle Animated Wave Contours along Prydz Bay shoreline */}
              <path
                d="M 695,55 C 790,110 846,245 828,382 C 808,515 892,575 962,618"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="18 12"
                opacity="0.7"
                className="wave-contour-1"
              />
              <path
                d="M 720,75 C 810,130 864,255 845,388 C 826,512 908,570 975,612"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="1.5"
                strokeDasharray="14 10"
                opacity="0.5"
                className="wave-contour-2"
              />
              <path
                d="M 750,105 C 835,155 885,270 866,396 C 850,508 926,565 990,605"
                fill="none"
                stroke="#7dd3fc"
                strokeWidth="1.2"
                strokeDasharray="12 8"
                opacity="0.35"
                className="wave-contour-1"
              />

              {/* Ocean surface drifting wavelets */}
              <g className="wave-ripple">
                <path d="M 830,110 Q 850,105 870,110 T 910,110" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                <path d="M 870,180 Q 890,175 910,180 T 950,180" fill="none" stroke="#00f0ff" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
                <path d="M 850,290 Q 870,285 890,290 T 930,290" fill="none" stroke="#7dd3fc" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                <path d="M 880,440 Q 900,435 920,440 T 960,440" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
              </g>

              <text x="860" y="80" fill="#38bdf8" fontSize="13" fontWeight="bold" fontFamily="monospace" opacity="0.8" textAnchor="middle">
                PRYDZ BAY (SOUTHERN OCEAN)
              </text>
              <text x="860" y="98" fill="#0284c7" fontSize="10" fontFamily="monospace" opacity="0.75" textAnchor="middle">
                Sub-polar coastal marine hydrology: -1.8°C
              </text>

              {/* SWRO Desalination Seawater intake line with animated flow */}
              <g id="swro-intake-line">
                <path
                  d="M 840,260 L 650,260 L 650,330"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 840,260 L 650,260 L 650,330"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 840,260 L 650,260 L 650,330"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="water-core-flow"
                />
                <circle cx="840" cy="260" r="6" fill="#082f49" stroke="#00f0ff" strokeWidth="1.5" />
                <circle cx="840" cy="260" r="2.5" fill="#38bdf8" className="animate-ping" />
                <rect x="680" y="238" width="138" height="16" rx="4" fill="rgba(8, 15, 30, 0.9)" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="0.8" />
                <text x="749" y="250" fill="#00f0ff" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  SWRO OCEAN INTAKE (32 L/min)
                </text>
              </g>
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

          {/* COMMS RADOME & MAST (WITH ANIMATED ISRO RADAR SWEEP) */}
          <g id="comms-mast" transform="translate(480, 50)">
            {/* Base Radome Enclosure */}
            <circle cx="20" cy="20" r="22" fill="#0f172a" stroke="#00f0ff" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="15" fill="none" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
            <circle cx="20" cy="20" r="8" fill="none" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />

            {/* Tracking Crosshair Reticle */}
            <line x1="20" y1="2" x2="20" y2="38" stroke="#0284c7" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.4" />
            <line x1="2" y1="20" x2="38" y2="20" stroke="#0284c7" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.4" />

            {/* Rotating Radar Sweep Beam */}
            <g transform="translate(20, 20)">
              <g className="radar-sweep-beam">
                {/* Semi-transparent rotating radar sector beam */}
                <path
                  d="M 0,0 L 21,0 A 21 21 0 0 1 14.8,14.8 Z"
                  fill="url(#radarSweepGrad)"
                />
                {/* High-visibility leading sweep edge */}
                <line x1="0" y1="0" x2="21" y2="0" stroke="#00f0ff" strokeWidth="1.5" opacity="0.9" />
              </g>

              {/* Satellite signal lock target blip */}
              <circle cx="10" cy="-9" r="1.8" fill="#38bdf8" className="animate-ping" opacity="0.75" />
              <circle cx="10" cy="-9" r="1.4" fill="#ffffff" />

              {/* Center Feed Antenna Core */}
              <circle cx="0" cy="0" r="3" fill="#00f0ff" stroke="#38bdf8" strokeWidth="1" />
            </g>

            {/* Pylon Rigging & Mast Base */}
            <line x1="20" y1="42" x2="20" y2="70" stroke="#64748b" strokeWidth="2.5" />
            <line x1="10" y1="70" x2="30" y2="70" stroke="#64748b" strokeWidth="2.5" />
            <line x1="13" y1="52" x2="27" y2="62" stroke="#475569" strokeWidth="1" />
            <line x1="27" y1="52" x2="13" y2="62" stroke="#475569" strokeWidth="1" />

            <text x="20" y="85" fill="#00f0ff" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              ISRO / SATCOM RADOME
            </text>
            <text x="20" y="96" fill="#38bdf8" fontSize="8" fontFamily="monospace" opacity="0.75" textAnchor="middle">
              Cartosat / Oceansat Downlink
            </text>
          </g>

          {/* WIND TURBINE ARRAY (FOR BHARATI) WITH PROPER ROTATING BLADES & HUB */}
          {!isMaitri && (
            <g id="wind-turbines-graphic">
              {/* WTG-02 (Secondary turbine in background) */}
              <g transform="translate(90, 215) scale(0.7)">
                <polygon points="23,25 27,25 29,75 21,75" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <rect x="18" y="21" width="16" height="8" rx="2" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
                <g transform="translate(25, 25)">
                  <g className="wind-turbine-rotor" style={{ animationDuration: '3.8s' }}>
                    <path d="M -1.4,0 C -2.2,-7 -3,-15 -0.8,-23 C -0.2,-24 0.6,-24 1.1,-23 C 2.2,-15 2,-7 1.4,0 Z" fill="#94a3b8" stroke="#0369a1" strokeWidth="0.5" />
                    <path d="M -1.4,0 C -2.2,-7 -3,-15 -0.8,-23 C -0.2,-24 0.6,-24 1.1,-23 C 2.2,-15 2,-7 1.4,0 Z" fill="#94a3b8" stroke="#0369a1" strokeWidth="0.5" transform="rotate(120)" />
                    <path d="M -1.4,0 C -2.2,-7 -3,-15 -0.8,-23 C -0.2,-24 0.6,-24 1.1,-23 C 2.2,-15 2,-7 1.4,0 Z" fill="#94a3b8" stroke="#0369a1" strokeWidth="0.5" transform="rotate(240)" />
                    <circle cx="0" cy="0" r="3.5" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
                  </g>
                </g>
                <text x="25" y="88" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  WTG-02
                </text>
              </g>

              {/* WTG-01 (Primary foreground turbine) */}
              <g transform="translate(150, 190)">
                {/* Aerodynamic swept rotation path guide */}
                <circle cx="25" cy="25" r="24" fill="none" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.3" />

                {/* Structural Tower Pylon */}
                <polygon points="23,25 27,25 30,78 20,78" fill="#1e293b" stroke="#475569" strokeWidth="1.2" />
                <line x1="21" y1="42" x2="29" y2="42" stroke="#334155" strokeWidth="1" />
                <line x1="21.5" y1="58" x2="28.5" y2="58" stroke="#334155" strokeWidth="1" />
                <rect x="18" y="76" width="14" height="4" rx="1" fill="#0f172a" stroke="#64748b" strokeWidth="1" />

                {/* Nacelle housing */}
                <rect x="17" y="21" width="18" height="8" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
                <circle cx="19" cy="25" r="1.2" fill="#10b981" />

                {/* Rotating Rotor Hub & 3 Clean Aerofoil Blades */}
                <g transform="translate(25, 25)">
                  <g className="wind-turbine-rotor">
                    {/* Blade 1 (pointing 0 deg) */}
                    <path
                      d="M -1.8,0 C -2.8,-8 -3.6,-17 -1,-25 C -0.2,-26 0.8,-26 1.4,-25 C 2.8,-17 2.4,-8 1.8,0 Z"
                      fill="#e0f2fe"
                      stroke="#0284c7"
                      strokeWidth="0.6"
                      filter="drop-shadow(0 0 2px rgba(56, 189, 248, 0.5))"
                    />
                    {/* Blade 2 (pointing 120 deg) */}
                    <path
                      d="M -1.8,0 C -2.8,-8 -3.6,-17 -1,-25 C -0.2,-26 0.8,-26 1.4,-25 C 2.8,-17 2.4,-8 1.8,0 Z"
                      fill="#e0f2fe"
                      stroke="#0284c7"
                      strokeWidth="0.6"
                      transform="rotate(120)"
                      filter="drop-shadow(0 0 2px rgba(56, 189, 248, 0.5))"
                    />
                    {/* Blade 3 (pointing 240 deg) */}
                    <path
                      d="M -1.8,0 C -2.8,-8 -3.6,-17 -1,-25 C -0.2,-26 0.8,-26 1.4,-25 C 2.8,-17 2.4,-8 1.8,0 Z"
                      fill="#e0f2fe"
                      stroke="#0284c7"
                      strokeWidth="0.6"
                      transform="rotate(240)"
                      filter="drop-shadow(0 0 2px rgba(56, 189, 248, 0.5))"
                    />
                    {/* Central Hub Nose Cone Spinner */}
                    <circle cx="0" cy="0" r="4.2" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.2" />
                    <circle cx="0" cy="0" r="2" fill="#ffffff" />
                  </g>
                </g>

                <text x="25" y="92" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  WTG-01 TURBINE
                </text>
                <text x="25" y="103" fill="#10b981" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  38 kW • 100% ONLINE
                </text>
              </g>
            </g>
          )}

          {/* INTERACTIVE HOTSPOTS WITH GLOWING DOTS */}
          {hotspots.map((hotspot) => {
            const isSelected = selectedHotspot?.id === hotspot.id;
            const isHovered = hoveredHotspot?.id === hotspot.id;
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
                onMouseEnter={() => setHoveredHotspot(hotspot)}
                onMouseLeave={() => setHoveredHotspot(null)}
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
                  r={isSelected ? 16 : isHovered ? 15 : 13}
                  fill={dotColor}
                  fillOpacity={isHovered ? 0.45 : 0.25}
                  stroke={dotColor}
                  strokeWidth={isHovered ? 2 : 1.5}
                  className="transition-all duration-200"
                />

                {/* Core Dot */}
                <circle
                  cx="0"
                  cy="0"
                  r={isSelected ? 7 : isHovered ? 6 : 5}
                  fill={dotColor}
                  className="transition-all duration-200"
                />

                {/* Status Label on SVG */}
                <rect
                  x="-50"
                  y="18"
                  width="100"
                  height="22"
                  rx="6"
                  fill={isHovered ? 'rgba(8, 18, 36, 0.95)' : 'rgba(5, 11, 20, 0.85)'}
                  stroke={isSelected || isHovered ? '#00f0ff' : 'rgba(56, 189, 248, 0.3)'}
                  strokeWidth={isHovered ? 1.5 : 1}
                  className="transition-colors duration-200"
                />
                <text
                  x="0"
                  y="33"
                  fill={isHovered ? '#00f0ff' : '#ffffff'}
                  fontSize="9.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                  textAnchor="middle"
                  className="transition-colors duration-200"
                >
                  {hotspot.name.split(' ')[0]} {hotspot.name.split(' ')[1] || ''}
                </text>
              </g>
            );
          })}
        </svg>

        {/* HOVER TOOLTIP MICRO-CARD */}
        <AnimatePresence>
          {hoveredHotspot && !selectedHotspot && (
            <motion.div
              key={`tooltip-${hoveredHotspot.id}`}
              initial={{ opacity: 0, y: 6, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.94 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              style={getTooltipStyle(hoveredHotspot)}
              className="absolute z-40 pointer-events-none min-w-[210px] max-w-[260px] p-3 rounded-xl glass-dropdown border border-cyan-400/40 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[9px] font-mono font-bold tracking-wider text-cyan-400 uppercase">
                  {hoveredHotspot.type} SUB-SYSTEM
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${
                    hoveredHotspot.status === 'critical'
                      ? 'bg-rose-950/90 text-rose-300 border-rose-500/50'
                      : hoveredHotspot.status === 'warning'
                      ? 'bg-amber-950/90 text-amber-300 border-amber-500/50'
                      : 'bg-emerald-950/90 text-emerald-400 border-emerald-500/40'
                  }`}
                >
                  {hoveredHotspot.status}
                </span>
              </div>

              <div className="text-xs font-bold text-white leading-tight mb-2">
                {hoveredHotspot.name}
              </div>

              {/* Primary load / metric */}
              <div className="space-y-1 mb-2">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">OPERATING LOAD:</span>
                  <span className="text-cyan-300 font-bold">{hoveredHotspot.load}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      hoveredHotspot.status === 'critical'
                        ? 'bg-rose-500'
                        : hoveredHotspot.status === 'warning'
                        ? 'bg-amber-400'
                        : 'bg-cyan-400'
                    }`}
                    style={{ width: `${Math.min(100, hoveredHotspot.load)}%` }}
                  />
                </div>
              </div>

              {/* Telemetry quick detail tags */}
              {hoveredHotspot.temp !== undefined && (
                <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-300 pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Core Temp:</span>
                  <span className={hoveredHotspot.temp > 95 ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                    {hoveredHotspot.temp}°C
                  </span>
                </div>
              )}
              {hoveredHotspot.outputKw !== undefined && (
                <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-300 pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Power Output:</span>
                  <span className="text-emerald-400 font-bold">{hoveredHotspot.outputKw} kW</span>
                </div>
              )}
              {hoveredHotspot.vibration !== undefined && (
                <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-300 pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Vibration (RMS):</span>
                  <span className={parseFloat(hoveredHotspot.vibration) > 2 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {hoveredHotspot.vibration}
                  </span>
                </div>
              )}
              {hoveredHotspot.bandwidthMbps !== undefined && (
                <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-300 pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Bandwidth:</span>
                  <span className="text-cyan-300 font-bold">{hoveredHotspot.bandwidthMbps} Mbps</span>
                </div>
              )}

              <div className="mt-2 text-[9px] font-mono text-cyan-400/80 flex items-center justify-between">
                <span>Click node to open telemetry</span>
                <span>→</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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

        {/* SIDE DETAIL DRAWER (SLIDE-OVER ON CLICK WITH FRAMER-MOTION) */}
        <AnimatePresence>
          {selectedHotspot && (
            <motion.div
              key="side-detail-drawer"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220, mass: 0.8 }}
              className="absolute top-0 right-0 bottom-0 w-full sm:w-96 glass-dropdown border-l border-cyan-500/40 p-5 z-30 overflow-y-auto flex flex-col justify-between shadow-2xl"
            >
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
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition-colors"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
