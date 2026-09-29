// NCPOR Antarctic Digital Twin - Comprehensive Telemetry & Operational Mock Data
// Station profiles for Maitri (-70.767° S, 11.733° E) and Bharati (-69.407° S, 76.187° E)

export const STATIONS = {
  maitri: {
    id: 'maitri',
    name: 'Maitri Station',
    code: 'IN-MAI',
    established: 1989,
    location: 'Schirmacher Oasis, Queen Maud Land',
    coordinates: { lat: -70.767, lng: 11.733, altitude: '117m a.s.l.' },
    crewCount: 25,
    winteringCrew: 14,
    status: 'ONLINE',
    statusSeverity: 'warning', // Generator #02 warning
    healthScore: 94,
    headlineAlert: 'Generator #02 bearing vibration anomaly detected',
    telemetry: {
      temperature: -32,
      feelsLike: -46,
      humidity: 48,
      windSpeed: 18,
      windDirection: 'ESE (115°)',
      windGust: 32,
      pressure: 986,
      uvIndex: 1.2,
      solarInsolation: 380, // W/m²
      powerGeneration: 182, // kW
      powerDemand: 164, // kW
      fuelLevel: 67, // %
      fuelVolumeLiters: 142000,
      fuelDaysRemaining: 142,
      waterReserve: 91, // %
      waterLiters: 48000,
      batterySOC: 82, // %
      batteryHealth: 95,
      solarShare: 24, // %
      dieselShare: 76,
      satelliteLatencyMs: 540,
      satelliteBandwidthMbps: 48
    },
    hotspots: [
      {
        id: 'gen-1',
        name: 'Generator #01 (Primary)',
        type: 'power',
        status: 'normal',
        x: 35, // percentage
        y: 45,
        load: 68,
        temp: 82,
        vibration: '0.4 mm/s',
        rpm: 1500,
        fuelRate: '22 L/h',
        runtimeHours: 4280,
        description: 'Kirloskar Arctic heavy diesel generator running continuous base load.',
        history: [
          { time: '14:00', value: 66 },
          { time: '16:00', value: 68 },
          { time: '18:00', value: 70 },
          { time: '20:00', value: 68 }
        ],
        action: 'Nominal operation. Next oil sample scheduled in 120 operating hours.'
      },
      {
        id: 'gen-2',
        name: 'Generator #02 (Secondary)',
        type: 'power',
        status: 'critical',
        x: 65,
        y: 65,
        load: 94,
        temp: 104,
        vibration: '4.8 mm/s',
        rpm: 1525,
        fuelRate: '31 L/h',
        runtimeHours: 6120,
        description: 'High bearing temperature spike (104°C) with excessive radial vibration.',
        history: [
          { time: '14:00', value: 82 },
          { time: '16:00', value: 89 },
          { time: '18:00', value: 96 },
          { time: '20:00', value: 104 }
        ],
        action: 'Recommended action: Shed non-essential lab loads and transfer auxiliary circuits to Battery BESS Bank immediately.'
      },
      {
        id: 'heating',
        name: 'Central Hydronic Heating Plant',
        type: 'hvac',
        status: 'normal',
        x: 50,
        y: 30,
        load: 72,
        temp: 64,
        flowRate: '42 L/min',
        glycolLevel: '98%',
        runtimeHours: 12400,
        description: 'Closed-loop heat recovery boiler utilizing genset jacket heat to warm living modules.',
        history: [
          { time: '14:00', value: 62 },
          { time: '16:00', value: 63 },
          { time: '18:00', value: 64 },
          { time: '20:00', value: 64 }
        ],
        action: 'System balanced. Habitat internal ambient temperature maintained at +19.5°C.'
      },
      {
        id: 'water',
        name: 'Lake Priyadarshini Pumping Line',
        type: 'water',
        status: 'warning',
        x: 75,
        y: 35,
        load: 55,
        temp: 4.2,
        flowRate: '18 L/min',
        traceHeatingPower: '8.4 kW',
        runtimeHours: 8900,
        description: 'Insulated surface pipeline drawing potable freshwater from sub-ice Lake Priyadarshini.',
        history: [
          { time: '14:00', value: 5.8 },
          { time: '16:00', value: 5.1 },
          { time: '18:00', value: 4.6 },
          { time: '20:00', value: 4.2 }
        ],
        action: 'Warning: Trace heating power increased by 20% to prevent line crystallization at exterior pipe bend 4.'
      },
      {
        id: 'battery',
        name: 'BESS Battery Bank #1',
        type: 'energy',
        status: 'normal',
        x: 28,
        y: 65,
        load: 45,
        soc: 82,
        cellTemp: 21,
        voltage: 402,
        health: 96,
        capacityKwh: 240,
        description: 'LiFePO4 modular energy storage rack buffering solar swings and peak shaving.',
        history: [
          { time: '14:00', value: 86 },
          { time: '16:00', value: 84 },
          { time: '18:00', value: 83 },
          { time: '20:00', value: 82 }
        ],
        action: 'Available for immediate 45 kW discharge burst if Generator #02 is throttled down.'
      },
      {
        id: 'solar',
        name: 'Bifacial Polar Solar Field',
        type: 'energy',
        status: 'normal',
        x: 18,
        y: 20,
        load: 78,
        outputKw: 44,
        efficiency: 91,
        snowCoverage: '4%',
        runtimeHours: 3400,
        description: 'Dual-sided ground-mounted photovoltaic panels capturing direct sunlight and glacial albedo.',
        history: [
          { time: '14:00', value: 52 },
          { time: '16:00', value: 48 },
          { time: '18:00', value: 46 },
          { time: '20:00', value: 44 }
        ],
        action: 'Albedo gain currently adding +18% output over standard rating. Snow clearing robot standby.'
      },
      {
        id: 'fuel',
        name: 'Arctic Jet A-1 Bulk Tank Farm',
        type: 'fuel',
        status: 'normal',
        x: 82,
        y: 75,
        load: 67,
        capacityLiters: 210000,
        currentLiters: 142000,
        temp: -12,
        description: 'Heated bunded tank storage containing arctic-grade fuel with anti-gel additives.',
        history: [
          { time: '14:00', value: 67.2 },
          { time: '16:00', value: 67.1 },
          { time: '18:00', value: 67.0 },
          { time: '20:00', value: 67.0 }
        ],
        action: 'Sufficient fuel for 142 days at current 53 L/h average station consumption.'
      },
      {
        id: 'comms',
        name: 'SATCOM Polar Radome & Comms Mast',
        type: 'comms',
        status: 'normal',
        x: 52,
        y: 12,
        load: 62,
        latencyMs: 540,
        rssi: -68,
        snr: '14 dB',
        bandwidthMbps: 48,
        description: 'Heated aerodynamic radome housing high-latitude geostationary and LEO tracking antenna.',
        history: [
          { time: '14:00', value: 520 },
          { time: '16:00', value: 535 },
          { time: '18:00', value: 550 },
          { time: '20:00', value: 540 }
        ],
        action: 'Link margins nominal. Automatic failover to Inmarsat BGAN configured.'
      }
    ]
  },
  bharati: {
    id: 'bharati',
    name: 'Bharati Station',
    code: 'IN-BHA',
    established: 2012,
    location: 'Larsemann Hills, East Antarctica',
    coordinates: { lat: -69.407, lng: 76.187, altitude: '35m a.s.l.' },
    crewCount: 24,
    winteringCrew: 12,
    status: 'ONLINE',
    statusSeverity: 'normal',
    healthScore: 98,
    headlineAlert: 'All primary and life-support systems operating within optimal thresholds',
    telemetry: {
      temperature: -24,
      feelsLike: -36,
      humidity: 62,
      windSpeed: 24,
      windDirection: 'NE (45°)',
      windGust: 42,
      pressure: 994,
      uvIndex: 1.8,
      solarInsolation: 420,
      powerGeneration: 215,
      powerDemand: 188,
      fuelLevel: 74,
      fuelVolumeLiters: 185000,
      fuelDaysRemaining: 188,
      waterReserve: 96,
      waterLiters: 62000,
      batterySOC: 88,
      batteryHealth: 99,
      solarShare: 32,
      dieselShare: 54,
      windShare: 14,
      satelliteLatencyMs: 320,
      satelliteBandwidthMbps: 120
    },
    hotspots: [
      {
        id: 'b-gen-1',
        name: 'MAN Arctic Genset A (Primary)',
        type: 'power',
        status: 'normal',
        x: 38,
        y: 52,
        load: 58,
        temp: 78,
        vibration: '0.3 mm/s',
        rpm: 1500,
        fuelRate: '24 L/h',
        runtimeHours: 2840,
        description: 'High-efficiency turbocharged MAN common rail engine with Tier 4 emission filters.',
        history: [
          { time: '14:00', value: 56 },
          { time: '16:00', value: 58 },
          { time: '18:00', value: 59 },
          { time: '20:00', value: 58 }
        ],
        action: 'Running in microgrid sync with coastal wind turbines and solar array.'
      },
      {
        id: 'b-gen-2',
        name: 'MAN Arctic Genset B (Standby)',
        type: 'power',
        status: 'normal',
        x: 62,
        y: 52,
        load: 0,
        temp: 45,
        vibration: '0.0 mm/s',
        rpm: 0,
        fuelRate: '0 L/h',
        runtimeHours: 1950,
        description: 'Auto-start standby unit with pre-heated block and oil circulating pump.',
        history: [
          { time: '14:00', value: 0 },
          { time: '16:00', value: 0 },
          { time: '18:00', value: 0 },
          { time: '20:00', value: 0 }
        ],
        action: 'Standby readiness verified. Automatic transfer switch active.'
      },
      {
        id: 'b-wind',
        name: 'Larsemann Promontory Wind Turbines',
        type: 'energy',
        status: 'normal',
        x: 18,
        y: 35,
        load: 75,
        outputKw: 38,
        windSpeed: 24,
        bladeDeice: 'Active',
        runtimeHours: 5200,
        description: 'Direct-drive arctic wind turbines engineered for katabatic gusts up to 240 km/h.',
        history: [
          { time: '14:00', value: 34 },
          { time: '16:00', value: 36 },
          { time: '18:00', value: 40 },
          { time: '20:00', value: 38 }
        ],
        action: 'Supplying 14% of instantaneous station power. Blades de-iced and vibration nominal.'
      },
      {
        id: 'b-solar',
        name: 'Rooftop & Permafrost PV Array',
        type: 'energy',
        status: 'normal',
        x: 50,
        y: 22,
        load: 82,
        outputKw: 68,
        efficiency: 94,
        description: 'Roof integrated monocrystalline panels with heated tilt actuation.',
        history: [
          { time: '14:00', value: 72 },
          { time: '16:00', value: 70 },
          { time: '18:00', value: 68 },
          { time: '20:00', value: 68 }
        ],
        action: 'Max Power Point Tracking (MPPT) operating at 99.2% tracking accuracy.'
      },
      {
        id: 'b-water',
        name: 'SWRO Sea Water Desalination Unit',
        type: 'water',
        status: 'normal',
        x: 82,
        y: 42,
        load: 64,
        temp: 8.5,
        flowRate: '32 L/min',
        salinityPpm: 120,
        outputM3Day: 2.8,
        runtimeHours: 6400,
        description: 'Coastal seawater reverse osmosis plant producing high-purity water.',
        history: [
          { time: '14:00', value: 32 },
          { time: '16:00', value: 32 },
          { time: '18:00', value: 31 },
          { time: '20:00', value: 32 }
        ],
        action: 'Reservoirs at 96% capacity (62,000 Liters). Permeate quality 120 ppm TDS.'
      },
      {
        id: 'b-battery',
        name: 'Hybrid Flow & Li-ion Microgrid BESS',
        type: 'energy',
        status: 'normal',
        x: 32,
        y: 72,
        load: 50,
        soc: 88,
        cellTemp: 22,
        capacityKwh: 360,
        description: 'High-density hybrid storage providing frequency regulation and uninterrupted power.',
        history: [
          { time: '14:00', value: 90 },
          { time: '16:00', value: 89 },
          { time: '18:00', value: 88 },
          { time: '20:00', value: 88 }
        ],
        action: 'Grid stability 50.02 Hz. Ready for microgrid islanding.'
      },
      {
        id: 'b-fuel',
        name: 'Underground Double-Walled Fuel Cells',
        type: 'fuel',
        status: 'normal',
        x: 72,
        y: 74,
        load: 74,
        capacityLiters: 250000,
        currentLiters: 185000,
        temp: -8,
        description: 'Thermally isolated fuel bunker with continuous leak-detection vacuum jacket.',
        history: [
          { time: '14:00', value: 74.2 },
          { time: '16:00', value: 74.1 },
          { time: '18:00', value: 74.0 },
          { time: '20:00', value: 74.0 }
        ],
        action: '188 days fuel supply remaining. Leak detection sensors 100% healthy.'
      },
      {
        id: 'b-comms',
        name: 'Deep Space & Earth Observation Ground Station',
        type: 'comms',
        status: 'normal',
        x: 50,
        y: 8,
        load: 84,
        latencyMs: 320,
        bandwidthMbps: 120,
        description: 'ISRO remote sensing downlink terminal receiving Indian polar satellite telemetry.',
        history: [
          { time: '14:00', value: 310 },
          { time: '16:00', value: 315 },
          { time: '18:00', value: 320 },
          { time: '20:00', value: 320 }
        ],
        action: 'Telemetry dump from Cartosat-3 completed. Link quality 99.98% reliability.'
      }
    ]
  }
};

