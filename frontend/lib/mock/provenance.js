export const PROVENANCE_DATA = {
  "P1-O1": {
    relationship: "R. Malhotra ➔ Apex Global Trading",
    relationType: "Beneficial Owner / Controlling Shareholder",
    confidence: 96.4,
    extractedFrom: "Corporate Registry & Offshore Bank Wire Logs",
    evidenceFiles: [
      { filename: "CDR_2026_08_19.csv", records: 230, sha256: "8ab42f89a712e09c8f" },
      { filename: "Surveillance_Report_07.pdf", records: 14, sha256: "3f91c7811902d1a4e5" },
    ],
    fabricAudit: {
      txHash: "TX-8F21-99A4-PROV-8812",
      blockHeight: 1849201,
      timestamp: "06 Sep 2026 14:22:09 UTC",
      integrity: "Verified",
    },
    chain: [
      { step: "Evidence File Upload", detail: "CDR_2026_08_19.csv SHA-256 hashed" },
      { step: "Entity Extraction", detail: "Extracted 'R. Malhotra' and 'Apex Global Trading'" },
      { step: "Entity Resolution", detail: "Resolved alias 'Victor Vance' with 94.2% score" },
      { step: "Knowledge Graph Link", detail: "Edge created: Beneficial Owner (Conf: 96.4%)" },
      { step: "Hyperledger Audit Entry", detail: "Immutably anchored to Fabric Block #1849201" },
    ],
  },
};
