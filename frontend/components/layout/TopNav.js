"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, LogOut, FolderClosed } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import Btn from '../ui/Btn';

export default function TopNav({ caseName = null }) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[var(--border)] bg-[var(--surface)] backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Left: Brand & Navigation */}
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2.5 group">
              <div className="p-1.5 rounded-lg bg-[var(--primary)] text-white shadow-sm transition-transform group-hover:scale-105">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-semibold text-[15px] tracking-wide text-[var(--text-primary)]">
                CrimeNet <span className="text-[var(--accent)] font-semibold">AI</span>
              </span>
            </Link>

            {/* Breadcrumb / Case indicator */}
            {caseName && (
              <div className="flex items-center gap-2 text-[14px] border-l border-[var(--divider)] pl-4 py-1 text-[var(--text-secondary)]">
                <FolderClosed className="w-3.5 h-3.5" />
                <span className="font-medium text-[var(--text-primary)] truncate max-w-xs">{caseName}</span>
              </div>
            )}
          </div>

          {/* Right: Tools & Profile & Logout */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[var(--text-primary)]"
                  >
                    <span className="text-[14px] font-medium max-w-[160px] truncate hidden sm:inline-block">
                      {user.email}
                    </span>
                  </button>

                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  title="Log out"
                  className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--danger)] hover:border-[var(--danger)] transition-colors focus:outline-none"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Btn variant="ghost" size="sm">Sign In</Btn>
                </Link>
                <Link href="/signup">
                  <Btn variant="primary" size="sm">Get Started</Btn>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
