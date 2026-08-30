import { Reveal } from "@/components/motion/reveal";
import { OutlineButton, GhostLink, Caption } from "./ui";

export function ContactCTA() {
  return (
    <section id="contact" className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
      <Reveal>
        <div className="surface-cream rounded-lg px-8 py-16 sm:px-16 sm:py-24">
          <Caption>Work with us</Caption>
          <h2 className="ed-display mt-6 max-w-[15ch] text-ink">
            Have a hard problem worth solving?
          </h2>
          <p className="mt-6 max-w-[440px] text-[17px] leading-[1.6] text-grey">
            We partner with founders and teams on ambitious software, and we are
            always hiring people who like the frontier.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <OutlineButton href="mailto:hello@71labs.xyz" external>
              hello@71labs.xyz
            </OutlineButton>
            <GhostLink href="#studio">About the studio</GhostLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
