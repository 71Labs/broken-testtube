import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "accent";

const base =
  "group inline-flex items-center gap-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5";

const variants: Record<Variant, string> = {
  primary: "bg-white py-1.5 pl-5 pr-1.5 text-black",
  accent: "bg-[#b7f486] py-1.5 pl-5 pr-1.5 text-black",
  secondary:
    "border border-border bg-white/[0.02] py-1.5 pl-5 pr-5 text-foreground hover:bg-white/[0.06]",
};

const chipTone: Record<Variant, string> = {
  primary: "bg-black text-white",
  accent: "bg-black text-white",
  secondary: "",
};

/**
 * Agency-style pill button. `primary`/`accent` render a trailing circular
 * icon chip; `secondary` is a plain outlined pill.
 */
export function PillButton({
  href,
  children,
  variant = "primary",
  external = false,
  icon = "arrow",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  icon?: "arrow" | "up-right" | "none";
  className?: string;
}) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a href={href} {...externalProps} className={cn(base, variants[variant], className)}>
      <span>{children}</span>
      {variant !== "secondary" && icon !== "none" && (
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            chipTone[variant],
          )}
        >
          {icon === "up-right" ? (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
              <path
                d="M5 11 11 5M6 5h5v5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </svg>
          )}
        </span>
      )}
    </a>
  );
}
