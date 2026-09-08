"use client";

import React, { useState } from "react";
import {
  Clock, AlertTriangle, CheckCircle2, ChevronRight,
  GitBranch, PlusCircle, ArrowRight, RefreshCw, Zap
} from "lucide-react";
import { TIMELINE } from "@/lib/mock/timeline";
import { GRAPH_SNAPSHOTS } from "@/lib/mock/graphSnapshots";

// ─── Severity badge ─────────────────────────────────────────
function SeverityBadge({ level }) {
  if (level === "high")
    return <span className="px-2 py-px rounded text-[10px] font-mono font-bold bg-red-500/10 text-[var(--danger)] border border-red-500/20">Critical</span>;
  if (level === "medium")
    return <span className="px-2 py-px rounded text-[10px] font-mono font-bold bg-amber-500/10 text-[var(--warning)] border border-amber-500/20">Moderate</span>;
  return <span className="px-2 py-px rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-[var(--success)] border border-emerald-500/20">Low</span>;
}

// ─── Graph change entries (derived from GRAPH_SNAPSHOTS) ─────
const GRAPH_CHANGES = [
  {
    id: "GC-003",
    date: "Sep 01 2026",
    title: "Offshore Dubai Connections Ingested",
    addedEntities: ["Zenith Capital FZ-LLC", "Klaus Weber (Nominee Director)"],
    addedRelationships: ["Apex Global → Zenith Capital ($450k SWIFT)", "Klaus Weber → Zenith Capital (Proxy Auth)"],
    addedAnomalies: ["Unusual offshore crypto conversion"],
    confidence: 96,
    source: "EVID-2024-002 — SWIFT Ledger",
  },
  {
    id: "GC-002",
    date: "Aug 20 2026",
    title: "Maritime Freight Disparity Matched",
    addedEntities: ["Bill of Lading #BOL-992"],
    addedRelationships: ["BOL-992 → Blue Wave Import/Export", "BOL-992 → Customs Terminal 4"],
    addedAnomalies: [],
    confidence: 98,
    source: "EVID-2024-003 — Customs Intercept",
  },
  {
    id: "GC-001",
    date: "Aug 14 2026",
    title: "Burner Relay Signal Analysis",
    addedEntities: ["+1 (555) 014-9921 (Encrypted Comms)"],
    addedRelationships: ["Burner Line → Encrypted Comms Relay", "Elena Rostova → Encrypted Comms"],
    addedAnomalies: ["Call spike pattern — 80+ calls in 6 hrs"],
    confidence: 92,
    source: "EVID-2024-004 — Telecom CDR",
  },
];

