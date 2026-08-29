import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { PillButton } from "./pill-button";
import { LogoMark } from "./logo";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-lines opacity-60" />

      <div className="mx-auto grid max-w-[90rem] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:px-12 lg:py-20">
        {/* Left — statement */}
        <div>
          <Reveal as="p" className="flex items-center gap-2 text-sm text-ink-2">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[rgb(var(--talise))]" fill="currentColor">
              <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
            </svg>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
              <span className="text-ink">2nd place</span> · Sui Overflow 2026, DeFi &amp; Payments
            </span>
          </Reveal>

          <Reveal as="h1" delay={0.08} className="mt-6 text-serif text-ink" y={30}>
            <span className="block text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.98]">
              Building the tools
            </span>
            <span className="block text-[clamp(2.75rem,6vw,5.25rem)] italic leading-[1.05] text-grey">
              that come next.
            </span>
          </Reveal>

          <Reveal as="p" delay={0.16} className="mt-7 max-w-md text-lg leading-relaxed text-grey">
            An independent product studio. We design, build, and ship at the
            frontier. Consumer payments with{" "}
            <span className="text-ink">Talise</span>, and AI image and video with{" "}
            <span className="text-ink">Utsuro</span>.
          </Reveal>

          <Reveal delay={0.24} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <PillButton href="#products">See our products</PillButton>
            </Magnetic>
            <Magnetic>
              <PillButton href="#contact" variant="secondary">
                Work with us
              </PillButton>
            </Magnetic>
          </Reveal>
        </div>

        {/* Right — bento */}
        <div className="grid aspect-square grid-cols-3 grid-rows-3 gap-3 [&_.tile]:overflow-hidden [&_.tile]:rounded-[1.4rem]">
          {/* brand */}
          <Reveal delay={0.05} className="tile relative col-start-1 row-start-1 flex items-center justify-center bg-[#4f46e5]">
            <div className="absolute inset-0 bg-grid-lines opacity-20" />
            <LogoMark className="relative h-12 w-12 text-white" />
          </Reveal>

          {/* blue label */}
          <Reveal delay={0.1} className="tile relative col-start-2 row-start-1 flex flex-col items-center justify-center gap-2 bg-[#5b8def] p-4">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-900 shadow-sm">
              Sub-second
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-900 shadow-sm">
              Payments
            </span>
          </Reveal>

          {/* founder photo (tall) */}
          <Reveal delay={0.15} className="tile relative col-start-3 row-start-1 row-span-2">
            <Image src="/photos/opt/founder.jpg" alt="Building at 71Labs" fill sizes="240px" className="object-cover" priority />
            <div className="absolute bottom-2 left-2 right-2 rounded-xl bg-white/95 p-3 shadow-lg backdrop-blur">
              <p className="text-lg font-semibold tracking-tight text-ink">1,233</p>
              <p className="text-[11px] text-grey">On-chain transactions</p>
            </div>
          </Reveal>

          {/* yellow award */}
          <Reveal delay={0.2} className="tile relative col-start-1 row-start-2 flex flex-col items-center justify-center gap-2 bg-[#f5d64e] p-4 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-[#e8681e]">+</span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">$15,000</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-700">Prize won</p>
            </div>
          </Reveal>

          {/* green portrait */}
          <Reveal delay={0.25} className="tile relative col-start-2 row-start-2">
            <Image src="/photos/opt/portrait.jpg" alt="" fill sizes="240px" className="object-cover" />
          </Reveal>

          {/* wide screen photo */}
          <Reveal delay={0.3} className="tile relative col-start-1 col-span-2 row-start-3">
            <Image src="/photos/opt/screen.jpg" alt="Utsuro AI image and video" fill sizes="480px" className="object-cover" />
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-900 shadow-sm">
              AI image &amp; video
            </span>
          </Reveal>

          {/* orange tile */}
          <Reveal delay={0.35} className="tile relative col-start-3 row-start-3 flex items-center justify-center bg-[#e8683f]">
            <div className="absolute inset-0 bg-grid-lines opacity-20" />
            <svg viewBox="0 0 24 24" className="relative h-9 w-9 text-white" fill="none">
              <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
