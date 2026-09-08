"use client";

import React from "react";
import { RotateCw, Maximize2, RefreshCw, Zap } from "lucide-react";

export default function GraphControls({
  autoRotate,
  onToggleAutoRotate,
  onResetView,
  onFitView,
  temporalStep,
  onTemporalStepChange,
  snapshots = [],
}) {
  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 pointer-events-auto">
      {/* Control buttons */}
      <div className="flex items-center gap-1 p-1 rounded-lg bg-black/60 border border-white/15 backdrop-blur-sm shadow-lg">
        <button
          onClick={onToggleAutoRotate}
          title={autoRotate ? "Pause Auto-Rotation" : "Start Auto-Rotation"}
          className={`p-2 rounded-md transition-all text-[11px] font-mono flex items-center gap-1.5 ${
            autoRotate
              ? "bg-[var(--primary)]/25 text-[var(--primary)] border border-[var(--primary)]/40"
              : "text-white/40 hover:text-white hover:bg-white/8"
          }`}
        >
          <RotateCw
            className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`}
            style={{ animationDuration: "8s" }}
          />
          <span className="hidden sm:inline">{autoRotate ? "Rotating" : "Rotate"}</span>
        </button>

        <div className="w-px h-4 bg-white/10" />

        <button
          onClick={onResetView}
          title="Reset Camera"
          className="p-2 rounded-md text-white/40 hover:text-white hover:bg-white/8 transition-all text-[11px] font-mono flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        <button
          onClick={onFitView}
          title="Fit to Viewport"
          className="p-2 rounded-md text-white/40 hover:text-white hover:bg-white/8 transition-all text-[11px] font-mono flex items-center gap-1.5"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Fit</span>
        </button>
      </div>

      {/* Temporal replay slider */}
      {snapshots.length > 0 && (
        <div className="p-2.5 rounded-lg bg-black/60 border border-white/15 backdrop-blur-sm shadow-lg flex flex-col gap-2 w-64">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-[var(--primary)]" /> Temporal Replay
            </span>
            <span className="text-[10px] font-mono text-[var(--primary)] font-semibold">
              {snapshots[temporalStep]?.label?.split(" (")[0] || `Step ${temporalStep + 1}`}
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={snapshots.length - 1}
            value={temporalStep}
            onChange={(e) => onTemporalStepChange?.(parseInt(e.target.value))}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
          />

          <div className="flex justify-between text-[9px] font-mono text-white/30">
            <span>{snapshots[0]?.date}</span>
            <span>{snapshots[snapshots.length - 1]?.date}</span>
          </div>
        </div>
      )}
    </div>
  );
}
