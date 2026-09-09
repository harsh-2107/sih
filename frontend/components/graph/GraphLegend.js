"use client";

import React from "react";
import { NODE_TYPES } from "@/lib/mock/graph";

const HEX = {
  person:   "#3F8A82",
  org:      "#5878B0",
  location: "#7AAD4A",
  phone:    "#9A7ACE",
  vehicle:  "#C87850",
  document: "#E5C07B",
};

export default function GraphLegend({ activeFilter, onSelectFilter }) {
  return (
    <div className="absolute bottom-4 left-4 z-10 p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] backdrop-blur-md shadow-lg pointer-events-auto max-w-[90vw]">
      <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
        Entity Types
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => onSelectFilter?.("all")}
          className={`px-2 py-1 rounded text-[10px] font-mono transition-all border ${
            activeFilter === "all"
              ? "bg-[var(--primary)]/20 border-[var(--primary)] text-[var(--primary)] font-semibold"
              : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          All Types
        </button>

        {Object.entries(NODE_TYPES).map(([typeKey, meta]) => {
          const isSelected = activeFilter === typeKey;
          const hex = HEX[typeKey] || "#3F8A82";
          return (
            <button
              key={typeKey}
              onClick={() => onSelectFilter?.(typeKey)}
              className={`px-2 py-1 rounded text-[10px] font-mono transition-all flex items-center gap-1.5 border ${
                isSelected
                  ? "bg-[var(--surface-hover)] border-[var(--border-strong)] text-[var(--text-primary)] font-semibold"
                  : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                style={{ backgroundColor: hex }}
              />
              <span>{meta.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