// 24-Hour hourly telemetry history for Charts
export const HOURLY_TELEMETRY = [
  { time: '00:00', maitriTemp: -36, bharatiTemp: -28, windMaitri: 26, windBharati: 32, maitriSolar: 0, maitriDiesel: 154, maitriDemand: 152, bharatiSolar: 0, bharatiDiesel: 140, bharatiDemand: 168 },
  { time: '02:00', maitriTemp: -37, bharatiTemp: -29, windMaitri: 28, windBharati: 34, maitriSolar: 0, maitriDiesel: 158, maitriDemand: 156, bharatiSolar: 0, bharatiDiesel: 145, bharatiDemand: 172 },
  { time: '04:00', maitriTemp: -38, bharatiTemp: -30, windMaitri: 24, windBharati: 30, maitriSolar: 2, maitriDiesel: 158, maitriDemand: 158, bharatiSolar: 4, bharatiDiesel: 146, bharatiDemand: 175 },
  { time: '06:00', maitriTemp: -36, bharatiTemp: -28, windMaitri: 22, windBharati: 28, maitriSolar: 16, maitriDiesel: 148, maitriDemand: 162, bharatiSolar: 24, bharatiDiesel: 138, bharatiDemand: 180 },
  { time: '08:00', maitriTemp: -33, bharatiTemp: -26, windMaitri: 19, windBharati: 25, maitriSolar: 34, maitriDiesel: 135, maitriDemand: 168, bharatiSolar: 52, bharatiDiesel: 122, bharatiDemand: 186 },
  { time: '10:00', maitriTemp: -31, bharatiTemp: -24, windMaitri: 17, windBharati: 23, maitriSolar: 48, maitriDiesel: 124, maitriDemand: 170, bharatiSolar: 72, bharatiDiesel: 108, bharatiDemand: 192 },
  { time: '12:00', maitriTemp: -30, bharatiTemp: -22, windMaitri: 16, windBharati: 21, maitriSolar: 54, maitriDiesel: 118, maitriDemand: 172, bharatiSolar: 84, bharatiDiesel: 98, bharatiDemand: 194 },
  { time: '14:00', maitriTemp: -31, bharatiTemp: -23, windMaitri: 18, windBharati: 22, maitriSolar: 52, maitriDiesel: 120, maitriDemand: 170, bharatiSolar: 80, bharatiDiesel: 102, bharatiDemand: 190 },
  { time: '16:00', maitriTemp: -32, bharatiTemp: -24, windMaitri: 18, windBharati: 24, maitriSolar: 44, maitriDiesel: 126, maitriDemand: 168, bharatiSolar: 68, bharatiDiesel: 112, bharatiDemand: 188 },
  { time: '18:00', maitriTemp: -33, bharatiTemp: -25, windMaitri: 20, windBharati: 26, maitriSolar: 28, maitriDiesel: 138, maitriDemand: 165, bharatiSolar: 42, bharatiDiesel: 128, bharatiDemand: 184 },
  { time: '20:00', maitriTemp: -34, bharatiTemp: -26, windMaitri: 21, windBharati: 28, maitriSolar: 10, maitriDiesel: 148, maitriDemand: 164, bharatiSolar: 18, bharatiDiesel: 138, bharatiDemand: 180 },
  { time: '22:00', maitriTemp: -35, bharatiTemp: -27, windMaitri: 24, windBharati: 30, maitriSolar: 0, maitriDiesel: 155, maitriDemand: 158, bharatiSolar: 0, bharatiDiesel: 142, bharatiDemand: 174 }
];

