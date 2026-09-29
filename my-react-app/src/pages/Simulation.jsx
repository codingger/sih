import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { Sliders, Play, RotateCcw, AlertTriangle, ShieldCheck, Flame, CloudSnow, Ship, Zap, Activity } from 'lucide-react';
import { SIMULATION_SCENARIOS, STATIONS } from '../data/mockData';

export default function Simulation({ currentStationId, stationData, crisisScenario, onTriggerCrisis, onResetCrisis }) {
  const { addToast } = useToast();
  const [activeScenarioId, setActiveScenarioId] = useState(crisisScenario ? crisisScenario.id : 'blizzard');

  const station = stationData || STATIONS[currentStationId] || STATIONS.maitri;
  const scenarios = SIMULATION_SCENARIOS;
  const currentScenario = scenarios[activeScenarioId] || scenarios.blizzard;
  const isSimulating = Boolean(crisisScenario);

  const handleRunSimulation = () => {
    if (onTriggerCrisis) onTriggerCrisis(currentScenario);
    addToast({
      title: `${currentScenario.name} Engaged`,
      message: 'Telemetry stream overridden across all station nodes. Emergency protocols initiated.',
      type: 'critical',
      duration: 5500
    });
  };

  const handleResetSimulation = () => {
    if (onResetCrisis) onResetCrisis();
    addToast({
      title: 'Simulation Disengaged',
      message: 'Telemetry restored to live polar satellite baseline feeds.',
      type: 'info',
      duration: 4000
    });
  };

  // Baseline reference and simulated metrics calculation
  const baselineStation = STATIONS[currentStationId || 'maitri'] || STATIONS.maitri;
  const baseTemp = baselineStation.telemetry.temperature;
  const simTemp = isSimulating
    ? +(baseTemp + (currentScenario.impacts.temperatureDelta || 0)).toFixed(1)
    : (station.telemetry.temperature ?? baseTemp);

  const baseWind = baselineStation.telemetry.windSpeed;
  const simWind = isSimulating
    ? Math.max(0, +(baseWind + (currentScenario.impacts.windDelta || 0)).toFixed(1))
    : (station.telemetry.windSpeed ?? baseWind);

  const baseHealth = baselineStation.healthScore;
  const simHealth = isSimulating
    ? Math.max(20, baseHealth + (currentScenario.impacts.healthScoreImpact || 0))
    : (station.healthScore ?? baseHealth);

  const basePower = baselineStation.telemetry.powerGeneration;
  const simPower = isSimulating
    ? currentScenario.id === 'generatorFailure'
      ? 125
      : +(basePower + (currentScenario.impacts.powerDemandDeltaKw || 0)).toFixed(1)
    : (station.telemetry.powerGeneration ?? basePower);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
            WHAT-IF CRISIS & DISASTER SIMULATOR • {station.name.toUpperCase()}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Polar Operations Simulation Engine
          </h1>
          <p className="text-xs text-slate-400">
            Stress-test Antarctic infrastructure resilience against Category 4 blizzards, sudden generator trips, and ice-pack logistics blockades
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSimulating ? (
            <button
              onClick={handleResetSimulation}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold border border-slate-600 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Reset to Live Baseline</span>
            </button>
          ) : (
            <button
              onClick={handleRunSimulation}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-white text-slate-950 text-xs font-mono font-bold shadow-md cursor-pointer transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Engage Crisis Simulation</span>
            </button>
          )}
        </div>
      </div>

      {/* Scenario Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.values(scenarios).map(sc => {
          const isSelected = sc.id === activeScenarioId;
          const Icon = sc.id === 'blizzard' ? CloudSnow : sc.id === 'generatorFailure' ? Zap : Ship;

          return (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenarioId(sc.id);
                if (crisisScenario) onResetCrisis();
              }}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'glass-panel-glow border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-500/10'
                  : 'glass-panel border-slate-800 hover:border-cyan-500/40 bg-slate-900/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Duration: {sc.duration}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{sc.name}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {sc.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className={isSelected ? 'text-cyan-400 font-bold' : 'text-slate-400'}>
                  {isSelected ? '● ACTIVE SCENARIO' : 'Select Scenario'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Before vs After Impact Comparison Grid */}
      <div className="glass-panel rounded-xl p-5 border border-cyan-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
              {isSimulating ? 'SIMULATION ACTIVE: IMPACT DELTAS APPLIED' : 'BASELINE TELEMETRY PRE-SIMULATION'}
            </span>
            {isSimulating && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </div>
          <span className="text-xs font-mono text-slate-400">
            Target Station: <strong className="text-white">{station.name}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          {/* Temperature */}
          <div className={`p-4 rounded-xl border ${isSimulating && currentScenario.impacts.temperatureDelta !== 0 ? 'bg-rose-950/30 border-rose-500/40' : 'bg-slate-900/60 border-slate-800'}`}>
            <div className="text-[10px] text-slate-400 uppercase">AMBIENT TEMPERATURE</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-white">{simTemp}°C</span>
              {isSimulating && currentScenario.impacts.temperatureDelta !== 0 && (
                <span className="text-rose-400 font-bold">{currentScenario.impacts.temperatureDelta}°C</span>
              )}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Base: {baseTemp}°C</div>
          </div>

          {/* Wind Speed */}
          <div className={`p-4 rounded-xl border ${isSimulating && currentScenario.impacts.windDelta > 0 ? 'bg-amber-950/30 border-amber-500/40' : 'bg-slate-900/60 border-slate-800'}`}>
            <div className="text-[10px] text-slate-400 uppercase">WIND GUST VELOCITY</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-cyan-300">{simWind} km/h</span>
              {isSimulating && currentScenario.impacts.windDelta > 0 && (
                <span className="text-amber-400 font-bold">+{currentScenario.impacts.windDelta}</span>
              )}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Base: {baseWind} km/h</div>
          </div>

          {/* Power Generation */}
          <div className={`p-4 rounded-xl border ${isSimulating ? 'bg-cyan-950/30 border-cyan-500/40' : 'bg-slate-900/60 border-slate-800'}`}>
            <div className="text-[10px] text-slate-400 uppercase">GENERATION OUTPUT</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-white">{simPower} kW</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Base: {basePower} kW</div>
          </div>

          {/* Health Score */}
          <div className={`p-4 rounded-xl border ${isSimulating && simHealth < baseHealth ? 'bg-rose-950/30 border-rose-500/40' : 'bg-slate-900/60 border-slate-800'}`}>
            <div className="text-[10px] text-slate-400 uppercase">STATION HEALTH SCORE</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`text-2xl font-black ${simHealth < 75 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {simHealth}/100
              </span>
              {isSimulating && (
                <span className="text-rose-400 font-bold">{currentScenario.impacts.healthScoreImpact} pts</span>
              )}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Base: {baseHealth}/100</div>
          </div>
        </div>
      </div>

      {/* Automated Contingency Protocol Checklist */}
      <div className="glass-panel rounded-xl p-5 border border-cyan-500/20 space-y-3">
        <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>AUTOMATED DISASTER CONTINGENCY PROTOCOL EXECUTION</span>
        </h3>

        <div className="space-y-2">
          {currentScenario.contingencySteps.map((step, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border flex items-center justify-between text-xs font-mono ${
                isSimulating ? 'bg-cyan-950/40 border-cyan-500/30 text-white' : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-cyan-400">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
              <span className={`text-[10px] font-bold uppercase ${isSimulating ? 'text-emerald-400' : 'text-slate-500'}`}>
                {isSimulating ? 'EXECUTING...' : 'STANDBY'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
