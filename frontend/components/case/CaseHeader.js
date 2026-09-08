"use client";

import Link from 'next/link';
import { ArrowLeft, Users, Clock, Share2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function CaseHeader({ caseItem, linkCount = 25 }) {
  const metrics = [
    {
      value: caseItem.entities || 142,
      label: "ENTITIES",
      icon: Users,
      color: "var(--primary)",
    },
    {
      value: caseItem.events || 38,
      label: "EVIDENCE EVENTS",
      icon: Clock,
      color: "var(--primary)",
    },
    {
      value: linkCount,
      label: "RELATIONSHIPS",
      icon: Share2,
      color: "var(--primary)",
    },
    {
      value: `0${caseItem.anomalies || 3}`,
      label: "ANOMALIES",
      icon: AlertTriangle,
      color: "var(--warning)",
      accent: true,
    },
  ];

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl shadow-sm">

      {/* Top row: breadcrumb + integrity badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Investigations</span>
        </Link>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--success)] bg-[var(--success)]/8 px-2.5 py-1 rounded-full border border-[var(--success)]/20">
          <ShieldCheck className="w-3 h-3" />
          <span>SHA-256 Provenance Verified</span>
        </div>
      </div>

      {/* Case ID + Title */}
      <div className="flex flex-col lg:flex-row lg:items-end gap-5 justify-between">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-mono font-semibold px-2.5 py-0.5 rounded bg-[var(--primary)]/12 text-[var(--primary)] border border-[var(--primary)]/20 tracking-widest">
              {caseItem.id}
            </span>
            <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
              Updated {caseItem.updated || "10 mins ago"}
            </span>
          </div>

          <h1 className="text-[22px] sm:text-[26px] font-semibold text-[var(--text-primary)] tracking-tight leading-snug">
            {caseItem.name}
          </h1>

          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            {caseItem.description}
          </p>
        </div>

        {/* Compact metric strip */}
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-px shrink-0">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            const isFirst = i === 0;
            const isLast = i === metrics.length - 1;
            return (
              <div
                key={m.label}
                className={`
                  flex flex-col items-center justify-center px-5 py-3 bg-[var(--surface-hover)]/60
                  border border-[var(--border)] min-w-[80px]
                  ${isFirst ? "rounded-l-xl" : ""}
                  ${isLast ? "rounded-r-xl" : "border-l-0"}
                  ${!isFirst && !isLast ? "border-l-0" : ""}
                `}
              >
                <Icon
                  className="w-3.5 h-3.5 mb-1"
                  style={{ color: m.color, opacity: 0.7 }}
                />
                <span
                  className="text-[20px] font-semibold leading-none"
                  style={{ color: m.accent ? "var(--warning)" : "var(--text-primary)" }}
                >
                  {m.value}
                </span>
                <span className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest mt-1 text-center leading-tight">
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
