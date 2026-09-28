import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { PageLoader } from './components/LoadingSkeleton';
import { ToastProvider, useToast } from './context/ToastContext';
import { useLiveData } from './hooks/useLiveData';
import { ALERTS_LIST } from './data/mockData';

// Eagerly loaded pages (entry points)
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Lazy-loaded pages for code splitting
const Maitri = lazy(() => import('./pages/Maitri'));
const Bharati = lazy(() => import('./pages/Bharati'));
const Infrastructure = lazy(() => import('./pages/Infrastructure'));
const Energy = lazy(() => import('./pages/Energy'));
const Environment = lazy(() => import('./pages/Environment'));
const Equipment = lazy(() => import('./pages/Equipment'));
const Logistics = lazy(() => import('./pages/Logistics'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Alerts = lazy(() => import('./pages/Alerts'));
const Maintenance = lazy(() => import('./pages/Maintenance'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Simulation = lazy(() => import('./pages/Simulation'));
const Settings = lazy(() => import('./pages/Settings'));


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
  const { addToast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const handleAcknowledgeAlertWithToast = (alertId) => {
    const target = alerts.find(a => a.id === alertId);
    if (location.pathname !== '/alerts') {
      addToast({
        title: `Incident ${alertId} Acknowledged`,
        message: target ? target.title : 'Incident marked acknowledged by Command HQ operator.',
        type: 'info',
        duration: 4000
      });
    }
    if (onAcknowledgeAlert) onAcknowledgeAlert(alertId);
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  // If on login page, don't show the dashboard shell
  if (location.pathname === '/login') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="login"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <Routes location={location}>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
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

        <main className="flex-1 min-w-0 pt-6 sm:pt-8 pb-16 px-5 sm:px-8 lg:px-10 polar-grid min-h-[calc(100vh-3.5rem)] overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname === '/' ? '/dashboard' : location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="w-full page-transition-container"
              >
                <Suspense fallback={<PageLoader />}>
                <Routes location={location}>
                  <Route
                    path="/"
                element={
                  <Dashboard
                    currentStationId={currentStationId}
                    stationData={stationData}
                    lastUpdated={lastUpdated}
                    onSelectStation={onSelectStation}
                    alerts={alerts}
                    onAcknowledgeAlert={handleAcknowledgeAlertWithToast}
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
                    onAcknowledgeAlert={handleAcknowledgeAlertWithToast}
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
            </Suspense>
          </motion.div>
        </AnimatePresence>
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
    <ToastProvider>
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
    </ToastProvider>
  );
}
