"use client";

import React, { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/providers/ThemeProvider";

// ────────────────────────────────────────────────────────────
// Type palette — CrimeNet-aligned
// ────────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  person:   { hex: "#3F8A82", label: "PERSON"       },
  org:      { hex: "#5878B0", label: "ORGANIZATION" },
  location: { hex: "#7AAD4A", label: "LOCATION"     },
  phone:    { hex: "#9A7ACE", label: "PHONE"        },
  vehicle:  { hex: "#C87850", label: "VEHICLE"      },
  document: { hex: "#E5C07B", label: "DOCUMENT"     },
};

// ────────────────────────────────────────────────────────────
// EntityCard — floating HTML panel in 3D space
// NO DIMMING: All nodes remain fully visible at 100% opacity.
// ────────────────────────────────────────────────────────────
function EntityCard({ node, isSelected, isHovered, onSelect, onHover, linkCount, isDark }) {
  const meshRef = useRef();
  const cfg = TYPE_CONFIG[node.type] || TYPE_CONFIG.person;
  const position = [node.x || 0, node.y || 0, node.z || 0];

  // Subtle float animation for selected node
  useFrame((state) => {
    if (!meshRef.current) return;
    if (isSelected) {
      meshRef.current.position.z = (node.z || 0) + Math.sin(state.clock.elapsedTime * 2) * 0.08;
    } else {
      meshRef.current.position.z = node.z || 0;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Invisible hit-box plane for raycasting */}
      <mesh
          onPointerDown={(e) => { e.stopPropagation(); onSelect && onSelect(node.id); }}
          onClick={(e) => { e.stopPropagation(); onSelect && onSelect(node.id); }}
          onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; onHover && onHover(node.id); }}
          onPointerOut={() => { document.body.style.cursor = "auto"; onHover && onHover(null); }}
        >
        <planeGeometry args={[2.2, 0.9]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* 3D Selection Ring Halo */}
      {isSelected && null}

      {/* HTML card overlay — ALWAYS opacity 1.0 */}
      <Html
        center
        distanceFactor={7}
        style={{ pointerEvents: "none", opacity: 1.0, transition: "transform 0.2s ease" }}
        occlude={false}
      >
        <div
          className={`
            relative flex flex-col gap-[2px] px-3 py-2
            rounded-lg border backdrop-blur-md
            min-w-[125px] max-w-[165px] select-none
            transition-all duration-200
            ${isSelected
              ? isDark
                ? "bg-[#14201E] border-2 border-[#3F8A82] ring-4 ring-[#3F8A82]/50 shadow-2xl scale-110"
                : "bg-[#FFFFFF] border-2 border-[#174A46] ring-4 ring-[#174A46]/40 shadow-2xl scale-110"
              : isHovered
                ? isDark
                  ? "bg-[#182322] border-white/30 shadow-md"
                  : "bg-[#F0F2ED] border-[#174A46]/40 shadow-md"
                : isDark
                  ? "bg-[#0E1515]/90 border-white/12 shadow-sm"
                  : "bg-[#F7F8F5]/95 border-[#174A46]/20 shadow-sm"
            }
          `}
        >
          {/* Type label */}
          <div
            className="text-[8.5px] font-mono font-bold tracking-widest uppercase leading-none flex items-center justify-between"
            style={{ color: cfg.hex }}
          >
            <span>{cfg.label}</span>
            {isSelected && (
              <span className={`w-2 h-2 rounded-full ${isDark ? "bg-[#3F8A82] shadow-sm animate-pulse" : "bg-[#174A46] shadow-sm animate-pulse"}`} />
            )}
          </div>

          {/* Entity name */}
          <div
            className={`text-[11.5px] font-semibold leading-snug truncate ${
              isSelected
                ? isDark ? "text-white font-bold" : "text-[#101817] font-bold"
                : isDark ? "text-[#EFF2ED]" : "text-[#17201F]"
            }`}
            style={{ maxWidth: 145 }}
          >
            {node.name}
          </div>

          {/* Connection count / role */}
          <div className={`text-[8.5px] font-mono leading-none mt-[1px] ${
            isDark ? "text-[#A1AAA6]" : "text-[#66716F]"
          }`}>
            {linkCount > 0 ? `${linkCount} connection${linkCount !== 1 ? "s" : ""}` : node.role || ""}
          </div>

          {/* Selection indicator bar */}
          {isSelected && (
            <div
              className="absolute left-0 top-1 bottom-1 w-[3.5px] rounded-r"
              style={{ background: isDark ? "#3F8A82" : "#174A46" }}
            />
          )}
        </div>
      </Html>
    </group>
  );
}

