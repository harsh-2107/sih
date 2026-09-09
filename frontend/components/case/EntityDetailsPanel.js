"use client";

import { X, Sparkles, User, Building, MapPin, Phone, Truck, Info, AlertTriangle, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { NODE_TYPES } from '@/lib/mock/graph';

export default function EntityDetailsPanel({ selectedNode, onClose, onAskAi, links = [] }) {
  if (!selectedNode) return null;

  const getNodeIcon = (type) => {
    switch (type) {
      case 'person': return <User className="w-4 h-4 text-[var(--primary)]" />;
      case 'org': return <Building className="w-4 h-4 text-[#3E5C8A]" />;
      case 'location': return <MapPin className="w-4 h-4 text-[var(--success)]" />;
      case 'phone': return <Phone className="w-4 h-4 text-[#8C5A9E]" />;
      case 'vehicle': return <Truck className="w-4 h-4 text-[var(--accent)]" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  // Find relationships connected to this node
  const connectedLinks = links.filter((l) => {
    const sId = typeof l.source === 'object' ? l.source.id : l.source;
    const tId = typeof l.target === 'object' ? l.target.id : l.target;
    return sId === selectedNode.id || tId === selectedNode.id;
  });

  return (
    <div className="w-full p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--divider)]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] shrink-0">
            {getNodeIcon(selectedNode.type)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border)]">
                {selectedNode.id}
              </span>
              <span className="text-[11px] font-mono font-medium text-[var(--text-secondary)] uppercase">
                {NODE_TYPES[selectedNode.type]?.label || selectedNode.type}
              </span>
            </div>
            <h3 className="text-[17px] font-semibold text-[var(--text-primary)] mt-0.5">
              {selectedNode.name}
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
          title="Close details"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Role & Risk Level Badges */}
      {/* <div className="grid grid-cols-2 gap-2 text-[12px]">
        <div className="p-2.5 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)]">
          <span className="text-[11px] text-[var(--text-secondary)] block mb-0.5">Role</span>
          <span className="font-semibold text-[var(--text-primary)]">{selectedNode.role || "Associated Entity"}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)]">
          <span className="text-[11px] text-[var(--text-secondary)] block mb-0.5">Risk Level</span>
          <span className={`font-semibold capitalize flex items-center gap-1 ${
            selectedNode.risk === 'high' ? 'text-[var(--danger)]' : 'text-[var(--warning)]'
          }`}>
            <AlertTriangle className="w-3.5 h-3.5" />
            {selectedNode.risk} Risk
          </span>
        </div>
      </div> */}

      {/* Intelligence Summary / Details */}
      <div className="space-y-1">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          Intelligence Summary
        </span>
        <p className="text-[13px] text-[var(--text-primary)] leading-relaxed bg-[var(--surface-hover)]/50 p-3 rounded-xl border border-[var(--border)]">
          {selectedNode.details}
        </p>
      </div>

      {/* Connected Relationships */}
      {connectedLinks.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            Connected Links ({connectedLinks.length})
          </span>
          <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
            {connectedLinks.map((link, idx) => {
              const sId = typeof link.source === 'object' ? link.source.id : link.source;
              const tId = typeof link.target === 'object' ? link.target.id : link.target;
              const otherId = sId === selectedNode.id ? tId : sId;

              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[12px]"
                >
                  <span className="font-mono font-semibold text-[var(--primary)]">{otherId}</span>
                  <span className="text-[var(--text-secondary)] text-[11px] italic">{link.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer Actions */}
      {/* <div className="pt-2 border-t border-[var(--divider)] flex gap-2">
        <button
          type="button"
          onClick={() => onAskAi && onAskAi(selectedNode)}
          className="flex-1 py-2 px-3 rounded-xl text-[13px] font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-soft)] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask AI Copilot</span>
        </button>
      </div> */}

    </div>
  );
}
