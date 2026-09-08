"use client";

import { useState } from 'react';
import { X, GitBranch, Plus, CheckCircle2, ArrowRight, Layers, AlertTriangle } from 'lucide-react';
import { GRAPH_DIFF_DATA } from '@/lib/mock/graphDiff';

export default function GraphDiffModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'graph'

  if (!isOpen) return null;

  const { summary, newEntities, newRelationships, newAnomalies } = GRAPH_DIFF_DATA;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6 text-[var(--text-primary)] font-sans">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[var(--divider)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[var(--primary)] text-white shadow-md">
              <GitBranch className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-[var(--accent)] text-white">
                  Evidence Update
                </span>
                <span className="text-[12px] font-mono text-[var(--text-secondary)]">
                  3 New Files Analyzed
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] mt-1">
                Investigation Graph Evolution
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

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] text-center">
            <p className="text-[11px] font-mono uppercase text-[var(--text-secondary)]">New Entities</p>
            <p className="text-2xl font-bold text-[var(--success)] mt-0.5">+{summary.newEntitiesCount}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] text-center">
            <p className="text-[11px] font-mono uppercase text-[var(--text-secondary)]">New Links</p>
            <p className="text-2xl font-bold text-[var(--primary)] mt-0.5">+{summary.newRelationshipsCount}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] text-center">
            <p className="text-[11px] font-mono uppercase text-[var(--text-secondary)]">New Anomalies</p>
            <p className="text-2xl font-bold text-[var(--accent)] mt-0.5">+{summary.newAnomaliesCount}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] text-center">
            <p className="text-[11px] font-mono uppercase text-[var(--text-secondary)]">Resolved</p>
            <p className="text-2xl font-bold text-[var(--text-primary)] mt-0.5">{summary.resolvedEntitiesCount}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] text-center col-span-2 sm:col-span-1">
            <p className="text-[11px] font-mono uppercase text-[var(--text-secondary)]">Strengthened</p>
            <p className="text-2xl font-bold text-[var(--text-primary)] mt-0.5">{summary.strengthenedRelationshipsCount}</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
              activeTab === 'summary'
                ? "bg-[var(--primary)] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Changes Summary
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('graph')}
            className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
              activeTab === 'graph'
                ? "bg-[var(--primary)] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Topology Diff (Before vs After)
          </button>
        </div>

        {activeTab === 'summary' ? (
          <div className="space-y-6">
            
            {/* New Discovered Entities */}
            <div className="space-y-3">
              <h3 className="text-[14px] font-mono uppercase font-bold text-[var(--text-secondary)] tracking-wider flex items-center gap-2">
                <Plus className="w-4 h-4 text-[var(--success)]" />
                <span>Newly Discovered Entities (4)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {newEntities.map((ent) => (
                  <div
                    key={ent.id}
                    className="p-3.5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--success)]/40 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[14px] text-[var(--text-primary)]">{ent.name}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[var(--success)]/20 text-[var(--success)]">
                          NEW
                        </span>
                      </div>
                      <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">{ent.role} • {ent.type}</p>
                    </div>
                    <span className="text-[11px] font-mono uppercase font-bold text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-1 rounded-md">
                      {ent.risk} risk
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* New Relationships */}
            <div className="space-y-3">
              <h3 className="text-[14px] font-mono uppercase font-bold text-[var(--text-secondary)] tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--primary)]" />
                <span>New Evidence-Backed Relationships (7)</span>
              </h3>
              <div className="space-y-2">
                {newRelationships.map((rel, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] flex items-center justify-between text-[13px]"
                  >
                    <div className="flex items-center gap-2 font-medium">
                      <span className="text-[var(--text-primary)] font-semibold">{rel.source}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span className="text-[var(--primary)] font-semibold">{rel.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span className="text-[var(--text-primary)] font-semibold">{rel.target}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--success)]/20 text-[var(--success)]">
                      + NEW LINK
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* New Risk Anomalies */}
            <div className="space-y-3">
              <h3 className="text-[14px] font-mono uppercase font-bold text-[var(--text-secondary)] tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[var(--accent)]" />
                <span>Newly Identified Risk Anomalies (2)</span>
              </h3>
              <div className="space-y-2">
                {newAnomalies.map((anom) => (
                  <div
                    key={anom.id}
                    className="p-4 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/30 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[14px] text-[var(--text-primary)]">{anom.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--accent)] text-white uppercase">
                        {anom.level} priority
                      </span>
                    </div>
                    <p className="text-[13px] text-[var(--text-secondary)]">{anom.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* Graph Topology Visual Representation */
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* BEFORE */}
              <div className="p-4 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] space-y-3">
                <div className="flex items-center justify-between border-b border-[var(--divider)] pb-2">
                  <span className="font-mono text-[12px] uppercase font-bold text-[var(--text-secondary)]">
                    BEFORE (Stage A)
                  </span>
                  <span className="text-[11px] font-mono text-[var(--text-secondary)]">16 Entities • 18 Links</span>
                </div>
                <div className="h-64 rounded-xl bg-[var(--background-secondary)] flex items-center justify-center p-4 relative overflow-hidden border border-[var(--border)]">
                  <div className="text-center space-y-2">
                    <p className="text-[13px] font-semibold text-[var(--text-secondary)]">Original Base Topology</p>
                    <div className="flex items-center justify-center gap-4 text-[12px] font-mono">
                      <span className="px-2 py-1 rounded bg-[var(--primary)] text-white">R. Malhotra</span>
                      <span>───</span>
                      <span className="px-2 py-1 rounded bg-[#3B5C8A] text-white">Apex Global</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AFTER */}
              <div className="p-4 rounded-2xl bg-[var(--surface-hover)] border border-[var(--success)]/40 space-y-3">
                <div className="flex items-center justify-between border-b border-[var(--divider)] pb-2">
                  <span className="font-mono text-[12px] uppercase font-bold text-[var(--success)] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    AFTER EVIDENCE UPDATE (Stage B)
                  </span>
                  <span className="text-[11px] font-mono text-[var(--success)] font-bold">20 Entities • 25 Links</span>
                </div>
                <div className="h-64 rounded-xl bg-[var(--background-secondary)] flex items-center justify-center p-4 relative overflow-hidden border border-[var(--success)]/30">
                  <div className="text-center space-y-2">
                    <p className="text-[13px] font-semibold text-[var(--text-primary)]">Updated Network Topology</p>
                    <div className="flex flex-col gap-2 text-[12px] font-mono">
                      <div className="flex items-center justify-center gap-2">
                        <span className="px-2 py-1 rounded bg-[var(--primary)] text-white">R. Malhotra</span>
                        <span className="text-[var(--accent)] font-bold">➔ Wire $450k ➔</span>
                        <span className="px-2 py-1 rounded bg-[var(--success)] text-white font-bold">Shreeji Traders [NEW]</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="px-2 py-1 rounded bg-[var(--success)] text-white font-bold">K. Bora [NEW]</span>
                        <span>──</span>
                        <span className="px-2 py-1 rounded bg-[var(--success)] text-white font-bold">Warehouse 12B [NEW]</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Action Button */}
        <div className="pt-4 border-t border-[var(--divider)] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[var(--primary)] text-white font-semibold text-[14px] hover:bg-[var(--primary-hover)] transition-colors"
          >
            Apply to Active Workspace
          </button>
        </div>

      </div>
    </div>
  );
}