// ────────────────────────────────────────────────────────────
// LinkLines — Connections using Drei <Line>
// When a node is selected, all edges directly connected to that node are visually highlighted.
// All other edges remain fully visible at normal opacity.
// ────────────────────────────────────────────────────────────
function LinkLines({ links, nodeMap, selectedNodeId, selectedLinkId, isDark }) {
  return (
    <group>
      {links.map((link) => {
        const sId = typeof link.source === "object" ? link.source.id : link.source;
        const tId = typeof link.target === "object" ? link.target.id : link.target;
        const src = nodeMap.get(sId);
        const tgt = nodeMap.get(tId);
        if (!src || !tgt) return null;

        const p1 = [src.x || 0, src.y || 0, src.z || 0];
        const p2 = [tgt.x || 0, tgt.y || 0, tgt.z || 0];

        const isSelectedLink = selectedLinkId && (link.id === selectedLinkId);
        const isConnectedToSelectedNode = selectedNodeId && (sId === selectedNodeId || tId === selectedNodeId);
        const isHighlighted = isSelectedLink || isConnectedToSelectedNode;

        let color;
        let opacity;
        let lineWidth;

        if (isDark) {
          if (isHighlighted) {
            color = "#C87850"; // Accent orange highlight for selected/connected edge
            opacity = 0.95;
            lineWidth = 3.8;
          } else {
            color = "#3F8A82"; // Muted teal for idle links in dark mode
            opacity = 0.50;
            lineWidth = 2.2;
          }
        } else {
          // LIGHT MODE
          if (isHighlighted) {
            color = "#B7653F"; // Accent rust highlight for selected/connected edge
            opacity = 0.95;
            lineWidth = 3.8;
          } else {
            color = "#174A46"; // Dark primary teal for idle links (contrasts strongly against #E9E7E1)
            opacity = 0.60;
            lineWidth = 2.2;
          }
        }

        return (
          <Line
            key={link.id || `${sId}-${tId}`}
            points={[p1, p2]}
            color={color}
            lineWidth={lineWidth}
            transparent
            opacity={opacity}
          />
        );
      })}
    </group>
  );
}

// ────────────────────────────────────────────────────────────
// CameraController — Camera Reset & Fit controller
// ────────────────────────────────────────────────────────────
function CameraController({ resetSignal, fitSignal, filteredNodes }) {
  const { camera } = useThree();
  const controls = useThree((state) => state.controls);

  const defaultCamPos = useMemo(() => new THREE.Vector3(0, 0, 9), []);
  const defaultTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  const targetCamPos = useRef(null);
  const targetLookAt = useRef(null);
  const isAnimating = useRef(false);

  // RESET CAMERA
  useEffect(() => {
    if (resetSignal === 0 || !controls) return;
    targetCamPos.current = defaultCamPos.clone();
    targetLookAt.current = defaultTarget.clone();
    isAnimating.current = true;
  }, [resetSignal, defaultCamPos, defaultTarget, controls]);

  // FIT CAMERA TO VISIBLE NODES
  useEffect(() => {
    if (fitSignal === 0 || !controls || filteredNodes.length === 0) return;

    const box = new THREE.Box3();
    filteredNodes.forEach((node) => {
      box.expandByPoint(new THREE.Vector3(node.x || 0, node.y || 0, node.z || 0));
    });

    const center = new THREE.Vector3();
    box.getCenter(center);

    const size = new THREE.Vector3();
    box.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z, 2.5);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.5;
    cameraZ = Math.max(cameraZ, 4.5);

    targetCamPos.current = new THREE.Vector3(center.x, center.y, center.z + cameraZ);
    targetLookAt.current = center.clone();
    isAnimating.current = true;
  }, [fitSignal, filteredNodes, camera, controls]);

  // Smooth lerp frame loop (300-500ms transition)
  useFrame((_, delta) => {
    if (isAnimating.current && targetCamPos.current && targetLookAt.current && controls) {
      const step = Math.min(delta * 7, 0.3);
      camera.position.lerp(targetCamPos.current, step);
      controls.target.lerp(targetLookAt.current, step);
      controls.update();

      if (
        camera.position.distanceTo(targetCamPos.current) < 0.05 &&
        controls.target.distanceTo(targetLookAt.current) < 0.05
      ) {
        camera.position.copy(targetCamPos.current);
        controls.target.copy(targetLookAt.current);
        controls.update();
        isAnimating.current = false;
        targetCamPos.current = null;
        targetLookAt.current = null;
      }
    }
  });

  return null;
}