// Equipment Registry
export const EQUIPMENT_LIST = [
  {
    id: 'EQ-01',
    name: 'Kirloskar Arctic Genset #01',
    station: 'maitri',
    category: 'Power Generation',
    status: 'normal',
    health: 92,
    load: 68,
    runtimeHours: 4280,
    lastServiced: '2026-08-14',
    nextServiceDue: '2026-10-15',
    serial: 'KRL-ARC-8821',
    location: 'Powerhouse Bay A'
  },
  {
    id: 'EQ-02',
    name: 'Kirloskar Arctic Genset #02',
    station: 'maitri',
    category: 'Power Generation',
    status: 'critical',
    health: 44,
    load: 94,
    runtimeHours: 6120,
    lastServiced: '2026-06-20',
    nextServiceDue: 'OVERDUE (2026-09-20)',
    serial: 'KRL-ARC-8822',
    location: 'Powerhouse Bay B'
  },
  {
    id: 'EQ-03',
    name: 'Hydronic Glycol Boiler Unit A',
    station: 'maitri',
    category: 'HVAC & Heating',
    status: 'normal',
    health: 96,
    load: 72,
    runtimeHours: 12400,
    lastServiced: '2026-09-02',
    nextServiceDue: '2026-12-01',
    serial: 'BLR-GLY-401',
    location: 'Central Utility Core'
  },
  {
    id: 'EQ-04',
    name: 'Lake Priyadarshini Sub-Ice Intake Pump',
    station: 'maitri',
    category: 'Life Support / Water',
    status: 'warning',
    health: 76,
    load: 55,
    runtimeHours: 8900,
    lastServiced: '2026-07-11',
    nextServiceDue: '2026-10-10',
    serial: 'SUB-PMP-112',
    location: 'Lake Priyadarshini Pumphouse'
  },
  {
    id: 'EQ-05',
    name: 'PistenBully 300 Polar Snow Groomer',
    station: 'maitri',
    category: 'Vehicles & Heavy Plant',
    status: 'normal',
    health: 88,
    load: 0,
    runtimeHours: 1450,
    lastServiced: '2026-08-28',
    nextServiceDue: '2026-11-15',
    serial: 'PB-300-POL-09',
    location: 'Vehicle Hangar #1'
  },
  {
    id: 'EQ-06',
    name: 'MAN Turbo Diesel Unit 01',
    station: 'bharati',
    category: 'Power Generation',
    status: 'normal',
    health: 98,
    load: 58,
    runtimeHours: 2840,
    lastServiced: '2026-09-10',
    nextServiceDue: '2026-12-10',
    serial: 'MAN-D2866-99',
    location: 'Lower Tech Module A'
  },
  {
    id: 'EQ-07',
    name: 'Promontory Wind Turbine WTG-01',
    station: 'bharati',
    category: 'Renewable Power',
    status: 'normal',
    health: 94,
    load: 75,
    runtimeHours: 5200,
    lastServiced: '2026-08-04',
    nextServiceDue: '2026-11-04',
    serial: 'WTG-POL-20A',
    location: 'Ridge Ridgecrest Point'
  },
  {
    id: 'EQ-08',
    name: 'SWRO Seawater Desalination Train 1',
    station: 'bharati',
    category: 'Life Support / Water',
    status: 'normal',
    health: 95,
    load: 64,
    runtimeHours: 6400,
    lastServiced: '2026-08-18',
    nextServiceDue: '2026-11-18',
    serial: 'SWRO-200-BHA',
    location: 'Desalination Bay'
  },
  {
    id: 'EQ-09',
    name: 'C-Band 4.5m Polar Tracking Radome',
    station: 'bharati',
    category: 'Communications',
    status: 'normal',
    health: 99,
    load: 84,
    runtimeHours: 16800,
    lastServiced: '2026-09-01',
    nextServiceDue: '2027-01-15',
    serial: 'RAD-ISRO-450',
    location: 'Observation Tower'
  },
  {
    id: 'EQ-10',
    name: 'Kässbohrer Snowcat Transport Cat',
    station: 'bharati',
    category: 'Vehicles & Heavy Plant',
    status: 'normal',
    health: 91,
    load: 0,
    runtimeHours: 1120,
    lastServiced: '2026-08-22',
    nextServiceDue: '2026-11-20',
    serial: 'KAS-CAT-04',
    location: 'Polar Transport Bay'
  }
];

