import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Box,
  Zap,
  CloudSnow,
  Ship,
  Boxes,
  Wrench,
  Cpu,
  BarChart3,
  Sliders,
  AlertTriangle,
  Settings,
  Building2,
  Compass,
  Radio
} from 'lucide-react';
import { ALERTS_LIST } from '../data/mockData';

export default function Sidebar({ currentStationId, isOpen, onClose, alerts = ALERTS_LIST }) {
  const location = useLocation();

  const unacknowledgedCritical = alerts.filter(a => !a.acknowledged && a.severity === 'critical').length;
  const unacknowledgedTotal = alerts.filter(a => !a.acknowledged).length;

  const navSections = [
    {
      title: 'COMMAND & CONTROL',
      items: [
        { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
        { path: '/maitri', label: 'Maitri Digital Twin', icon: Box, badge: 'Hero' },
        { path: '/bharati', label: 'Bharati Digital Twin', icon: Building2 }
      ]
    },
    {
      title: 'STATION OPERATIONS',
      items: [
        { path: '/energy', label: 'Energy & Microgrid', icon: Zap },
        { path: '/environment', label: 'Environment & Climate', icon: CloudSnow },
        { path: '/equipment', label: 'Equipment Health', icon: Wrench },
        { path: '/infrastructure', label: 'Infrastructure Map', icon: Compass }
      ]
    },
    {
      title: 'SUPPLY & INTELLIGENCE',
      items: [
        { path: '/logistics', label: 'Expedition Logistics', icon: Ship },
        { path: '/inventory', label: 'Consumables & Spares', icon: Boxes },
        { path: '/maintenance', label: 'AI Predictive Maint.', icon: Cpu, badge: 'AI' },
        { path: '/analytics', label: 'Analytics & Trends', icon: BarChart3 },
        { path: '/simulation', label: 'What-If Simulation', icon: Sliders, badge: 'Sim' }
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        {
          path: '/alerts',
          label: 'Active Alerts',
          icon: AlertTriangle,
          alertCount: unacknowledgedTotal,
          criticalCount: unacknowledgedCritical
        },
        { path: '/settings', label: 'Settings & Sat-Link', icon: Settings }
      ]
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-14 bottom-0 lg:bottom-auto left-0 z-40 w-64 lg:h-[calc(100vh-3.5rem)] shrink-0 glass-panel border-r border-cyan-500/20 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[10px] font-mono font-bold tracking-wider text-cyan-400/80 uppercase">
                {section.title}
              </div>

              <div className="space-y-0.5 pt-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={`relative flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-400/30 shadow-sm shadow-cyan-500/10'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/40 border border-transparent'
                      }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                      )}

                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>

                      {/* Badges */}
                      {item.badge && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-cyan-950/80 border border-cyan-400/40 text-cyan-300">
                          {item.badge}
                        </span>
                      )}

                      {/* Alert notification counters */}
                      {item.alertCount !== undefined && item.alertCount > 0 && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                          item.criticalCount > 0
                            ? 'bg-rose-950/80 text-rose-300 border border-rose-500/50 pulse-critical'
                            : 'bg-amber-950/80 text-amber-300 border border-amber-500/50'
                        }`}>
                          {item.alertCount}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Footer */}
        <div className="p-3 border-t border-cyan-500/15 bg-slate-950/40">
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-cyan-500/15 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-slate-200">ISEA 44th Expedition</div>
              <div className="text-[10px] text-cyan-400 font-mono">Telemetry sync: Active</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </aside>
    </>
  );
}
