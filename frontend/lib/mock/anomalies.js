export const ANOMALIES = [
  {
    id: "a1",
    title: "Unlinked Wire Transfer",
    confidence: 94,
    level: "high",
    description: "$450k transaction from Apex Global occurred 12 minutes prior to unexpected burner phone activation.",
    entities: ["O1", "N1"],
  },
  {
    id: "a2",
    title: "Co-location Match",
    confidence: 87,
    level: "high",
    description: "Victor Vance and Marcus Brody cell tower pings overlapped at Pier 9 for 34 minutes with no direct prior association.",
    entities: ["P1", "P3", "L1"],
  },
  {
    id: "a3",
    title: "Shared Subcontractor Pattern",
    confidence: 72,
    level: "medium",
    description: "Blue Wave and Harbor Logistics share an unlisted freight forwarding agent across 3 separate manifests.",
    entities: ["O2", "O3"],
  },
];