export default function TimelineChangesPage({ onSelectEntity }) {
  const [activeTab, setActiveTab] = useState("timeline"); // "timeline" | "changes"
  const [selectedSnapshot, setSelectedSnapshot] = useState(4);

  return (
    <div className="p-6 space-y-5 max-w-5xl mx-auto">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[var(--primary)] uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Investigation Chronology</span>
          </div>
          <h2 className="text-[17px] font-semibold text-[var(--text-primary)]">
            Timeline & Graph Evolution
          </h2>
          <p className="text-[12px] text-[var(--text-secondary)]">
            Chronological case activity and structural changes to the investigation graph.
          </p>
        </div>

        {/* Tab toggle */}
        <div className="flex rounded-lg border border-[var(--border)] overflow-hidden bg-[var(--surface-hover)] p-0.5 gap-0.5 shrink-0">
          {[
            { id: "timeline", label: "Timeline", icon: Clock },
            { id: "changes",  label: "Graph Changes", icon: GitBranch },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-all
                ${activeTab === id
                  ? "bg-[var(--primary)] text-white shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }
              `}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── TIMELINE TAB ── */}
      {activeTab === "timeline" && (
        <div className="space-y-3">
          {/* Summary strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "TOTAL EVENTS", value: TIMELINE.length, color: "var(--primary)" },
              { label: "CRITICAL", value: TIMELINE.filter(e => e.severity === "high").length, color: "var(--danger)" },
              { label: "MODERATE", value: TIMELINE.filter(e => e.severity === "medium").length, color: "var(--warning)" },
              { label: "DATE RANGE", value: "Aug–Sep 2026", color: "var(--text-secondary)" },
            ].map(m => (
              <div key={m.label} className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl">
                <div className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-1">{m.label}</div>
                <div className="text-[16px] font-semibold" style={{ color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>

          {/* Timeline events — vertical list */}
          <div className="relative pl-6 space-y-3">
            {/* Vertical line */}
            <div className="absolute left-2 top-3 bottom-3 w-px bg-[var(--divider)]" />

            {[...TIMELINE].reverse().map((event) => (
              <div key={event.id} className="relative">
                {/* Dot */}
                <div
                  className={`absolute -left-5 w-3 h-3 rounded-full border-2 border-[var(--surface)] mt-3.5 shadow-sm ${
                    event.severity === "high"
                      ? "bg-[var(--danger)]"
                      : event.severity === "medium"
                        ? "bg-[var(--warning)]"
                        : "bg-[var(--success)]"
                  }`}
                />

                <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl hover:border-[var(--primary)]/30 transition-all space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-[var(--text-tertiary)]">{event.date}</span>
                    <SeverityBadge level={event.severity} />
                  </div>

                  <h4 className="text-[13px] font-semibold text-[var(--text-primary)]">{event.title}</h4>
                  <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">{event.description}</p>

                  {event.entities?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-[var(--divider)]">
                      <span className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase self-center">Entities:</span>
                      {event.entities.map((entId) => (
                        <button
                          key={entId}
                          onClick={() => onSelectEntity?.(entId)}
                          className="px-2 py-px rounded text-[11px] font-mono font-semibold bg-[var(--surface-hover)] text-[var(--primary)] border border-[var(--border)] hover:bg-[var(--primary)] hover:text-white transition-colors"
                        >
                          {entId}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── GRAPH CHANGES TAB ── */}
      {activeTab === "changes" && (
        <div className="space-y-5">
          {/* Snapshot Selector */}
          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-[var(--primary)]" />
                Graph State Replay
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--primary)] font-semibold">
                <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: "12s" }} />
                Auto-Diff Active
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {GRAPH_SNAPSHOTS.map((snap, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSnapshot(idx)}
                  className={`p-3 rounded-lg border text-left transition-all flex flex-col gap-1 ${
                    selectedSnapshot === idx
                      ? "bg-[var(--primary)]/12 border-[var(--primary)] shadow-sm"
                      : "bg-[var(--surface-hover)] border-[var(--border)] hover:border-[var(--primary)]/30"
                  }`}
                >
                  <div className="text-[9px] font-mono text-[var(--text-tertiary)]">{snap.date}</div>
                  <div className="text-[11px] font-semibold text-[var(--text-primary)] line-clamp-2 leading-snug">{snap.label}</div>
                  <div className="text-[9px] font-mono text-[var(--primary)] font-bold mt-1">
                    {snap.nodesCount}N / {snap.linksCount}E
                  </div>
                </button>
              ))}
            </div>

            {/* Selected snapshot description */}
            <div className="px-3 py-2 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[12px] text-[var(--text-secondary)]">
              {GRAPH_SNAPSHOTS[selectedSnapshot]?.description}
            </div>
          </div>

          {/* Change log entries */}
          <div className="space-y-3">
            <h3 className="text-[13px] font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[var(--primary)]" />
              Ingestion Change Log
            </h3>

            {GRAPH_CHANGES.map((change) => (
              <div
                key={change.id}
                className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--divider)]">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shrink-0">
                      <PlusCircle className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-[var(--text-primary)]">{change.title}</h4>
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{change.id} · {change.date}</span>
                    </div>
                  </div>
                  <span className="px-2 py-px rounded text-[10px] font-mono font-bold bg-[var(--primary)]/12 text-[var(--primary)] border border-[var(--primary)]/20 shrink-0">
                    {change.confidence}% Confidence
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
                  <div className="p-3 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] space-y-1.5">
                    <div className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                      <PlusCircle className="w-3 h-3" /> New Entities
                    </div>
                    {change.addedEntities.map((e, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        {e}
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] space-y-1.5">
                    <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--primary)] flex items-center gap-1">
                      <ArrowRight className="w-3 h-3" /> Relationships
                    </div>
                    {change.addedRelationships.map((r, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0" />
                        {r}
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] space-y-1.5">
                    <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--warning)] flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Anomalies
                    </div>
                    {change.addedAnomalies.length > 0
                      ? change.addedAnomalies.map((a, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--warning)] shrink-0" />
                            {a}
                          </div>
                        ))
                      : <span className="text-[var(--text-tertiary)]">None detected</span>
                    }
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-tertiary)] pt-1">
                  <span>Source: <strong className="text-[var(--text-secondary)]">{change.source}</strong></span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Graph Integrity Hashed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
