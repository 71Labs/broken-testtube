import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { PillButton } from "./pill-button";

export function ContactCTA() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-card px-7 py-14 sm:px-14 sm:py-16 lg:px-16">
          {/* warm luxury glow, no colored blobs */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(55% 60% at 50% 0%, rgba(240,232,220,0.55), transparent 65%)",
            }}
          />

          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <Reveal
                as="p"
                delay={0.06}
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-grey-2"
              >
                Work with us
              </Reveal>
              <Reveal
                as="h2"
                delay={0.12}
                className="mt-5 font-editorial text-[2.4rem] font-normal leading-[1.03] tracking-[-0.02em] text-ink sm:text-[3.4rem]"
              >
                Have a hard problem worth solving?
              </Reveal>
              <Reveal
                as="p"
                delay={0.2}
                className="mt-5 max-w-md text-grey"
              >
                We partner with founders and teams on ambitious software, and
                we&apos;re always hiring people who like the frontier.
              </Reveal>
            </div>

            <Reveal
              delay={0.24}
              className="flex shrink-0 flex-wrap items-center gap-3"
            >
              <Magnetic>
                <PillButton href="mailto:hello@71labs.xyz" icon="up-right">
                  hello@71labs.xyz
                </PillButton>
              </Magnetic>
              <Magnetic>
                <PillButton href="#studio" variant="secondary">
                  About the studio
                </PillButton>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
