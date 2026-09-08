"use client";

import React, { useState } from "react";
import { FileCheck, ShieldCheck, CheckCircle2, Lock, Key, Copy, RefreshCw, FileText } from "lucide-react";
import { EVIDENCE_ITEMS } from "@/lib/mock/evidence";

export default function IntegrityPanel() {
  const [copiedHash, setCopiedHash] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleCopyHash = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleReverifyAll = () => {
    setIsVerifying(true);
    setTimeout(() => setIsVerifying(false), 1200);
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl glass border border-[var(--border)] bg-[var(--surface)]/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Cryptographic Integrity & Custody Audit</span>
          </div>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Evidence Hash Integrity & Provenance Ledger
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Guarantees legal admissibility through immutable SHA-256 checksums and automated chain of custody auditing.
          </p>
        </div>

        <button
          onClick={handleReverifyAll}
          disabled={isVerifying}
          className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 font-mono text-xs font-bold transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? "animate-spin" : ""}`} />
          <span>{isVerifying ? "Verifying SHA-256..." : "Re-Verify All Artifacts"}</span>
        </button>
      </div>

      {/* System Integrity Metric Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl glass border border-[var(--border)] bg-[var(--surface)]/60 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase">HASH STATUS</div>
            <div className="text-sm font-bold text-emerald-400">100% Unaltered</div>
          </div>
        </div>

        <div className="p-4 rounded-xl glass border border-[var(--border)] bg-[var(--surface)]/60 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[var(--primary)]/15 text-[var(--primary)] border border-[var(--primary)]/30">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase">ALGORITHM</div>
            <div className="text-sm font-bold text-[var(--text-bright)]">SHA-256 Standard</div>
          </div>
        </div>

        <div className="p-4 rounded-xl glass border border-[var(--border)] bg-[var(--surface)]/60 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase">AUDITED FILES</div>
            <div className="text-sm font-bold text-[var(--text-bright)]">{EVIDENCE_ITEMS.length} Artifacts</div>
          </div>
        </div>
      </div>

      {/* Evidence Integrity Table */}
      <div className="p-5 rounded-xl glass border border-[var(--border)] bg-[var(--surface)]/80 space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] flex items-center justify-between">
          <span>Cryptographic Manifest & Chain of Custody</span>
          <span className="text-emerald-400 flex items-center gap-1 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> All Hashes Verified
          </span>
        </div>

        <div className="space-y-3">
          {EVIDENCE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-all flex flex-col gap-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded bg-[var(--surface)] text-[var(--primary)] border border-[var(--border)] font-mono text-xs font-bold">
                    {item.id}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[var(--text-primary)]">{item.title}</h4>
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                      {item.type} • {item.fileSize} • Uploaded {item.uploadedAt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {item.integrityStatus}
                  </span>
                </div>
              </div>

              {/* SHA-256 Hash Display */}
              <div className="p-2.5 rounded bg-[var(--surface-dark)] border border-[var(--border)] flex items-center justify-between font-mono text-[11px] gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Key className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                  <span className="text-[var(--text-secondary)] font-mono truncate">{item.sha256}</span>
                </div>
                <button
                  onClick={() => handleCopyHash(item.sha256)}
                  className="px-2 py-1 rounded bg-[var(--surface)] text-[var(--text-secondary)] hover:text-white text-[10px] transition-colors shrink-0 flex items-center gap-1 border border-[var(--border)]"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedHash === item.sha256 ? "Copied!" : "Copy Hash"}</span>
                </button>
              </div>

              {/* Custody Chain */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-tertiary)] overflow-x-auto py-1">
                <span className="uppercase text-[var(--text-secondary)] shrink-0">Custody Chain:</span>
                {item.custodyChain.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] shrink-0">
                      {step}
                    </span>
                    {idx < item.custodyChain.length - 1 && <span className="text-[var(--primary)] shrink-0">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
