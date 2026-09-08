import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

export default function CaseCard({ caseItem }) {
  return (
    <Link
      href={`/cases/${caseItem.id}`}
      className="group block p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-md hover:border-[var(--primary)] hover:shadow-xl transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className="text-[12px] font-mono font-medium tracking-wider uppercase text-[var(--text-secondary)]">
            {caseItem.id}
          </span>
          <h3 className="text-[18px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors line-clamp-1 mt-0.5">
            {caseItem.name}
          </h3>
        </div>
        {caseItem.updated && (
          <span className="text-[11px] font-mono text-[var(--text-secondary)] font-medium shrink-0 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {caseItem.updated}
          </span>
        )}
      </div>

      {caseItem.description && (
        <p className="text-[15px] text-[var(--text-secondary)] line-clamp-2 mb-4 leading-[1.5] font-normal">
          {caseItem.description}
        </p>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] mb-4">
        <div>
          <p className="text-[12px] text-[var(--text-secondary)] font-medium">Entities</p>
          <p className="text-[18px] font-semibold text-[var(--text-primary)] mt-0.5">{caseItem.entities || 0}</p>
        </div>
        <div>
          <p className="text-[12px] text-[var(--text-secondary)] font-medium">Evidence Events</p>
          <p className="text-[18px] font-semibold text-[var(--text-primary)] mt-0.5">{caseItem.events || 0}</p>
        </div>
        <div>
          <p className="text-[12px] text-[var(--text-secondary)] font-medium">Anomalies</p>
          <p className={`text-[18px] font-semibold mt-0.5 ${caseItem.anomalies > 0 ? "text-[var(--danger)]" : "text-[var(--text-secondary)]"}`}>
            {caseItem.anomalies || 0}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end text-[14px] border-t border-[var(--divider)] pt-3">
        <span className="flex items-center gap-1.5 text-[var(--primary)] font-semibold group-hover:translate-x-0.5 transition-transform">
          Open Case <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
