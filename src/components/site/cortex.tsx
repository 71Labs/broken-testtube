import { Reveal } from "./reveal";
import { MemoryGraph } from "./memory-graph";

const POINTS = [
  "Captures context from your notes, chats, and tools automatically.",
  "Recalls the right memory at the right moment — no prompting required.",
  "Runs privately, with your data staying yours.",
];

export function Cortex() {
  return (
    <section
      id="research"
      className="relative overflow-hidden border-y border-border"
    >
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-40" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Research · Cortex
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl">
            A memory layer for AI.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Cortex is our research effort into persistent, private memory for
            agents and assistants — a living graph of everything worth
            remembering, wired into the models you already use.
          </p>

          <ul className="mt-8 space-y-3.5">
            {POINTS.map((p) => (
              <li key={p} className="flex gap-3 text-sm text-foreground/90">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--glow))]" />
                <span className="text-muted-foreground">{p}</span>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="group mt-9 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-white/[0.04]"
          >
            Read the research note
            <span className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative aspect-[7/5] w-full overflow-hidden rounded-2xl border border-border bg-[#0a0a0d] bg-grid-sm">
            <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5 rounded-lg border border-border bg-background/60 p-1.5 backdrop-blur">
              {["+", "−", "⤢"].map((s) => (
                <span
                  key={s}
                  className="flex h-6 w-6 items-center justify-center rounded font-mono text-xs text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
            <MemoryGraph />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
