export default function Field({
  label,
  error,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
  className = "",
  children,
  ...props
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-[14px] font-medium text-[var(--text-primary)]">
          {label} {required && <span className="text-[var(--danger)]">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={`w-full px-3.5 py-2.5 text-[15px] placeholder:text-[14px] rounded-xl bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border)] placeholder-[var(--text-secondary)] transition-all outline-none focus:outline-none focus:border-[var(--primary)] font-sans ${
            error ? "border-[var(--danger)]" : ""
          }`}
          {...props}
        />
        {children}
      </div>
      {error && (
        <p className="text-[13px] text-[var(--danger)] font-medium mt-1">{error}</p>
      )}
    </div>
  );
}
