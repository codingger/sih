import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snowflake, Lock, ShieldCheck, ArrowRight, Radio } from 'lucide-react';

export default function Login() {
  const [callsign, setCallsign] = useState('NCPOR-POLAR-01');
  const [passcode, setPasscode] = useState('••••••••');
  const [station, setStation] = useState('maitri');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('ncpor_auth', 'true');
    localStorage.setItem('ncpor_station', station);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 polar-grid relative overflow-hidden bg-slate-950">
      {/* Polar Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md glass-panel-glow rounded-2xl p-8 border border-cyan-500/30 relative z-10 shadow-2xl">
        {/* Emblem & Title */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-4">
            <Snowflake className="w-9 h-9 text-cyan-400 animate-pulse" />
          </div>
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            Govt. of India • MoES
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide mt-1">
            NCPOR ANTARCTIC DIGITAL TWIN
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            44th Indian Scientific Expedition Telemetry & Remote Control
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-cyan-300 mb-1">STATION DISPATCH NODE</label>
            <select
              value={station}
              onChange={(e) => setStation(e.target.value)}
              className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="maitri">Maitri Research Base (Queen Maud Land)</option>
              <option value="bharati">Bharati Research Base (Larsemann Hills)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-cyan-300 mb-1">OPERATOR CALLSIGN</label>
            <input
              type="text"
              value={callsign}
              onChange={(e) => setCallsign(e.target.value)}
              className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-cyan-300 mb-1">ENCRYPTED SAT-KEY</label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer transition-all duration-200"
          >
            <span>CONNECT MISSION CONTROL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security badge */}
        <div className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            256-Bit Telemetry Link
          </span>
          <span className="text-slate-400">SAT-ID: INSAT-4CR</span>
        </div>
      </div>
    </div>
  );
}
