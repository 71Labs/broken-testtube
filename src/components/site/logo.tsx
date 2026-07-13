import { cn } from "@/lib/utils";

/**
 * 71Labs monoline mark: a bracketed aperture (nod to a lab lens / capture frame)
 * with a centered node. Renders in currentColor so it inherits text color.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-7 w-7", className)}
    >
      {/* bracket corners */}
      <path
        d="M11 4H7a3 3 0 0 0-3 3v4M21 4h4a3 3 0 0 1 3 3v4M11 28H7a3 3 0 0 1-3-3v-4M21 28h4a3 3 0 0 0 3-3v-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* inner rotated aperture */}
      <rect
        x="10.2"
        y="10.2"
        width="11.6"
        height="11.6"
        rx="2.4"
        transform="rotate(45 16 16)"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.55"
      />
      <circle cx="16" cy="16" r="2.3" fill="currentColor" />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} />
      <span className="font-mono text-[13px] font-medium uppercase tracking-[0.28em] text-foreground">
        71Labs
      </span>
    </span>
  );
}
