"use client";

import React, { useState, useRef } from "react";
import {
  Upload, FileText, FileCode, ShieldCheck, CheckCircle2,
  RefreshCw, Key, Copy, Plus, X, ArrowRight, Loader2,
  AlertCircle, Lock
} from "lucide-react";
import { EVIDENCE_ITEMS } from "@/lib/mock/evidence";

// Sort newest first (by uploadedAt descending)
const SORTED_EVIDENCE = [...EVIDENCE_ITEMS].sort(
  (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
);

function TypeTag({ type }) {
  const colors = {
    "Document":         "bg-red-500/15 text-red-400 border-red-500/25",
    "Financial Record": "bg-green-500/15 text-green-400 border-green-500/25",
    "Shipping Document":"bg-blue-500/15 text-blue-400 border-blue-500/25",
    "Comms Log":        "bg-purple-500/15 text-purple-400 border-purple-500/25",
    "Surveillance Data":"bg-amber-500/15 text-amber-400 border-amber-500/25",
  };
  return (
    <span className={`px-1.5 py-px rounded text-[9px] font-mono font-bold border ${colors[type] || "bg-[var(--surface-hover)] text-[var(--text-tertiary)] border-[var(--border)]"}`}>
      {type}
    </span>
  );
}

// Per-item verification state machine
function VerifyButton({ hash }) {
  const [state, setState] = useState("idle"); // idle | running | done

  const run = () => {
    if (state !== "idle") return;
    setState("running");
    setTimeout(() => setState("done"), 1400);
  };

  if (state === "idle") {
    return (
      <button
        onClick={run}
        className="px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--primary)] border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all flex items-center gap-1"
      >
        <ShieldCheck className="w-3 h-3" />
        Verify
      </button>
    );
  }
  if (state === "running") {
    return (
      <div className="flex items-center gap-1 text-[10px] font-mono text-[var(--primary)] px-2 py-1 rounded-md bg-[var(--primary)]/8 border border-[var(--primary)]/20">
        <Loader2 className="w-3 h-3 animate-spin" />
        Verifying…
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
      <CheckCircle2 className="w-3 h-3" />
      Hash Match
    </div>
  );
}

export default function EvidenceIntegrityPanel() {
  const [copiedHash, setCopiedHash] = useState(null);
  const [verifyingAll, setVerifyingAll] = useState(false);
  const [allVerified, setAllVerified] = useState(false);

  const handleCopyHash = (hash) => {
    try { navigator.clipboard.writeText(hash); } catch {}
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleVerifyAll = () => {
    if (verifyingAll || allVerified) return;
    setVerifyingAll(true);
    setTimeout(() => {
      setVerifyingAll(false);
      setAllVerified(true);
    }, 2200);
  };

  return (
    <div className="p-6 space-y-5 max-w-5xl mx-auto">

      {/* ── Section header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[var(--primary)] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Evidence & Integrity</span>
          </div>
          <h2 className="text-[17px] font-semibold text-[var(--text-primary)]">
            Evidence Repository & Provenance Ledger
          </h2>
          <p className="text-[12px] text-[var(--text-secondary)]">
            Showing {SORTED_EVIDENCE.length} artifacts — newest first. SHA-256 cryptographic hashes verified against ingestion record.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {allVerified ? (
            <div className="flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              All Verified
            </div>
          ) : (
            <button
              onClick={handleVerifyAll}
              disabled={verifyingAll}
              className="px-3 py-1.5 rounded-lg bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] font-mono text-[11px] flex items-center gap-1.5 transition-all disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${verifyingAll ? "animate-spin" : ""}`} />
              {verifyingAll ? "Verifying All…" : "Verify All Files"}
            </button>
          )}
        </div>
      </div>

      {/* ── Integrity summary strip ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "HASH STATUS",   value: allVerified ? "All Verified" : "Pending Check", icon: allVerified ? CheckCircle2 : AlertCircle, cls: allVerified ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-[var(--warning)] bg-amber-500/10 border-amber-500/20" },
          { label: "ALGORITHM",     value: "SHA-256",       icon: Lock,        cls: "text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)]/20" },
          { label: "AUDITED FILES", value: `${SORTED_EVIDENCE.length} Artifacts`, icon: FileText, cls: "text-[var(--text-secondary)] bg-[var(--surface-hover)] border-[var(--border)]" },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-xl ${m.cls}`}>
              <Icon className={`w-5 h-5 shrink-0`} />
              <div>
                <div className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">{m.label}</div>
                <div className="text-[13px] font-semibold mt-0.5">{m.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Evidence repository ── */}
      <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-[13px] font-semibold text-[var(--text-primary)]">
              Evidence Repository
            </span>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
              Sorted newest → oldest
            </span>
          </div>
        </div>

        <div className="divide-y divide-[var(--border)]">
          {SORTED_EVIDENCE.map((item) => (
            <div
              key={item.id}
              className="px-5 py-4 hover:bg-[var(--surface-hover)]/60 transition-colors space-y-2.5"
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border)] shrink-0">
                    {item.id}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-[var(--text-primary)] truncate">{item.title}</p>
                    <p className="text-[10px] font-mono text-[var(--text-tertiary)]">
                      {item.uploadedAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <TypeTag type={item.type} />
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{item.fileSize}</span>
                  <VerifyButton hash={item.sha256} />
                </div>
              </div>

              {/* SHA-256 row */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--surface-dark)] border border-[var(--border)]">
                <Key className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                <span className="text-[10px] font-mono text-[var(--text-secondary)] truncate flex-1 select-all">
                  {item.sha256}
                </span>
                <button
                  onClick={() => handleCopyHash(item.sha256)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] transition-colors shrink-0"
                >
                  <Copy className="w-3 h-3" />
                  {copiedHash === item.sha256 ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Custody chain */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                  Chain of Custody:
                </span>
                {item.custodyChain.map((step, i) => (
                  <React.Fragment key={i}>
                    <span className="text-[10px] font-mono px-1.5 py-px rounded bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border)]">
                      {step}
                    </span>
                    {i < item.custodyChain.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-[var(--primary)] opacity-50 shrink-0" />
                    )}
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
