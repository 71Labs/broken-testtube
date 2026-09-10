import { AVATAR_GRADIENTS, gradientIndex, initials } from "@/lib/panel/types";
import { cn } from "@/lib/utils";

/**
 * Deterministic gradient avatar. `gradient` (a stored palette index) overrides
 * the id-derived default, so a user's chosen gradient shows everywhere.
 * Works in server + client components (no hooks).
 */
export function GradientAvatar({
  seed,
  gradient,
  name,
  size = 32,
  showInitials = true,
  className,
}: {
  seed: string;
  gradient?: number | null;
  name?: string;
  size?: number;
  showInitials?: boolean;
  className?: string;
}) {
  const g = AVATAR_GRADIENTS[gradientIndex(seed, gradient)];
  return (
    <span
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full font-medium leading-none text-white",
        className,
      )}
      style={{
        width: size,
        height: size,
        backgroundImage: `linear-gradient(140deg, ${g.from}, ${g.to})`,
        fontSize: Math.max(9, Math.round(size * 0.34)),
        textShadow: "0 1px 2px rgba(0,0,0,0.28)",
      }}
    >
      {showInitials && name ? initials(name) : null}
    </span>
  );
}
