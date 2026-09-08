"use client";

import React, { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { NODE_TYPES } from "@/lib/mock/graph";

// ────────────────────────────────────────────────────────────
// Type palette — restrained, CrimeNet-aligned
// ────────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  person:   { hex: "#3F8A82", label: "PERSON",       bgCls: "bg-teal-500/10 border-teal-500/30"   },
  org:      { hex: "#5878B0", label: "ORGANIZATION", bgCls: "bg-blue-500/10 border-blue-500/30"   },
  location: { hex: "#7AAD4A", label: "LOCATION",     bgCls: "bg-green-500/10 border-green-500/30" },
  phone:    { hex: "#9A7ACE", label: "PHONE",         bgCls: "bg-purple-500/10 border-purple-500/30" },
  vehicle:  { hex: "#C87850", label: "VEHICLE",       bgCls: "bg-orange-500/10 border-orange-500/30" },
  document: { hex: "#E5C07B", label: "DOCUMENT",     bgCls: "bg-yellow-500/10 border-yellow-500/30" },
};

// ────────────────────────────────────────────────────────────
// EntityCard — floating HTML panel in 3D space
// ────────────────────────────────────────────────────────────
function EntityCard({ node, isSelected, isDimmed, isHovered, onSelect, onHover, linkCount }) {
  const meshRef = useRef();
  const cfg = TYPE_CONFIG[node.type] || TYPE_CONFIG.person;
  const position = [node.x || 0, node.y || 0, node.z || 0];
  const opacity = isDimmed ? 0.18 : 1.0;

  // Subtle float animation for selected node
  useFrame((state) => {
    if (!meshRef.current) return;
    if (isSelected) {
      meshRef.current.position.z = (node.z || 0) + Math.sin(state.clock.elapsedTime * 2) * 0.06;
    } else {
      meshRef.current.position.z = node.z || 0;
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
    >
      {/* Invisible hit-box plane for raycasting */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onSelect && onSelect(node.id); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; onHover && onHover(node.id); }}
        onPointerOut={() => { document.body.style.cursor = "auto"; onHover && onHover(null); }}
      >
        <planeGeometry args={[2.2, 0.9]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* HTML card overlay */}
      <Html
        center
        distanceFactor={7}
        style={{ pointerEvents: "none", opacity, transition: "opacity 0.25s ease" }}
        occlude={false}
      >
        <div
          className={`
            relative flex flex-col gap-[2px] px-2.5 py-1.5
            rounded-md border backdrop-blur-sm
            min-w-[120px] max-w-[160px] select-none
            transition-all duration-200
            ${cfg.bgCls}
            ${isSelected
              ? "bg-white/10 border-opacity-80 shadow-lg ring-1 ring-white/20"
              : isHovered
                ? "bg-white/8 border-opacity-60"
                : "border-opacity-30"
            }
          `}
          style={{
            background: isSelected
              ? `rgba(255,255,255,0.07)`
              : `rgba(10,14,14,0.72)`,
          }}
        >
          {/* Type label */}
          <div
            className="text-[8px] font-mono font-bold tracking-widest uppercase opacity-60 leading-none"
            style={{ color: cfg.hex }}
          >
            {cfg.label}
          </div>

          {/* Entity name */}
          <div
            className="text-[11px] font-semibold leading-snug text-white truncate"
            style={{ maxWidth: 140, opacity: isDimmed ? 0.4 : 1 }}
          >
            {node.name}
          </div>

          {/* Connection count / role */}
          <div className="text-[8px] font-mono text-white/40 leading-none mt-[1px]">
            {linkCount > 0 ? `${linkCount} link${linkCount !== 1 ? "s" : ""}` : node.role || ""}
          </div>

          {/* Selection indicator: left accent bar */}
          {isSelected && (
            <div
              className="absolute left-0 top-1/4 bottom-1/4 w-[2px] rounded-r"
              style={{ background: cfg.hex }}
            />
          )}
        </div>
      </Html>
    </group>
  );
}

// ────────────────────────────────────────────────────────────
// LinkLines — thin colored connection lines
// ────────────────────────────────────────────────────────────
function LinkLines({ links, nodeMap, selectedNodeId }) {
  const lineGeometry = useMemo(() => {
    const points = [];
    const colors = [];

    links.forEach((link) => {
      const sId = typeof link.source === "object" ? link.source.id : link.source;
      const tId = typeof link.target === "object" ? link.target.id : link.target;
      const src = nodeMap.get(sId);
      const tgt = nodeMap.get(tId);
      if (!src || !tgt) return;

      const p1 = new THREE.Vector3(src.x || 0, src.y || 0, src.z || 0);
      const p2 = new THREE.Vector3(tgt.x || 0, tgt.y || 0, tgt.z || 0);
      points.push(p1, p2);

      const isConnected =
        selectedNodeId &&
        (sId === selectedNodeId || tId === selectedNodeId);

      const c = isConnected
        ? new THREE.Color("#3F8A82") // teal accent for selected connections
        : new THREE.Color("#2A3535"); // dark grey for idle links
      colors.push(c.r, c.g, c.b, c.r, c.g, c.b);
    });

    const geom = new THREE.BufferGeometry().setFromPoints(points);
    geom.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geom;
  }, [links, nodeMap, selectedNodeId]);

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial
        vertexColors={true}
        transparent={true}
        opacity={selectedNodeId ? 0.55 : 0.35}
        linewidth={1}
      />
    </lineSegments>
  );
}

