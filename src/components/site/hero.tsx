import { Reveal } from "./reveal";
import { PillButton } from "./pill-button";

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-4xl px-5 pb-24 pt-24 text-center sm:px-8 sm:pb-28 sm:pt-32">
        <Reveal>
          <a
            href="#utsuro"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-2.5 py-1 text-sm text-neutral-600 shadow-sm transition-colors hover:bg-neutral-50"
          >
            <span className="rounded-full bg-[#e8681e]/12 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[#c2560f]">
              New
            </span>
            Utsuro is in beta
            <span className="text-neutral-400">→</span>
          </a>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mx-auto mt-8 max-w-3xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.5rem]">
            <span className="text-neutral-950">Building the tools</span>{" "}
            <span className="text-dim">that come next.</span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-neutral-500">
            71Labs is an independent product studio. We build and ship at the
            frontier — consumer payments with{" "}
            <span className="text-neutral-900">Talise</span>, and AI image &amp;
            video with <span className="text-neutral-900">Utsuro</span>.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <PillButton href="#products">See our products</PillButton>
            <PillButton href="#contact" variant="secondary">
              Work with us
            </PillButton>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400">
            Est. 2026 · Building on Sui &amp; 0G
          </p>
        </Reveal>
      </div>
    </section>
  );
}
