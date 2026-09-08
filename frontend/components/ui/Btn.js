export default function Btn({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)] disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-[14px] font-medium gap-1.5",
    md: "px-4 py-2 text-[15px] font-semibold gap-2",
    lg: "px-5 py-2.5 text-[15px] font-semibold gap-2.5",
  };

  const variantStyles = {
    primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-sm active:scale-[0.99]",
    secondary: "bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--surface-hover)] active:scale-[0.99]",
    ghost: "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]",
    danger: "bg-[var(--danger)] text-white hover:opacity-90 active:scale-[0.99]",
    accent: "bg-[var(--accent)] text-white hover:bg-[var(--accent-soft)] active:scale-[0.99]",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
