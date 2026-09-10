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

/** Primary CTA — solid ink fill, white text, arrow. Clean and filled (no outline). */
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
        "group inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-[15px] font-medium text-white outline-none",
        "transition-[background-color,transform] duration-200 hover:bg-ink-2 focus-visible:ring-2 focus-visible:ring-ink/25 motion-safe:active:scale-[0.98]",
        className,
      )}
    >
      {children}
      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
        {external ? upRight : arrow}
      </span>
    </a>
  );
}

/** Secondary CTA — soft grey fill, ink text. Pairs with the primary. */
export function SoftButton({
  href,
  children,
  external = false,
  withArrow = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  withArrow?: boolean;
  className?: string;
}) {
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a
      href={href}
      {...ext}
      className={cn(
        "group inline-flex items-center gap-2 rounded-xl bg-secondary px-5 py-3 text-[15px] font-medium text-ink outline-none",
        "transition-[background-color,transform] duration-200 hover:bg-[#e8e8e4] focus-visible:ring-2 focus-visible:ring-ink/15 motion-safe:active:scale-[0.98]",
        className,
      )}
    >
      {children}
      {withArrow && (
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
          {external ? upRight : arrow}
        </span>
      )}
    </a>
  );
}

/** Tertiary text link — color shift + arrow nudge, never underlined. */
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
        "group inline-flex items-center gap-1.5 text-[15px] font-medium text-ink no-underline transition-colors duration-200 hover:text-grey-2",
        className,
      )}
    >
      {children}
      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
        {external ? upRight : arrow}
      </span>
    </a>
  );
}

/** Small caption/eyebrow — muted, tracked, uppercase. */
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
