import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, MapPin, Radio, ShieldCheck } from 'lucide-react';
import { STATIONS } from '../data/mockData';

export default function StationSelector({ currentStationId, onSelectStation }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const currentStation = STATIONS[currentStationId] || STATIONS.maitri;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (stationId) => {
    onSelectStation(stationId);
    setIsOpen(false);
    if (location.pathname === '/maitri' || location.pathname === '/bharati') {
      navigate(`/${stationId}`);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400 text-slate-200 transition-all duration-200 text-xs sm:text-sm font-medium shadow-sm hover:shadow-cyan-500/10 cursor-pointer"
        title="Select Active Polar Station"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              currentStation.statusSeverity === 'critical' ? 'bg-rose-400' :
              currentStation.statusSeverity === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              currentStation.statusSeverity === 'critical' ? 'bg-rose-500' :
              currentStation.statusSeverity === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
            }`}></span>
          </span>
          <span className="font-semibold tracking-wide text-white">{currentStation.name}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-mono hidden md:inline">
            {currentStation.code}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-cyan-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl glass-dropdown border border-cyan-500/30 p-2 z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-cyan-400 font-mono font-semibold">
            Active Indian Research Bases
          </div>

          <div className="mt-1 space-y-1">
            {Object.values(STATIONS).map((st) => {
              const isSelected = st.id === currentStationId;
              return (
                <button
                  key={st.id}
                  onClick={() => handleSelect(st.id)}
                  className={`w-full text-left p-2.5 rounded-lg transition-all flex flex-col gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/70 border border-cyan-500/50 shadow-sm'
                      : 'hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        st.statusSeverity === 'critical' ? 'bg-rose-500' :
                        st.statusSeverity === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`} />
                      <span className="text-sm font-semibold text-white">{st.name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400">{st.telemetry.temperature}°C</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-500" />
                      {st.location.split(',')[0]}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      Lat: {st.coordinates.lat}°
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
