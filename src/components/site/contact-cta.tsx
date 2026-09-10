import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

export function ContactCTA() {
  return (
    <section id="contact" className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl px-8 py-20 sm:px-16 sm:py-28">
          <Image
            src="/bg/bg-057.webp"
            alt=""
            fill
            sizes="(min-width:1440px) 1400px, 100vw"
            quality={82}
            className="object-cover"
          />
          {/* Scrim so left-aligned white text stays legible over the bright streaks. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25"
          />

          <div className="relative max-w-[560px]">
            <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-white/55">
              Work with us
            </p>
            <h2 className="ed-display mt-6 max-w-[15ch] text-balance text-white">
              Have a hard problem worth solving?
            </h2>
            <p className="font-lead mt-6 max-w-[440px] text-[18px] leading-[1.6] text-white/75">
              We partner with founders and teams on ambitious software, and we are
              always hiring people who like the frontier.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="/work-with-us"
                className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-[15px] font-medium text-ink outline-none transition-[background-color,transform] duration-300 hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/50 motion-safe:active:scale-[0.98]"
              >
                See how we work
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="mailto:hello@71labs.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded text-[15px] font-medium text-white/80 outline-none transition-colors duration-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
              >
                hello@71labs.xyz
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" aria-hidden>
                  <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