// ────────────────────────────────────────────────────────────
// GraphScene — inner group with theme-aware lights & rotation
// ────────────────────────────────────────────────────────────
function GraphScene({
  nodes,
  links,
  selectedNodeId,
  selectedLinkId,
  onSelectNode,
  autoRotate,
  activeFilter,
  isDark,
  resetSignal,
  fitSignal,
}) {
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

  // Slow cinematic rotation: 0.10 rad/s
  useFrame((_, delta) => {
    if (groupRef.current && autoRotate && !prefersReducedMotion && !selectedNodeId) {
      groupRef.current.rotation.y += delta * 0.10;
    }
  });

  return (
    <group ref={groupRef}>
      <CameraController
        resetSignal={resetSignal}
        fitSignal={fitSignal}
        filteredNodes={filteredNodes}
      />

      {/* Invisible background plane for clearing selection when clicking empty space */}
      <mesh
        position={[0, 0, -10]}
        onClick={(e) => { e.stopPropagation(); onSelectNode && onSelectNode(null); }}
      >
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* Theme-aware scene lighting */}
      {isDark ? (
        <>
          <ambientLight intensity={0.8} color="#ffffff" />
          <directionalLight position={[8, 12, 8]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-6, -6, -6]} intensity={0.4} color="#3F8A82" />
        </>
      ) : (
        <>
          <ambientLight intensity={1.2} color="#fffdf8" />
          <directionalLight position={[10, 15, 10]} intensity={1.0} color="#ffffff" />
          <pointLight position={[-6, -6, -6]} intensity={0.3} color="#174A46" />
        </>
      )}

      <LinkLines
        links={filteredLinks}
        nodeMap={nodeMap}
        selectedNodeId={selectedNodeId}
        selectedLinkId={selectedLinkId}
        isDark={isDark}
      />

      {filteredNodes.map((node) => {
        const isSelected = selectedNodeId === node.id;
        const isHovered = hoveredNodeId === node.id;
        return (
          <EntityCard
            key={node.id}
            node={node}
            isSelected={isSelected}
            isHovered={isHovered}
            onSelect={onSelectNode}
            onHover={setHoveredNodeId}
            linkCount={linkCountMap[node.id] || 0}
            isDark={isDark}
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
  selectedLinkId,
  onSelectNode,
  autoRotate = true,
  activeFilter = "all",
  resetSignal = 0,
  fitSignal = 0,
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const controlsRef = useRef();
  const resumeTimerRef = useRef(null);

  const handleInteractionStart = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const handleInteractionEnd = useCallback(() => {
    if (!autoRotate) return;
    resumeTimerRef.current = setTimeout(() => {}, 3000);
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
          selectedLinkId={selectedLinkId}
          onSelectNode={onSelectNode}
          autoRotate={autoRotate}
          activeFilter={activeFilter}
          isDark={isDark}
          resetSignal={resetSignal}
          fitSignal={fitSignal}
        />
        <OrbitControls
          makeDefault
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


