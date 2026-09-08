"use client";

import { FileText, ShieldCheck, Download, Lock, CheckCircle2, FileCode } from 'lucide-react';

export default function EvidencePanel() {
  const mockEvidenceFiles = [
    {
      id: "EV-801",
      name: "CDR_Wiretap_Logs_Aug2026.pdf",
      size: "4.2 MB",
      date: "14 Aug 2026",
      hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      status: "Verified",
    },
    {
      id: "EV-802",
      name: "Apex_Global_Wire_Intercept_8821.csv",
      size: "1.8 MB",
      date: "12 Aug 2026",
      hash: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
      status: "Verified",
    },
    {
      id: "EV-803",
      name: "Pier9_Warehouse12_Surveillance.mp4",
      size: "34.1 MB",
      date: "14 Aug 2026",
      hash: "91a24d55b0a23e981249fa021876541bca9812401274910b001299a9182a98f1",
      status: "Verified",
    },
    {
      id: "EV-804",
      name: "Customs_Terminal4_Manifest_Seizure.pdf",
      size: "2.5 MB",
      date: "18 Aug 2026",
      hash: "5d41402abc4b2a76b9719d911017c592abe641e45f92841fba010a7479659021",
      status: "Verified",
    },
  ];

  return (
    <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl shadow-lg space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--divider)]">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[var(--primary)]" />
          <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">
            Ingested Evidence &amp; Provenance Integrity ({mockEvidenceFiles.length})
          </h3>
        </div>
        <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          Hyperledger Fabric Provenance Secured
        </span>
      </div>

      {/* File List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {mockEvidenceFiles.map((file) => (
          <div
            key={file.id}
            className="p-3.5 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] space-y-2 hover:border-[var(--primary)] transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 truncate">
                <FileCode className="w-4 h-4 text-[var(--primary)] shrink-0" />
                <div>
                  <p className="text-[13px] font-semibold text-[var(--text-primary)] truncate">
                    {file.name}
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)] font-mono">
                    ID: {file.id} • {file.size} • {file.date}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-[var(--success)] px-2 py-0.5 rounded bg-[var(--success)]/10 border border-[var(--success)]/20 shrink-0 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {file.status}
              </span>
            </div>

            {/* SHA-256 Checksum Hash */}
            <div className="pt-2 border-t border-[var(--divider)]">
              <span className="text-[10px] font-mono text-[var(--text-secondary)] block">
                SHA-256 Checksum:
              </span>
              <span className="text-[10px] font-mono text-[var(--text-primary)] truncate block tracking-wider opacity-85">
                {file.hash}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
