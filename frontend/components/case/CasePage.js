"use client";

import { useState, useMemo } from 'react';
import { Menu, Shield, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { INITIAL_CASES } from '@/lib/mock/cases';
import { buildGraph } from '@/lib/mock/graph';
import ThemeToggle from '../layout/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

import CaseSidebar from './CaseSidebar';
import CaseHeader from './CaseHeader';
import NetworkWorkspace from './NetworkWorkspace';
import CaseSnapshot from './CaseSnapshot';
import CaseMetrics from './CaseMetrics';
import TimelineChangesPage from './TimelineChangesPage';
import AnomalyPanel from './AnomalyPanel';
import EvidenceIntegrityPanel from './EvidenceIntegrityPanel';
import UploadEvidencePage from './UploadEvidencePage';
import EntityResolutionPage from './EntityResolutionPage';
import CrossCasePanel from './CrossCasePanel';
import ContradictionPanel from './ContradictionPanel';
import QnABar from './QnABar';
import AuditTrailPanel from './AuditTrailPanel';

export default function CasePage({ caseId }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const caseItem = useMemo(() => {
    return INITIAL_CASES.find((c) => c.id === caseId) || {
      id: caseId || "CASE-2049",
      name: "Sector 7 Extortion Ring",
      description: "Multi-jurisdiction wiretap and financial trail analysis targeting suspected shell corporations.",
      classification: "Financial / Organized Crime",
      priority: "High",
      entities: 142,
      events: 38,
      anomalies: 3,
      updated: "10 mins ago",
      status: "active",
    };
  }, [caseId]);

  const graphData = useMemo(() => buildGraph(), []);

  const [activeSection, setActiveSection] = useState('network');
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const selectedNode = useMemo(() =>
    graphData.nodes.find((n) => n.id === selectedNodeId) || null,
    [graphData, selectedNodeId]
  );

  const handleAskAiForNode = (node) => {
    setSelectedNodeId(node?.id || null);
    setActiveSection('copilot');
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const navigateTo = (section) => setActiveSection(section);

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-primary)] overflow-hidden font-[var(--font-ibm-plex-sans),sans-serif] relative">

      {/* Ambient Background Glow */}
      <div className="ambient-bg" />
      <div className="ambient-bg-bottom" />

      {/* ── Sidebar ── */}
      <CaseSidebar
        caseItem={caseItem}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* ── Main content column ── */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden min-w-0 relative z-10">

        {/* ── Top navbar — matches dashboard TopNav exactly ── */}
        <header className="sticky top-0 z-30 w-full border-b border-[var(--border)] bg-[var(--surface)] backdrop-blur-md shrink-0 transition-colors duration-200">
          <div className="flex items-center justify-between h-14 px-4 sm:px-6">

            {/* Left: hamburger + breadcrumb */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border)] transition-colors"
                title="Open Navigation"
              >
                <Menu className="w-4 h-4" />
              </button>

              {/* Brand */}
              <Link href="/dashboard" className="flex items-center gap-2 group shrink-0">
                <div className="p-1.5 rounded-lg bg-[var(--primary)] text-white shadow-sm transition-transform group-hover:scale-105">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="font-semibold text-[14px] tracking-wide text-[var(--text-primary)] hidden sm:inline">
                  CrimeNet <span className="text-[var(--accent)]">AI</span>
                </span>
              </Link>

              {/* Breadcrumb */}
              <div className="hidden md:flex items-center gap-1.5 text-[13px] text-[var(--text-secondary)] pl-2 border-l border-[var(--divider)] min-w-0">
                <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
                <span className="font-mono text-[var(--primary)] font-semibold shrink-0">{caseItem.id}</span>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
                <span className="truncate font-medium text-[var(--text-primary)]">{caseItem.name}</span>
              </div>
            </div>

            {/* Right: theme + user + logout */}
            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle />
              {user && (
                <>
                  <span className="text-[13px] font-medium text-[var(--text-secondary)] hidden sm:inline-block max-w-[180px] truncate">
                    {user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    title="Log out"
                    className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--danger)] hover:border-[var(--danger)] transition-colors focus:outline-none"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ── Scrollable workspace ── */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">

          {/* Case header — always visible */}
          <div className="p-4 sm:p-6 pb-0">
            <CaseHeader caseItem={caseItem} linkCount={graphData.links.length} />
          </div>

          {/* Section content */}
          <div className="p-4 sm:p-6">

            {/* OVERVIEW */}
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <CaseMetrics caseItem={caseItem} linkCount={graphData.links.length} />
                <CaseSnapshot
                  caseItem={caseItem}
                  onSelectEntity={(id) => {
                    setSelectedNodeId(id);
                    setActiveSection('network');
                  }}
                />
              </div>
            )}

            {/* NETWORK GRAPH */}
            {activeSection === 'network' && (
              <NetworkWorkspace
                graphData={graphData}
                selectedNodeId={selectedNodeId}
                onSelectNode={setSelectedNodeId}
                onAskAi={handleAskAiForNode}
              />
            )}

            {/* ENTITIES — full read-only page */}
            {activeSection === 'entities' && (
              <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl space-y-4">
                <h2 className="text-[15px] font-semibold text-[var(--text-primary)]">Entity Index</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {graphData.nodes.map((node) => {
                    const linkCount = graphData.links.filter(l => {
                      const s = typeof l.source === 'object' ? l.source.id : l.source;
                      const t = typeof l.target === 'object' ? l.target.id : l.target;
                      return s === node.id || t === node.id;
                    }).length;
                    const typeColors = {
                      person: 'text-teal-500', org: 'text-blue-400',
                      location: 'text-green-400', phone: 'text-purple-400',
                      vehicle: 'text-orange-400', document: 'text-yellow-400',
                    };
                    return (
                      <button
                        key={node.id}
                        onClick={() => { setSelectedNodeId(node.id); setActiveSection('network'); }}
                        className="p-4 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] hover:border-[var(--primary)]/40 transition-all text-left group space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${typeColors[node.type] || 'text-[var(--text-tertiary)]'}`}>
                            {node.type}
                          </span>
                          <span className="text-[9px] font-mono text-[var(--text-tertiary)]">{node.id}</span>
                        </div>
                        <p className="text-[13px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors leading-snug">
                          {node.name}
                        </p>
                        <div className="flex items-center gap-3 text-[10px] font-mono text-[var(--text-tertiary)]">
                          <span>{linkCount} link{linkCount !== 1 ? 's' : ''}</span>
                          {node.role && <span>· {node.role}</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* EVIDENCE & INTEGRITY */}
            {activeSection === 'evidence' && <EvidenceIntegrityPanel />}

            {/* TIMELINE (includes Graph Changes) */}
            {activeSection === 'timeline' && (
              <TimelineChangesPage
                onSelectEntity={(id) => {
                  setSelectedNodeId(id);
                  setActiveSection('network');
                }}
              />
            )}

            {/* ANOMALIES */}
            {activeSection === 'anomalies' && (
              <AnomalyPanel
                embedded
                onSelectEntity={(id) => {
                  setSelectedNodeId(id);
                  setActiveSection('network');
                }}
              />
            )}

            {/* UPLOAD EVIDENCE */}
            {activeSection === 'upload' && (
              <UploadEvidencePage
                caseItem={caseItem}
                onNavigate={navigateTo}
              />
            )}

            {/* CROSS-CASE INTELLIGENCE */}
            {activeSection === 'crosscase' && <CrossCasePanel />}

            {/* ENTITY RESOLUTION (full page, read-only) */}
            {activeSection === 'resolution' && <EntityResolutionPage />}

            {/* EVIDENCE CONFLICTS */}
            {activeSection === 'conflicts' && <ContradictionPanel />}

            {/* AI COPILOT */}
            {activeSection === 'copilot' && (
              <div className="max-w-2xl mx-auto">
                <QnABar
                  embedded
                  selectedNode={selectedNode}
                  onSelectNode={setSelectedNodeId}
                  onSelectTab={navigateTo}
                />
              </div>
            )}

            {/* AUDIT TRAIL */}
            {activeSection === 'audit' && <AuditTrailPanel />}

          </div>
        </div>
      </div>
    </div>
  );
}
