"use client";

import { useState, useEffect, useRef } from 'react';
import { Upload, FileText, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import Btn from '../ui/Btn';
import ProcessingPipeline, { PIPELINE_STAGES } from '../case/ProcessingPipeline';

export default function NewCaseForm({ isOpen, onClose, onCreateCase }) {
  const [name, setName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isPipelineComplete, setIsPipelineComplete] = useState(false);

  const timerRef = useRef(null);

  // Reset form state automatically when closed
  useEffect(() => {
    if (!isOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      setName('');
      setSelectedFiles([]);
      setIsProcessing(false);
      setIsPipelineComplete(false);
      setCurrentStageIndex(0);
    }
  }, [isOpen]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleCancel = () => {
    if (isProcessing) return; // Prevent cancelling mid-processing
    setName('');
    setSelectedFiles([]);
    setIsProcessing(false);
    setIsPipelineComplete(false);
    setCurrentStageIndex(0);
    onClose();
  };

  const isFormValid = name.trim().length > 0 && selectedFiles.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid || isProcessing) return;

    setIsProcessing(true);
    setCurrentStageIndex(0);
    setIsPipelineComplete(false);

    let stage = 0;
    const stageDuration = 450; // ms per stage for smooth demo timing

    timerRef.current = setInterval(() => {
      stage += 1;
      if (stage < PIPELINE_STAGES.length) {
        setCurrentStageIndex(stage);
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsPipelineComplete(true);

        // Brief delay to showcase completed 100% pipeline state before finalizing case
        setTimeout(() => {
          const newCase = {
            id: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
            name: name.trim(),
            entities: Math.floor(10 + Math.random() * 50),
            events: Math.floor(5 + Math.random() * 20),
            anomalies: Math.floor(Math.random() * 3),
            updated: "Just now",
            classification: "Financial / Cyber Crime",
            priority: "High",
            description: `Ingested ${selectedFiles.length} evidence file(s): ${selectedFiles.map(f => f.name).join(', ')}.`,
          };

          onCreateCase(newCase);
          setIsProcessing(false);
          setIsPipelineComplete(false);
          setCurrentStageIndex(0);
          setName('');
          setSelectedFiles([]);
          onClose();
        }, 700);
      }
    }, stageDuration);
  };

  return (
    <div
      className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? "grid-rows-[1fr] opacity-100 mb-8" : "grid-rows-[0fr] opacity-0 mb-0 pointer-events-none"
      }`}
    >
      <div className="overflow-hidden">
        {isProcessing ? (
          <ProcessingPipeline
            stages={PIPELINE_STAGES}
            currentStageIndex={currentStageIndex}
            isComplete={isPipelineComplete}
          />
        ) : (
          <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-lg backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* 1. Case Title */}
              <div className="space-y-1.5">
                <label htmlFor="inlineCaseTitle" className="block text-[14px] font-medium text-[var(--text-primary)]">
                  Case Title <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  id="inlineCaseTitle"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Operation Harbor Watch / Sector 7 Fraud"
                  className="w-full px-3.5 py-2.5 text-[15px] placeholder:text-[14px] rounded-xl bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-all font-sans"
                />
              </div>

              {/* 2. File Upload (Required) */}
              <div className="space-y-1.5">
                <label className="block text-[14px] font-medium text-[var(--text-primary)]">
                  File Upload <span className="text-[var(--danger)]">*</span>
                  <span className="text-[12px] font-normal text-[var(--text-secondary)] ml-1.5">
                    (At least 1 evidence file required)
                  </span>
                </label>

                <div className="relative border border-dashed border-[var(--border)] hover:border-[var(--primary)] rounded-xl p-5 text-center transition-colors bg-[var(--surface-hover)]">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept=".pdf,.csv,.txt,.json,.cdr"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    tabIndex={isOpen ? 0 : -1}
                  />
                  <Upload className="w-6 h-6 mx-auto mb-1.5 text-[var(--primary)]" />
                  <p className="text-[14px] font-medium text-[var(--text-primary)]">
                    Drag and drop evidence files or <span className="text-[var(--primary)] font-semibold underline">browse</span>
                  </p>
                  <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">
                    Supports CDR logs, wiretap transcripts, financial statements (max 50MB per file)
                  </p>
                </div>

                {/* Selected Files List */}
                {selectedFiles.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="text-[11px] font-mono font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                      Attached Files ({selectedFiles.length}):
                    </p>
                    <div className="max-h-32 overflow-y-auto space-y-1 pr-1">
                      {selectedFiles.map((file, idx) => (
                        <div
                          key={`${file.name}-${idx}`}
                          className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[13px] text-[var(--text-primary)]"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                            <span className="truncate text-[13px] font-medium">{file.name}</span>
                            <span className="text-[11px] font-mono text-[var(--text-secondary)] shrink-0">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(idx)}
                            className="p-1 text-[var(--text-secondary)] hover:text-[var(--danger)] transition-colors shrink-0 outline-none"
                            title="Remove file"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Validation Feedback & Footer Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[var(--divider)]">
                
                {/* Validation Status Indicator */}
                <div className="text-[11px] flex items-center gap-1.5">
                  {!name.trim() && selectedFiles.length === 0 && (
                    <span className="text-[var(--text-secondary)]">Case title &amp; at least 1 evidence file required</span>
                  )}
                  {name.trim() && selectedFiles.length === 0 && (
                    <span className="text-[var(--warning)] font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Please attach at least 1 evidence file
                    </span>
                  )}
                  {!name.trim() && selectedFiles.length > 0 && (
                    <span className="text-[var(--warning)] font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Please enter a case title
                    </span>
                  )}
                  {isFormValid && (
                    <span className="text-[var(--success)] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ready to create case
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <Btn variant="ghost" size="sm" onClick={handleCancel} disabled={isProcessing}>
                    Cancel
                  </Btn>
                  <Btn
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isProcessing || !isFormValid}
                  >
                    {isProcessing ? "Processing..." : "Create Case"}
                  </Btn>
                </div>

              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
}