// Active Alerts System
export const ALERTS_LIST = [
  {
    id: 'ALT-1092',
    station: 'maitri',
    severity: 'critical',
    title: 'Generator #02 High Bearing Thermal Spike',
    subsystem: 'Power Generation',
    timestamp: '18m ago',
    date: '2026-09-28 19:50 UTC',
    message: 'Bearing #2 reached 104°C (Limit: 95°C) with 4.8 mm/s vibration. Risk of thermal runaway.',
    acknowledged: false,
    recommendedAction: 'Throttle Gen #02 to idle. Shift load to Battery BESS.'
  },
  {
    id: 'ALT-1090',
    station: 'maitri',
    severity: 'warning',
    title: 'Lake Intake Freeze-Trace Current Surge',
    subsystem: 'Water Supply',
    timestamp: '1h ago',
    date: '2026-09-28 18:45 UTC',
    message: 'Intake Bend 4 trace element drawing 38A (Normal 24A) due to -48°C wind chill.',
    acknowledged: false,
    recommendedAction: 'Inspect outer thermal insulation shroud on next patrol.'
  },
  {
    id: 'ALT-1088',
    station: 'maitri',
    severity: 'warning',
    title: 'Fuel Burn Rate +14% Over Seasonal Baseline',
    subsystem: 'Fuel Systems',
    timestamp: '3h ago',
    date: '2026-09-28 16:30 UTC',
    message: 'Secondary genset running off-efficiency curve due to bearing friction.',
    acknowledged: true,
    acknowledgedBy: 'Col. S. Sharma (Commander)',
    recommendedAction: 'Re-tune governor throttle and equalize BESS charging.'
  },
  {
    id: 'ALT-1084',
    station: 'bharati',
    severity: 'info',
    title: 'ISRO Cartosat-3 Downlink Pass Complete',
    subsystem: 'SATCOM',
    timestamp: '4h ago',
    date: '2026-09-28 15:15 UTC',
    message: 'Acquired 42.4 GB satellite imagery via tracking dish with zero packet loss.',
    acknowledged: true,
    acknowledgedBy: 'Dr. A. Verma (Lead Scientist)',
    recommendedAction: 'Data archived to local SAN storage.'
  },
  {
    id: 'ALT-1079',
    station: 'bharati',
    severity: 'info',
    title: 'Wind Turbine #1 De-Icing Cycle Active',
    subsystem: 'Renewable Power',
    timestamp: '7h ago',
    date: '2026-09-28 12:20 UTC',
    message: '15-minute electro-thermal cycle cleared 4mm riming from rotor blades.',
    acknowledged: true,
    acknowledgedBy: 'Microgrid Controller',
    recommendedAction: 'Rotor efficiency restored to 95%.'
  }
];

