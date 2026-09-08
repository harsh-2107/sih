export default function IconToggle({
  active = false,
  onClick,
  icon: Icon,
  label,
  count,
  className = "",
  title,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title || label}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${
        active
          ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm"
          : "bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
      } ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {label && <span>{label}</span>}
      {count !== undefined && (
        <span
          className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
            active
              ? "bg-white/20 text-white"
              : "bg-[var(--background-secondary)] text-[var(--text-secondary)]"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
