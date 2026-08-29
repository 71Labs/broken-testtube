"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type Word = { t: string; className?: string };

/**
 * Cinematic signature: each word rises out of an overflow-clipped mask,
 * staggered. Used once, on the hero heading.
 */
export function MaskWords({
  words,
  className,
  start = 0.1,
  step = 0.05,
}: {
  words: Word[];
  className?: string;
  start?: number;
  step?: number;
}) {
  const reduce = useReducedMotion();
  const label = words.map((w) => w.t).join(" ");

  if (reduce) {
    return (
      <span className={className} aria-label={label}>
        {words.map((w, i) => (
          <span key={i} className={w.className}>
            {w.t}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className} aria-label={label}>
      {words.map((w, i) => (
        <span key={i} className="word-mask" aria-hidden>
          <motion.span
            className={cn("inline-block", w.className)}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 32,
              delay: start + i * step,
            }}
          >
            {w.t}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
