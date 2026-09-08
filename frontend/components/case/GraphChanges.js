"use client";

import React, { useState } from "react";
import { GitBranch, PlusCircle, MinusCircle, RefreshCw, CheckCircle2, ArrowRight, Shield } from "lucide-react";
import { GRAPH_SNAPSHOTS } from "@/lib/mock/graphSnapshots";

export default function GraphChanges() {
  const [selectedSnapshot, setSelectedSnapshot] = useState(3); // Default to latest change diff

  const changesList = [
    {
      id: "DIFF-001",
      date: "2024-09-01",
      title: "Offshore Dubai Connections Ingested",
      type: "Addition",
      addedNodes: ["Zenith Capital FZ-LLC (Offshore Trust)", "Klaus Weber (Nominee Director)"],
      addedLinks: ["Apex Global -> Zenith Capital ($450k SWIFT)", "Klaus Weber -> Zenith Capital (Proxy Authorization)"],
      confidence: 96,
      source: "SWIFT Ledger EVID-2024-002"
    },
    {
      id: "DIFF-002",
      date: "2024-08-20",
      title: "Maritime Freight Disparity Matched",
      type: "Addition",
      addedNodes: ["Bill of Lading #BOL-992 (Evidence Document)"],
      addedLinks: ["Bill of Lading #BOL-992 -> Blue Wave Import/Export", "Bill of Lading #BOL-992 -> Customs Terminal 4"],
      confidence: 98,
      source: "Customs Intercept EVID-2024-003"
    },
    {
      id: "DIFF-003",
      date: "2024-08-14",
      title: "Burner Relay Signal Analysis",
      type: "Addition",
      addedNodes: ["+1 (555) 014-9921 (Encrypted Comms)"],
      addedLinks: ["Burner Line -> Encrypted Comms Relay", "Elena Rostova -> Encrypted Comms"],
      confidence: 92,
      source: "Telecom CDR EVID-2024-004"
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl glass border border-[var(--border)] bg-[var(--surface)]/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--primary)] uppercase tracking-wider">
            <GitBranch className="w-4 h-4 text-[var(--primary)] shrink-0" />
            <span>Graph Changes & Evolution Log</span>
          </div>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Temporal Graph Differential & Ingestion Audit
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Tracks structural graph modifications, newly resolved entities, and edge creation across pipeline ingestion runs.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3 py-1.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-xs font-mono text-[var(--text-secondary)] flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: "12s" }} />
            <span>Auto-Diff Active</span>
          </div>
        </div>
      </div>

      {/* Snapshot Replay Slider Summary */}
      <div className="p-4 rounded-xl glass border border-[var(--border)] bg-[var(--surface)]/60 space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] flex items-center justify-between">
          <span>Historical Snapshots</span>
          <span className="text-[var(--primary)] font-semibold">5 Snapshots Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {GRAPH_SNAPSHOTS.map((snap, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedSnapshot(idx)}
              className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                selectedSnapshot === idx
                  ? "bg-[var(--primary)]/20 border-[var(--primary)] text-white shadow-md"
                  : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
              }`}
            >
              <div className="text-[10px] font-mono text-[var(--text-tertiary)]">{snap.date}</div>
              <div className="text-xs font-semibold mt-1 line-clamp-1">{snap.label}</div>
              <div className="text-[10px] font-mono text-[var(--primary)] mt-2 font-bold">
                {snap.nodesCount} Nodes / {snap.linksCount} Links
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Changes Timeline List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
          <span>Detailed Ingestion Log</span>
        </h3>

        <div className="space-y-3">
          {changesList.map((change) => (
            <div
              key={change.id}
              className="p-4 rounded-xl glass border border-[var(--border)] bg-[var(--surface)]/80 hover:border-[var(--border-strong)] transition-all flex flex-col gap-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)]/60 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <PlusCircle className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-primary)]">{change.title}</h4>
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                      {change.id} • Recorded {change.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/30">
                    {change.confidence}% Confidence
                  </span>
                </div>
              </div>

              {/* Added Nodes & Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)]/50 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] flex items-center gap-1.5">
                    <PlusCircle className="w-3 h-3 text-emerald-400" /> Resolved Entities Added
                  </div>
                  <ul className="space-y-1 text-[var(--text-secondary)] font-mono text-[11px]">
                    {change.addedNodes.map((node, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{node}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)]/50 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-[var(--primary)]" /> Established Relationships
                  </div>
                  <ul className="space-y-1 text-[var(--text-secondary)] font-mono text-[11px]">
                    {change.addedLinks.map((link, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                        <span>{link}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-[10px] font-mono text-[var(--text-tertiary)] flex items-center justify-between pt-1">
                <span>Verified Source: <strong className="text-[var(--text-secondary)]">{change.source}</strong></span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Graph Cryptographically Hashed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
