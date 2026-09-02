import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Icon, type HugeIcon } from "./icons";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-ink-2",
  secondary: "border border-border bg-white text-ink hover:border-ink/25",
  ghost: "text-ink hover:bg-secondary",
};
const SIZES: Record<Size, string> = {
  md: "px-4 py-2 text-sm",
  sm: "px-3 py-1.5 text-xs",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  icon?: HugeIcon;
  iconRight?: HugeIcon;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium outline-none",
        "transition-[background-color,border-color,color,transform] duration-150",
        "focus-visible:ring-2 focus-visible:ring-ink/15 motion-safe:active:scale-[0.97]",
        "disabled:pointer-events-none disabled:opacity-55",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {icon && <Icon icon={icon} size={size === "sm" ? 15 : 16} />}
      {children}
      {iconRight && <Icon icon={iconRight} size={size === "sm" ? 15 : 16} />}
    </button>
  );
}
