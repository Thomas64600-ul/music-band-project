import React from "react";

function cx(...args) {
  return args
    .flatMap((a) => {
      if (!a) return [];
      if (typeof a === "string") return [a];
      if (Array.isArray(a)) return a;
      if (typeof a === "object") {
        return Object.entries(a)
          .filter(([, ok]) => !!ok)
          .map(([k]) => k);
      }
      return [];
    })
    .join(" ")
    .trim();
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className = "",
  onClick,
  type = "button",
  iconLeft = null,
  iconRight = null,
  href,
}) {
  const base = cx(
    "inline-flex items-center justify-center gap-2 select-none",
    "rounded-xl font-semibold tracking-wide uppercase",
    "transition-all duration-300 ease-in-out",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60",
    "active:scale-[0.97]",
    fullWidth && "w-full",
    disabled && "opacity-50 pointer-events-none",
    "relative overflow-hidden"
  );

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  }[size];

  
  const variants = {
    primary: cx(
      "bg-[var(--accent)] text-[var(--bg)] border border-[var(--accent)]",
      "hover:bg-[color-mix(in_oklab,var(--accent)_85%,var(--gold)_15%)]",
      "hover:shadow-[0_0_20px_var(--accent)]",
      "active:bg-[color-mix(in_oklab,var(--accent)_70%,black_20%)]",
      "hover:animate-neonPulse"
    ),

    secondary: cx(
      "bg-[var(--bg)] text-[var(--accent)] border border-[var(--accent)]/60",
      "hover:bg-[var(--accent)] hover:text-[var(--bg)]",
      "hover:shadow-[0_0_20px_var(--accent)]",
      "active:bg-[color-mix(in_oklab,var(--accent)_80%,black_20%)]",
      "hover:animate-neonPulse"
    ),

    outline: cx(
      "bg-transparent text-[var(--accent)] border border-[var(--accent)]",
      "hover:bg-[var(--accent)] hover:text-[var(--bg)]",
      "hover:shadow-[0_0_20px_var(--accent)]",
      "active:bg-[color-mix(in_oklab,var(--accent)_80%,black_20%)]",
      "hover:animate-neonPulse"
    ),

    danger: cx(
      "bg-[color-mix(in_oklab,var(--accent)_80%,black_15%)] text-[var(--bg)] border border-[var(--accent)]",
      "hover:bg-[var(--accent)] hover:shadow-[0_0_25px_var(--accent)]",
      "active:bg-[color-mix(in_oklab,var(--accent)_60%,black_25%)]",
      "hover:animate-neonPulse"
    ),
  }[variant];

  const classes = cx(base, sizes, variants, className);

  const Content = () => (
    <>
      {iconLeft && <span className="shrink-0">{iconLeft}</span>}
      <span className="whitespace-nowrap">{children}</span>
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} aria-disabled={disabled}>
        <Content />
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      <Content />
    </button>
  );
}





