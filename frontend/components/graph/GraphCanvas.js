"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { NODE_TYPES } from '@/lib/mock/graph';

export default function GraphCanvas({ graphData, selectedNodeId, onSelectNode, activeTypeFilters = [] }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [transform, setTransform] = useState(d3.zoomIdentity);

  // Responsive container observer
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({
          width: clientWidth || 800,
          height: clientHeight || 600,
        });
      }
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Filter nodes & links based on activeTypeFilters
  const filteredGraph = useMemo(() => {
    if (!graphData) return { nodes: [], links: [] };
    
    if (activeTypeFilters.length === 0) {
      return graphData;
    }

    const validNodeIds = new Set(
      graphData.nodes
        .filter((n) => activeTypeFilters.includes(n.type))
        .map((n) => n.id)
    );

    const nodes = graphData.nodes.filter((n) => validNodeIds.has(n.id));
    const links = graphData.links.filter(
      (l) =>
        validNodeIds.has(typeof l.source === 'object' ? l.source.id : l.source) &&
        validNodeIds.has(typeof l.target === 'object' ? l.target.id : l.target)
    );

    return { nodes, links };
  }, [graphData, activeTypeFilters]);

  // Run D3 force simulation
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (!filteredGraph.nodes.length) return;

    // Deep clone nodes and links for simulation mutate
    const nodesCopy = filteredGraph.nodes.map((n) => ({ ...n }));
    const linksCopy = filteredGraph.links.map((l) => ({
      ...l,
      source: typeof l.source === 'object' ? l.source.id : l.source,
      target: typeof l.target === 'object' ? l.target.id : l.target,
    }));

    const sim = d3
      .forceSimulation(nodesCopy)
      .force(
        'link',
        d3.forceLink(linksCopy).id((d) => d.id).distance(110)
      )
      .force('charge', d3.forceManyBody().strength(-350))
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force('collide', d3.forceCollide().radius(40));

    // Pre-warm simulation for instant placement
    for (let i = 0; i < 250; ++i) sim.tick();

    setNodes(nodesCopy);
    setLinks(linksCopy);

    sim.stop();
  }, [filteredGraph, dimensions.width, dimensions.height]);

  // Setup D3 Zoom
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    const zoomBehavior = d3
      .zoom()
      .scaleExtent([0.3, 4])
      .on('zoom', (event) => {
        setTransform(event.transform);
      });

    svg.call(zoomBehavior);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-[var(--background-secondary)] select-none">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
          
          {/* Render Edges */}
          {links.map((link, idx) => {
            const sourceNode = typeof link.source === 'object' ? link.source : nodes.find(n => n.id === link.source);
            const targetNode = typeof link.target === 'object' ? link.target : nodes.find(n => n.id === link.target);

            if (!sourceNode || !targetNode) return null;

            const isConnectedToSelected =
              selectedNodeId &&
              (sourceNode.id === selectedNodeId || targetNode.id === selectedNodeId);

            return (
              <g key={`link-${idx}`}>
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isConnectedToSelected ? "var(--primary)" : "var(--border)"}
                  strokeWidth={isConnectedToSelected ? 2.5 : 1.2}
                  strokeOpacity={selectedNodeId ? (isConnectedToSelected ? 0.9 : 0.25) : 0.6}
                  strokeDasharray={link.label.includes("Wire") ? "4,4" : "none"}
                />
                {link.label && (
                  <text
                    x={(sourceNode.x + targetNode.x) / 2}
                    y={(sourceNode.y + targetNode.y) / 2}
                    fill="var(--text-secondary)"
                    fontSize="9"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                    dy="-3"
                    className="pointer-events-none font-mono"
                    opacity={selectedNodeId ? (isConnectedToSelected ? 1 : 0.2) : 0.7}
                  >
                    {link.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Render Nodes */}
          {nodes.map((node) => {
            const isSelected = node.id === selectedNodeId;
            const typeConfig = NODE_TYPES[node.type] || { color: "var(--primary)" };
            const nodeColor = typeConfig.color;

            const opacity = selectedNodeId
              ? isSelected || links.some(l => 
                  (l.source.id === selectedNodeId && l.target.id === node.id) ||
                  (l.target.id === selectedNodeId && l.source.id === node.id)
                )
                ? 1
                : 0.25
              : 1;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x},${node.y})`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectNode(node.id === selectedNodeId ? null : node.id);
                }}
                className="cursor-pointer transition-opacity duration-200"
                opacity={opacity}
              >
                {/* Selection Halo */}
                {isSelected && (
                  <circle
                    r="24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="3"
                    className="animate-pulse"
                  />
                )}

                {/* Risk Indicator Outer Ring */}
                {node.risk === 'high' && (
                  <circle
                    r="20"
                    fill="none"
                    stroke="var(--danger)"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                  />
                )}

                {/* Main Node Circle */}
                <circle
                  r="16"
                  fill={nodeColor}
                  stroke="var(--surface)"
                  strokeWidth="2.5"
                  className="shadow-md transition-transform hover:scale-110"
                />

                {/* Node Label SVG Text (SAFE - no innerHTML) */}
                <text
                  y="28"
                  textAnchor="middle"
                  fill="var(--text-primary)"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="sans-serif"
                  className="pointer-events-none"
                >
                  {node.name}
                </text>

                {/* Node ID Badge SVG Text */}
                <text
                  y="3"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="9"
                  fontWeight="bold"
                  fontFamily="monospace"
                  className="pointer-events-none"
                >
                  {node.id}
                </text>
              </g>
            );
          })}

        </g>
      </svg>

      {/* Graph Help Overlay */}
      <div className="absolute bottom-3 right-3 text-[10px] bg-[var(--surface)] text-[var(--text-secondary)] px-2.5 py-1.5 rounded-lg border border-[var(--border)] shadow-sm pointer-events-none">
        Scroll to Zoom • Drag to Pan • Click Node to Focus
      </div>
    </div>
  );
}
