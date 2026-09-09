import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { OutlineButton, GhostLink, Caption } from "./ui";

export function Hero() {
  return (
    <section id="top">
      <div className="mx-auto max-w-[1440px] px-6 pt-24 sm:px-10 sm:pt-32 lg:px-12">
        <div className="max-w-[900px]">
          <Reveal>
            <Caption>Independent product studio · Est. 2026</Caption>
          </Reveal>
          <Reveal as="h1" delay={0.06} className="ed-display mt-6 text-ink">
            Building the tools that come next, for the onchain economy.
          </Reveal>
          <Reveal as="p" delay={0.12} className="font-lead mt-8 max-w-[560px] text-[20px] leading-[1.5] text-ink-2">
            71Labs designs, builds, and ships software at the frontier. Consumer
            payments with Talise, and Bitcoin-backed dollars with Maren.
          </Reveal>
          <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center gap-6">
            <OutlineButton href="#products">See our products</OutlineButton>
            <GhostLink href="#contact">Work with us</GhostLink>
          </Reveal>
        </div>
      </div>

      {/* Full-bleed cinematic block — the visual exhale. */}
      <Reveal delay={0.1} className="mt-16 sm:mt-24">
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image
            src="/cine/opt/hero.jpg"
            alt="Building at 71Labs"
            fill
            priority
            quality={92}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
