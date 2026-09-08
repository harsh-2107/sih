"use client";

import { X, Share2, Layers, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { CROSS_CASE_DATA } from '@/lib/mock/crossCase';

export default function CrossCaseModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { targetEntity, sharedIndicators, linkedCases, crossGraph } = CROSS_CASE_DATA;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6 text-[var(--text-primary)] font-sans">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[var(--divider)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[var(--accent)] text-white shadow-md">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-[var(--accent)] text-white">
                  CROSS-CASE LINK DETECTED
                </span>
                <span className="text-[12px] font-mono text-[var(--text-secondary)]">
                  3 Investigations Linked
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] mt-1">
                Cross-Case Intelligence Network
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

        {/* Target Entity Brief */}
        <div className="p-4 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase text-[var(--text-secondary)]">Target Entity</span>
            <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2 mt-0.5">
              <span>{targetEntity.name}</span>
              <span className="text-[13px] font-normal text-[var(--text-secondary)]">({targetEntity.alias})</span>
            </h3>
            <p className="text-[13px] text-[var(--text-secondary)]">{targetEntity.role}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {sharedIndicators.map((ind, idx) => (
              <div key={idx} className="px-3 py-1.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[12px]">
                <span className="text-[var(--text-secondary)] mr-1.5">{ind.label}:</span>
                <span className="font-mono font-bold text-[var(--primary)]">{ind.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-Case Linked Investigations List */}
        <div className="space-y-3">
          <h3 className="text-[14px] font-mono uppercase font-bold text-[var(--text-secondary)] tracking-wider">
            Connected Investigation Files
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {linkedCases.map((c) => (
              <div
                key={c.id}
                className={`p-4 rounded-2xl border backdrop-blur-xl space-y-3 transition-all ${
                  c.id === "CASE-2049"
                    ? "bg-[var(--primary)]/10 border-[var(--primary)] shadow-sm"
                    : "bg-[var(--surface-hover)] border-[var(--border)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-mono font-bold text-[var(--text-secondary)]">{c.id}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--success)]/20 text-[var(--success)]">
                    {c.confidence}% Match
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-[15px] text-[var(--text-primary)]">{c.title}</h4>
                  <p className="text-[12px] text-[var(--text-secondary)] mt-1">Role: <span className="font-semibold">{c.role}</span></p>
                </div>
                <div className="pt-2 border-t border-[var(--divider)] flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
                  <span>Last Activity</span>
                  <span>{c.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Multi-Case Network Graph Diagram */}
        <div className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--divider)] pb-2">
            <span className="text-[12px] font-mono uppercase font-bold text-[var(--text-secondary)] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[var(--accent)]" />
              Cross-Jurisdictional Intelligence Graph
            </span>
            <span className="text-[11px] font-mono text-[var(--success)] font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Provenance Verified
            </span>
          </div>

          <div className="h-64 rounded-xl bg-[var(--background)] flex items-center justify-center p-4 relative overflow-hidden border border-[var(--border)]">
            <div className="text-center space-y-4 max-w-lg">
              <p className="text-[13px] font-semibold text-[var(--text-secondary)]">
                Cross-Case Link Topology
              </p>
              
              <div className="grid grid-cols-3 gap-4 items-center font-mono text-[12px]">
                <div className="p-2.5 rounded-xl bg-[var(--primary)] text-white font-bold shadow-sm">
                  CASE-2049<br />
                  <span className="text-[10px] font-normal">Sector 7 Extortion</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-[var(--accent)] font-bold mb-1">SHARED ENTITY</span>
                  <div className="p-2.5 rounded-xl bg-[var(--accent)] text-white font-bold shadow-md w-full">
                    R. Malhotra
                  </div>
                  <span className="text-[9px] text-[var(--text-secondary)] mt-1">+91 98765-43210</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#3B5C8A] text-white font-bold shadow-sm">
                  CASE-2011<br />
                  <span className="text-[10px] font-normal">Digital Wallet</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[var(--text-secondary)] pt-2 border-t border-[var(--divider)]">
                <span>Also linked to</span>
                <span className="px-2 py-0.5 rounded bg-[var(--surface-hover)] border border-[var(--border)] font-bold text-[var(--text-primary)]">
                  CASE-1988 (Riverside Smuggling)
                </span>
                <span>via Warehouse 12B</span>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[var(--divider)] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[var(--primary)] text-white font-semibold text-[14px] hover:bg-[var(--primary-hover)] transition-colors"
          >
            Close Intelligence View
          </button>
        </div>

      </div>
    </div>
  );
}
