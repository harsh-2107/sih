export const ENTITY_RESOLUTION_MATCHES = [
  {
    id: "er-1",
    candidateA: {
      id: "P101",
      name: "Rahul Mehta",
      sourceFile: "CDR_0829.csv",
      phone: "+91 98765-43210",
      location: "Delhi Logistics Hub",
    },
    candidateB: {
      id: "P102",
      name: "R. Mehta",
      sourceFile: "Wire_Manifest_Aug26.pdf",
      phone: "+91 98765-43210",
      location: "Sector 7 Depot",
    },
    similarity: 94.2,
    status: "Needs Review",
    signals: [
      { text: "Identical phone number (+91 98765-43210)", pass: true },
      { text: "Phonetic Metaphone match (RHL MT / R MT)", pass: true },
      { text: "Overlapping geographic activity window", pass: true },
      { text: "Shared counterparty: Shreeji Traders", pass: true },
    ],
  },
  {
    id: "er-2",
    candidateA: {
      id: "P103",
      name: "K. Bora",
      sourceFile: "Surveillance_Notes_07.pdf",
      phone: "+91 91234-56789",
      location: "Pier 9, Dock 12",
    },
    candidateB: {
      id: "P104",
      name: "Karan Bora",
      sourceFile: "Bank_Statement_092.csv",
      phone: "+91 91234-56789",
      location: "Customs Hub Terminal 4",
    },
    similarity: 89.5,
    status: "Needs Review",
    signals: [
      { text: "Matching full name variation", pass: true },
      { text: "Common account beneficiary number", pass: true },
      { text: "Direct call connection to Victor Vance", pass: true },
    ],
  },
];
