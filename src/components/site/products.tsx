import Image from "next/image";
import { Reveal } from "./reveal";
import { LogoMark } from "./logo";
import { UtsuroMark } from "./utsuro-mark";

export function Products() {
  return (
    <section id="products" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Our products
        </p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl">
          Two products, one studio.
        </h2>
        <p className="mt-4 text-muted-foreground">
          We build and ship the whole thing — from research to the app in your
          hands. Each lives in its own world; both are built by 71Labs.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {/* ---------------------------------- Talise ---------------------------------- */}
        <Reveal>
          <a
            href="#talise"
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 transition-colors duration-300 hover:border-[rgb(140,231,90)]/40"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#b7f486] text-black">
                <LogoMark className="h-5 w-5" />
              </span>
              <span className="text-base font-medium text-foreground">Talise</span>
              <span className="rounded-full bg-[rgb(140,231,90)]/12 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[rgb(140,231,90)]">
                Live
              </span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Consumer payments · Sui
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-foreground">
              Money that moves like a message.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Hold real dollars, send them to a name, and cash out at home —
              settling in under a second, with no gas.
            </p>

            <div className="relative mt-7 h-52 overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-[#0f140c] to-[#0a0a0a]">
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{ background: "radial-gradient(120% 80% at 50% 0%, rgba(140,231,90,0.16), transparent 60%)" }}
              />
              <Image
                src="/talise/home.png"
                alt="Talise app home screen"
                width={1206}
                height={2622}
                sizes="360px"
                className="absolute left-1/2 top-6 w-[200px] -translate-x-1/2 rounded-[1.4rem] border border-white/10 shadow-2xl"
              />
            </div>

            <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-foreground">
              Explore Talise
              <span className="text-[rgb(140,231,90)] transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </span>
          </a>
        </Reveal>

        {/* ---------------------------------- Utsuro ---------------------------------- */}
        <Reveal delay={100}>
          <a
            href="#utsuro"
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-[#f6f5f2] p-7 text-neutral-900 transition-colors duration-300 hover:border-[#e8681e]/50"
          >
            <div className="flex items-center gap-3">
              <UtsuroMark className="h-9 w-9" />
              <span className="text-base font-medium text-neutral-900">Utsuro</span>
              <span className="rounded-full bg-[#e8681e]/12 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#c2560f]">
                Beta
              </span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">
                AI image &amp; video · 0G
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-neutral-900">
              Describe an idea. It renders the images and video.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-500">
              An assistant sharpens your prompt, then 0G Compute renders stills
              and motion over a route you can verify on-chain.
            </p>

            <div className="mt-7 grid h-52 grid-cols-2 gap-2 overflow-hidden rounded-2xl">
              <Image
                src="/utsuro/out-portrait.png"
                alt="Utsuro generated portrait"
                width={378}
                height={378}
                sizes="180px"
                className="h-full w-full rounded-xl object-cover"
              />
              <div className="grid grid-rows-2 gap-2">
                <Image
                  src="/utsuro/out-coffee.png"
                  alt="Utsuro generated product shot"
                  width={378}
                  height={378}
                  sizes="180px"
                  className="h-full w-full rounded-xl object-cover"
                />
                <Image
                  src="/utsuro/out-shoe.png"
                  alt="Utsuro generated footwear shot"
                  width={378}
                  height={378}
                  sizes="180px"
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            </div>

            <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-neutral-900">
              Explore Utsuro
              <span className="text-[#e8681e] transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
