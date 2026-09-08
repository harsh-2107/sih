export function getMockAIResponse(question) {
  const q = question.toLowerCase();

  if (q.includes("strongest connection") || q.includes("most connected")) {
    return "The strongest connection in CASE-2049 is the Apex Global Trading (O1) → Zenith Capital FZ-LLC (O4) crypto transfer chain, evidenced by SWIFT record WT-881 (99% confidence). Both entities share Victor Vance (P1) as beneficial owner and Dmitri Volkov (P5) as co-signatory — forming a three-node closure with no alternative explanation.";
  }

  if (q.includes("changed") || q.includes("latest evidence") || q.includes("update")) {
    return "After EVID-2024-006 (ANPR Pier 9 logs) was ingested, the graph gained 2 new location links: Black SUV 7XYZ89 → Pier 9 (L1) and Victor Vance → Warehouse 12. This resolved a prior temporal gap: the SUV had no confirmed driver before this evidence confirmed Tariq Al-Mansoor (P6) as operator. Graph centrality around O1 increased by 0.07.";
  }

  if (q.includes("cluster") || q.includes("bridge") || q.includes("connect")) {
    return "The key bridging entity between the financial cluster (O1, O4, P2, P5) and the physical logistics cluster (O2, O3, L1, L3, V1, V2) is Marcus Brody (P3). He is the only person with confirmed links to both Harbor Logistics LLC (O2) and Warehouse 12/Pier 9 (L1). Removing P3 would disconnect the two sub-graphs.";
  }

  if (q.includes("victor") || q.includes("vance") || q.includes("p1")) {
    return "Victor Vance (P1) is the highest-centrality node with 7 direct edges. Evidence basis: beneficial owner of Apex Global (EVID-2024-001), ANPR confirmed at Pier 9 on 14 Aug 23:00 (EVID-2024-006), subscriber to Burner Line N1 (EVID-2024-004). He also co-signed offshore account 8821 with Dmitri Volkov. Risk level: Critical.";
  }

  if (q.includes("wire") || q.includes("transfer") || q.includes("money") || q.includes("apex") || q.includes("financial")) {
    return "The $450,000 SWIFT transfer (EVID-2024-002, record WT-881) originated from Apex Global Trading (O1) on 12 Aug 2026 at 03:14 AM and arrived at Zenith Capital FZ-LLC (O4) in Dubai. Within 12 minutes, Burner Line N1 activated with a call spike. Evidence correlation confidence: 99%. Sarah Lin (P4) prepared the tax records that omit this transfer.";
  }

  if (q.includes("anomaly") || q.includes("attention") || q.includes("risk") || q.includes("suspicious")) {
    return "The highest-priority anomaly is A1 — Unlinked Wire Transfer (94% confidence). $450k left Apex Global at 03:14 AM and triggered N1 activation 12 minutes later, suggesting coordinated signal. A2 (Co-location Match at Pier 9) requires immediate CCTV cross-reference. A3 (Shared Subcontractor) is lower risk but widens the network perimeter.";
  }

  if (q.includes("authorized") || q.includes("who") || q.includes("signed")) {
    return "The $450k wire transfer was authorized by Elena Rostova (P2) in her capacity as CFO/Director of Apex Global Trading (EVID-2024-002). Victor Vance (P1) is the beneficial owner whose authorization supersedes on offshore operations. The account beneficiary is Dmitri Volkov (P5) under Zenith Capital.";
  }

  if (q.includes("pier") || q.includes("warehouse") || q.includes("location") || q.includes("l1")) {
    return "Warehouse 12, Pier 9 (L1) logged 14 confirmed night entries during August 2026. ANPR data confirmed Victor Vance's SUV (7XYZ89) on 14 Aug at 23:00. Marcus Brody (P3) made 6 of those entries. The location connects 4 entities: P1, P3, P6 (driver), and V1 (vehicle). Possible storage site for undeclared cargo from BOL-992.";
  }

  if (q.includes("timeline") || q.includes("chronolog") || q.includes("sequence")) {
    return "Investigation timeline: Aug 1 — Apex Global corporate register seized. Aug 12 — $450k wire intercepted. Aug 14 — Pier 9 ANPR confirms SUV. Aug 18 — Customs seizure at Terminal 4. Aug 22 — Burner line spike (80+ calls, 6 hrs). Aug 28 — Tariq Al-Mansoor intercepted at border. Sep 2 — Tax audit subpoena. Latest graph state has 23 entities and 25 confirmed relationships.";
  }

  return `Graph analysis for query: "${question}"\n\nCross-referencing 142 entities and 38 timeline events across CASE-2049. Key network centrality is concentrated around Apex Global Trading (O1, centrality 0.94), Victor Vance (P1, centrality 0.91), and the Pier 9 location cluster (L1). No direct match found — query may reference an entity not yet in the resolved graph. Try searching for a specific entity name or relationship type.`;
}
