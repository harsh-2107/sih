// Deterministic graph snapshots over time for Temporal Graph Replay
export const GRAPH_SNAPSHOTS = [
  {
    date: "2024-08-01",
    label: "Initial Seizure (Aug 1)",
    nodesCount: 6,
    linksCount: 5,
    description: "Initial seizure of burner line + Victor Vance alias identification.",
    nodeIds: ["P1", "O1", "N1", "L1", "V1", "P6"],
    linkIds: ["L-P1-O1", "L-P1-N1", "L-P6-V1", "L-V1-L1", "L-P1-L1"]
  },
  {
    date: "2024-08-10",
    label: "Financial Wire Linked (Aug 10)",
    nodesCount: 10,
    linksCount: 9,
    description: "Elena Rostova & Apex Global wire transfer trails identified via SWIFT logs.",
    nodeIds: ["P1", "P2", "O1", "O2", "N1", "N2", "L1", "V1", "P6", "D2"],
    linkIds: ["L-P1-O1", "L-P2-O1", "L-P1-P2", "L-O1-O2", "L-P1-N1", "L-N1-N2", "L-P2-N2", "L-V1-L1", "L-D2-O1"]
  },
  {
    date: "2024-08-20",
    label: "Customs Manifest Intercept (Aug 20)",
    nodesCount: 16,
    linksCount: 16,
    description: "Harbor Logistics & Dock 12 manifest disparities correlated with vehicle sightings.",
    nodeIds: ["P1", "P2", "P3", "P4", "P5", "P6", "O1", "O2", "O3", "L1", "L2", "L3", "N1", "N2", "V1", "D1"],
    linkIds: ["L-P1-O1", "L-P2-O1", "L-P1-P2", "L-P2-P4", "L-P3-O2", "L-O1-O2", "L-P3-L1", "L-P1-L1", "L-P5-O1", "L-P5-P1", "L-P6-V1", "L-V1-L1", "L-P1-N1", "L-O2-O3", "L-O3-L3", "L-D1-O3"]
  },
  {
    date: "2024-09-01",
    label: "Offshore Dubai Connection (Sep 1)",
    nodesCount: 20,
    linksCount: 21,
    description: "Zenith Capital FZ-LLC offshore trust and Klaus Weber nominee proxy linked.",
    nodeIds: ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "O1", "O2", "O3", "O4", "L1", "L2", "L3", "N1", "N2", "V1", "V2", "D1", "D2"],
    linkIds: ["L-P1-O1", "L-P2-O1", "L-P1-P2", "L-P2-P4", "L-P3-O2", "L-O1-O2", "L-P3-L1", "L-P1-L1", "L-P5-O1", "L-P5-P1", "L-P6-V1", "L-V1-L1", "L-P1-N1", "L-N1-N2", "L-P2-N2", "L-O2-O3", "L-O3-L3", "L-V2-O3", "L-P7-O1", "L-O1-O4", "L-D2-O4"]
  },
  {
    date: "2024-09-07",
    label: "Full Resolution State (Sep 7)",
    nodesCount: 23,
    linksCount: 25,
    description: "Complete graph resolution across all 23 entities and 25 verified relationships.",
    nodeIds: ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "O1", "O2", "O3", "O4", "L1", "L2", "L3", "N1", "N2", "V1", "V2", "D1", "D2", "D3"],
    linkIds: ["L-P1-O1", "L-P2-O1", "L-P1-P2", "L-P2-P4", "L-P3-O2", "L-O1-O2", "L-P3-L1", "L-P1-L1", "L-P5-O1", "L-P5-P1", "L-P6-V1", "L-V1-L1", "L-P1-N1", "L-N1-N2", "L-P2-N2", "L-O2-O3", "L-O3-L3", "L-V2-O3", "L-P7-O1", "L-O1-O4", "L-D1-O3", "L-D1-L3", "L-D2-O1", "L-D2-O4", "L-D3-L2"]
  }
];
