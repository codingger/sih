import React, { useState, useEffect } from 'react';
import { Menu, X, Radio, Clock, ShieldCheck, Wifi, Snowflake } from 'lucide-react';
import StationSelector from './StationSelector';

export default function Navbar({ currentStationId, onSelectStation, onToggleSidebar, isSidebarOpen, crisisScenario, onResetCrisis }) {
  const [timeUtc, setTimeUtc] = useState('');
  const [timeIst, setTimeIst] = useState('');

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      setTimeUtc(now.toUTCString().slice(17, 25) + ' UTC');
      setTimeIst(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST');
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-cyan-500/20 px-3 sm:px-6 py-2.5 flex items-center justify-between shadow-lg shadow-black/40">
      {/* Left: Mobile Toggle & Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 rounded-lg bg-slate-800/80 border border-cyan-500/30 text-cyan-300 hover:text-white cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-400/40 shadow-inner shadow-cyan-500/30">
            <Snowflake className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-white text-sm sm:text-base">
                NCPOR
              </span>
              <span className="text-cyan-500 font-light">|</span>
              <span className="text-cyan-300 font-semibold tracking-wide text-xs sm:text-sm uppercase">
                Antarctic Digital Twin
              </span>
            </div>
            <div className="text-[10px] text-slate-400 hidden md:block">
              National Centre for Polar and Ocean Research • MoES, Govt. of India
            </div>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Active Crisis Alert Banner */}
        {crisisScenario && (
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-mono pulse-critical">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="font-bold text-[11px] uppercase hidden sm:inline">CRISIS: {crisisScenario.name.split(' ')[0]}</span>
            <button
              onClick={onResetCrisis}
              className="text-[10px] bg-rose-900/80 hover:bg-rose-800 text-rose-200 px-1.5 py-0.5 rounded cursor-pointer"
              title="Reset to Live Telemetry"
            >
              Reset
            </button>
          </div>
        )}

        {/* System Online Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold tracking-wider text-[11px]">SYSTEM ONLINE</span>
        </div>

        {/* SATCOM Pill */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
          <Wifi className="w-3 h-3 text-cyan-400" />
          <span className="text-[11px]">SAT-LINK: 480ms</span>
        </div>

        {/* Live Clock */}
        <div className="hidden md:flex flex-col text-right font-mono">
          <span className="text-xs text-slate-200 font-medium tracking-wider flex items-center justify-end gap-1">
            <Clock className="w-3 h-3 text-cyan-400" />
            {timeUtc}
          </span>
          <span className="text-[10px] text-slate-400">{timeIst}</span>
        </div>

        {/* Station Selector Dropdown */}
        <StationSelector
          currentStationId={currentStationId}
          onSelectStation={onSelectStation}
        />
      </div>
    </header>
  );
}
