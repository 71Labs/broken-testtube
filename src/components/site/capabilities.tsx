import { Reveal } from "./reveal";

const ITEMS = [
  {
    no: "01",
    title: "Research",
    body: "We start from first principles — prototyping hard problems in AI, systems, and distributed software before they're obviously tractable.",
  },
  {
    no: "02",
    title: "Design",
    body: "We treat interface and ergonomics as core engineering. A tool people reach for beats a demo people applaud.",
  },
  {
    no: "03",
    title: "Build",
    body: "Small teams, short cycles, real users. We ship production software and iterate against the way it's actually used.",
  },
  {
    no: "04",
    title: "Scale",
    body: "The best experiments graduate into products with SLAs, docs, and support — ready for teams to build on.",
  },
];

export function Capabilities() {
  return (
    <section id="company" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          How we work
        </p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl">
          Research to production, under one roof.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((it, i) => (
          <Reveal key={it.no} delay={i * 80} className="h-full">
            <div className="group flex h-full flex-col bg-card p-6 transition-colors duration-300 hover:bg-[#101014]">
              <span className="font-mono text-xs text-muted-foreground">
                {it.no}
              </span>
              <h3 className="mt-6 text-lg font-medium text-foreground">
                {it.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {it.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
