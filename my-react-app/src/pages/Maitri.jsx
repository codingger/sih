import React from 'react';
import { useNavigate } from 'react-router-dom';
import DigitalTwin from '../components/DigitalTwin';
import StatCard from '../components/StatCard';
import EnergyChart from '../components/EnergyChart';
import { Thermometer, Zap, Fuel, Activity, Waves, ArrowRight, AlertTriangle } from 'lucide-react';
import { STATIONS, HOURLY_TELEMETRY } from '../data/mockData';

export default function Maitri({ stationData, onSelectStation }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (onSelectStation) onSelectStation('maitri');
  }, [onSelectStation]);
  const station = (stationData && stationData.id === 'maitri') ? stationData : STATIONS.maitri;

  return (
    <div className="space-y-6">
      {/* Station Breadcrumbs & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
            <span>STATIONS</span>
            <span>/</span>
            <span>MAITRI BASE (SCHIRMACHER OASIS)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Maitri Station Digital Twin
          </h1>
          <p className="text-xs text-slate-400">
            Coordinates: 70°45'57" S, 11°44'09" E • Altitude: 117m • Established: 1989
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            ATTENTION: GEN #02 VIBRATION
          </span>
        </div>
      </div>

      {/* Hero Interactive Digital Twin Screen */}
      <DigitalTwin stationData={station} stationId="maitri" />

      {/* Subsystem Telemetry Quick Cards (Logically Linked) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Lake Priyadarshini Intake"
          value="4.2"
          unit="°C"
          icon={Waves}
          trend="Freeze Trace On"
          trendDirection="neutral"
          status="warning"
          subtext="Potable Water Line Heated • Click for Water Inventory"
          onClick={() => navigate('/inventory')}
        />
        <StatCard
          title="Generator #01 (Primary)"
          value="68"
          unit="% Load"
          icon={Zap}
          trend="82°C Bearing"
          trendDirection="neutral"
          status="normal"
          subtext="1500 RPM Nominal • Click for Equipment"
          onClick={() => navigate('/equipment')}
        />
        <StatCard
          title="Generator #02 (Secondary)"
          value="94"
          unit="% Load"
          icon={AlertTriangle}
          trend="104°C Critical"
          trendDirection="down"
          status="critical"
          subtext="Vibration 4.8 mm/s • Click for Diagnostics"
          onClick={() => navigate('/equipment')}
        />
        <StatCard
          title="BESS Battery Storage"
          value="82"
          unit="% SOC"
          icon={Activity}
          trend="240 kWh Available"
          trendDirection="up"
          status="normal"
          subtext="Peak Shaving Ready • Click for Energy"
          onClick={() => navigate('/energy')}
        />
      </div>

      {/* Energy & Load Profile */}
      <div className="glass-panel rounded-xl p-5 border border-cyan-500/20">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-bold">
              MAITRI ENERGY DISPATCH
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              Hourly Generation vs. Habitat Consumption
            </h3>
          </div>
          <button
            onClick={() => navigate('/energy')}
            className="text-xs font-mono text-cyan-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Analyze Microgrid</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <EnergyChart data={HOURLY_TELEMETRY} stationId="maitri" />
      </div>
    </div>
  );
}
