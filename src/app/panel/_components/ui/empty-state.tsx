import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Oriented empty state: says what would live here and offers one next step,
 * never a bare "No results". Pass `action` (a button/link) when there's a
 * clear thing to do next.
 */
export function EmptyState({
  icon,
  title,
  hint,
  action,
  compact = false,
  className,
}: {
  icon?: ReactNode;
  title: string;
  hint?: string;
  action?: ReactNode;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-hairline text-center",
        compact ? "gap-2 px-4 py-8" : "gap-3 px-6 py-14",
        className,
      )}
    >
      {icon && <span className="grid place-items-center text-grey-2">{icon}</span>}
      <p className={cn("font-medium text-ink", compact ? "text-sm" : "text-[15px]")}>{title}</p>
      {hint && <p className="max-w-xs text-xs leading-relaxed text-grey">{hint}</p>}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
