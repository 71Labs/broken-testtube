import { cn } from "@/lib/utils";

/**
 * Utsuro mark — a soft black tile with a white arch (a lens/aperture opening),
 * echoing the app's wordmark badge. Self-contained colors so it reads on both
 * light and dark surfaces.
 */
export function UtsuroMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={cn("h-7 w-7", className)}>
      <rect width="32" height="32" rx="9" fill="#111111" />
      <path
        d="M7 22c0-5 4-9 9-9s9 4 9 9"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="16" cy="22" r="1.7" fill="#fff" />
    </svg>
  );
}
