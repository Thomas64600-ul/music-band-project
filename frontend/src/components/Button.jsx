
function cx(...args) {
  return args
    .flatMap(a => {
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
    "rounded-xl font-semibold tracking-wide",
    "transition-all duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70",
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
      "bg-yellow-400 text-black border border-yellow-400",
     
      "hover:bg-black hover:text-yellow-400 hover:border-yellow-400",
      "hover:shadow-[0_0_16px_#FFD70080]"
    ),
    secondary: cx(
      "bg-black text-yellow-400 border border-yellow-400/40",
      "hover:border-yellow-400 hover:shadow-[0_0_16px_#FFD70080]"
    ),
    outline: cx(
      "bg-transparent text-yellow-400 border border-yellow-400",
      "hover:bg-black hover:text-yellow-300 hover:shadow-[0_0_16px_#FFD70080]"
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

