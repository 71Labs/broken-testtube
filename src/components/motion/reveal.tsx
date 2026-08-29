"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";

const SPRING = { type: "spring", stiffness: 220, damping: 30, mass: 1 } as const;

type Tag = "div" | "section" | "span" | "li" | "p" | "h1" | "h2" | "h3" | "figure";

/**
 * Fade-up-deblur reveal on scroll (Physical personality, spring-snappy).
 * Honors prefers-reduced-motion with an opacity-only fade.
 */
export function Reveal({
  as = "div",
  delay = 0,
  y = 24,
  once = true,
  className,
  children,
  ...rest
}: {
  as?: Tag;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentProps<typeof motion.div>, "ref">) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    return (
      <MotionTag
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.5, delay }}
        {...rest}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ ...SPRING, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
