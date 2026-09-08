"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Search, X, Box, RotateCw } from "lucide-react";
import EntityDetailsPanel from "./EntityDetailsPanel";
import RelationshipPanel from "./RelationshipPanel";
import GraphControls from "../graph/GraphControls";
import GraphLegend from "../graph/GraphLegend";
import { GRAPH_SNAPSHOTS } from "@/lib/mock/graphSnapshots";

const Network3D = dynamic(() => import("../graph/Network3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-[var(--text-tertiary)] font-mono text-xs gap-3">
      <RotateCw className="w-6 h-6 animate-spin text-[var(--primary)]" />
      <span>Initializing 3D WebGL Viewport…</span>
    </div>
  ),
});

export default function NetworkWorkspace({
  graphData,
  selectedNodeId,
  onSelectNode,
  onAskAi,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [temporalStep, setTemporalStep] = useState(4);
  const [selectedLink, setSelectedLink] = useState(null);

  const currentSnapshot = GRAPH_SNAPSHOTS[temporalStep];
  const displayNodes = React.useMemo(() => {
    if (!currentSnapshot) return graphData.nodes;
    const set = new Set(currentSnapshot.nodeIds);
    return graphData.nodes.filter((n) => set.has(n.id));
  }, [graphData.nodes, currentSnapshot]);

  const displayLinks = React.useMemo(() => {
    if (!currentSnapshot) return graphData.links;
    const set = new Set(currentSnapshot.linkIds);
    return graphData.links.filter((l) => set.has(l.id));
  }, [graphData.links, currentSnapshot]);

  const nodeMap = React.useMemo(() => {
    const m = new Map();
    graphData.nodes.forEach((n) => m.set(n.id, n));
    return m;
  }, [graphData.nodes]);

  const selectedNode = selectedNodeId
    ? graphData.nodes.find((n) => n.id === selectedNodeId)
    : null;

  return (
    <div
      className="graph-canvas-bg border border-[var(--border-strong)] shadow-2xl overflow-hidden flex flex-col relative transition-all"
      style={{ height: "calc(100vh - 200px)", minHeight: 480 }}
    >
      {/* ── Workspace header ── */}
      <div className="p-3 border-b border-white/10 bg-black/20 backdrop-blur-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1 rounded-md bg-[var(--primary)]/25 text-[var(--primary)] border border-[var(--primary)]/40 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Box className="w-3.5 h-3.5" />
            <span>3D Intelligence Graph</span>
          </div>
          <span className="text-[11px] font-mono text-white/40 hidden sm:inline">
            {displayNodes.length} nodes · {displayLinks.length} edges
          </span>
        </div>

        {/* Entity search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Focus node by name or ID…"
            value={searchQuery}
            onChange={(e) => {
              const val = e.target.value;
              setSearchQuery(val);
              if (val.trim()) {
                const match = displayNodes.find(
                  (n) =>
                    n.name.toLowerCase().includes(val.toLowerCase()) ||
                    n.id.toLowerCase().includes(val.toLowerCase())
                );
                if (match) onSelectNode(match.id);
              }
            }}
            className="w-full pl-9 pr-7 py-1.5 text-[11px] rounded-lg bg-white/8 text-white border border-white/15 placeholder:text-white/30 focus:outline-none focus:border-[var(--primary)]/60 font-mono transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => { setSearchQuery(""); onSelectNode(null); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── 3D canvas ── */}
      <div className="flex-1 relative overflow-hidden">
        <Network3D
          nodes={displayNodes}
          links={displayLinks}
          selectedNodeId={selectedNodeId}
          onSelectNode={(id) => {
            onSelectNode(id);
            setSelectedLink(null);
          }}
          selectedLinkId={selectedLink?.id}
          onSelectLink={setSelectedLink}
          autoRotate={autoRotate}
          activeFilter={activeFilter}
        />

        {/* Controls overlay */}
        <GraphControls
          autoRotate={autoRotate}
          onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
          onResetView={() => onSelectNode(null)}
          onFitView={() => onSelectNode(null)}
          temporalStep={temporalStep}
          onTemporalStepChange={setTemporalStep}
          snapshots={GRAPH_SNAPSHOTS}
        />

        {/* Legend */}
        <GraphLegend activeFilter={activeFilter} onSelectFilter={setActiveFilter} />

        {/* Entity inspector */}
        {selectedNode && (
          <div className="absolute top-4 right-4 w-72 max-h-[85%] overflow-y-auto z-20 custom-scrollbar">
            <EntityDetailsPanel
              selectedNode={selectedNode}
              onClose={() => onSelectNode(null)}
              onAskAi={onAskAi}
              links={displayLinks}
            />
          </div>
        )}

        {/* Relationship inspector */}
        {selectedLink && !selectedNode && (
          <RelationshipPanel
            link={selectedLink}
            nodeMap={nodeMap}
            onClose={() => setSelectedLink(null)}
          />
        )}
      </div>
    </div>
  );
}
