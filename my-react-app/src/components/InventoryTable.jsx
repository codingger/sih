import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle2, Filter } from 'lucide-react';

export default function InventoryTable({ items = [] }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', ...new Set(items.map(i => i.category))];

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.location.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search stores, spares, fuel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Category Filters */}
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

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-cyan-500/20 glass-panel">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-cyan-500/20 bg-slate-900/80 text-cyan-400 text-[10px] uppercase tracking-wider">
              <th className="py-3 px-4">Item Name / Stock ID</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Current Stock</th>
              <th className="py-3 px-4">Burn Rate</th>
              <th className="py-3 px-4">Days Remaining</th>
              <th className="py-3 px-4">Storage Location</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-slate-400">
                  No inventory items match your filter criteria.
                </td>
              </tr>
            ) : (
              filteredItems.map(item => {
                const isCritical = item.status === 'critical' || item.daysRemaining < 30;
                const isWarning = item.status === 'warning' || (item.daysRemaining >= 30 && item.daysRemaining < 60);

                return (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-sans font-semibold text-white">
                      <div>{item.name}</div>
                      <div className="text-[10px] text-cyan-400 font-mono">{item.id}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {item.category}
                    </td>
                    <td className="py-3 px-4 font-bold text-white">
                      {item.stock.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">{item.unit}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {item.burnRateDaily} {item.unit}/day
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        isCritical
                          ? 'bg-rose-950/80 text-rose-300 border-rose-500/50 pulse-critical'
                          : isWarning
                          ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                          : 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40'
                      }`}>
                        {item.daysRemaining} Days
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {item.location}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`uppercase text-[10px] font-bold ${
                        isCritical ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
