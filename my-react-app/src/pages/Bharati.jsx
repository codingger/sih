import React from 'react';
import { useNavigate } from 'react-router-dom';
import DigitalTwin from '../components/DigitalTwin';
import StatCard from '../components/StatCard';
import EnergyChart from '../components/EnergyChart';
import { Thermometer, Zap, Fuel, Activity, Wind, Waves, Radio, ArrowRight, ShieldCheck } from 'lucide-react';
import { STATIONS, HOURLY_TELEMETRY } from '../data/mockData';

export default function Bharati({ stationData, onSelectStation }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (onSelectStation) onSelectStation('bharati');
  }, [onSelectStation]);
  const station = (stationData && stationData.id === 'bharati') ? stationData : STATIONS.bharati;

  return (
    <div className="space-y-6">
      {/* Station Breadcrumbs & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
            <span>STATIONS</span>
            <span>/</span>
            <span>BHARATI BASE (LARSEMANN HILLS)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Bharati Station Digital Twin
          </h1>
          <p className="text-xs text-slate-400">
            Coordinates: 69°24'28" S, 76°11'14" E • Altitude: 35m • Established: 2012 (State of the Art)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ALL SYSTEMS 100% NOMINAL
          </span>
        </div>
      </div>

      {/* Hero Interactive Digital Twin Screen */}
      <DigitalTwin stationData={station} stationId="bharati" />

      {/* Subsystem Telemetry Quick Cards (Logically Linked) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Promontory Wind Turbines"
          value="38"
          unit="kW"
          icon={Wind}
          trend="+14% share"
          trendDirection="up"
          status="normal"
          subtext="24 km/h Katabatic Breeze • Click for Energy"
          onClick={() => navigate('/energy')}
        />
        <StatCard
          title="SWRO Desalination Plant"
          value="2.8"
          unit="m³/d"
          icon={Waves}
          trend="120 ppm TDS"
          trendDirection="neutral"
          status="normal"
          subtext="Potable Ocean Conversion • Click for SCADA"
          onClick={() => navigate('/infrastructure')}
        />
        <StatCard
          title="ISRO Remote Sensing Radome"
          value="120"
          unit="Mbps"
          icon={Radio}
          trend="320ms Latency"
          trendDirection="up"
          status="normal"
          subtext="Cartosat-3 Downlink Active • Click for Ground Station"
          onClick={() => navigate('/infrastructure')}
        />
        <StatCard
          title="Fuel Bunker Integrity"
          value="74"
          unit="%"
          icon={Fuel}
          trend="188 Days"
          trendDirection="neutral"
          status="normal"
          subtext="Double-Walled Heated Bund • Click for Inventory"
          onClick={() => navigate('/inventory')}
        />
      </div>

      {/* Energy & Load Profile */}
      <div className="glass-panel rounded-xl p-5 border border-cyan-500/20">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-bold">
              BHARATI MICROGRID DISPATCH
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              Hourly Wind + Solar + Diesel Generation vs. Demand
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
        <EnergyChart data={HOURLY_TELEMETRY} stationId="bharati" />
      </div>
    </div>
  );
}
