export const GRAPH_DIFF_DATA = {
  summary: {
    newEntitiesCount: 4,
    newRelationshipsCount: 7,
    newAnomaliesCount: 2,
    resolvedEntitiesCount: 1,
    strengthenedRelationshipsCount: 3,
  },
  newEntities: [
    { id: "P_KB", name: "K. Bora", type: "person", role: "Customs Broker", risk: "high", isNew: true },
    { id: "O_ST", name: "Shreeji Traders", type: "org", role: "Invoicing Front", risk: "high", isNew: true },
    { id: "L_WH12B", name: "Warehouse 12B", type: "location", role: "Consignment Site", risk: "medium", isNew: true },
    { id: "O_ACC9021", name: "Sub-Account #9021", type: "org", role: "Financial Sink", risk: "high", isNew: true },
  ],
  newRelationships: [
    { source: "P1", target: "O_ST", label: "Financial Director", isNew: true },
    { source: "O_ST", target: "O_ACC9021", label: "Wire $450,000", isNew: true },
    { source: "P_KB", target: "L_WH12B", label: "Logistics Clearance", isNew: true },
    { source: "O_ST", target: "L_WH12B", label: "Lease Signatory", isNew: true },
    { source: "P_KB", target: "P1", label: "Encrypted Call (8m)", isNew: true },
    { source: "O1", target: "O_ST", label: "Invoice Mirroring", isNew: true },
    { source: "P5", target: "O_ACC9021", label: "Co-signatory", isNew: true },
  ],
  newAnomalies: [
    { id: "a_new1", title: "Trade-Based Money Laundering", level: "high", description: "$450k wire to Sub-Account #9021 with zero shipping manifest." },
    { id: "a_new2", title: "Unregistered Warehouse Access", level: "high", description: "K. Bora badge scan at Warehouse 12B during midnight window." },
  ],
};