// AI Predictive Maintenance
export const PREDICTIVE_MAINTENANCE = [
  {
    id: 'PDM-01',
    equipmentId: 'EQ-02',
    equipmentName: 'Generator #02 (Secondary Genset)',
    station: 'maitri',
    component: 'Drive-End Journal Bearing & Bushing',
    failureProbability: 89,
    urgency: 'high',
    projectedFailureDays: 4,
    recommendedServiceDate: '2026-10-02',
    indicators: [
      'Vibration FFT analysis shows 2X shaft rotational harmonic spike (4.8 mm/s vs 1.2 threshold)',
      'Lubrication oil particulate optical sensor detects bronze fleck density > 180 ppm',
      'Operating temperature gradient +18°C over ambient relative baseline'
    ],
    recommendedAction: 'Schedule emergency shutdown during low-wind window. Replace bearing kit using Spares Bin #P-44.'
  },
  {
    id: 'PDM-02',
    equipmentId: 'EQ-04',
    equipmentName: 'Lake Priyadarshini Sub-Ice Intake Pump',
    station: 'maitri',
    component: 'Impeller Shaft Mechanical Ceramic Seal',
    failureProbability: 64,
    urgency: 'medium',
    projectedFailureDays: 14,
    recommendedServiceDate: '2026-10-12',
    indicators: [
      'Flow velocity cavitation signature detected in acoustic line monitoring',
      'Trace heating power draw climbing by 1.8% daily'
    ],
    recommendedAction: 'Inspect intake basket for glacial slush crystallization; activate secondary ultrasonic de-blocker.'
  },
  {
    id: 'PDM-03',
    equipmentId: 'EQ-05',
    equipmentName: 'PistenBully 300 Polar Snow Groomer',
    station: 'maitri',
    component: 'Hydraulic Track Tensioner Valve Seal',
    failureProbability: 48,
    urgency: 'low',
    projectedFailureDays: 28,
    recommendedServiceDate: '2026-10-26',
    indicators: [
      'Low temperature hydraulic fluid seal stiffness after -40°C traverse',
      'Tension pressure fluctuation of ±4 bar under grade climbing'
    ],
    recommendedAction: 'Flush with ultra-low viscosity Arctic ISO 15 hydraulic oil during regular scheduled depot check.'
  },
  {
    id: 'PDM-04',
    equipmentId: 'EQ-07',
    equipmentName: 'Promontory Wind Turbine WTG-01',
    station: 'bharati',
    component: 'Yaw Drive Planetary Gearbox Bearing',
    failureProbability: 38,
    urgency: 'low',
    projectedFailureDays: 45,
    recommendedServiceDate: '2026-11-12',
    indicators: [
      'Acoustic yaw motor friction signature elevated during 90° wind direction reversal'
    ],
    recommendedAction: 'Top up synthetic polar grease cartridge at next tower ascent inspection.'
  }
];

