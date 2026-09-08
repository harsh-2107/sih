"use client";

import React from "react";
import {
  ShieldAlert,
  Network,
  Users,
  FileCheck,
  Clock,
  AlertTriangle,
  Upload,
  Search,
  Zap,
  Sparkles,
  Shield,
  LayoutDashboard,
  X,
  GitMerge,
  BookOpen,
} from "lucide-react";

const NAV_GROUPS = [
  {
    group: "CASE WORKSPACE",
    items: [
      { id: "overview",  label: "Overview",             icon: LayoutDashboard, badge: null },
      { id: "network",   label: "Network Graph",        icon: Network,         badge: null },
      { id: "entities",  label: "Entities",             icon: Users,           badge: "23" },
      { id: "evidence",  label: "Evidence & Integrity", icon: FileCheck,       badge: "6" },
      { id: "timeline",  label: "Timeline",             icon: Clock,           badge: "38" },
      { id: "anomalies", label: "Anomalies",            icon: AlertTriangle,   badge: "3",  badgeVariant: "danger" },
      { id: "upload",    label: "Upload Evidence",      icon: Upload,          badge: null, badgeVariant: "primary" },
    ],
  },
  {
    group: "INTELLIGENCE",
    items: [
      { id: "crosscase",   label: "Cross-Case Intel",    icon: Search,    badge: "2" },
      { id: "resolution",  label: "Entity Resolution",   icon: GitMerge,  badge: "14", badgeVariant: "attention" },
      { id: "conflicts",   label: "Evidence Conflicts",  icon: Zap,       badge: "2",  badgeVariant: "danger" },
      { id: "copilot",     label: "AI Copilot",          icon: Sparkles,  badge: null },
    ],
  },
  {
    group: "SECURITY",
    items: [
      { id: "audit", label: "Audit Trail", icon: Shield, badge: null },
    ],
  },
];

const badgeStyles = {
  danger:    "bg-red-500/15 text-red-400 border-red-500/25",
  attention: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  primary:   "bg-[var(--primary)]/20 text-[var(--primary)] border-[var(--primary)]/30",
  default:   "bg-[var(--surface-hover)] text-[var(--text-tertiary)] border-[var(--border)]",
  active:    "bg-[var(--primary)]/90 text-white",
};

export default function CaseSidebar({
  caseItem = {},
  activeSection = "network",
  onSelectSection,
  isMobileOpen = false,
  onCloseMobile,
}) {
  const select = (id) => {
    onSelectSection?.(id);
    onCloseMobile?.();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 bottom-0 left-0 z-50 w-60
          case-sidebar border-r border-[var(--border)]
          flex flex-col shrink-0 select-none
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* ── Brand ── */}
        <div className="px-4 pt-4 pb-3 border-b border-[var(--border)] space-y-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-[var(--primary)] text-white shadow-sm">
                <ShieldAlert className="w-3.5 h-3.5" />
              </div>
              <span className="text-[13px] font-semibold tracking-wide text-[var(--text-primary)]">
                CrimeNet <span className="text-[var(--accent)]">AI</span>
              </span>
            </div>
            <button
              onClick={onCloseMobile}
              className="lg:hidden text-[var(--text-tertiary)] hover:text-[var(--text-primary)] p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Active case pill */}
          <div className="rounded-lg border border-[var(--border)] bg-[var(--primary)]/6 px-3 py-2.5">
            <div className="text-[10px] font-mono font-bold tracking-widest text-[var(--primary)] opacity-80 uppercase mb-1">
              {caseItem.id || "CASE-2049"}
            </div>
            <div className="text-[12px] font-semibold text-[var(--text-primary)] leading-snug">
              {caseItem.name || "Sector 7 Extortion Ring"}
            </div>
          </div>
        </div>

        {/* ── Navigation ── */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-5 custom-scrollbar">
          {NAV_GROUPS.map((group) => (
            <div key={group.group}>
              <div className="px-2 pb-1.5 text-[9px] font-mono font-bold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                {group.group}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  const badgeCls = item.badgeVariant
                    ? badgeStyles[item.badgeVariant] || badgeStyles.default
                    : isActive
                      ? badgeStyles.active
                      : badgeStyles.default;

                  return (
                    <button
                      key={item.id}
                      onClick={() => select(item.id)}
                      className={`
                        w-full flex items-center justify-between
                        px-2.5 py-[7px] rounded-lg text-[12px] font-medium
                        transition-all duration-150 group relative
                        ${isActive
                          ? "bg-[var(--primary)]/10 text-[var(--text-primary)] border-l-2 border-[var(--primary)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border-l-2 border-transparent"
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                            isActive
                              ? "text-[var(--primary)]"
                              : "text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)]"
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`
                            px-1.5 py-px rounded text-[9px] font-mono border shrink-0
                            ${badgeCls}
                          `}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="px-4 py-3 border-t border-[var(--border)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-secondary)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
            <span>Analysis Active</span>
          </div>
          <span className="text-[9px] text-[var(--text-tertiary)] font-mono">v2.4.0</span>
        </div>
      </aside>
    </>
  );
}
