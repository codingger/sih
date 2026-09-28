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
