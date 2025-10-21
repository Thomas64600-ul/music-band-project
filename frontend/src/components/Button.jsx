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
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B3122D70]",
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
      "bg-[#B3122D] text-[#F2F2F2] border border-[#B3122D]",
      "hover:bg-[#8C0E24] hover:shadow-[0_0_20px_#B3122D80]",
      "active:bg-[#700A1C]",
      "hover:animate-neonPulse"
    ),

    secondary: cx(
      "bg-black text-[#B3122D] border border-[#B3122D70]",
      "hover:bg-[#B3122D] hover:text-[#F2F2F2] hover:shadow-[0_0_20px_#B3122D80]",
      "active:bg-[#8C0E24]",
      "hover:animate-neonPulse"
    ),

    outline: cx(
      "bg-transparent text-[#B3122D] border border-[#B3122D]",
      "hover:bg-[#B3122D] hover:text-[#F2F2F2] hover:shadow-[0_0_20px_#B3122D80]",
      "active:bg-[#8C0E24]",
      "hover:animate-neonPulse"
    ),

    danger: cx(
      "bg-[#8C0E24] text-[#F2F2F2] border border-[#8C0E24]",
      "hover:bg-[#B3122D] hover:shadow-[0_0_25px_#B3122D90]",
      "active:bg-[#700A1C]",
      "hover:animate-neonPulse"
    ),
  }[variant];

  const classes = cx(base, sizes, variants, className);

  const Content = () => (
    <>
      {iconLeft ? <span className="shrink-0">{iconLeft}</span> : null}
      <span className="whitespace-nowrap">{children}</span>
      {iconRight ? <span className="shrink-0">{iconRight}</span> : null}
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




