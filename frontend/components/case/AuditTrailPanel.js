"use client";

import React, { useState } from "react";
import { Shield, CheckCircle2, FileText, Upload, Activity, Hash, Clock } from "lucide-react";

const AUDIT_EVENTS = [
  {
    id: "AUD-006",
    date: "Sep 07 2026",
    time: "16:30",
    type: "EVIDENCE VERIFIED",
    description: "SHA-256 integrity verification run on 6 evidence artifacts.",
    detail: "EVID-2024-001 through EVID-2024-006 — All cryptographic hashes verified.",
    icon: CheckCircle2,
    color: "var(--success)",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "AUD-005",
    date: "Sep 04 2026",
    time: "11:15",
    type: "GRAPH UPDATED",
    description: 'Evidence batch "Financial Records — September 2026" ingested and graph updated.',
    detail: "+4 entities, +7 relationships, +2 anomalies flagged, 1 entity resolved.",
    icon: Activity,
    color: "var(--primary)",
    bg: "bg-[var(--primary)]/10 border-[var(--primary)]/20",
  },
  {
    id: "AUD-004",
    date: "Sep 04 2026",
    time: "11:00",
    type: "EVIDENCE ADDED",
    description: 'Upload batch "Financial Records — September 2026" committed.',
    detail: "3 evidence artifacts committed: transaction_0907.csv, bank_statement.pdf, ledger_092.txt.",
    icon: Upload,
    color: "var(--primary)",
    bg: "bg-[var(--primary)]/10 border-[var(--primary)]/20",
  },
  {
    id: "AUD-003",
    date: "Aug 22 2026",
    time: "16:35",
    type: "GRAPH UPDATED",
    description: 'Evidence batch "Surveillance Batch 01" ingested and graph updated.',
    detail: "+6 entities, +11 relationships, +1 anomaly flagged.",
    icon: Activity,
    color: "var(--primary)",
    bg: "bg-[var(--primary)]/10 border-[var(--primary)]/20",
  },
  {
    id: "AUD-002",
    date: "Aug 22 2026",
    time: "16:30",
    type: "EVIDENCE ADDED",
    description: 'Upload batch "Surveillance Batch 01" committed.',
    detail: "4 evidence artifacts committed (ANPR Telemetry & Gate Logs).",
    icon: Upload,
    color: "var(--primary)",
    bg: "bg-[var(--primary)]/10 border-[var(--primary)]/20",
  },
  {
    id: "AUD-001",
    date: "Aug 01 2026",
    time: "08:00",
    type: "CASE CREATED",
    description: "Investigation CASE-2049 created.",
    detail: "Sector 7 Extortion Ring — Financial / Organized Crime.",
    icon: Shield,
    color: "var(--text-secondary)",
    bg: "bg-[var(--surface-hover)] border-[var(--border)]",
  },
];

export default function AuditTrailPanel() {
  return (
    <div className="p-6 space-y-5 max-w-4xl mx-auto">
      {/* ── Header ── */}
      <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl space-y-1">
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[var(--primary)] uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" />
          <span>Security Audit Trail</span>
        </div>
        <h2 className="text-[17px] font-semibold text-[var(--text-primary)]">
          Case Activity & Integrity Log
        </h2>
        <p className="text-[12px] text-[var(--text-secondary)]">
          Complete immutable audit history for CASE-2049. All evidence ingestions, graph updates, verifications and access events are recorded here.
        </p>
      </div>

      {/* ── Summary metrics ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "TOTAL EVENTS", value: AUDIT_EVENTS.length, color: "var(--text-primary)" },
          { label: "EVIDENCE LOGS", value: 4, color: "var(--primary)" },
          { label: "VERIFICATIONS", value: 1, color: "var(--success)" },
          { label: "INTEGRITY",     value: "100%", color: "var(--success)" },
        ].map(m => (
          <div key={m.label} className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl">
            <div className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-1">{m.label}</div>
            <div className="text-[18px] font-semibold" style={{ color: m.color }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* ── Audit timeline ── */}
      <div className="space-y-3">
        <h3 className="text-[12px] font-semibold text-[var(--text-primary)] font-mono uppercase tracking-wider text-[var(--text-secondary)]">
          Event Log — Newest First
        </h3>

        <div className="relative pl-6 space-y-3">
          {/* Vertical guide */}
          <div className="absolute left-2 top-3 bottom-3 w-px bg-[var(--divider)]" />

          {AUDIT_EVENTS.map((event) => {
            const Icon = event.icon;
            return (
              <div key={event.id} className="relative">
                {/* Icon dot */}
                <div
                  className={`absolute -left-5 w-5 h-5 rounded-full flex items-center justify-center border ${event.bg} mt-2`}
                >
                  <Icon className="w-2.5 h-2.5" style={{ color: event.color }} />
                </div>

                <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl hover:border-[var(--border-strong)] transition-colors">
                  {/* Top row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-px rounded text-[9px] font-mono font-bold border ${event.bg}`}
                        style={{ color: event.color }}
                      >
                        {event.type}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{event.id}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-[var(--text-tertiary)]">
                      <Clock className="w-3 h-3" />
                      {event.date} · {event.time}
                    </div>
                  </div>

                  <p className="text-[13px] font-medium text-[var(--text-primary)]">{event.description}</p>
                  <p className="text-[11px] text-[var(--text-secondary)] font-mono mt-1">{event.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mock blockchain note ── */}
      <div className="flex items-start gap-2 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] text-[11px] text-[var(--text-tertiary)]">
        <Hash className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        <span>
          Audit records are cryptographically hashed on a Hyperledger Fabric ledger. Transaction IDs shown are demonstration values for the prototype environment.
        </span>
      </div>
    </div>
  );
}
