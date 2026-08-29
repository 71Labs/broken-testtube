"use client";

import { ReactLenis } from "lenis/react";

/** App-wide smooth scrolling (Lenis). Touch keeps native scroll for feel. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.11,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