// ────────────────────────────────────────────────────────────
// GraphScene — inner group with rotation logic
// ────────────────────────────────────────────────────────────
function GraphScene({ nodes, links, selectedNodeId, onSelectNode, autoRotate, activeFilter }) {
  const groupRef = useRef();
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const nodeMap = useMemo(() => {
    const m = new Map();
    nodes.forEach((n) => m.set(n.id, n));
    return m;
  }, [nodes]);

  // Build per-node link count for card display
  const linkCountMap = useMemo(() => {
    const counts = {};
    links.forEach((link) => {
      const sId = typeof link.source === "object" ? link.source.id : link.source;
      const tId = typeof link.target === "object" ? link.target.id : link.target;
      counts[sId] = (counts[sId] || 0) + 1;
      counts[tId] = (counts[tId] || 0) + 1;
    });
    return counts;
  }, [links]);

  const filteredNodes = useMemo(() => {
    if (!activeFilter || activeFilter === "all") return nodes;
    return nodes.filter((n) => n.type === activeFilter);
  }, [nodes, activeFilter]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const filteredLinks = useMemo(() => {
    return links.filter((link) => {
      const sId = typeof link.source === "object" ? link.source.id : link.source;
      const tId = typeof link.target === "object" ? link.target.id : link.target;
      return filteredNodeIds.has(sId) && filteredNodeIds.has(tId);
    });
  }, [links, filteredNodeIds]);

  // Slow cinematic rotation: 0.10 rad/s ≈ full rotation ~63s
  useFrame((_, delta) => {
    if (groupRef.current && autoRotate && !prefersReducedMotion && !selectedNodeId) {
      groupRef.current.rotation.y += delta * 0.10;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Subtle scene lighting — no neon */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[8, 12, 8]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-6, -6, -6]} intensity={0.3} color="#3F8A82" />

      <LinkLines
        links={filteredLinks}
        nodeMap={nodeMap}
        selectedNodeId={selectedNodeId}
      />

      {filteredNodes.map((node) => {
        const isSelected = selectedNodeId === node.id;
        const isDimmed = !!selectedNodeId && !isSelected;
        const isHovered = hoveredNodeId === node.id;
        return (
          <EntityCard
            key={node.id}
            node={node}
            isSelected={isSelected}
            isDimmed={isDimmed}
            isHovered={isHovered}
            onSelect={onSelectNode}
            onHover={setHoveredNodeId}
            linkCount={linkCountMap[node.id] || 0}
          />
        );
      })}
    </group>
  );
}

// ────────────────────────────────────────────────────────────
// Network3D — public export
// ────────────────────────────────────────────────────────────
export default function Network3D({
  nodes = [],
  links = [],
  selectedNodeId,
  onSelectNode,
  autoRotate = true,
  activeFilter = "all",
}) {
  const controlsRef = useRef();
  const resumeTimerRef = useRef(null);

  // Pause on drag, resume after 3s idle
  const handleInteractionStart = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const handleInteractionEnd = useCallback(() => {
    if (!autoRotate) return;
    resumeTimerRef.current = setTimeout(() => {
      // The autoRotate state lives in the parent; we just let the frame loop take over
    }, 3000);
  }, [autoRotate]);

  return (
    <div className="w-full h-full relative overflow-hidden select-none">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <GraphScene
          nodes={nodes}
          links={links}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          autoRotate={autoRotate}
          activeFilter={activeFilter}
        />
        <OrbitControls
          ref={controlsRef}
          enableDamping={true}
          dampingFactor={0.06}
          rotateSpeed={0.7}
          zoomSpeed={0.8}
          maxDistance={22}
          minDistance={3}
          onStart={handleInteractionStart}
          onEnd={handleInteractionEnd}
        />
      </Canvas>
    </div>
  );
}
