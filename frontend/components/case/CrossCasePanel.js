"use client";

import React, { useState } from "react";
import { Search, Link2, ArrowRight } from "lucide-react";
import { CROSS_CASE_DATA } from "@/lib/mock/crossCase";

export default function CrossCasePanel() {
  const [filterQuery, setFilterQuery] = useState("");

  const linkedCases = CROSS_CASE_DATA.linkedCases.filter((c) => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return c.id.toLowerCase().includes(q) || c.title.toLowerCase().includes(q);
  });

  return (
    <div className="p-6 space-y-5 max-w-5xl mx-auto">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[var(--primary)] uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" />
            <span>Cross-Case Intelligence</span>
          </div>
          <h2 className="text-[17px] font-semibold text-[var(--text-primary)]">
            Multi-Case Entity Correlation
          </h2>
          <p className="text-[12px] text-[var(--text-secondary)]">
            Shared suspects, indicators, and organizations identified across independent investigations.
          </p>
        </div>

        <div className="relative w-full sm:w-60 shrink-0">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Filter by case or role…"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] font-mono transition-colors placeholder:text-[var(--text-tertiary)]"
          />
        </div>
      </div>

      {/* ── Shared entity nexus ── */}
      <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl">
        <div className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
          Shared Entity Nexus
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-[15px] font-semibold text-[var(--text-primary)]">
              {CROSS_CASE_DATA.targetEntity.name}
            </h3>
            <p className="text-[11px] font-mono text-[var(--text-tertiary)]">
              Alias: "{CROSS_CASE_DATA.targetEntity.alias}" · {CROSS_CASE_DATA.targetEntity.role}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CROSS_CASE_DATA.sharedIndicators.map((ind, i) => (
              <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[11px] font-mono">
                <span className="text-[var(--text-tertiary)]">{ind.label}:</span>
                <span className="font-semibold text-[var(--text-secondary)]">{ind.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Linked cases grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {linkedCases.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl hover:border-[var(--primary)]/30 transition-all flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold text-[var(--primary)] uppercase tracking-wider">
                  {c.id}
                </span>
                <h3 className="text-[13px] font-semibold text-[var(--text-primary)] mt-0.5 leading-snug">
                  {c.title}
                </h3>
              </div>
              <span
                className={`px-2 py-px rounded text-[9px] font-mono font-bold shrink-0 ${
                  c.confidence >= 90
                    ? "bg-emerald-500/12 text-emerald-500 border border-emerald-500/20"
                    : "bg-amber-500/12 text-amber-400 border border-amber-500/20"
                }`}
              >
                {c.confidence}%
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)]">
              <div className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase flex items-center gap-1 mb-1">
                <Link2 className="w-3 h-3 text-[var(--primary)]" /> Role in Case
              </div>
              <div className="text-[12px] font-semibold text-[var(--text-primary)]">{c.role}</div>
            </div>

            <div className="mt-auto flex items-center justify-between text-[10px]">
              <span className="font-mono text-[var(--text-tertiary)]">Logged {c.date}</span>
              <button className="font-mono font-semibold text-[var(--primary)] hover:underline underline-offset-2 flex items-center gap-1">
                View Case <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Shared indicators detail ── */}
      <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl space-y-3">
        <h3 className="text-[13px] font-semibold text-[var(--text-primary)]">Shared Indicators</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CROSS_CASE_DATA.sharedIndicators.map((ind, i) => (
            <div key={i} className="p-3 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)]">
              <div className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-1">{ind.label}</div>
              <div className="text-[12px] font-semibold text-[var(--text-primary)] font-mono">{ind.value}</div>
              <div className="text-[10px] text-[var(--text-tertiary)] mt-1">
                Appears in {CROSS_CASE_DATA.linkedCases.length} cases
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
