import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { OutlineButton, SoftButton, Caption } from "./ui";

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
          <Reveal as="p" delay={0.12} className="font-lead mt-8 max-w-[580px] text-[20px] leading-[1.5] text-ink-2">
            71Labs is a product and R&amp;D studio. We build our own products —
            payments with Talise, Bitcoin-backed dollars with Maren — and
            applied-AI systems for teams who need working software, not demos.
          </Reveal>
          <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center gap-6">
            <OutlineButton href="/work-with-us">Work with us</OutlineButton>
            <SoftButton href="#products">See our products</SoftButton>
          </Reveal>
        </div>
      </div>

      {/* Product showcase — our apps floating on an abstract field. */}
      <Reveal delay={0.1} className="mx-auto mt-16 max-w-[1440px] px-6 sm:mt-24 sm:px-10 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl px-6 pb-0 pt-16 sm:pt-24">
          <Image
            src="/bg/bg-056.webp"
            alt=""
            fill
            priority
            quality={82}
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10"
          />
          <div className="relative mx-auto flex max-w-[760px] items-end justify-center gap-4 sm:gap-7">
            <div className="w-[128px] translate-y-6 sm:w-[152px]">
              <Image
                src="/talise/send.png"
                alt="Talise send flow"
                width={1206}
                height={2622}
                sizes="152px"
                quality={90}
                className="w-full rounded-t-[18px] shadow-[0_26px_50px_-22px_rgba(20,20,30,0.4)] ring-1 ring-black/[0.06]"
              />
            </div>
            <div className="w-[168px] sm:w-[200px]">
              <Image
                src="/talise/home.png"
                alt="Talise home screen"
                width={1206}
                height={2622}
                sizes="200px"
                quality={90}
                className="w-full rounded-t-[22px] shadow-[0_34px_70px_-26px_rgba(20,20,30,0.46)] ring-1 ring-black/[0.06]"
              />
            </div>
            <div className="w-[128px] translate-y-6 sm:w-[152px]">
              <Image
                src="/maren/home.png"
                alt="Maren home screen"
                width={1206}
                height={2622}
                sizes="152px"
                quality={90}
                className="w-full rounded-t-[18px] shadow-[0_26px_50px_-22px_rgba(20,20,30,0.4)] ring-1 ring-black/[0.06]"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
