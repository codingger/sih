import React from 'react';
import InventoryTable from '../components/InventoryTable';
import StatCard from '../components/StatCard';
import { Fuel, Droplets, Wrench, Utensils, AlertTriangle, Boxes } from 'lucide-react';
import { INVENTORY_ITEMS, STATIONS } from '../data/mockData';

export default function Inventory({ currentStationId }) {
  const station = STATIONS[currentStationId] || STATIONS.maitri;
  const items = INVENTORY_ITEMS.filter(i => i.station === currentStationId);

  const criticalCount = items.filter(i => i.status === 'critical' || i.daysRemaining < 30).length;
  const warningCount = items.filter(i => i.status === 'warning' || (i.daysRemaining >= 30 && i.daysRemaining < 60)).length;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
            STORES & CONSUMABLES • {station.name.toUpperCase()}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Inventory & Critical Stores
          </h1>
          <p className="text-xs text-slate-400">
            Jet A-1 fuel bunker, reverse osmosis filters, mechanical spares, and winter survival rations
          </p>
        </div>

        <div className="flex items-center gap-2">
          {criticalCount > 0 && (
            <span className="px-3 py-1 rounded-lg bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-mono font-bold pulse-critical">
              {criticalCount} CRITICAL SPARES DEPLETED
            </span>
          )}
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Jet A-1 Fuel Stores"
          value={station.telemetry.fuelLevel}
          unit="%"
          icon={Fuel}
          trend="-0.8%/day"
          trendDirection="neutral"
          status={station.telemetry.fuelLevel < 50 ? 'warning' : 'normal'}
          subtext={`${station.telemetry.fuelVolumeLiters.toLocaleString()} L in Bunds`}
        />
        <StatCard
          title="Potable Water Cisterns"
          value={station.telemetry.waterReserve}
          unit="%"
          icon={Droplets}
          trend="+2.4%/day"
          trendDirection="up"
          status="normal"
          subtext={`${station.telemetry.waterLiters.toLocaleString()} Liters Pure Water`}
        />
        <StatCard
          title="Emergency Rations"
          value="216"
          unit="Days"
          icon={Utensils}
          trend="5,400 Packs"
          trendDirection="neutral"
          status="normal"
          subtext="Non-Perishable Sealed Food"
        />
        <StatCard
          title="Spares Replenishment"
          value={criticalCount > 0 ? 'Urgent' : 'Nominal'}
          unit=""
          icon={Wrench}
          trend={criticalCount > 0 ? '1 Kit Left' : 'Balanced'}
          trendDirection={criticalCount > 0 ? 'down' : 'up'}
          status={criticalCount > 0 ? 'critical' : 'normal'}
          subtext="Bearing Kit P-44 Needed"
        />
      </div>

      {/* Main Inventory Table */}
      <InventoryTable items={items} />
    </div>
  );
}
