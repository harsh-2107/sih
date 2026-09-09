export function getMockAIResponse(question) {
  const q = question.toLowerCase();

  if (q.includes("strongest connection") || q.includes("most connected")) {
    return {
      finding: "The strongest connection in CASE-2049 is the Apex Global Trading (O1) → Zenith Capital FZ-LLC (O4) transfer chain.",
      supportingEvidence: ["EVID-2024-002: SWIFT Transfer Record WT-881 ($450,000)", "EVID-2024-001: Apex Corporate Registry"],
      relevantEntities: ["Apex Global Trading", "Zenith Capital FZ-LLC", "Victor Vance", "Dmitri Volkov"],
      relevantRelationships: ["Beneficial Ownership", "Wire Transfer", "Co-Signatory"],
      evidenceBasis: "SWIFT transaction ledger WT-881 (99% confidence match). Both entities share Victor Vance as ultimate beneficial owner.",
    };
  }

  if (q.includes("changed") || q.includes("latest evidence") || q.includes("update")) {
    return {
      finding: "Ingestion of EVID-2024-006 (ANPR Pier 9 Surveillance) expanded the graph by +2 location links and confirmed Tariq Al-Mansoor as operator of Black SUV (7XYZ89).",
      supportingEvidence: ["EVID-2024-006: ANPR Pier 9 Camera Feed Log", "EVID-2024-005: CCTV Frame Capture"],
      relevantEntities: ["Black SUV (7XYZ89)", "Warehouse 12 Pier 9", "Tariq Al-Mansoor", "Victor Vance"],
      relevantRelationships: ["Vehicle Co-location", "Driver Identification"],
      evidenceBasis: "Temporal gap resolved: SUV had unconfirmed driver prior to Aug 14 ANPR timestamp matching Tariq Al-Mansoor's license scan.",
    };
  }

  if (q.includes("cluster") || q.includes("bridge") || q.includes("connect")) {
    return {
      finding: "Marcus Brody (P3) is the single critical bridge entity connecting the financial cluster (O1, O4, P2, P5) and the physical logistics cluster (O2, O3, L1, V1).",
      supportingEvidence: ["EVID-2024-003: Harbor Logistics Subcontract Agreement", "EVID-2024-006: ANPR Gate Logs"],
      relevantEntities: ["Marcus Brody", "Harbor Logistics LLC", "Warehouse 12 Pier 9", "Apex Global Trading"],
      relevantRelationships: ["Subcontractor Link", "Physical Entry Access"],
      evidenceBasis: "Network centrality metric 0.88. Removing Marcus Brody fragments the 23-node graph into two disconnected sub-networks.",
    };
  }

  if (q.includes("victor") || q.includes("vance") || q.includes("p1") || q.includes("malhotra")) {
    return {
      finding: "Victor Vance (P1) is the primary target node with highest network centrality (0.94) and 7 direct high-weight edges.",
      supportingEvidence: ["EVID-2024-001: Corporate Filings", "EVID-2024-004: Burner Phone CDR", "EVID-2024-006: ANPR Logs"],
      relevantEntities: ["Victor Vance", "Apex Global Trading", "Zenith Capital FZ-LLC", "Burner Line N1"],
      relevantRelationships: ["Beneficial Owner", "Subscriber", "Offshore Account Holder"],
      evidenceBasis: "Direct ownership of Apex Global, subscriber to Burner N1 with 82 calls during operation window, ANPR presence at Pier 9.",
    };
  }

  if (q.includes("wire") || q.includes("transfer") || q.includes("money") || q.includes("apex") || q.includes("financial")) {
    return {
      finding: "A $450,000 SWIFT wire transfer was executed from Apex Global (O1) to Zenith Capital (O4) at 03:14 AM on Aug 12, 2026.",
      supportingEvidence: ["EVID-2024-002: Bank Wire WT-881", "EVID-2024-004: Telecom CDR N1"],
      relevantEntities: ["Apex Global Trading", "Zenith Capital FZ-LLC", "Elena Rostova", "Sarah Lin"],
      relevantRelationships: ["Financial Transfer", "Document Omission"],
      evidenceBasis: "12 minutes post-transfer, Burner Line N1 experienced an abrupt 80-call burst. Sarah Lin omitted this wire from quarterly tax filings.",
    };
  }

  if (q.includes("anomaly") || q.includes("attention") || q.includes("risk") || q.includes("suspicious")) {
    return {
      finding: "Anomaly A1 (Unlinked Wire Transfer to High-Risk Jurisdiction) demands immediate priority review (Confidence: 94%, Severity: Critical).",
      supportingEvidence: ["EVID-2024-002: Wire WT-881", "EVID-2024-004: Burner CDR"],
      relevantEntities: ["Apex Global Trading", "Zenith Capital FZ-LLC", "Burner Line N1"],
      relevantRelationships: ["High-Risk Wire", "Temporal Call Spike"],
      evidenceBasis: "Unusual off-hours transfer time (03:14 AM) combined with immediate burner phone activation and tax audit discrepancies.",
    };
  }

  return {
    finding: `Graph RAG analysis completed for query: "${question}".`,
    supportingEvidence: ["EVID-2024-001: Case Master Ledger", "EVID-2024-003: Logistics Matrix"],
    relevantEntities: ["Apex Global Trading", "Victor Vance", "Marcus Brody"],
    relevantRelationships: ["Primary Connection", "Temporal Link"],
    evidenceBasis: "Cross-referenced 23 entities, 25 relationships, and 6 evidence files in CASE-2049.",
  };
}

