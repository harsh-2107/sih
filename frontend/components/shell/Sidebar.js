"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Shield,
  LayoutDashboard,
  FolderClosed,
  Share2,
  Users,
  AlertTriangle,
  Clock,
  Sparkles,
  FileCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GitBranch,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '../layout/ThemeToggle';

export default function Sidebar({ caseId = "CASE-2049" }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const navItems = [
    {
      label: "COMMAND CENTER",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "INVESTIGATIONS",
      icon: FolderClosed,
      href: "/dashboard",
      active: pathname.startsWith("/dashboard"),
    },
    {
      label: "NETWORK EXPLORER",
      icon: Share2,
      href: `/cases/${caseId}?tab=network`,
      active: pathname.includes("/cases") && !pathname.includes("tab="),
    },
    {
      label: "ENTITY INTELLIGENCE",
      icon: Users,
      href: `/cases/${caseId}?tab=entities`,
      active: pathname.includes("tab=entities"),
    },
    {
      label: "ANOMALIES & RISK",
      icon: AlertTriangle,
      href: `/cases/${caseId}?tab=anomalies`,
      active: pathname.includes("tab=anomalies"),
      badge: "3",
    },
    {
      label: "TIMELINE",
      icon: Clock,
      href: `/cases/${caseId}?tab=timeline`,
      active: pathname.includes("tab=timeline"),
    },
    {
      label: "AI COPILOT",
      icon: Sparkles,
      href: `/cases/${caseId}?tab=copilot`,
      active: pathname.includes("tab=copilot"),
    },
    {
      label: "EVIDENCE & INTEGRITY",
      icon: FileCheck,
      href: `/cases/${caseId}?tab=evidence`,
      active: pathname.includes("tab=evidence"),
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[var(--surface)] border-r border-[var(--border)] backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Header & Brand */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-[var(--divider)]">
          <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 rounded-xl bg-[var(--primary)] text-white shadow-md shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-[16px] tracking-wide text-[var(--text-primary)] leading-tight">
                  CrimeNet <span className="text-[var(--accent)] font-extrabold">AI</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-secondary)]">
                  Intelligence OS
                </span>
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Section Label */}
        {!collapsed && (
          <div className="px-4 pt-5 pb-2">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)] font-semibold">
              Investigator Workspace
            </p>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="px-3 space-y-1 mt-1">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                  item.active
                    ? "bg-[var(--primary)] text-white shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && (
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[var(--accent)] text-white">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer User Info & Theme Controls */}
      <div className="p-3 border-t border-[var(--divider)] space-y-3">
        {!collapsed && user && (
          <div className="p-2.5 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] flex items-center justify-between">
            <div className="truncate pr-2">
              <p className="text-[12px] font-semibold text-[var(--text-primary)] truncate">
                {user.email || "investigator@crimenet.ai"}
              </p>
              <p className="text-[10px] font-mono text-[var(--success)] font-medium">
                ● Active Clearance Level 4
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-semibold text-[var(--danger)] hover:bg-[var(--surface-hover)] transition-colors w-full justify-center border border-transparent hover:border-[var(--danger)]"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
