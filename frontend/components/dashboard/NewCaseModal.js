"use client";

import { useState } from 'react';
import { X, Upload, FileText, CheckCircle2 } from 'lucide-react';
import Field from '../ui/Field';
import Btn from '../ui/Btn';

export default function NewCaseModal({ isOpen, onClose, onCreateCase }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [classification, setClassification] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsUploading(true);

    setTimeout(() => {
      const newCase = {
        id: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
        name: name.trim(),
        status: "active",
        entities: Math.floor(10 + Math.random() * 50),
        events: Math.floor(5 + Math.random() * 20),
        anomalies: Math.floor(Math.random() * 3),
        updated: "Just now",
        classification: classification.trim() || "Financial / Organized Crime",
        priority: "High",
        description: description.trim() || "Newly initialized investigation record.",
      };

      onCreateCase(newCase);
      setIsUploading(false);
      setName('');
      setDescription('');
      setClassification('');
      setSelectedFile(null);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--divider)]">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Initialize New Investigation Case</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Field
            label="Case Title"
            id="caseName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Operation Harbor Watch"
            required
          />

          <Field
            label="Case Classification"
            id="caseClassification"
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
            placeholder="e.g. Financial / Organized Crime"
          />

          <div className="space-y-1.5">
            <label htmlFor="caseDesc" className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Case Brief / Description
            </label>
            <textarea
              id="caseDesc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of allegations, scope, or targets..."
              className="w-full px-3 py-2 text-sm rounded-lg bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* Upload Dropzone */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Ingest Investigation Files (PDF, CSV, CDR)
            </label>
            <div className="relative border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)] rounded-xl p-6 text-center transition-colors bg-[var(--surface-hover)]">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.csv,.txt,.json,.cdr"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 mx-auto mb-2 text-[var(--text-secondary)]" />
              {selectedFile ? (
                <div className="flex items-center justify-center gap-2 text-xs text-[var(--primary)] font-semibold">
                  <FileText className="w-4 h-4" />
                  <span>{selectedFile.name}</span>
                </div>
              ) : (
                <>
                  <p className="text-xs font-medium text-[var(--text-primary)]">
                    Drag and drop file or <span className="text-[var(--primary)] font-semibold">browse</span>
                  </p>
                  <p className="text-[10px] text-[var(--text-secondary)] mt-1">
                    Supports CDR logs, wiretap transcripts, financial statements (max 50MB)
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--divider)]">
            <Btn variant="ghost" onClick={onClose} disabled={isUploading}>
              Cancel
            </Btn>
            <Btn type="submit" variant="primary" disabled={isUploading || !name.trim()}>
              {isUploading ? "Initializing & Processing..." : "Create Case"}
            </Btn>
          </div>
        </form>

      </div>
    </div>
  );
}
