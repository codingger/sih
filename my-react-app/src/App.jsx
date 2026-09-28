import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useLiveData } from './hooks/useLiveData';

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

function Layout({ currentStationId, onSelectStation, stationData, lastUpdated }) {
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
      />

      <div className="flex flex-1">
        <Sidebar
          currentStationId={currentStationId}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
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
                element={<Alerts currentStationId={currentStationId} />}
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

  const { stationData, lastUpdated, isLive } = useLiveData(currentStationId);

  const handleSelectStation = (id) => {
    setCurrentStationId(id);
    localStorage.setItem('ncpor_station', id);
  };

  return (
    <BrowserRouter>
      <Layout
        currentStationId={currentStationId}
        onSelectStation={handleSelectStation}
        stationData={stationData}
        lastUpdated={lastUpdated}
      />
    </BrowserRouter>
  );
}
