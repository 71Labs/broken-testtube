import { Reveal } from "./reveal";
import { PillButton } from "./pill-button";

export function ContactCTA() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center sm:px-16 sm:py-20">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-[640px] -translate-x-1/2 rounded-full opacity-70 blur-[100px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(130,141,248,0.18), transparent 70%)",
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-[-0.02em] text-display sm:text-5xl">
              Have a hard problem worth solving?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
              We partner with founders and teams on ambitious software — and
              we&apos;re always hiring people who like the frontier.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <PillButton href="mailto:hello@71labs.xyz" icon="up-right">
                hello@71labs.xyz
              </PillButton>
              <PillButton href="#studio" variant="secondary">
                About the studio
              </PillButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
