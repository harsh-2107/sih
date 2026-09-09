"use client";

import React from "react";
import { Link2, ArrowRight, FileText, CheckCircle2, X } from "lucide-react";

export default function RelationshipPanel({ link, nodeMap, onClose }) {
  if (!link) return null;

  const sourceNode = typeof link.source === "object"
    ? link.source
    : nodeMap?.get(link.source) || { id: link.source, name: link.source };
  const targetNode = typeof link.target === "object"
    ? link.target
    : nodeMap?.get(link.target) || { id: link.target, name: link.target };

  return (
    <div className="absolute bottom-4 right-4 z-20 w-76 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-md shadow-2xl flex flex-col gap-3 text-xs text-[var(--text-primary)]">

      <div className="flex items-center justify-between border-b border-[var(--divider)] pb-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--primary)] uppercase tracking-wider">
          <Link2 className="w-4 h-4 shrink-0" />
          <span>Relationship Provenance</span>
        </div>
        <button
          onClick={onClose}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Source → Target */}
      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] gap-2">
        <div className="flex flex-col min-w-0">
          <span className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase">Source</span>
          <span className="font-semibold text-[var(--text-primary)] truncate">{sourceNode.name || sourceNode.id}</span>
        </div>
        <ArrowRight className="w-4 h-4 text-[var(--primary)] shrink-0" />
        <div className="flex flex-col min-w-0 text-right">
          <span className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase">Target</span>
          <span className="font-semibold text-[var(--text-primary)] truncate">{targetNode.name || targetNode.id}</span>
        </div>
      </div>

      {/* Relationship type & confidence */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[var(--text-secondary)]">Relationship Type</span>
          <span className="font-mono font-bold text-[var(--primary)] bg-[var(--primary)]/15 px-2 py-0.5 rounded border border-[var(--primary)]/30">
            {link.label || "Connected"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[var(--text-secondary)]">Confidence Score</span>
          <span className="font-mono text-[var(--success)] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {link.confidence || 95}%
          </span>
        </div>
      </div>

      {/* Evidence citation */}
      {link.sourceEvidence && (
        <div className="p-2.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-[var(--text-tertiary)] uppercase">
            <FileText className="w-3 h-3 text-[var(--primary)]" /> Evidence Basis
          </div>
          <div className="font-mono text-[var(--primary)] font-semibold text-[11px]">
            {link.sourceEvidence}
          </div>
        </div>
      )}
    </div>
  );
}

