"use client";

import { Clock, AlertCircle, AlertTriangle, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { TIMELINE } from '@/lib/mock/timeline';

export default function TimelinePanel({ isOpen = true, onClose, onSelectEntity, embedded = false }) {
  if (!isOpen) return null;

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'high':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/10 text-[var(--danger)] border border-red-500/20">Critical</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-[var(--warning)] border border-amber-500/20">Moderate</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-[var(--success)] border border-emerald-500/20">Low</span>;
    }
  };

  const containerClasses = embedded
    ? "p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl shadow-lg space-y-4"
    : "w-80 border-l border-[var(--border)] bg-[var(--surface)] flex flex-col h-full overflow-hidden shrink-0 shadow-lg";

  return (
    <div className={containerClasses}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--divider)]">
        <div className="flex items-center gap-2 text-[14px] font-semibold text-[var(--text-primary)]">
          <Clock className="w-4 h-4 text-[var(--primary)]" />
          <span>Investigation Chronology ({TIMELINE.length})</span>
        </div>
        {onClose && !embedded && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Events List */}
      <div className={`${embedded ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex-1 overflow-y-auto space-y-4 p-1"}`}>
        {TIMELINE.map((event) => (
          <div
            key={event.id}
            className={`relative p-3.5 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] hover:border-[var(--primary)]/40 transition-all space-y-2 ${
              embedded ? "" : "pl-6 border-l-2 border-l-[var(--primary)]"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-mono text-[var(--text-secondary)]">{event.date}</span>
              {getSeverityBadge(event.severity)}
            </div>

            <h4 className="text-[13px] font-semibold text-[var(--text-primary)] leading-snug">
              {event.title}
            </h4>

            <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
              {event.description}
            </p>

            {/* Linked Entities */}
            {event.entities && event.entities.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-[var(--divider)]">
                <span className="text-[10px] text-[var(--text-secondary)] font-medium self-center">Entities:</span>
                {event.entities.map((entId) => (
                  <button
                    key={entId}
                    type="button"
                    onClick={() => onSelectEntity && onSelectEntity(entId)}
                    className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[var(--surface)] text-[var(--primary)] border border-[var(--border)] hover:bg-[var(--primary)] hover:text-white transition-colors"
                  >
                    {entId}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
