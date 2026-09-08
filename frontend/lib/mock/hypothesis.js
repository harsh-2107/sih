export const HYPOTHESIS_DATA = {
  id: "hypo-1",
  title: "Victor Vance operates Apex Global as a shell front for offshore money laundering",
  author: "Det. Vasquez",
  createdDate: "04 Sep 2026",
  supportScore: 74,
  supportingEvidence: [
    { text: "230 calls logged between Burner Line (+1 555-019-2834) and Victor Vance", type: "CDR Call Logs" },
    { text: "Co-location pings at Pier 9 Warehouse 12 logged on 14 Aug", type: "Surveillance Report" },
    { text: "Direct beneficial ownership linkage confirmed in Apex Global Trading", type: "Corporate Registry" },
    { text: "Unlinked $450,000 wire transfer to offshore account 8821", type: "Bank Audit" },
  ],
  contradictingEvidence: [
    { text: "Location mismatch on 02 Sep 2026 (Surveillance vs CDR ping)", type: "Contradiction Alert" },
  ],
  openQuestions: [
    "Is Sub-Account #9021 controlled by Dmitri Volkov or Elena Rostova?",
    "What cargo was carried by Freight Truck 3TRK44 on 18 Aug?",
  ],
};
