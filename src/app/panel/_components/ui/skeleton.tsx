import { cn } from "@/lib/utils";

/** A neutral shimmer block. Compose these into per-page loading states. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-md bg-secondary motion-safe:animate-[pulse-soft_1.6s_ease-in-out_infinite]",
        className,
      )}
    />
  );
}

/** A card-shaped placeholder that mirrors the task/pipeline cards. */
export function CardSkeleton({ lines = 2 }: { lines?: number }) {
  return (
    <div className="rounded-xl border border-hairline bg-white p-3.5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="mt-3 h-4 w-3/4" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="mt-2 h-3 w-full" />
      ))}
      <div className="mt-3 flex items-center justify-between border-t border-hairline pt-3">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
}
