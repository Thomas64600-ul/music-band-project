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
    "inline-flex items-center justify-center gap-2",
    "rounded-xl font-semibold tracking-wide uppercase",
    "transition-all duration-300 ease-in-out",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2B6A80]",
    "active:scale-[0.98]",
    fullWidth && "w-full",
    disabled && "opacity-50 pointer-events-none"
  );

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  }[size];

  const variants = {
    primary: cx(
      "bg-[#FF2B6A] text-white border border-[#FF2B6A]",
      "hover:bg-black hover:text-[#FF2B6A]",
      "hover:shadow-neon"
    ),
    secondary: cx(
      "bg-black text-[#FF2B6A] border border-[#FF2B6A]/70",
      "hover:bg-[#FF2B6A] hover:text-black hover:shadow-neon"
    ),
    outline: cx(
      "bg-transparent text-[#FF2B6A] border border-[#FF2B6A]",
      "hover:bg-black hover:shadow-neon"
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


