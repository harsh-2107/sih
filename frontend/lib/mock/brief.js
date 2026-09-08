export const INVESTIGATION_BRIEF = {
  caseId: "CASE-2049",
  generatedAt: "2024-09-08T14:30:00Z",
  title: "Executive Investigation Brief: Sector 7 Extortion & Money Laundering Network",
  executiveSummary: `Multi-agency intelligence analysis reveals a structured illicit network operating across maritime freight logistics, offshore financial trusts, and burner communication relays. Primary target Victor Vance ("Red Jack") exerts beneficial ownership over Apex Global Trading (Panama), channeling illicit proceeds estimated at $450,000 via SWIFT wire transfers into Dubai-based Zenith Capital FZ-LLC.`,
  keyFindings: [
    {
      title: "Primary Nexus & Ownership Structure",
      content: "Victor Vance (P1) and Elena Rostova (P2) serve as primary controllers of Apex Global Trading (O1). SWIFT wire ledger EVID-2024-002 establishes 99% confidence in $450,000 capital infusion to Harbor Logistics LLC (O2)."
    },
    {
      title: "Maritime Freight Disparity",
      content: "Port Authority Customs Manifest #BOL-992 (EVID-2024-003) demonstrates a 4.2 metric ton weight disparity. Harbor Logistics LLC (O2) and Blue Wave Import/Export (O3) facilitate transshipment through Customs Terminal 4."
    },
    {
      title: "Offshore Laundering & Proxy Entities",
      content: "Nominee director Klaus Weber (P7) signed proxy authorization for Zenith Capital FZ-LLC (O4). Cross-case analysis reveals matching wallet hashes with Case CASE-2011 (Digital Wallet Laundering)."
    },
    {
      title: "Surveillance & Physical Reconnaissance",
      content: "ANPR telemetry at Pier 9 (L1) logs Black SUV (V1) registered to courier Tariq Al-Mansoor (P6) co-located with Victor Vance during 14 nocturnal entries."
    }
  ],
  recommendedActions: [
    "Issue subpoena to SWIFT correspondent bank for Zenith Capital FZ-LLC sub-accounts.",
    "Execute search warrant on Warehouse 12, Pier 9 based on ANPR co-location logs.",
    "File Interpol diffusion notice for nominee director Klaus Weber (Cyprus jurisdiction).",
    "Freeze offshore asset ledger D2 ($450,000 balance at Zurich correspondent)."
  ],
  evidenceBacking: [
    "EVID-2024-001 (Seized Corporate Register)",
    "EVID-2024-002 (Bank SWIFT Ledger)",
    "EVID-2024-003 (Port Manifest #BOL-992)",
    "EVID-2024-004 (Telecom Call Data Records)",
    "EVID-2024-006 (ANPR Telemetry Logs)"
  ]
};
