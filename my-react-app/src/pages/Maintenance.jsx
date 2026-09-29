import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import { Cpu, AlertTriangle, Clock, Calendar, CheckCircle2, Sliders, ShieldCheck, Activity, Sparkles, BarChart2 } from 'lucide-react';
import { PREDICTIVE_MAINTENANCE, STATIONS } from '../data/mockData';

export default function Maintenance({ currentStationId }) {
  const { addToast } = useToast();
  const [items, setItems] = useState(() => PREDICTIVE_MAINTENANCE);
  const [scheduledId, setScheduledId] = useState(null);
  
  // Interactive ML Model Inputs state
  const [selectedEqId, setSelectedEqId] = useState('PDM-01');
  const [tempInput, setTempInput] = useState(104);
  const [vibInput, setVibInput] = useState(4.8);
  const [runtimeInput, setRuntimeInput] = useState(6120);
  const [loadInput, setLoadInput] = useState(94);
  const [daysInput, setDaysInput] = useState(180);
  const [isPredicting, setIsPredicting] = useState(false);
  const [modelResult, setModelResult] = useState(null);
  const [modelMetrics, setModelMetrics] = useState({
    model_type: "RandomForestClassifier (scikit-learn)",
    dataset_type: "Simulated Equipment Telemetry (1,500 samples)",
    metrics: { accuracy: 0.9120, precision: 0.7885, recall: 0.6508, f1_score: 0.7130 },
    feature_importances: { temperature: 0.3593, vibration: 0.3221, days_since_service: 0.1306, runtime_hours: 0.1198, load_pct: 0.0682 }
  });

  const station = STATIONS[currentStationId] || STATIONS.maitri;
  const stationItems = items.filter(i => i.station === currentStationId);

  // Fetch trained model metrics on mount
  useEffect(() => {
    api.getMLModelInfo().then(info => {
      if (info && info.metrics) {
        setModelMetrics(info);
      }
    }).catch(() => {});
  }, []);

  const handleRunInference = async () => {
    setIsPredicting(true);
    try {
      const payload = {
        temperature: parseFloat(tempInput),
        vibration: parseFloat(vibInput),
        runtime_hours: parseFloat(runtimeInput),
        load_pct: parseFloat(loadInput),
        days_since_service: parseFloat(daysInput)
      };

      const result = await api.predictEquipmentRisk(payload);
      setModelResult(result);

      // Update the targeted item in state with real ML predictions
      setItems(prev => prev.map(item => {
        if (item.id === selectedEqId) {
          return {
            ...item,
            failureProbability: result.failure_probability,
            urgency: result.urgency,
            projectedFailureDays: result.projected_failure_days
          };
        }
        return item;
      }));

      addToast({
        title: `ML Model Inference Executed`,
        message: `RandomForestClassifier predicted ${result.failure_probability}% failure probability for selected equipment.`,
        type: result.urgency === 'high' ? 'critical' : 'info',
        duration: 5000
      });
    } catch (err) {
      addToast({
        title: 'Inference Error',
        message: 'Could not connect to Express ML model endpoint.',
        type: 'critical',
        duration: 4000
      });
    } finally {
      setIsPredicting(false);
    }
  };

  const handleScheduleService = (item) => {
    setScheduledId(item.id);
    addToast({
      title: `Work Order WO-${item.id} Logged`,
      message: `Polar maintenance depot notified for ${item.equipmentName}. Required spares reserved from Spares Bin #P-44.`,
      type: 'success',
      duration: 5000
    });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>ML DIAGNOSTICS & PROGNOSTICS • {station.name.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Predictive Maintenance Engine
          </h1>
          <p className="text-xs text-slate-400">
            Real scikit-learn RandomForest model estimating equipment failure risk from operational telemetry
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-bold">
            🤖 Model: RandomForestClassifier (scikit-learn)
          </span>
        </div>
      </div>

      {/* Real ML Model Validation Metrics Panel */}
      <div className="glass-panel p-5 rounded-xl border border-cyan-500/30 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-cyan-300 uppercase">MODEL EVALUATION METRICS (SCIKIT-LEARN)</span>
          </div>
          <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
            ⚠️ Training Data: 1,500 Simulated Equipment Records
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">ACCURACY</div>
            <div className="text-xl font-bold text-emerald-400 mt-0.5">
              {(modelMetrics.metrics.accuracy * 100).toFixed(1)}%
            </div>
            <div className="text-[9px] text-slate-400">Test split evaluation</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">PRECISION</div>
            <div className="text-xl font-bold text-cyan-300 mt-0.5">
              {(modelMetrics.metrics.precision * 100).toFixed(1)}%
            </div>
            <div className="text-[9px] text-slate-400">Positive prediction accuracy</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">RECALL</div>
            <div className="text-xl font-bold text-cyan-300 mt-0.5">
              {(modelMetrics.metrics.recall * 100).toFixed(1)}%
            </div>
            <div className="text-[9px] text-slate-400">True failure detection rate</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">F1 SCORE</div>
            <div className="text-xl font-bold text-cyan-300 mt-0.5">
              {(modelMetrics.metrics.f1_score * 100).toFixed(1)}%
            </div>
            <div className="text-[9px] text-slate-400">Harmonic mean balance</div>
          </div>
        </div>

        {/* Feature Importances Breakdown */}
        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 space-y-1">
          <span className="font-bold text-slate-400 uppercase block mb-1">Random Forest Feature Weights:</span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-[10px]">
            <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Temperature:</span> <strong className="text-cyan-400">35.9%</strong>
            </div>
            <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Vibration:</span> <strong className="text-cyan-400">32.2%</strong>
            </div>
            <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Days Unserviced:</span> <strong className="text-cyan-400">13.1%</strong>
            </div>
            <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Runtime Hours:</span> <strong className="text-cyan-400">12.0%</strong>
            </div>
            <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Load %:</span> <strong className="text-cyan-400">6.8%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Live Interactive ML Inference Panel */}
      <div className="glass-panel p-5 rounded-xl border border-cyan-500/30 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white uppercase text-sm">LIVE ML MODEL INFERENCE TESTER</span>
          </div>
          <span className="text-[11px] text-cyan-400">Adjust telemetry inputs to run real-time Random Forest predictions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">TARGET EQUIPMENT</label>
            <select
              value={selectedEqId}
              onChange={e => setSelectedEqId(e.target.value)}
              className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white text-xs font-mono"
            >
              {stationItems.map(item => (
                <option key={item.id} value={item.id}>{item.equipmentName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">TEMPERATURE (°C): {tempInput}°C</label>
            <input
              type="range" min="40" max="120" value={tempInput}
              onChange={e => setTempInput(e.target.value)}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">VIBRATION (mm/s): {vibInput} mm/s</label>
            <input
              type="range" min="0.2" max="6.0" step="0.1" value={vibInput}
              onChange={e => setVibInput(e.target.value)}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">RUNTIME HOURS: {runtimeInput} hrs</label>
            <input
              type="range" min="500" max="15000" step="100" value={runtimeInput}
              onChange={e => setRuntimeInput(e.target.value)}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">DAYS UN-SERVICED: {daysInput} days</label>
            <input
              type="range" min="10" max="300" value={daysInput}
              onChange={e => setDaysInput(e.target.value)}
              className="w-full accent-cyan-400"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleRunInference}
            disabled={isPredicting}
            className="py-2.5 px-5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs cursor-pointer shadow-md shadow-cyan-500/20 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isPredicting ? 'Executing Model Inference...' : 'Run Real-Time ML Inference'}</span>
          </button>

          {modelResult && (
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">MODEL OUTPUT PROBABILITY</span>
              <span className={`text-lg font-black ${modelResult.failure_probability >= 70 ? 'text-rose-400' : modelResult.failure_probability >= 40 ? 'text-amber-400' : 'text-cyan-300'}`}>
                {modelResult.failure_probability}% Failure Risk ({modelResult.projected_failure_days} Days Lead Time)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Predictive Items List */}
      <div className="space-y-4">
        {stationItems.map(item => {
          const isHigh = item.urgency === 'high';
          const isMedium = item.urgency === 'medium';

          return (
            <div
              key={item.id}
              className={`glass-panel rounded-xl p-5 border transition-all ${
                isHigh ? 'border-rose-500/40 bg-rose-950/15' : isMedium ? 'border-amber-500/30 bg-amber-950/10' : 'border-cyan-500/20'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                      isHigh
                        ? 'bg-rose-950 text-rose-300 border-rose-500/50 pulse-critical'
                        : isMedium
                        ? 'bg-amber-950 text-amber-300 border-amber-500/50'
                        : 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                    }`}>
                      URGENCY: {item.urgency}
                    </span>
                    <span className="text-xs font-mono text-cyan-400">{item.equipmentId}</span>
                    <span className="text-xs font-mono text-slate-400">• Component: <strong className="text-slate-200">{item.component}</strong></span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {item.equipmentName}
                  </h3>

                  {/* Indicators List */}
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
                    <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase">
                      TELEMETRY ANOMALY INDICATORS
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                      {item.indicators.map((ind, idx) => (
                        <li key={idx} className="leading-relaxed">{ind}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Action */}
                  <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200">
                    <strong className="font-mono text-cyan-400 uppercase block mb-0.5">RECOMMENDED PROTOCOL:</strong>
                    {item.recommendedAction}
                  </div>
                </div>

                {/* Right Side: Probability Gauge & Action */}
                <div className="lg:w-64 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between shrink-0 font-mono text-xs space-y-3">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase flex items-center justify-between">
                      <span>FAILURE PROBABILITY</span>
                      <span className="text-[9px] text-cyan-400">RandomForest</span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className={`text-3xl font-black ${item.failureProbability > 75 ? 'text-rose-400' : item.failureProbability > 50 ? 'text-amber-400' : 'text-cyan-300'}`}>
                        {item.failureProbability}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                      <div
                        className={`h-full rounded-full ${item.failureProbability > 75 ? 'bg-rose-500' : item.failureProbability > 50 ? 'bg-amber-400' : 'bg-cyan-400'}`}
                        style={{ width: `${item.failureProbability}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Model Lead Time:</span>
                      <span className="text-white font-bold">{item.projectedFailureDays} Days Left</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Recommended Date:</span>
                      <span className="text-cyan-400">{item.recommendedServiceDate}</span>
                    </div>
                  </div>

                  {scheduledId === item.id ? (
                    <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-bold text-[11px]">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Work Order Created</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleScheduleService(item)}
                      className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs cursor-pointer shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Schedule Work Order</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
