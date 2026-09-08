"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, FolderClosed, X } from 'lucide-react';
import { INITIAL_CASES } from '@/lib/mock/cases';
import TopNav from '../layout/TopNav';
import CaseCard from './CaseCard';
import NewCaseForm from './NewCaseForm';
import Btn from '../ui/Btn';

export default function Dashboard() {
  const [cases, setCases] = useState(INITIAL_CASES);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreateCase = (newCase) => {
    setCases([newCase, ...cases]);
  };

  const filteredCases = cases.filter((c) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(term) ||
      c.id.toLowerCase().includes(term) ||
      (c.description && c.description.toLowerCase().includes(term))
    );
  });

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] relative overflow-hidden transition-colors duration-250 font-sans">
      
      {/* Ambient Atmospheric Background Layers */}
      <div className="ambient-bg" />
      <div className="ambient-bg-bottom" />

      {/* Top Navigation */}
      <TopNav />

      {/* Main Content Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 space-y-8">

        {/* ─── 1. OVERVIEW STAT CARDS ROW ─────────────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl shadow-sm">
            <p className="text-[13px] font-medium text-[var(--text-secondary)]">Active cases</p>
            <p className="text-[30px] leading-tight font-semibold text-[var(--text-primary)] mt-1">{cases.length}</p>
            <p className="text-[12px] text-[var(--success)] font-medium mt-1.5">+3 this week</p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl shadow-sm">
            <p className="text-[13px] font-medium text-[var(--text-secondary)]">Linked entities</p>
            <p className="text-[30px] leading-tight font-semibold text-[var(--text-primary)] mt-1">
              {cases.reduce((sum, c) => sum + (c.entities || 0), 0)}
            </p>
            <p className="text-[12px] text-[var(--success)] font-medium mt-1.5">+12 since yesterday</p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl shadow-sm">
            <p className="text-[13px] font-medium text-[var(--text-secondary)]">Critical leads</p>
            <p className="text-[30px] leading-tight font-semibold text-[var(--accent)] mt-1">
              0{cases.reduce((sum, c) => sum + (c.anomalies || 0), 0)}
            </p>
            <p className="text-[12px] text-[var(--warning)] font-medium mt-1.5">Needs review</p>
          </div>
        </section>

        {/* ─── 2. ACTION BAR: Search & New Investigation Button ────────── */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl shadow-sm">
          {/* Search Bar */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search cases by ID, title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-[15px] placeholder:text-[14px] rounded-xl bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border)] placeholder-[var(--text-secondary)] transition-all outline-none focus:outline-none focus:border-[var(--primary)] font-sans"
            />
          </div>

          {/* Toggle New Investigation Form */}
          <Btn
            variant="primary"
            size="md"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="w-full sm:w-auto font-semibold text-[15px] shrink-0"
          >
            {!isFormOpen?<Plus className="w-4 h-4" />:<X className="w-4 h-4" />}
            <span>{isFormOpen ? "Close Form" : "New Investigation"}</span>
          </Btn>
        </section>

        {/* ─── 3. INLINE NEW INVESTIGATION FORM (Appears above cases) ──── */}
        <NewCaseForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onCreateCase={handleCreateCase}
        />

        {/* ─── 4. CASE GRID / LIST ────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[20px] font-semibold text-[var(--text-primary)] tracking-tight">
              Investigations ({filteredCases.length})
            </h2>
          </div>

          {filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCases.map((caseItem) => (
                <CaseCard key={caseItem.id} caseItem={caseItem} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-3xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl">
              <FolderClosed className="w-12 h-12 mx-auto text-[var(--text-secondary)] mb-3 opacity-50" />
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">No investigations match your search.</h3>
              <p className="text-[15px] text-[var(--text-secondary)] mt-1.5 max-w-sm mx-auto">
                Try searching for another case title, ID, or keyword.
              </p>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
