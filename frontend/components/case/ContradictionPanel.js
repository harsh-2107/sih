"use client";

import React from "react";
import { Zap, AlertTriangle, CheckCircle2, ShieldAlert, FileText, ArrowRight } from "lucide-react";

export default function ContradictionPanel() {
  const contradictions = [
    {
      id: "CONF-001",
      title: "Warehouse Entry Timestamp Disparity",
      severity: "High",
      entityName: "Victor Vance & ANPR Camera Pier 9",
      sourceA: "EVID-2024-001 (Seized Corporate Register Log)",
      claimA: "Claims Victor Vance was present in Zurich, Switzerland on 2024-08-14 23:00 UTC.",
      sourceB: "EVID-2024-006 (Pier 9 Surveillance ANPR Telemetry)",
      claimB: "ANPR Camera #4 captured license plate 7XYZ89 (Victor Vance Black SUV) entering Pier 9 at 2024-08-14 22:45 UTC.",
      status: "Unresolved Conflict",
      recommendation: "Flag Zurich corporate log entries as potential falsification attempt."
    },
    {
      id: "CONF-002",
      title: "Customs Manifest Weight Disparity",
      severity: "High",
      entityName: "Bill of Lading #BOL-992 & Blue Wave Import",
      sourceA: "EVID-2024-003 (Port Customs Manifest #BOL-992)",
      claimA: "Declared shipment gross weight: 18.4 Metric Tons of electronic spare parts.",
      sourceB: "Customs Scale #2 Automated Inspection Record",
      claimB: "Automated weigh-bridge registered gross weight: 22.6 Metric Tons (4.2 Ton undeclared excess).",
      status: "Verified Contradiction",
      recommendation: "Issue search & seizure warrant for Container #BW-8891."
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Automated Evidence Contradiction Detector</span>
          </div>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Factual Conflicts & Discrepancies
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Algorithmic cross-validation highlights conflicting testimonies, temporal impossible co-locations, and weight disparities.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold flex items-center gap-2 shrink-0">
          <AlertTriangle className="w-4 h-4" />
          <span>2 Active Conflicts</span>
        </div>
      </div>

      {/* Contradiction Cards */}
      <div className="space-y-4">
        {contradictions.map((conf) => (
          <div
            key={conf.id}
            className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl hover:border-[var(--border-strong)] transition-all flex flex-col gap-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)]/60 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">{conf.title}</h3>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                    Conflict ID: {conf.id} • Target Entity: {conf.entityName}
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                {conf.severity} Severity
              </span>
            </div>

            {/* Side-by-side Evidence Statements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Claim A */}
              <div className="p-3.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] space-y-2">
                <div className="text-[10px] font-mono text-[var(--primary)] uppercase font-semibold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Evidence Source A
                </div>
                <div className="font-mono text-[11px] text-[var(--text-secondary)] font-semibold">
                  {conf.sourceA}
                </div>
                <p className="text-[11px] text-[var(--text-primary)] leading-relaxed bg-[var(--surface)] p-2 rounded border border-[var(--border)]">
                  "{conf.claimA}"
                </p>
              </div>

              {/* Claim B */}
              <div className="p-3.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] space-y-2">
                <div className="text-[10px] font-mono text-amber-400 uppercase font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Conflicting Evidence Source B
                </div>
                <div className="font-mono text-[11px] text-[var(--text-secondary)] font-semibold">
                  {conf.sourceB}
                </div>
                <p className="text-[11px] text-[var(--text-primary)] leading-relaxed bg-[var(--surface)] p-2 rounded border border-[var(--border)]">
                  "{conf.claimB}"
                </p>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="p-3 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[var(--text-primary)]">
                <ShieldAlert className="w-4 h-4 text-[var(--primary)] shrink-0" />
                <span>
                  <strong className="font-mono text-[var(--primary)]">AI Recommendation:</strong> {conf.recommendation}
                </span>
              </div>
              <button className="px-3 py-1 rounded bg-[var(--primary)] text-white font-mono font-bold text-[10px] hover:opacity-90 transition-opacity shrink-0">
                Mark Reviewed
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
