"use client";

import { AlertTriangle, Sparkles } from 'lucide-react';
import { ANOMALIES } from '@/lib/mock/anomalies';

export default function AnomalyPanel({ onSelectEntity, embedded = false }) {
  const levelMeta = {
    high: {
      badge: "bg-red-500/12 text-[var(--danger)] border-red-500/20",
      label: "Critical",
      dot: "bg-[var(--danger)]",
    },
    medium: {
      badge: "bg-amber-500/12 text-[var(--warning)] border-amber-500/20",
      label: "Moderate",
      dot: "bg-[var(--warning)]",
    },
  };

  return (
    <div className="p-6 space-y-5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[var(--danger)] uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Anomaly Detection</span>
          </div>
          <h2 className="text-[17px] font-semibold text-[var(--text-primary)]">
            Detected Anomalies & Risk Indicators
          </h2>
          <p className="text-[12px] text-[var(--text-secondary)]">
            Graph analysis has identified {ANOMALIES.length} potential anomalies requiring investigator review.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-[var(--danger)] border border-red-500/20 text-[11px] font-mono font-bold shrink-0">
          <AlertTriangle className="w-3.5 h-3.5" />
          {ANOMALIES.length} Active
        </div>
      </div>

      {/* Anomaly cards */}
      <div className="space-y-3">
        {ANOMALIES.map((anomaly) => {
          const meta = levelMeta[anomaly.level] || levelMeta.medium;
          return (
            <div
              key={anomaly.id}
              className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl hover:border-[var(--danger)]/30 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${meta.dot}`} />
                  <div>
                    <h4 className="text-[14px] font-semibold text-[var(--text-primary)] leading-snug">
                      {anomaly.title}
                    </h4>
                    <div className="text-[10px] font-mono text-[var(--text-tertiary)] mt-0.5">
                      {anomaly.id} · Graph analysis indicates potential anomaly
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2 py-px rounded text-[9px] font-mono font-bold border ${meta.badge}`}>
                    {meta.label}
                  </span>
                  <span className={`px-2 py-px rounded text-[9px] font-mono font-bold border ${meta.badge}`}>
                    {anomaly.confidence}% Confidence
                  </span>
                </div>
              </div>

              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                {anomaly.description}
              </p>

              {/* Linked entities */}
              {anomaly.entities?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--divider)]">
                  <span className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase self-center mr-1">
                    Affected entities:
                  </span>
                  {anomaly.entities.map((entId) => (
                    <button
                      key={entId}
                      type="button"
                      onClick={() => onSelectEntity?.(entId)}
                      className="px-2 py-px rounded text-[11px] font-mono font-semibold bg-[var(--surface-hover)] text-[var(--danger)] border border-red-500/20 hover:bg-[var(--danger)] hover:text-white transition-colors"
                    >
                      {entId}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
