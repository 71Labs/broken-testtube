import { Reveal } from "./reveal";
import { PillButton } from "./pill-button";

export function ContactCTA() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-[#f6f6f4] px-7 py-12 sm:px-14 lg:flex-row lg:items-center">
          <div className="max-w-lg">
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-neutral-950 sm:text-4xl">
              Have a hard problem worth solving?
            </h2>
            <p className="mt-4 text-neutral-500">
              We partner with founders and teams on ambitious software — and
              we&apos;re always hiring people who like the frontier.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <PillButton href="mailto:hello@71labs.xyz" icon="up-right">
              hello@71labs.xyz
            </PillButton>
            <PillButton href="#studio" variant="secondary">
              About the studio
            </PillButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
