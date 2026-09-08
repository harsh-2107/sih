"use client";

import { Users, Clock, Share2, AlertTriangle } from 'lucide-react';

export default function CaseMetrics({ caseItem, linkCount = 18 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. Entities */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl shadow-sm hover:border-[var(--primary)]/40 transition-all">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[13px] font-medium text-[var(--text-secondary)]">Entities Mapped</span>
          <div className="p-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <p className="text-[30px] font-semibold leading-tight text-[var(--text-primary)]">
          {caseItem.entities || 142}
        </p>
        <p className="text-[12px] font-medium text-[var(--text-secondary)] mt-1">
          16 primary suspect nodes
        </p>
      </div>

      {/* 2. Evidence Events */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl shadow-sm hover:border-[var(--primary)]/40 transition-all">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[13px] font-medium text-[var(--text-secondary)]">Evidence Events</span>
          <div className="p-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <p className="text-[30px] font-semibold leading-tight text-[var(--text-primary)]">
          {caseItem.events || 38}
        </p>
        <p className="text-[12px] font-medium text-[var(--success)] mt-1">
          Latest: 02 Sep 2026
        </p>
      </div>

      {/* 3. Network Connections */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl shadow-sm hover:border-[var(--primary)]/40 transition-all">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[13px] font-medium text-[var(--text-secondary)]">Network Connections</span>
          <div className="p-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
            <Share2 className="w-4 h-4" />
          </div>
        </div>
        <p className="text-[30px] font-semibold leading-tight text-[var(--text-primary)]">
          {linkCount}
        </p>
        <p className="text-[12px] font-medium text-[var(--text-secondary)] mt-1">
          5 high-risk connections
        </p>
      </div>

      {/* 4. Detected Anomalies */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl shadow-sm hover:border-[var(--accent)]/40 transition-all">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[13px] font-medium text-[var(--text-secondary)]">Detected Anomalies</span>
          <div className="p-1.5 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <p className="text-[30px] font-semibold leading-tight text-[var(--accent)]">
          0{caseItem.anomalies || 3}
        </p>
        <p className="text-[12px] font-medium text-[var(--warning)] mt-1">
          94% max anomaly confidence
        </p>
      </div>

    </div>
  );
}
