"use client";

import { Shield, Target, FileText, CheckCircle2, User, Building, MapPin } from 'lucide-react';

export default function CaseSnapshot({ caseItem, onSelectEntity }) {
  const primaryTargets = [
    { id: "P1", name: "Victor Vance", type: "Primary Suspect", risk: "high" },
    { id: "P2", name: "Elena Rostova", type: "Financial Operator", risk: "high" },
    { id: "O1", name: "Apex Global Trading", type: "Shell Corporation", risk: "high" },
    { id: "L1", name: "Warehouse 12, Pier 9", type: "Meeting Location", risk: "high" },
  ];

  return (
    <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl shadow-lg space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--divider)]">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[var(--primary)]" />
          <h3 className="text-[14px] font-semibold text-[var(--text-primary)] tracking-wide">
            Case Snapshot &amp; Intelligence Brief
          </h3>
        </div>
        <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20">
          LIVE AGGREGATED
        </span>
      </div>

      {/* Primary Case Targets */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-[var(--danger)]" />
            Key Subject Targets ({primaryTargets.length})
          </span>
        </div>

        <div className="space-y-1.5">
          {primaryTargets.map((target) => (
            <button
              key={target.id}
              type="button"
              onClick={() => onSelectEntity && onSelectEntity(target.id)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] hover:border-[var(--primary)] transition-all group text-left"
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-semibold text-[var(--primary)] px-1.5 py-0.5 rounded bg-[var(--primary)]/10">
                  {target.id}
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                    {target.name}
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)]">{target.type}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-500/10 text-[var(--danger)] border border-red-500/20">
                {target.risk}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Provenance & Integrity Status */}
      <div className="p-3.5 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] space-y-2">
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[var(--primary)]" />
            Chain of Custody
          </span>
          <span className="font-mono text-[11px] text-[var(--success)] font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Immutable
          </span>
        </div>
        <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
          4 evidence logs ingested with SHA-256 checksums verified against Hyperledger audit trail.
        </p>
      </div>

    </div>
  );
}
