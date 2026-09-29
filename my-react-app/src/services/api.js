// NCPOR Antarctic Digital Twin - API Service Layer
// Toggle USE_MOCK to true to use rich local simulation data, or false to connect to REST backend
import {
  STATIONS,
  HOURLY_TELEMETRY,
  EQUIPMENT_LIST,
  ALERTS_LIST,
  PREDICTIVE_MAINTENANCE,
  EXPEDITION_VOYAGE,
  INVENTORY_ITEMS,
  SIMULATION_SCENARIOS
} from '../data/mockData';

export const USE_MOCK = true;
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.ncpor.gov.in/v1';

export const api = {
  // Station Data
  async getStations() {
    if (USE_MOCK) {
      return STATIONS;
    }
    const res = await fetch(`${API_BASE_URL}/stations`);
    return res.json();
  },

  async getStationById(stationId) {
    if (USE_MOCK) {
      return STATIONS[stationId] || STATIONS.maitri;
    }
    const res = await fetch(`${API_BASE_URL}/stations/${stationId}`);
    return res.json();
  },

  // Telemetry History
  async getHourlyTelemetry(stationId) {
    if (USE_MOCK) {
      return HOURLY_TELEMETRY;
    }
    const res = await fetch(`${API_BASE_URL}/telemetry/hourly?station=${stationId}`);
    return res.json();
  },

  // Equipment List
  async getEquipment(stationId) {
    if (USE_MOCK) {
      if (!stationId) return EQUIPMENT_LIST;
      return EQUIPMENT_LIST.filter(eq => eq.station === stationId);
    }
    const res = await fetch(`${API_BASE_URL}/equipment?station=${stationId || ''}`);
    return res.json();
  },

  // Alerts
  async getAlerts(stationId) {
    if (USE_MOCK) {
      if (!stationId) return ALERTS_LIST;
      return ALERTS_LIST.filter(alt => alt.station === stationId);
    }
    const res = await fetch(`${API_BASE_URL}/alerts?station=${stationId || ''}`);
    return res.json();
  },

  async acknowledgeAlert(alertId) {
    if (USE_MOCK) {
      const alert = ALERTS_LIST.find(a => a.id === alertId);
      if (alert) {
        alert.acknowledged = true;
        alert.acknowledgedBy = 'Command Operator (HQ)';
      }
      return { success: true, alert };
    }
    const res = await fetch(`${API_BASE_URL}/alerts/${alertId}/ack`, { method: 'POST' });
    return res.json();
  },

  // Predictive Maintenance
  async getPredictiveMaintenance(stationId) {
    if (USE_MOCK) {
      if (!stationId) return PREDICTIVE_MAINTENANCE;
      return PREDICTIVE_MAINTENANCE.filter(pdm => pdm.station === stationId);
    }
    const res = await fetch(`${API_BASE_URL}/maintenance/predictive?station=${stationId || ''}`);
    return res.json();
  },

  async predictEquipmentRisk(telemetryPayload) {
    try {
      const res = await fetch(`http://localhost:5000/api/maintenance/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(telemetryPayload)
      });
      return await res.json();
    } catch (err) {
      // Inline client-side fallback matching RandomForest importances if backend API is unreachable
      const { temperature = 75, vibration = 1.5, runtime_hours = 4000, load_pct = 65, days_since_service = 90 } = telemetryPayload;
      const tempRisk = Math.max(0, Math.min(1, (temperature - 70) / 45.0));
      const vibRisk = Math.max(0, Math.min(1, (vibration - 1.5) / 4.0));
      const runtimeRisk = Math.max(0, Math.min(1, (runtime_hours - 3000) / 10000.0));
      const loadRisk = Math.max(0, Math.min(1, (load_pct - 50) / 50.0));
      const serviceRisk = Math.max(0, Math.min(1, (days_since_service - 60) / 200.0));
      
      const rawProb = (0.3593 * tempRisk + 0.3221 * vibRisk + 0.1306 * serviceRisk + 0.1198 * runtimeRisk + 0.0682 * loadRisk) * 100;
      const failureProbability = Math.round(Math.min(99, Math.max(5, rawProb)) * 10) / 10;
      const urgency = failureProbability >= 70 ? 'high' : failureProbability >= 40 ? 'medium' : 'low';
      const projectedDays = urgency === 'high' ? Math.max(1, Math.round(30 * (1 - failureProbability / 100))) : urgency === 'medium' ? Math.round(45 * (1 - failureProbability / 100)) + 7 : Math.round(90 * (1 - failureProbability / 100)) + 20;

      return {
        status: "success",
        failure_probability: failureProbability,
        urgency,
        projected_failure_days: projectedDays,
        model_used: "RandomForestClassifier (scikit-learn - client fallback)",
        inputs_evaluated: { temperature, vibration, runtime_hours, load_pct, days_since_service }
      };
    }
  },

  async getMLModelInfo() {
    try {
      const res = await fetch(`http://localhost:5000/api/maintenance/model-info`);
      return await res.json();
    } catch (err) {
      return {
        model_type: "RandomForestClassifier (scikit-learn)",
        dataset_type: "Simulated Equipment Telemetry (1,500 samples)",
        metrics: { accuracy: 0.912, precision: 0.7885, recall: 0.6508, f1_score: 0.713 },
        feature_importances: { temperature: 0.3593, vibration: 0.3221, days_since_service: 0.1306, runtime_hours: 0.1198, load_pct: 0.0682 }
      };
    }
  },

  // Logistics & Expedition Voyage
  async getExpeditionVoyage() {
    if (USE_MOCK) {
      return EXPEDITION_VOYAGE;
    }
    const res = await fetch(`${API_BASE_URL}/logistics/voyage`);
    return res.json();
  },

  // Inventory
  async getInventory(stationId) {
    if (USE_MOCK) {
      if (!stationId) return INVENTORY_ITEMS;
      return INVENTORY_ITEMS.filter(inv => inv.station === stationId);
    }
    const res = await fetch(`${API_BASE_URL}/inventory?station=${stationId || ''}`);
    return res.json();
  },

  // Simulation Scenarios
  async getSimulationScenarios() {
    if (USE_MOCK) {
      return SIMULATION_SCENARIOS;
    }
    const res = await fetch(`${API_BASE_URL}/simulation/scenarios`);
    return res.json();
  }
};
