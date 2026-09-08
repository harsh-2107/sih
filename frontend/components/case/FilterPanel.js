import { Filter, X, Check } from 'lucide-react';
import { NODE_TYPES } from '@/lib/mock/graph';

export default function FilterPanel({
  isOpen,
  onClose,
  activeFilters = [],
  onToggleFilter,
  onResetFilters,
}) {
  if (!isOpen) return null;

  return (
    <aside className="w-72 border-l border-[var(--border)] bg-[var(--surface)] flex flex-col h-full overflow-hidden shrink-0 shadow-lg">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--divider)]">
        <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)]">
          <Filter className="w-4 h-4 text-[var(--primary)]" />
          <span>Entity Type Filters</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
            Node Categories
          </h4>
          <div className="space-y-2">
            {Object.entries(NODE_TYPES).map(([typeKey, typeConfig]) => {
              const isChecked = activeFilters.length === 0 || activeFilters.includes(typeKey);

              return (
                <button
                  key={typeKey}
                  type="button"
                  onClick={() => onToggleFilter(typeKey)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs font-medium transition-all ${
                    isChecked
                      ? "bg-[var(--surface-hover)] border-[var(--primary)] text-[var(--text-primary)]"
                      : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: typeConfig.color }}
                    />
                    <span>{typeConfig.label}</span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border ${
                      isChecked
                        ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                        : "border-[var(--border)]"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reset Action */}
        {activeFilters.length > 0 && (
          <button
            type="button"
            onClick={onResetFilters}
            className="w-full py-2 text-xs text-center font-semibold text-[var(--primary)] hover:underline"
          >
            Show All Entity Types
          </button>
        )}
      </div>

    </aside>
  );
}
