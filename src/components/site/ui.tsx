import { cn } from "@/lib/utils";

const arrow = (
  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const upRight = (
  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
    <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** AREA 17 outlined button — hairline border, 8px radius, inverts on hover. No shadow. */
export function OutlineButton({
  href,
  children,
  external = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a
      href={href}
      {...ext}
      className={cn(
        "group inline-flex items-center gap-2 rounded-lg border border-[#1a1a1a] px-6 py-3 text-[15px] font-medium text-ink",
        "transition-colors duration-300 [transition-timing-function:var(--ease-snap)] hover:bg-[#1a1a1a] hover:text-white",
        className,
      )}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
        {external ? upRight : arrow}
      </span>
    </a>
  );
}

/** Ghost text link — color shift + arrow nudge on hover. The dominant interaction. */
export function GhostLink({
  href,
  children,
  external = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a
      href={href}
      {...ext}
      className={cn(
        "group inline-flex items-center gap-1.5 text-[15px] font-medium text-ink transition-colors duration-300 hover:text-grey-2",
        className,
      )}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
        {external ? upRight : arrow}
      </span>
    </a>
  );
}

/** Small caption/eyebrow — Inter, muted, tracked, uppercase. */
export function Caption({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-[13px] font-medium uppercase tracking-[0.14em] text-grey-2", className)}>
      {children}
    </p>
  );
}
