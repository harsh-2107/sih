export const NODE_TYPES = {
  person: { label: "Person", color: "var(--graph-person, #3F8A82)" },
  org: { label: "Organization", color: "var(--graph-org, #5878B0)" },
  location: { label: "Location", color: "var(--graph-location, #7AAD4A)" },
  phone: { label: "Phone / Comms", color: "var(--graph-phone, #9A7ACE)" },
  vehicle: { label: "Vehicle", color: "var(--graph-vehicle, #C87850)" },
  document: { label: "Evidence Document", color: "var(--graph-document, #E5C07B)" },
};

export function buildGraph() {
  const nodes = [
    // Persons
    { id: "P1", name: "Victor Vance", type: "person", role: "Primary Suspect", risk: "high", details: "Linked to 4 shell orgs. Known alias 'Red Jack'.", x: -1.2, y: 1.5, z: 0.8, weight: 1.5 },
    { id: "P2", name: "Elena Rostova", type: "person", role: "Financial Operator", risk: "high", details: "Manages wire transfers via Apex Holdings.", x: 1.4, y: 1.1, z: -0.9, weight: 1.4 },
    { id: "P3", name: "Marcus Brody", type: "person", role: "Logistics Manager", risk: "medium", details: "Frequent travel to Port Terminal 4.", x: -2.1, y: -0.8, z: 1.2, weight: 1.1 },
    { id: "P4", name: "Sarah Lin", type: "person", role: "Accountant", risk: "low", details: "Prepares tax filings for Apex & Apex Sub 1.", x: 2.3, y: 0.4, z: -1.6, weight: 0.9 },
    { id: "P5", name: "Dmitri Volkov", type: "person", role: "Associate", risk: "high", details: "Co-signatory on offshore account 8821.", x: -0.5, y: 2.4, z: -1.1, weight: 1.3 },
    { id: "P6", name: "Tariq Al-Mansoor", type: "person", role: "Courier", risk: "medium", details: "Intercepted at Border Checkpoint B.", x: -3.0, y: -1.5, z: -0.4, weight: 1.0 },
    { id: "P7", name: "Klaus Weber", type: "person", role: "Frontman", risk: "medium", details: "Nominee director registered in Cyprus.", x: 2.8, y: 2.0, z: 0.5, weight: 1.0 },

    // Organizations
    { id: "O1", name: "Apex Global Trading", type: "org", role: "Shell Entity", risk: "high", details: "Registered in Panama, zero physical operations.", x: 0.0, y: 0.0, z: 0.0, weight: 2.0 },
    { id: "O2", name: "Harbor Logistics LLC", type: "org", role: "Front Company", risk: "medium", details: "Leases warehouse at Dock 12.", x: -1.8, y: -0.2, z: 0.3, weight: 1.3 },
    { id: "O3", name: "Blue Wave Import/Export", type: "org", role: "Transshipment", risk: "medium", details: "Coordinates freight manifests.", x: -2.5, y: -1.9, z: 1.0, weight: 1.1 },
    { id: "O4", name: "Zenith Capital FZ-LLC", type: "org", role: "Offshore Trust", risk: "high", details: "Dubai free zone entity handling crypto conversions.", x: 1.9, y: -1.2, z: 0.7, weight: 1.2 },

    // Locations
    { id: "L1", name: "Warehouse 12, Pier 9", type: "location", role: "Meeting Location", risk: "high", details: "Surveillance logged 14 night entries in Aug.", x: -1.1, y: -1.4, z: 1.8, weight: 1.2 },
    { id: "L2", name: "Suite 402, Financial Tower", type: "location", role: "Registered Office", risk: "low", details: "Virtual office forwarding address.", x: 0.8, y: 2.1, z: 1.4, weight: 0.9 },
    { id: "L3", name: "Customs Terminal 4", type: "location", role: "Point of Entry", risk: "medium", details: "Seizure of undocumented cargo on 18 Aug.", x: -3.2, y: -2.4, z: 0.2, weight: 1.0 },

    // Phone / Comms
    { id: "N1", name: "+1 (555) 019-2834", type: "phone", role: "Burner Line", risk: "high", details: "230 calls logged over 14 days.", x: -1.9, y: 2.2, z: -0.5, weight: 1.1 },
    { id: "N2", name: "+1 (555) 014-9921", type: "phone", role: "Encrypted Comms", risk: "high", details: "Associated with signal relay in Sector 4.", x: 1.1, y: 1.9, z: -1.8, weight: 1.1 },

    // Vehicles
    { id: "V1", name: "Black SUV (Lic: 7XYZ89)", type: "vehicle", role: "Transport", risk: "medium", details: "Spotted at Pier 9 during 3 drop-offs.", x: -2.4, y: -0.9, z: -1.2, weight: 1.0 },
    { id: "V2", name: "Freight Truck (Lic: 3TRK44)", type: "vehicle", role: "Cargo Fleet", risk: "low", details: "Registered under Harbor Logistics.", x: -3.5, y: -1.1, z: 1.5, weight: 0.9 },

    // Evidence Documents
    { id: "D1", name: "Bill of Lading #BOL-992", type: "document", role: "Seized Manifest", risk: "high", details: "Lists weight disparity of 4.2 metric tons.", x: -2.1, y: -2.8, z: 0.6, weight: 1.1 },
    { id: "D2", name: "Wire Transfer Record #WT-881", type: "document", role: "Financial Artifact", risk: "high", details: "SWIFT transfer of $450,000 to Zurich ledger.", x: 0.9, y: -0.6, z: -1.5, weight: 1.2 },
    { id: "D3", name: "Lease Agreement #LA-402", type: "document", role: "Property Contract", risk: "medium", details: "Signed by Elena Rostova using Apex authorization.", x: 1.5, y: 1.7, z: 0.2, weight: 1.0 },
  ];

  const links = [
    { id: "L-P1-O1", source: "P1", target: "O1", label: "Beneficial Owner", weight: 3, confidence: 98, sourceEvidence: "EVID-2024-001" },
    { id: "L-P2-O1", source: "P2", target: "O1", label: "CFO / Director", weight: 2, confidence: 95, sourceEvidence: "EVID-2024-002" },
    { id: "L-P1-P2", source: "P1", target: "P2", label: "Frequent Comms", weight: 2, confidence: 88, sourceEvidence: "EVID-2024-004" },
    { id: "L-P2-P4", source: "P2", target: "P4", label: "Employer", weight: 1, confidence: 92, sourceEvidence: "EVID-2024-005" },
    { id: "L-P3-O2", source: "P3", target: "O2", label: "Site Manager", weight: 2, confidence: 90, sourceEvidence: "EVID-2024-003" },
    { id: "L-O1-O2", source: "O1", target: "O2", label: "Capital Wire ($450k)", weight: 3, confidence: 99, sourceEvidence: "EVID-2024-002" },
    { id: "L-P3-L1", source: "P3", target: "L1", label: "Frequent Visits", weight: 1, confidence: 84, sourceEvidence: "EVID-2024-006" },
    { id: "L-P1-L1", source: "P1", target: "L1", label: "Observed 14 Aug", weight: 2, confidence: 89, sourceEvidence: "EVID-2024-006" },
    { id: "L-P5-O1", source: "P5", target: "O1", label: "Shareholder (30%)", weight: 2, confidence: 94, sourceEvidence: "EVID-2024-002" },
    { id: "L-P5-P1", source: "P5", target: "P1", label: "Co-conspirator", weight: 2, confidence: 87, sourceEvidence: "EVID-2024-004" },
    { id: "L-P6-V1", source: "P6", target: "V1", label: "Driver", weight: 1, confidence: 82, sourceEvidence: "EVID-2024-007" },
    { id: "L-V1-L1", source: "V1", target: "L1", label: "Parked at Location", weight: 1, confidence: 86, sourceEvidence: "EVID-2024-006" },
    { id: "L-P1-N1", source: "P1", target: "N1", label: "Subscriber", weight: 2, confidence: 96, sourceEvidence: "EVID-2024-004" },
    { id: "L-N1-N2", source: "N1", target: "N2", label: "Frequent Call Relays", weight: 2, confidence: 91, sourceEvidence: "EVID-2024-004" },
    { id: "L-P2-N2", source: "P2", target: "N2", label: "Call Recipient", weight: 2, confidence: 93, sourceEvidence: "EVID-2024-004" },
    { id: "L-O2-O3", source: "O2", target: "O3", label: "Subcontractor", weight: 1, confidence: 85, sourceEvidence: "EVID-2024-003" },
    { id: "L-O3-L3", source: "O3", target: "L3", label: "Operates Freight", weight: 1, confidence: 88, sourceEvidence: "EVID-2024-003" },
    { id: "L-V2-O3", source: "V2", target: "O3", label: "Leased Vehicle", weight: 1, confidence: 90, sourceEvidence: "EVID-2024-003" },
    { id: "L-P7-O1", source: "P7", target: "O1", label: "Nominee Director", weight: 1, confidence: 80, sourceEvidence: "EVID-2024-002" },
    { id: "L-O1-O4", source: "O1", target: "O4", label: "Crypto Transfer", weight: 2, confidence: 92, sourceEvidence: "EVID-2024-008" },
    { id: "L-D1-O3", source: "D1", target: "O3", label: "Manifest Reference", weight: 2, confidence: 97, sourceEvidence: "EVID-2024-003" },
    { id: "L-D1-L3", source: "D1", target: "L3", label: "Issued at Checkpoint", weight: 1, confidence: 95, sourceEvidence: "EVID-2024-003" },
    { id: "L-D2-O1", source: "D2", target: "O1", label: "Originator Ledger", weight: 3, confidence: 99, sourceEvidence: "EVID-2024-002" },
    { id: "L-D2-O4", source: "D2", target: "O4", label: "Beneficiary Ledger", weight: 2, confidence: 96, sourceEvidence: "EVID-2024-008" },
    { id: "L-D3-L2", source: "D3", target: "L2", label: "Lease Address", weight: 1, confidence: 94, sourceEvidence: "EVID-2024-005" },
  ];

  return { nodes, links };
}
