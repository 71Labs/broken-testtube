import { Reveal } from "./reveal";
import { PillButton } from "./pill-button";

const FACTS = [
  { k: "Est.", v: "2026" },
  { k: "Focus", v: "Fintech · AI" },
  { k: "Products", v: "Talise · Utsuro" },
  { k: "Stack", v: "Sui · 0G" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* backdrop glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(130,141,248,0.16), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-6 pt-20 sm:px-8 sm:pb-10 sm:pt-28 lg:pt-36">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-white/[0.02] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[rgb(var(--glow))] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[rgb(var(--glow))]" />
            </span>
            71Labs · Independent product studio
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-8 max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.03em] text-display sm:text-6xl lg:text-[5.25rem]">
            Building the tools
            <br className="hidden sm:block" /> that come next.
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            71Labs is an independent product studio. We build and ship at the
            frontier — consumer payments with{" "}
            <span className="text-foreground">Talise</span>, and AI image &amp;
            video with <span className="text-foreground">Utsuro</span>.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <PillButton href="#products">See our products</PillButton>
            <PillButton href="#contact" variant="secondary">
              Work with us
            </PillButton>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            {FACTS.map((f) => (
              <div key={f.k} className="bg-card px-4 py-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {f.k}
                </dt>
                <dd className="mt-1 text-sm text-foreground">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