// Logistics & Expedition Voyage Tracker
export const EXPEDITION_VOYAGE = {
  vesselName: 'MV Vasiliy Golovnin (Charter 44)',
  callsign: 'UBXR',
  expedition: '44th Indian Scientific Expedition to Antarctica (ISEA)',
  currentStatus: 'EN ROUTE / SOUTHERN OCEAN ICE EDGE',
  departurePort: 'Cape Town, South Africa (Berth E-3)',
  departureDate: '2026-09-18',
  etaBharati: '2026-10-06 (8 days remaining)',
  etaMaitri: '2026-10-22 (24 days remaining)',
  coordinates: { lat: -56.84, lng: 42.15 },
  speedKnots: 12.8,
  iceConditions: 'First year pack ice (concentration 3/10, thickness 0.6m)',
  totalCargoWeightTons: 1450,
  cargoCategories: [
    { name: 'Arctic Jet A-1 Fuel', weight: '650 MT', percent: 45, icon: 'Fuel' },
    { name: 'Fresh & Freeze-Dried Provisions', weight: '180 MT', percent: 12, icon: 'Utensils' },
    { name: 'Scientific Payload & Drilling Core Gear', weight: '220 MT', percent: 15, icon: 'Cpu' },
    { name: 'Critical Generator & Vehicle Spares', weight: '140 MT', percent: 10, icon: 'Wrench' },
    { name: 'Modular Construction & Insulated Wall Panels', weight: '260 MT', percent: 18, icon: 'Box' }
  ],
  routeWaypoints: [
    { name: 'Cape Town Port', lat: -33.92, lng: 18.42, status: 'completed', date: 'Sep 18' },
    { name: 'Roaring Forties Entry', lat: -42.50, lng: 24.10, status: 'completed', date: 'Sep 22' },
    { name: 'Furious Fifties Polar Front', lat: -52.00, lng: 35.80, status: 'completed', date: 'Sep 26' },
    { name: 'Current Position (Sea Ice Edge)', lat: -56.84, lng: 42.15, status: 'active', date: 'Today' },
    { name: 'Larsemann Hills (Bharati Fast Ice)', lat: -69.40, lng: 76.18, status: 'upcoming', date: 'Oct 06' },
    { name: 'Prydz Bay Helicopter Airlift', lat: -69.35, lng: 76.25, status: 'upcoming', date: 'Oct 09' },
    { name: 'Crown Bay Transit', lat: -70.10, lng: 24.00, status: 'upcoming', date: 'Oct 17' },
    { name: 'Schirmacher Oasis Shelf (Maitri)', lat: -70.76, lng: 11.73, status: 'upcoming', date: 'Oct 22' }
  ]
};

