import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  X,
  Radio,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({
    title,
    message,
    type = 'info', // 'success' | 'warning' | 'critical' | 'info'
    duration = 4500
  }) => {
    const id = Date.now() + Math.random().toString(36).slice(2, 6);
    const timestamp = new Date().toUTCString().slice(17, 25) + ' UTC';

    setToasts(prev => [...prev, { id, title, message, type, timestamp, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Polar HUD Toast Container */}
      <div className="fixed top-16 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const isSuccess = toast.type === 'success';
            const isWarning = toast.type === 'warning';
            const isCritical = toast.type === 'critical';

            const borderClass = isCritical
              ? 'border-rose-500/60 bg-rose-950/90 shadow-rose-950/40'
              : isWarning
              ? 'border-amber-500/60 bg-amber-950/90 shadow-amber-950/40'
              : isSuccess
              ? 'border-emerald-500/60 bg-slate-900/95 shadow-emerald-950/30'
              : 'border-cyan-500/60 bg-slate-900/95 shadow-cyan-950/30';

            const iconColor = isCritical
              ? 'text-rose-400'
              : isWarning
              ? 'text-amber-400'
              : isSuccess
              ? 'text-emerald-400'
              : 'text-cyan-400';

            const Icon = isCritical
              ? AlertCircle
              : isWarning
              ? AlertTriangle
              : isSuccess
              ? CheckCircle2
              : Info;

            const categoryTag = isCritical
              ? 'CRITICAL ALERT'
              : isWarning
              ? 'MISSION WARNING'
              : isSuccess
              ? 'TELEMETRY CONFIRMED'
              : 'MISSION CONTROL';

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.95 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className={`pointer-events-auto rounded-xl border backdrop-blur-xl p-4 shadow-2xl relative overflow-hidden ${borderClass}`}
              >
                {/* Top Glowing Edge Bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 ${
                    isCritical
                      ? 'bg-gradient-to-r from-rose-500 via-rose-300 to-rose-500'
                      : isWarning
                      ? 'bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500'
                      : isSuccess
                      ? 'bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-500'
                      : 'bg-slate-300'
                  }`}
                />

                <div className="flex items-start gap-3">
                  {/* Status Icon */}
                  <div className={`p-1.5 rounded-lg bg-slate-800/80 border border-white/10 shrink-0 mt-0.5 ${iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Message Body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`text-[10px] font-mono font-bold tracking-wider uppercase ${iconColor}`}>
                        {categoryTag}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {toast.timestamp}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white tracking-wide leading-snug">
                      {toast.title}
                    </h4>

                    {toast.message && (
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        {toast.message}
                      </p>
                    )}
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer shrink-0"
                    aria-label="Dismiss notification"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Animated Dismiss Progress Bar */}
                {toast.duration > 0 && (
                  <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: toast.duration / 1000, ease: 'linear' }}
                    className={`absolute bottom-0 left-0 h-0.5 opacity-50 ${
                      isCritical
                        ? 'bg-rose-400'
                        : isWarning
                        ? 'bg-amber-400'
                        : isSuccess
                        ? 'bg-emerald-400'
                        : 'bg-cyan-400'
                    }`}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
