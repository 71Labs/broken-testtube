"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { AVATAR_GRADIENTS, type Profile } from "@/lib/panel/types";
import { setAvatarGradient } from "../actions";
import { cn } from "@/lib/utils";

export function GradientPicker({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const current = profile.avatar_gradient;

  const pick = (i: number | null) =>
    start(async () => {
      await setAvatarGradient(i);
      router.refresh();
    });

  return (
    <div className={pending ? "opacity-60" : undefined}>
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-grey">
        Your avatar
      </p>
      <div className="flex flex-wrap gap-2.5">
        {AVATAR_GRADIENTS.map((g, i) => {
          const active = current === i;
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              aria-label={`Choose gradient ${i + 1}`}
              aria-pressed={active}
              className={cn(
                "h-9 w-9 rounded-full outline-none transition-transform duration-150 focus-visible:ring-2 focus-visible:ring-ink/20 motion-safe:active:scale-90",
                active && "ring-2 ring-ink ring-offset-2 ring-offset-white",
              )}
              style={{ backgroundImage: `linear-gradient(140deg, ${g.from}, ${g.to})` }}
            />
          );
        })}
      </div>
    </div>
  );
}
