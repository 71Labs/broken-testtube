import { cn } from "@/lib/utils";

/** Seamless infinite marquee (duplicated track). Pauses under reduced-motion. */
export function Marquee({
  items,
  className,
  seconds = 32,
}: {
  items: string[];
  className?: string;
  seconds?: number;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div
        className="flex w-max items-center gap-14 pr-14"
        style={{ animation: `marquee ${seconds}s linear infinite` }}
      >
        {[...items, ...items].map((it, i) => (
          <span
            key={i}
            className="whitespace-nowrap font-wordmark text-lg tracking-tight text-grey-2"
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
