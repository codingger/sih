import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useLiveData } from './hooks/useLiveData';
import { ALERTS_LIST } from './data/mockData';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Maitri from './pages/Maitri';
import Bharati from './pages/Bharati';
import Infrastructure from './pages/Infrastructure';
import Energy from './pages/Energy';
import Environment from './pages/Environment';
import Equipment from './pages/Equipment';
import Logistics from './pages/Logistics';
import Inventory from './pages/Inventory';
import Alerts from './pages/Alerts';
import Maintenance from './pages/Maintenance';
import Analytics from './pages/Analytics';
import Simulation from './pages/Simulation';
import Settings from './pages/Settings';

function Layout({
  currentStationId,
  onSelectStation,
  stationData,
  lastUpdated,
  alerts,
  onAcknowledgeAlert,
  crisisScenario,
  onTriggerCrisis,
  onResetCrisis
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // If on login page, don't show the dashboard shell
  if (location.pathname === '/login') {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar
        currentStationId={currentStationId}
        onSelectStation={onSelectStation}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        crisisScenario={crisisScenario}
        onResetCrisis={onResetCrisis}
      />

      <div className="flex flex-1">
        <Sidebar
          currentStationId={currentStationId}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          alerts={alerts}
        />

        <main className="flex-1 lg:pl-64 pt-4 pb-12 px-4 sm:px-6 polar-grid min-h-[calc(100vh-3.5rem)] overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    currentStationId={currentStationId}
                    stationData={stationData}
                    lastUpdated={lastUpdated}
                    onSelectStation={onSelectStation}
                    alerts={alerts}
                    onAcknowledgeAlert={onAcknowledgeAlert}
                  />
                }
              />
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    currentStationId={currentStationId}
                    stationData={stationData}
                    lastUpdated={lastUpdated}
                    onSelectStation={onSelectStation}
                    alerts={alerts}
                    onAcknowledgeAlert={onAcknowledgeAlert}
                  />
                }
              />
              <Route
                path="/maitri"
                element={<Maitri stationData={stationData} />}
              />
              <Route
                path="/bharati"
                element={<Bharati stationData={stationData} />}
              />
              <Route
                path="/infrastructure"
                element={
                  <Infrastructure
                    currentStationId={currentStationId}
                    stationData={stationData}
                    onSelectStation={onSelectStation}
                  />
                }
              />
              <Route
                path="/energy"
                element={
                  <Energy
                    currentStationId={currentStationId}
                    stationData={stationData}
                  />
                }
              />
              <Route
                path="/environment"
                element={
                  <Environment
                    currentStationId={currentStationId}
                    stationData={stationData}
                  />
                }
              />
              <Route
                path="/equipment"
                element={<Equipment currentStationId={currentStationId} />}
              />
              <Route path="/logistics" element={<Logistics />} />
              <Route
                path="/inventory"
                element={<Inventory currentStationId={currentStationId} />}
              />
              <Route
                path="/alerts"
                element={
                  <Alerts
                    currentStationId={currentStationId}
                    alerts={alerts}
                    onAcknowledgeAlert={onAcknowledgeAlert}
                  />
                }
              />
              <Route
                path="/maintenance"
                element={<Maintenance currentStationId={currentStationId} />}
              />
              <Route
                path="/analytics"
                element={<Analytics currentStationId={currentStationId} />}
              />
              <Route
                path="/simulation"
                element={
                  <Simulation
                    currentStationId={currentStationId}
                    stationData={stationData}
                    crisisScenario={crisisScenario}
                    onTriggerCrisis={onTriggerCrisis}
                    onResetCrisis={onResetCrisis}
                  />
                }
              />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [currentStationId, setCurrentStationId] = useState(() => {
    return localStorage.getItem('ncpor_station') || 'maitri';
  });
  const [crisisScenario, setCrisisScenario] = useState(null);
  const [alerts, setAlerts] = useState(() => ALERTS_LIST);

  const { stationData, lastUpdated, isLive } = useLiveData(currentStationId, crisisScenario);

  const handleSelectStation = (id) => {
    setCurrentStationId(id);
    localStorage.setItem('ncpor_station', id);
  };

  const handleAcknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, acknowledged: true, acknowledgedBy: 'Command HQ' } : a));
  };

  return (
    <BrowserRouter>
      <Layout
        currentStationId={currentStationId}
        onSelectStation={handleSelectStation}
        stationData={stationData}
        lastUpdated={lastUpdated}
        alerts={alerts}
        onAcknowledgeAlert={handleAcknowledgeAlert}
        crisisScenario={crisisScenario}
        onTriggerCrisis={(sc) => setCrisisScenario(sc)}
        onResetCrisis={() => setCrisisScenario(null)}
      />
    </BrowserRouter>
  );
}
