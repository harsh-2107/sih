"use client";

import { Check, Loader2, ShieldCheck } from 'lucide-react';

export const PIPELINE_STAGES = [
  { id: "upload", label: "UPLOAD", statusText: "Uploading evidence..." },
  { id: "parsing", label: "PARSING", statusText: "Parsing investigation files..." },
  { id: "entity-extraction", label: "ENTITY EXTRACTION", statusText: "Extracting entities..." },
  { id: "entity-resolution", label: "ENTITY RESOLUTION", statusText: "Resolving entities..." },
  { id: "creating-graph", label: "CREATING GRAPH", statusText: "Creating investigation graph..." },
  { id: "anomaly-analysis", label: "ANOMALY ANALYSIS", statusText: "Running anomaly analysis..." },
];

export default function ProcessingPipeline({
  stages = PIPELINE_STAGES,
  currentStageIndex = 0,
  isComplete = false,
  customStatusText = null,
}) {
  // Determine current status message
  let statusMessage = customStatusText;
  if (!statusMessage) {
    if (isComplete) {
      statusMessage = "Analysis complete. Investigation graph updated successfully.";
    } else if (currentStageIndex >= 0 && currentStageIndex < stages.length) {
      statusMessage = stages[currentStageIndex].statusText;
    } else {
      statusMessage = "Initializing processing pipeline...";
    }
  }

  // Calculate percentage
  const totalStages = stages.length;
  const currentNum = isComplete ? totalStages : Math.max(0, currentStageIndex + 1);
  const percentage = Math.min(100, Math.round((currentNum / totalStages) * 100));

  return (
    <div className="w-full p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl shadow-lg transition-all duration-300">
      
      {/* Pipeline Header & Progress Percentage */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-[14px] font-semibold text-[var(--text-primary)]">
              {isComplete ? "Processing Complete" : "Pipeline Processing"}
            </h4>
            <p className="text-[12px] text-[var(--text-secondary)]">
              Criminal Network Analysis &amp; Ingestion Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[12px] font-mono font-semibold text-[var(--primary)] bg-[var(--primary)]/10 px-2.5 py-1 rounded-full border border-[var(--primary)]/20">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Horizontal Connected Step Pipeline */}
      <div className="relative py-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-[680px] sm:min-w-0">
          {stages.map((stage, idx) => {
            const isCompleted = isComplete || idx < currentStageIndex;
            const isActive = !isComplete && idx === currentStageIndex;
            const isPending = !isComplete && idx > currentStageIndex;

            const isNextCompleted = isComplete || idx + 1 <= currentStageIndex;

            return (
              <div key={stage.id} className="flex items-center flex-1 last:flex-initial">
                
                {/* Step Rectangle Card */}
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 select-none ${
                    isCompleted
                      ? "border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)] shadow-sm"
                      : isActive
                      ? "border-[var(--primary)] bg-[var(--primary)]/15 text-[var(--primary)] shadow-md shadow-[var(--primary)]/10 ring-1 ring-[var(--primary)]/30"
                      : "border-[var(--border)] bg-[var(--surface)]/40 text-[var(--text-secondary)] opacity-65"
                  }`}
                >
                  {/* Status Indicator Icon */}
                  <div className="shrink-0 flex items-center justify-center">
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 text-[var(--success)] stroke-[2.5]" />
                    ) : isActive ? (
                      <Loader2 className="w-3.5 h-3.5 text-[var(--primary)] animate-spin motion-reduce:animate-none" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-[var(--text-secondary)]/40" />
                    )}
                  </div>

                  {/* Step Label */}
                  <span className="text-[11px] sm:text-[12px] font-mono font-semibold tracking-wider whitespace-nowrap">
                    {stage.label}
                  </span>
                </div>

                {/* Connector Line (except for last element) */}
                {idx < stages.length - 1 && (
                  <div className="flex-1 mx-1.5 sm:mx-2 min-w-[12px] h-[2px] relative overflow-hidden rounded-full bg-[var(--divider)]">
                    <div
                      className={`h-full transition-all duration-500 ease-out ${
                        isNextCompleted
                          ? "w-full bg-[var(--success)]"
                          : isActive
                          ? "w-1/2 bg-[var(--primary)] animate-pulse"
                          : "w-0 bg-transparent"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Text Area with ARIA Live updates */}
      <div className="mt-4 pt-3 border-t border-[var(--divider)] flex items-center justify-between gap-3 text-[13px]">
        <div
          aria-live="polite"
          aria-atomic="true"
          className="flex items-center gap-2 font-medium text-[var(--text-primary)]"
        >
          {isComplete ? (
            <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
          ) : (
            <Loader2 className="w-4 h-4 text-[var(--primary)] animate-spin motion-reduce:animate-none shrink-0" />
          )}
          <span>{statusMessage}</span>
        </div>

        <div className="text-[11px] font-mono text-[var(--text-secondary)] shrink-0 hidden sm:block">
          Stage {currentNum} of {totalStages}
        </div>
      </div>

    </div>
  );
}
