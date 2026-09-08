export const CONTRADICTIONS_DATA = [
  {
    id: "c1",
    entity: "R. Malhotra",
    date: "02 Sep 2026",
    timeGap: "15 minutes apart",
    conflictType: "Location Mismatch",
    status: "Needs Investigator Review",
    sourceA: {
      type: "Surveillance Report",
      filename: "Surveillance_Notes_07.pdf",
      claim: "Observed physically at Delhi Sector 7 Depot (10:15 AM)",
      confidence: 0.95,
    },
    sourceB: {
      type: "Cell Tower CDR",
      filename: "CDR_0902_Mumbai.csv",
      claim: "Tower ping registered at Mumbai Bandra West Tower (10:30 AM)",
      confidence: 0.98,
    },
    analyticalNote: "Impossibility of physical travel between Delhi and Mumbai within 15 minutes suggests spoofed SIM card or false surveillance log entries.",
  },
  {
    id: "c2",
    entity: "Shreeji Traders",
    date: "28 Aug 2026",
    timeGap: "Same day discrepancy",
    conflictType: "Financial Declaration Mismatch",
    status: "Under Audit",
    sourceA: {
      type: "Customs Manifest",
      filename: "Customs_Manifest_28Aug.pdf",
      claim: "Declared cargo value: $12,000 USD",
      confidence: 0.92,
    },
    sourceB: {
      type: "Bank Wire Log",
      filename: "Transaction_092.csv",
      claim: "Associated wire transfer amount: $450,000 USD",
      confidence: 0.99,
    },
    analyticalNote: "37.5x variance between customs declaration and wire transfer indicates potential trade-based money laundering (TBML).",
  },
];
