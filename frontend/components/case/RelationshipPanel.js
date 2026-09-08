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
    <div className="absolute bottom-4 right-4 z-20 w-76 p-4 rounded-xl border border-white/20 bg-black/80 backdrop-blur-md shadow-2xl flex flex-col gap-3 text-xs text-white">

      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--primary)] uppercase tracking-wider">
          <Link2 className="w-4 h-4 shrink-0" />
          <span>Relationship Provenance</span>
        </div>
        <button
          onClick={onClose}
          className="text-white/40 hover:text-white transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Source → Target */}
      <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/10 gap-2">
        <div className="flex flex-col min-w-0">
          <span className="text-[9px] font-mono text-white/40 uppercase">Source</span>
          <span className="font-semibold text-white truncate">{sourceNode.name || sourceNode.id}</span>
        </div>
        <ArrowRight className="w-4 h-4 text-[var(--primary)] shrink-0" />
        <div className="flex flex-col min-w-0 text-right">
          <span className="text-[9px] font-mono text-white/40 uppercase">Target</span>
          <span className="font-semibold text-white truncate">{targetNode.name || targetNode.id}</span>
        </div>
      </div>

      {/* Relationship type & confidence */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-white/50">Relationship Type</span>
          <span className="font-mono font-bold text-white bg-[var(--primary)]/20 px-2 py-0.5 rounded border border-[var(--primary)]/30">
            {link.label || "Connected"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/50">Confidence Score</span>
          <span className="font-mono text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {link.confidence || 95}%
          </span>
        </div>
      </div>

      {/* Evidence citation */}
      {link.sourceEvidence && (
        <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/40 uppercase">
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