// Inventory & Consumables Table
export const INVENTORY_ITEMS = [
  {
    id: 'INV-01',
    name: 'Aviation Turbine Fuel (Arctic Jet A-1 / F-34)',
    category: 'Fuel & Energy',
    station: 'maitri',
    stock: 142000,
    unit: 'Liters',
    minThreshold: 60000,
    burnRateDaily: 1000,
    daysRemaining: 142,
    location: 'Tank Farm Bund A-C',
    status: 'normal'
  },
  {
    id: 'INV-02',
    name: 'Potable Water Reserves',
    category: 'Water & Life Support',
    station: 'maitri',
    stock: 48000,
    unit: 'Liters',
    minThreshold: 15000,
    burnRateDaily: 520,
    daysRemaining: 92,
    location: 'Main Habitat Cisterns 1-4',
    status: 'normal'
  },
  {
    id: 'INV-03',
    name: 'Kirloskar Generator #02 Main Bearing Kits',
    category: 'Critical Spares',
    station: 'maitri',
    stock: 1,
    unit: 'Assembly Kit',
    minThreshold: 2,
    burnRateDaily: 0.1,
    daysRemaining: 10,
    location: 'Mechanical Bay Bin P-44',
    status: 'critical'
  },
  {
    id: 'INV-04',
    name: 'Lake Intake Trace-Heat Replacement Cabling',
    category: 'Electrical Spares',
    station: 'maitri',
    stock: 120,
    unit: 'Meters',
    minThreshold: 100,
    burnRateDaily: 0.5,
    daysRemaining: 240,
    location: 'Electrical Store Bay 3',
    status: 'warning'
  },
  {
    id: 'INV-05',
    name: 'Freeze-Dried & Canned Rations (Non-Perishable)',
    category: 'Provisions',
    station: 'maitri',
    stock: 5400,
    unit: 'Ration Packs',
    minThreshold: 1800,
    burnRateDaily: 25,
    daysRemaining: 216,
    location: 'Deep Freeze Storage Container 2',
    status: 'normal'
  },
  {
    id: 'INV-06',
    name: 'Emergency Medical Trauma & Oxygen Cylinders',
    category: 'Medical',
    station: 'maitri',
    stock: 18,
    unit: 'Cylinders (50L)',
    minThreshold: 8,
    burnRateDaily: 0.05,
    daysRemaining: 360,
    location: 'Medical Ward Gas Lock',
    status: 'normal'
  },
  {
    id: 'INV-07',
    name: 'Arctic Jet A-1 Fuel Bulk',
    category: 'Fuel & Energy',
    station: 'bharati',
    stock: 185000,
    unit: 'Liters',
    minThreshold: 70000,
    burnRateDaily: 980,
    daysRemaining: 188,
    location: 'Underground Double Bund',
    status: 'normal'
  },
  {
    id: 'INV-08',
    name: 'SWRO Desalination Membrane Filters (DOW Filmtec)',
    category: 'Life Support',
    station: 'bharati',
    stock: 14,
    unit: 'Cartridges',
    minThreshold: 8,
    burnRateDaily: 0.05,
    daysRemaining: 280,
    location: 'Utility Storage B',
    status: 'normal'
  },
  {
    id: 'INV-09',
    name: 'PistenBully Heavy Track Cleats & Fasteners',
    category: 'Vehicle Spares',
    station: 'bharati',
    stock: 84,
    unit: 'Sets',
    minThreshold: 40,
    burnRateDaily: 0.2,
    daysRemaining: 420,
    location: 'Workshop Hangar Shelf 9',
    status: 'normal'
  }
];

