"use client";

import React, { useState } from "react";
import { Sparkles, FileText, Download, Copy, CheckCircle2, ShieldAlert, ArrowRight, Printer } from "lucide-react";
import { INVESTIGATION_BRIEF } from "@/lib/mock/brief";

export default function InvestigationBrief() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 1500);
  };

  const handleCopy = () => {
    const text = `${INVESTIGATION_BRIEF.title}\n\nEXECUTIVE SUMMARY:\n${INVESTIGATION_BRIEF.executiveSummary}\n\nKEY FINDINGS:\n${INVESTIGATION_BRIEF.keyFindings.map(k => `- ${k.title}: ${k.content}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl glass border border-[var(--border)] bg-[var(--surface)]/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--primary)] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[var(--primary)] shrink-0" />
            <span>Autonomous Intelligence Brief Synthesizer</span>
          </div>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            AI Case Summary & Prosecution Brief
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Synthesizes entity resolution graphs, wiretap transcripts, and SWIFT ledgers into actionable executive briefs.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-4 py-2 rounded-lg bg-[var(--primary)] text-black font-mono text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
            <span>{isGenerating ? "Synthesizing..." : "Re-Synthesize Brief"}</span>
          </button>
        </div>
      </div>

      {/* Brief Document Container */}
      <div className="p-6 sm:p-8 rounded-xl glass border border-[var(--border-strong)] bg-[var(--surface-dark)]/95 shadow-2xl space-y-6 text-xs font-sans text-[var(--text-primary)]">
        {/* Document Header */}
        <div className="border-b border-[var(--border)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--primary)] font-bold">
              CRIMENET AI • OFFICIAL INTELLIGENCE BRIEF
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white mt-1">
              {INVESTIGATION_BRIEF.title}
            </h1>
            <div className="text-[10px] font-mono text-[var(--text-tertiary)] mt-1">
              CASE REFERENCE: {INVESTIGATION_BRIEF.caseId} • GENERATED AT {INVESTIGATION_BRIEF.generatedAt}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="p-2 rounded-md bg-[var(--surface)] text-[var(--text-secondary)] hover:text-white border border-[var(--border)] transition-colors text-xs font-mono flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="p-2 rounded-md bg-[var(--surface)] text-[var(--text-secondary)] hover:text-white border border-[var(--border)] transition-colors text-xs font-mono flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase font-bold text-[var(--primary)] tracking-wider flex items-center gap-2">
            <span>1. Executive Summary</span>
          </h3>
          <p className="text-xs leading-relaxed text-[var(--text-secondary)] bg-[var(--surface)]/60 p-4 rounded-lg border border-[var(--border)]">
            {INVESTIGATION_BRIEF.executiveSummary}
          </p>
        </div>

        {/* Key Findings */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase font-bold text-[var(--primary)] tracking-wider flex items-center gap-2">
            <span>2. Key Evidentiary Findings</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {INVESTIGATION_BRIEF.keyFindings.map((finding, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] space-y-1.5"
              >
                <div className="font-bold text-[var(--text-bright)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)] shrink-0" />
                  <span>{finding.title}</span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  {finding.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Enforcement Actions */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase font-bold text-[var(--primary)] tracking-wider flex items-center gap-2">
            <span>3. Recommended Enforcement Actions</span>
          </h3>

          <div className="p-4 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/30 space-y-2">
            <ul className="space-y-2 font-mono text-[11px] text-[var(--text-bright)]">
              {INVESTIGATION_BRIEF.recommendedActions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--primary)] shrink-0 mt-0.5" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Evidence Citations */}
        <div className="space-y-2 border-t border-[var(--border)] pt-4">
          <h3 className="text-[10px] font-mono uppercase font-bold text-[var(--text-tertiary)] tracking-wider">
            Verified Evidence Citations
          </h3>
          <div className="flex flex-wrap gap-2">
            {INVESTIGATION_BRIEF.evidenceBacking.map((ev, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] text-[10px] font-mono"
              >
                {ev}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
