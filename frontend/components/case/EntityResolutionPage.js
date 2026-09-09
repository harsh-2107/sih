"use client";

import React from "react";
import { GitMerge, Check, AlertCircle, Info } from "lucide-react";
import { ENTITY_RESOLUTION_MATCHES } from "@/lib/mock/entityResolution";

// ─── Additional resolved entities for the "RESOLVED" section ──
const RESOLVED_ENTITIES = [
  {
    id: "res-1",
    canonical: "Victor Vance",
    aliases: ["V. Vance", "Red Jack", "Victor V."],
    confidence: 98.1,
    signals: [
      "Identical national ID hash across 3 evidence files",
      "Consistent biometric markers in surveillance data",
      "Shared alias confirmed by field unit intercept",
    ],
  },
  {
    id: "res-2",
    canonical: "Apex Global Trading",
    aliases: ["Apex Global", "Apex GT", "AGT Holdings"],
    confidence: 97.4,
    signals: [
      "Same company registration number across jurisdictions",
      "Shared bank account beneficiary ID",
      "Matching SWIFT routing code in three transactions",
    ],
  },
];

function ConfidenceBar({ value }) {
  const color =
    value >= 90 ? "bg-emerald-500" : value >= 75 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-[var(--divider)] overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-[11px] font-mono font-bold shrink-0" style={{
        color: value >= 90 ? "var(--success)" : value >= 75 ? "var(--warning)" : "var(--danger)"
      }}>
        {value}%
      </span>
    </div>
  );
}

export default function EntityResolutionPage() {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* ── Header ── */}
      <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl space-y-1">
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[var(--primary)] uppercase tracking-wider">
          <GitMerge className="w-3.5 h-3.5" />
          <span>Entity Resolution — BGE-m3 + HAC Algorithm</span>
        </div>
        <h2 className="text-[17px] font-semibold text-[var(--text-primary)]">
          Entity Resolution Analysis
        </h2>
        <p className="text-[12px] text-[var(--text-secondary)]">
          Entities from multiple evidence sources that have been identified as referring to the same real-world subject.
          Confidence scores are computed using phonetic matching, shared identifiers, and geographic overlap.
        </p>
      </div>

      {/* ── Read-only notice ── */}
      <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg bg-[var(--primary)]/6 border border-[var(--primary)]/15 text-[12px]">
        <Info className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
        <p className="text-[var(--text-secondary)]">
          This view shows the automated resolution analysis. Entity resolution decisions are made by the pipeline and are shown here for review only.
        </p>
      </div>

      {/* ── Section: Resolved Entities ── */}
      <div className="space-y-3">
        <h3 className="text-[13px] font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <Check className="w-4 h-4 text-[var(--success)]" />
          Resolved Entities
          <span className="text-[10px] font-mono text-[var(--text-tertiary)] font-normal">({RESOLVED_ENTITIES.length} canonical identities confirmed)</span>
        </h3>

        {RESOLVED_ENTITIES.map((entity) => (
          <div
            key={entity.id}
            className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-[14px] font-semibold text-[var(--text-primary)]">{entity.canonical}</h4>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {entity.aliases.map((a, i) => (
                    <span
                      key={i}
                      className="px-2 py-px rounded text-[10px] font-mono bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border)]"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/12 text-emerald-500 border border-emerald-500/20 shrink-0">
                RESOLVED
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                Resolution Confidence
              </div>
              <ConfidenceBar value={entity.confidence} />
            </div>

            <div className="space-y-1.5">
              <div className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                Supporting Signals
              </div>
              {entity.signals.map((sig, i) => (
                <div key={i} className="flex items-start gap-2 text-[12px] text-[var(--text-secondary)]">
                  <Check className="w-3.5 h-3.5 text-[var(--success)] shrink-0 mt-0.5" />
                  <span>{sig}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Section: Potential Matches (uncertain) ── */}
      <div className="space-y-3">
        <h3 className="text-[13px] font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[var(--warning)]" />
          Potential Matches — Pending Additional Evidence
          <span className="text-[10px] font-mono text-[var(--text-tertiary)] font-normal">
            ({ENTITY_RESOLUTION_MATCHES.length} candidate pairs)
          </span>
        </h3>

        {ENTITY_RESOLUTION_MATCHES.map((match) => (
          <div
            key={match.id}
            className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl space-y-3"
          >
            {/* Similarity header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--divider)]">
              <div className="text-[12px] font-mono text-[var(--text-secondary)]">
                Candidate Pair #{match.id.replace("er-", "")}
              </div>
              <span className="px-2 py-px rounded text-[10px] font-mono font-bold bg-amber-500/12 text-amber-500 border border-amber-500/20">
                {match.status}
              </span>
            </div>

            {/* Two candidates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { label: "Entity A", data: match.candidateA, cls: "border-[var(--border)]" },
                { label: "Entity B", data: match.candidateB, cls: "border-[var(--primary)]/20 bg-[var(--primary)]/4" },
              ].map(({ label, data, cls }) => (
                <div key={label} className={`p-3.5 rounded-xl bg-[var(--surface-hover)] border ${cls} space-y-1.5`}>
                  <span className="text-[9px] font-mono font-bold text-[var(--text-tertiary)] uppercase">{label}</span>
                  <h4 className="text-[14px] font-semibold text-[var(--text-primary)]">{data.name}</h4>
                  <div className="space-y-0.5 text-[11px] text-[var(--text-secondary)]">
                    <p>Source: <span className="font-mono">{data.sourceFile}</span></p>
                    <p>Phone: <span className="font-mono">{data.phone}</span></p>
                    <p>Location: {data.location}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Confidence */}
            <div className="space-y-1">
              <div className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                Similarity Score
              </div>
              <ConfidenceBar value={match.similarity} />
            </div>

            {/* Signals */}
            <div className="space-y-1.5">
              <div className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                Resolution Signals
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {match.signals.map((sig, i) => (
                  <div key={i} className="flex items-start gap-2 text-[12px] text-[var(--text-secondary)]">
                    <Check className="w-3.5 h-3.5 text-[var(--success)] shrink-0 mt-0.5" />
                    <span>{sig.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[10px] font-mono text-[var(--text-tertiary)] pt-1">
              Additional evidence required to confirm identity before graph merge.
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {}}
                      className="px-4 py-2 rounded-xl border border-[var(--border)] text-[11px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
                    >
                      Keep Separate
                    </button>
                    <button
                      type="button"
                      onClick={() => {}}
                      className="px-5 py-2 rounded-xl bg-[var(--primary)] text-white text-[11px] font-semibold hover:bg-[var(--primary-hover)] transition-colors shadow-sm flex items-center gap-2"
                    >
                      <GitMerge className="w-4 h-4" />
                      <span>Merge Entities</span>
                    </button>
                  </div>
          </div>
        ))}
      </div>
    </div>
  );
}
