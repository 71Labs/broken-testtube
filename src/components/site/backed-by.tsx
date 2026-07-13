import { Reveal } from "./reveal";

/* Simple wordmark-style partner logos rendered as text, kept intentionally
   understated to match the reference's restraint. Swap for real SVGs later. */
const PARTNERS = [
  "NORTHWIND",
  "Ledgerworks",
  "PARALLEL",
  "Foundry",
  "atomvc",
  "SIGNAL",
];

export function BackedBy() {
  return (
    <section className="border-t border-border py-20">
      <Reveal className="flex flex-col items-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          Backed by
        </p>

        <div className="relative mt-10 w-full overflow-hidden">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

          <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-16 pr-16">
            {[...PARTNERS, ...PARTNERS].map((name, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-lg font-medium tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
