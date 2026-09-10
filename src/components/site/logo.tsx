import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Official 71Labs mark + wordmark. Pick `variant` by the surface it sits on:
 * "black" on light backgrounds, "white" on dark ones.
 */
export function Logo({
  variant = "black",
  withWordmark = true,
  size = 24,
  className,
}: {
  variant?: "black" | "white";
  withWordmark?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src={variant === "white" ? "/logo/mark-white.png" : "/logo/mark-black.png"}
        alt={withWordmark ? "" : "71Labs"}
        width={936}
        height={790}
        style={{ height: size, width: "auto" }}
        priority
      />
      {withWordmark && (
        <span
          className={cn(
            "font-wordmark text-lg tracking-tight",
            variant === "white" ? "text-white" : "text-ink",
          )}
        >
          71labs
        </span>
      )}
    </span>
  );
}
