"use client";

import React, { useState, useRef } from "react";
import {
  Upload, FileCode, X, CheckCircle2, Loader2,
  ArrowRight, FileText, ShieldAlert, Tag
} from "lucide-react";
import ProcessingPipeline, { PIPELINE_STAGES } from "./ProcessingPipeline";

// Stage durations (ms) for mock pipeline
const STAGE_DURATIONS = [800, 900, 1100, 900, 1000, 800];

export default function UploadEvidencePage({ caseItem = {}, onNavigate }) {
  const [uploadName, setUploadName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [pipelineStage, setPipelineStage] = useState(-1);   // -1 = not started
  const [pipelineDone, setPipelineDone] = useState(false);
  const fileInputRef = useRef(null);

  const isProcessing = pipelineStage >= 0 && !pipelineDone;
  const canSubmit = uploadName.trim().length > 0 && uploadedFiles.length > 0 && !isProcessing && !pipelineDone;

  const addFiles = (files) => {
    const items = Array.from(files).map((f) => ({
      id: `U-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      name: f.name,
      size: f.size < 1024 * 1024
        ? `${(f.size / 1024).toFixed(0)} KB`
        : `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
    }));
    setUploadedFiles((prev) => [...prev, ...items]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e) => addFiles(e.target.files);

  const removeFile = (id) =>
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));

  const runPipeline = () => {
    if (!canSubmit) return;
    setPipelineStage(0);
    setPipelineDone(false);

    let elapsed = 0;
    STAGE_DURATIONS.forEach((dur, idx) => {
      setTimeout(() => setPipelineStage(idx), elapsed);
      elapsed += dur;
    });
    setTimeout(() => {
      setPipelineDone(true);
    }, elapsed + 300);
  };

  const reset = () => {
    setUploadName("");
    setUploadedFiles([]);
    setPipelineStage(-1);
    setPipelineDone(false);
  };

  return (
    <div className="p-6 space-y-5 max-w-3xl mx-auto">
      {/* ── Page header ── */}
      <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[var(--primary)] uppercase tracking-wider">
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Evidence</span>
        </div>
        <h2 className="text-[17px] font-semibold text-[var(--text-primary)]">
          Add New Evidence Batch to Case
        </h2>

        {/* Current case context */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--primary)]/6 border border-[var(--primary)]/15">
          <div className="p-1.5 rounded-md bg-[var(--primary)] text-white shrink-0">
            <ShieldAlert className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-[var(--primary)] font-bold uppercase tracking-wider">
              {caseItem.id || "CASE-2049"}
            </div>
            <div className="text-[13px] font-semibold text-[var(--text-primary)]">
              {caseItem.name || "Sector 7 Extortion Ring"}
            </div>
          </div>
        </div>

        {/* Upload Name Input */}
        {!isProcessing && !pipelineDone && (
          <div className="space-y-1.5 pt-2 border-t border-[var(--divider)]">
            <label className="text-[11px] font-mono font-semibold text-[var(--text-secondary)] uppercase tracking-wider block">
              Upload / Batch Name <span className="text-[var(--danger)]">*</span>
            </label>
            <input
              type="text"
              value={uploadName}
              onChange={(e) => setUploadName(e.target.value)}
              placeholder='e.g., "Financial Records — September 2026"'
              className="w-full px-3.5 py-2 text-[13px] rounded-xl bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border)] placeholder:[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
            />
            <p className="text-[10px] font-mono text-[var(--text-tertiary)]">
              Descriptive name for this evidence submission batch.
            </p>
          </div>
        )}
      </div>

      {/* ── Upload zone (only when not processing/done) ── */}
      {!isProcessing && !pipelineDone && (
        <div className="space-y-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              flex flex-col items-center justify-center gap-3 py-10 px-6
              rounded-xl border-2 border-dashed cursor-pointer
              transition-all duration-200
              ${dragOver
                ? "border-[var(--primary)] bg-[var(--primary)]/8"
                : "border-[var(--border)] hover:border-[var(--primary)]/40 hover:bg-[var(--surface-hover)]"
              }
            `}
          >
            <div className={`p-3.5 rounded-2xl border transition-colors ${dragOver ? "bg-[var(--primary)]/15 border-[var(--primary)]/30" : "bg-[var(--surface-hover)] border-[var(--border)]"}`}>
              <Upload className={`w-6 h-6 transition-colors ${dragOver ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"}`} />
            </div>
            <div className="text-center space-y-1">
              <p className="text-[14px] font-semibold text-[var(--text-primary)]">
                {dragOver ? "Drop files here" : "Drag investigation files here"}
              </p>
              <p className="text-[12px] text-[var(--text-secondary)]">
                PDF, CSV, MP4, JSON, TXT — all formats accepted
              </p>
              <p className="text-[11px] font-mono text-[var(--text-tertiary)]">
                or <span className="text-[var(--primary)] underline underline-offset-2">browse to select</span>
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileInput}
            />
          </div>

          {/* File list */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider flex items-center justify-between">
                <span>Selected Files ({uploadedFiles.length})</span>
                <button
                  onClick={() => setUploadedFiles([])}
                  className="text-[var(--text-tertiary)] hover:text-[var(--danger)] transition-colors"
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-1.5">
                {uploadedFiles.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/25 transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileCode className="w-4 h-4 text-[var(--primary)] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[12px] font-medium text-[var(--text-primary)] truncate">{f.name}</p>
                        <p className="text-[10px] font-mono text-[var(--text-tertiary)]">{f.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(f.id)}
                      className="text-[var(--text-tertiary)] hover:text-[var(--danger)] transition-colors ml-2 shrink-0 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center gap-3">
            <button
              onClick={runPipeline}
              disabled={!canSubmit}
              className={`
                flex-1 py-3 rounded-xl font-semibold text-[14px]
                flex items-center justify-center gap-2 transition-all
                ${canSubmit
                  ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-sm cursor-pointer"
                  : "bg-[var(--surface-hover)] text-[var(--text-tertiary)] border border-[var(--border)] cursor-not-allowed"
                }
              `}
            >
              <Upload className="w-4 h-4" />
              <span>Analyse Evidence</span>
            </button>
          </div>

          {!canSubmit && (
            <p className="text-[11px] font-mono text-[var(--text-tertiary)] text-center">
              {!uploadName.trim() && uploadedFiles.length === 0
                ? "Upload batch name and at least one file are required to begin analysis."
                : !uploadName.trim()
                  ? "Please enter an upload batch name to proceed."
                  : "At least one file is required to begin analysis."
              }
            </p>
          )}
        </div>
      )}

      {/* ── Processing Pipeline ── */}
      {(isProcessing || pipelineDone) && (
        <div className="space-y-4">
          <ProcessingPipeline
            stages={PIPELINE_STAGES}
            currentStageIndex={pipelineStage}
            isComplete={pipelineDone}
          />

          {/* Result summary */}
          {pipelineDone && (
            <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-2 text-[var(--success)]">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div>
                  <p className="text-[14px] font-semibold text-[var(--text-primary)]">Evidence Integrated</p>
                  <p className="text-[12px] text-[var(--text-secondary)]">
                    Batch &quot;<strong className="text-[var(--text-primary)]">{uploadName}</strong>&quot; ({uploadedFiles.length} file{uploadedFiles.length !== 1 ? "s" : ""}) processed successfully
                  </p>
                </div>
              </div>

              {/* Delta summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "New Entities",       value: "+4", color: "var(--success)" },
                  { label: "New Relationships",   value: "+7", color: "var(--primary)" },
                  { label: "Anomalies Flagged",  value: "+2", color: "var(--warning)" },
                  { label: "Entity Resolved",    value: "1",  color: "var(--success)" },
                ].map(m => (
                  <div key={m.label} className="p-3 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] text-center">
                    <div className="text-[18px] font-bold" style={{ color: m.color }}>{m.value}</div>
                    <div className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Navigation actions */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => onNavigate?.("timeline")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-[12px] font-semibold hover:bg-[var(--primary-hover)] transition-colors"
                >
                  <span>View Timeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigate?.("network")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-primary)] text-[12px] font-semibold hover:border-[var(--primary)]/40 transition-colors"
                >
                  <span>View Network Graph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] text-[12px] hover:border-[var(--border-strong)] transition-colors"
                >
                  Upload More
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

