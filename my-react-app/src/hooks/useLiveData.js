// NCPOR Antarctic Digital Twin - Enhanced Live Data Simulation Hook
// Periodically jitters telemetry values (temperature, wind, power, fuel, etc.)
// and dynamically incorporates active crisis scenarios (blizzard, generator failure, supply delay)
// across the entire application in real time.

import { useState, useEffect } from 'react';
import { STATIONS } from '../data/mockData';

export function useLiveData(stationId = 'maitri', crisisScenario = null) {
  const [stationData, setStationData] = useState(() => {
    return JSON.parse(JSON.stringify(STATIONS[stationId] || STATIONS.maitri));
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLive, setIsLive] = useState(true);
  const [settingsVersion, setSettingsVersion] = useState(0);

  // Listen to custom settings update events for instant reactivity without page reload
  useEffect(() => {
    const handleSettingsUpdate = () => {
      setSettingsVersion(v => v + 1);
    };
    window.addEventListener('ncpor-settings-changed', handleSettingsUpdate);
    return () => window.removeEventListener('ncpor-settings-changed', handleSettingsUpdate);
  }, []);

  // Sync when stationId or crisisScenario changes
  useEffect(() => {
    if (STATIONS[stationId]) {
      const baseStation = JSON.parse(JSON.stringify(STATIONS[stationId]));

      if (crisisScenario && crisisScenario.impacts) {
        const impacts = crisisScenario.impacts;
        baseStation.telemetry.temperature = +(baseStation.telemetry.temperature + (impacts.temperatureDelta || 0)).toFixed(1);
        baseStation.telemetry.feelsLike = +(baseStation.telemetry.feelsLike + (impacts.temperatureDelta * 1.3 || 0)).toFixed(1);
        baseStation.telemetry.windSpeed = Math.max(0, +(baseStation.telemetry.windSpeed + (impacts.windDelta || 0)).toFixed(1));
        baseStation.telemetry.windGust = Math.max(0, +(baseStation.telemetry.windGust + (impacts.windDelta * 1.4 || 0)).toFixed(1));

        if (impacts.solarOutput === 0) {
          baseStation.telemetry.solarShare = 0;
          baseStation.telemetry.powerGeneration = Math.max(50, baseStation.telemetry.powerDemand - 20);
        }

        if (impacts.powerDemandDeltaKw) {
          baseStation.telemetry.powerDemand = Math.max(40, baseStation.telemetry.powerDemand + impacts.powerDemandDeltaKw);
        }

        baseStation.healthScore = Math.max(25, baseStation.healthScore + impacts.healthScoreImpact);

        if (crisisScenario.id === 'generatorFailure') {
          const gen2 = (baseStation.hotspots || []).find(h => h.id.includes('gen-2') || h.id.includes('b-gen-2'));
          if (gen2) {
            gen2.status = 'critical';
            gen2.load = 0;
            gen2.temp = 118;
          }
        }
      }

      setStationData(baseStation);
    }
  }, [stationId, crisisScenario]);

  useEffect(() => {
    const lowBandwidth = localStorage.getItem('ncpor_low_bandwidth') === 'true';
    const savedRate = parseInt(localStorage.getItem('ncpor_refresh_rate') || '2500', 10);
    const intervalTime = lowBandwidth ? 6000 : savedRate;

    if (!isLive) return;

    const timer = setInterval(() => {
      setStationData(prev => {
        if (!prev || !prev.telemetry) return prev;

        const base = STATIONS[stationId] || STATIONS.maitri;
        const impacts = (crisisScenario && crisisScenario.impacts) ? crisisScenario.impacts : {};

        // Small random micro-jitters
        const tempJitter = (Math.random() - 0.5) * 0.4;
        const windJitter = (Math.random() - 0.5) * 1.2;
        const powerJitter = (Math.random() - 0.5) * 2.5;
        const latencyJitter = Math.floor((Math.random() - 0.5) * 20);

        const targetTemp = base.telemetry.temperature + (impacts.temperatureDelta || 0);
        const targetWind = base.telemetry.windSpeed + (impacts.windDelta || 0);
        const targetHealth = Math.max(25, base.healthScore + (impacts.healthScoreImpact || 0));

        const newTelemetry = {
          ...prev.telemetry,
          temperature: +(targetTemp + tempJitter).toFixed(1),
          feelsLike: +(targetTemp * 1.3 + tempJitter * 1.2).toFixed(1),
          windSpeed: Math.max(0, +(targetWind + windJitter).toFixed(1)),
          windGust: Math.max(0, +(targetWind * 1.4 + windJitter * 1.4).toFixed(1)),
          powerGeneration: Math.max(50, +(prev.telemetry.powerGeneration + powerJitter).toFixed(1)),
          powerDemand: Math.max(50, +(prev.telemetry.powerDemand + powerJitter * 0.8).toFixed(1)),
          satelliteLatencyMs: Math.max(120, base.telemetry.satelliteLatencyMs + latencyJitter)
        };

        // Micro jitter for hotspot loads
        const newHotspots = (prev.hotspots || []).map(h => {
          if (crisisScenario?.id === 'generatorFailure' && (h.id.includes('gen-2') || h.id.includes('b-gen-2'))) {
            return { ...h, load: 0, status: 'critical', temp: 118 };
          }
          const loadJitter = (Math.random() - 0.5) * 1.5;
          const tempJitterH = (Math.random() - 0.5) * 0.3;
          return {
            ...h,
            load: Math.min(100, Math.max(0, Math.round(h.load + loadJitter))),
            temp: h.temp ? +(h.temp + tempJitterH).toFixed(1) : undefined
          };
        });

        return {
          ...prev,
          healthScore: targetHealth,
          telemetry: newTelemetry,
          hotspots: newHotspots
        };
      });

      setLastUpdated(new Date());
    }, intervalTime);

    return () => clearInterval(timer);
  }, [stationId, isLive, crisisScenario, settingsVersion]);

  const togglePause = () => setIsLive(prev => !prev);

  return {
    stationData,
    lastUpdated,
    isLive,
    togglePause
  };
}