// What-If Simulation Scenarios
export const SIMULATION_SCENARIOS = {
  blizzard: {
    id: 'blizzard',
    name: 'Catastrophic Polar Blizzard (Category 4)',
    duration: '72 Hours',
    description: 'Ambient temperature drops to -52°C, katabatic wind gusts reach 145 km/h, and zero solar insolation due to blizzard whiteout.',
    impacts: {
      temperatureDelta: -20,
      windDelta: +85,
      solarOutput: 0,
      fuelBurnMultiplier: 1.55,
      healthScoreImpact: -18,
      powerDemandDeltaKw: +35,
      batteryRunwayHours: 8.5
    },
    contingencySteps: [
      'Stow solar tracking panels to zero-drag 0° horizontal profile',
      'Engage secondary hydronic trace heating to prevent water intake freezing',
      'Impose Phase 1 power conservation: shut down non-life-support scientific labs',
      'Mandate complete station lockdown; all outdoor movement suspended'
    ]
  },
  generatorFailure: {
    id: 'generatorFailure',
    name: 'Generator #02 Catastrophic Turbine Trip',
    duration: 'Instantaneous / 48h Repair Window',
    description: 'High-temperature bearing seizure forces immediate emergency trip on Generator #02 during base load.',
    impacts: {
      temperatureDelta: 0,
      windDelta: 0,
      solarOutput: 'Unchanged',
      fuelBurnMultiplier: 0.85, // Single engine running at maximum load
      healthScoreImpact: -32,
      powerDemandDeltaKw: -45, // Required load shedding
      batteryRunwayHours: 3.2
    },
    contingencySteps: [
      'Automated transfer switch sheds non-critical electrical circuits in 12 milliseconds',
      'Battery BESS bank discharges 45 kW continuous to bridge heating bus load',
      'Deploy mechanical team in thermal gear to replace journal bearing with Spare Bin #P-44',
      'Ramp Generator #01 to 92% maximum continuous rating'
    ]
  },
  supplyDelay: {
    id: 'supplyDelay',
    name: 'Expedition Vessel 30-Day Heavy Sea Ice Pack Delay',
    duration: '30 Days Extra Wintering',
    description: 'Multi-year fast ice blockage prevents MV Vasiliy Golovnin from reaching discharge coordinates for 30 days.',
    impacts: {
      temperatureDelta: 0,
      windDelta: 0,
      solarOutput: 'Unchanged',
      fuelBurnMultiplier: 0.78, // Rationed conservation burn
      healthScoreImpact: -12,
      powerDemandDeltaKw: -28,
      fuelDaysRemainingDelta: -30
    },
    contingencySteps: [
      'Activate Winter Ration Protocol B: Reduce module comfort heating by 2.5°C',
      'Switch domestic water supply to 50% recycling greywater recovery',
      'Request Indian Air Force IL-76 / ski-equipped Basler BT-67 aerial fuel drop standby',
      'Extend generator maintenance intervals with synthetic oil top-up'
    ]
  }
};
