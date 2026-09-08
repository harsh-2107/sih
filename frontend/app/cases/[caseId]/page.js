"use client";

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import CasePage from '@/components/case/CasePage';
import { Shield } from 'lucide-react';

export default function CaseDetailsRoute({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { caseId } = params;
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-[var(--text-secondary)]">
          <Shield className="w-8 h-8 animate-pulse text-[var(--primary)]" />
          <p className="text-xs font-mono font-medium">Loading investigation network topology...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return <CasePage caseId={caseId} />;
}
