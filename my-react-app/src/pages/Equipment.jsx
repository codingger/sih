import React, { useState } from 'react';
import EquipmentCard from '../components/EquipmentCard';
import { Wrench, Search, Filter, X, CheckCircle2, ShieldAlert } from 'lucide-react';
import { EQUIPMENT_LIST, STATIONS } from '../data/mockData';

export default function Equipment({ currentStationId }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [inspectEquipment, setInspectEquipment] = useState(null);

  const station = STATIONS[currentStationId] || STATIONS.maitri;
  const stationEquipment = EQUIPMENT_LIST.filter(eq => eq.station === currentStationId);

  const categories = ['ALL', ...new Set(stationEquipment.map(eq => eq.category))];

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setInspectEquipment(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredEquipment = stationEquipment.filter(eq => {
    const matchesCat = selectedCategory === 'ALL' || eq.category === selectedCategory;
    const matchesSearch = eq.name.toLowerCase().includes(search.toLowerCase()) ||
                          eq.serial.toLowerCase().includes(search.toLowerCase()) ||
                          eq.location.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
            MACHINERY & PLANT ASSETS • {station.name.toUpperCase()}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Equipment Registry & Health
          </h1>
          <p className="text-xs text-slate-400">
            Real-time diagnostics, load profiles, operating runtime hours, and maintenance schedules
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            {stationEquipment.length} Active Machines Tracked
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search equipment, serials, bays..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap cursor-pointer transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEquipment.map(eq => (
          <EquipmentCard
            key={eq.id}
            equipment={eq}
            onInspect={(item) => setInspectEquipment(item)}
          />
        ))}
      </div>

      {/* Diagnostics Modal */}
      {inspectEquipment && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-panel-glow rounded-2xl max-w-lg w-full p-6 border border-cyan-500/40 relative">
            <div className="flex items-start justify-between pb-3 border-b border-cyan-500/20">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                  EQUIPMENT DIAGNOSTIC SCAN
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {inspectEquipment.name}
                </h3>
                <div className="text-xs text-slate-400 font-mono">
                  SN: {inspectEquipment.serial} • Location: {inspectEquipment.location}
                </div>
              </div>
              <button
                onClick={() => setInspectEquipment(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] text-slate-400">HEALTH SCORE</div>
                  <div className={`text-lg font-bold ${inspectEquipment.health < 50 ? 'text-rose-400' : inspectEquipment.health < 80 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {inspectEquipment.health}% / 100
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">CURRENT LOAD</div>
                  <div className="text-lg font-bold text-cyan-300">
                    {inspectEquipment.load}% Continuous
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Runtime Accumulated:</span>
                  <span className="text-white font-bold">{inspectEquipment.runtimeHours} Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Overhaul:</span>
                  <span className="text-white">{inspectEquipment.lastServiced}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Next Service Window:</span>
                  <span className={inspectEquipment.nextServiceDue.includes('OVERDUE') ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                    {inspectEquipment.nextServiceDue}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setInspectEquipment(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold cursor-pointer"
              >
                Close Diagnostic
              </button>
              <button
                onClick={() => {
                  alert(`Diagnostic report exported for ${inspectEquipment.name}`);
                  setInspectEquipment(null);
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-mono font-bold cursor-pointer"
              >
                Export SCADA Telemetry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
