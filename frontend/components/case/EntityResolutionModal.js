"use client";

import { useState } from 'react';
import { X, GitMerge, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { ENTITY_RESOLUTION_MATCHES } from '@/lib/mock/entityResolution';

export default function EntityResolutionModal({ isOpen, onClose }) {
  const [matches, setMatches] = useState(ENTITY_RESOLUTION_MATCHES);
  const [resolvedStatus, setResolvedStatus] = useState({});

  if (!isOpen) return null;

  const handleAction = (matchId, actionType) => {
    setResolvedStatus((prev) => ({
      ...prev,
      [matchId]: actionType === 'merge' ? 'Merged Successfully' : 'Kept Separate',
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6 text-[var(--text-primary)] font-sans">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[var(--divider)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[var(--primary)] text-white shadow-md">
              <GitMerge className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-[var(--warning)] text-white">
                  Investigator Review Required
                </span>
                <span className="text-[12px] font-mono text-[var(--text-secondary)]">
                  FastAPI Resolution Engine (BGE-m3 + HAC)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] mt-1">
                Entity Resolution Candidates
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Matches List */}
        <div className="space-y-6">
          {matches.map((item) => {
            const status = resolvedStatus[item.id];
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] space-y-4 shadow-sm"
              >
                {/* Candidate Comparison Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--divider)] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-mono font-bold text-[var(--text-secondary)]">
                      Candidate Pair #{item.id}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[12px] font-mono font-bold bg-[var(--success)]/20 text-[var(--success)]">
                      {item.similarity}% Similarity Match
                    </span>
                  </div>

                  {status && (
                    <span className={`px-3 py-1 rounded-xl text-[12px] font-semibold ${
                      status.includes('Merged') ? "bg-[var(--success)] text-white" : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]"
                    }`}>
                      ✓ {status}
                    </span>
                  )}
                </div>

                {/* Candidate Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Candidate A */}
                  <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-[var(--text-secondary)]">Candidate 1 (Extracted)</span>
                    <h4 className="text-lg font-bold text-[var(--text-primary)]">{item.candidateA.name}</h4>
                    <p className="text-[12px] text-[var(--text-secondary)]">Source: <span className="font-mono">{item.candidateA.sourceFile}</span></p>
                    <p className="text-[12px] text-[var(--text-secondary)]">Phone: <span className="font-mono">{item.candidateA.phone}</span></p>
                    <p className="text-[12px] text-[var(--text-secondary)]">Location: <span>{item.candidateA.location}</span></p>
                  </div>

                  {/* Candidate B */}
                  <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-[var(--text-secondary)]">Candidate 2 (Resolved)</span>
                    <h4 className="text-lg font-bold text-[var(--primary)]">{item.candidateB.name}</h4>
                    <p className="text-[12px] text-[var(--text-secondary)]">Source: <span className="font-mono">{item.candidateB.sourceFile}</span></p>
                    <p className="text-[12px] text-[var(--text-secondary)]">Phone: <span className="font-mono">{item.candidateB.phone}</span></p>
                    <p className="text-[12px] text-[var(--text-secondary)]">Location: <span>{item.candidateB.location}</span></p>
                  </div>
                </div>

                {/* Supporting Signals */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase font-bold text-[var(--text-secondary)]">Resolution Signals</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.signals.map((sig, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[12px] text-[var(--text-primary)]">
                        <Check className="w-3.5 h-3.5 text-[var(--success)] shrink-0" />
                        <span>{sig.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {!status && (
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => handleAction(item.id, 'keep')}
                      className="px-4 py-2 rounded-xl border border-[var(--border)] text-[13px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
                    >
                      Keep Separate
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(item.id, 'merge')}
                      className="px-5 py-2 rounded-xl bg-[var(--primary)] text-white text-[13px] font-semibold hover:bg-[var(--primary-hover)] transition-colors shadow-sm flex items-center gap-2"
                    >
                      <GitMerge className="w-4 h-4" />
                      <span>Merge Entities</span>
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[var(--divider)] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[var(--primary)] text-white font-semibold text-[14px] hover:bg-[var(--primary-hover)] transition-colors"
          >
            Done Reviewing
          </button>
        </div>

      </div>
    </div>
  );
}
