"use client";

import Sidebar from './Sidebar';
import TopNav from '../layout/TopNav';

export default function AppShell({ children, caseId = "CASE-2049", caseName = null }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] relative overflow-x-hidden transition-colors duration-250 font-sans">
      
      {/* Ambient Atmospheric Layer */}
      <div className="ambient-bg" />
      <div className="ambient-bg-bottom" />

      {/* Command Center Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar caseId={caseId} />
      </div>

      {/* Main Content Area */}
      <div className="md:pl-64 transition-all duration-300 min-h-screen flex flex-col">
        
        {/* Top Navbar Header */}
        <TopNav caseName={caseName} />

        {/* Dynamic Page Children */}
        <div className="flex-1 relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
