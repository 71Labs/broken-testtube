import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { OutlineButton, SoftButton } from "./ui";
import { PhoneFrame } from "./phone-frame";

export function Hero() {
  return (
    <section id="top">
      <div className="mx-auto max-w-[1440px] px-6 pt-24 sm:px-10 sm:pt-32 lg:px-12">
        <div className="max-w-[900px]">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-white py-1.5 pl-1.5 pr-4">
              <Image
                src="/logo/sui-overflow.webp"
                alt="Sui Overflow"
                width={160}
                height={160}
                className="h-6 w-6 rounded-full"
              />
              <span className="text-[13px] font-medium text-ink">
                Sui Overflow 2026 Winner
              </span>
            </span>
          </Reveal>
          <Reveal as="h1" delay={0.06} className="ed-display mt-6 text-ink">
            Building the tools that come next, for the onchain economy.
          </Reveal>
          <Reveal as="p" delay={0.12} className="font-lead mt-8 max-w-[580px] text-[20px] leading-[1.5] text-ink-2">
            71Labs is a product and R&amp;D studio. We build our own products,
            payments with Talise and Bitcoin-backed dollars with Maren, plus
            applied-AI systems for teams who need working software, not demos.
          </Reveal>
          <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center gap-6">
            <OutlineButton href="/work-with-us">Work with us</OutlineButton>
            <SoftButton href="#products">See our products</SoftButton>
          </Reveal>
        </div>
      </div>

      {/* Product showcase: our apps floating on an abstract field. */}
      <Reveal delay={0.1} className="mx-auto mt-16 max-w-[1440px] px-6 sm:mt-24 sm:px-10 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 sm:py-20">
          <Image
            src="/bg/bg-056.webp"
            alt=""
            fill
            priority
            quality={82}
            sizes="100vw"
            className="object-cover"
          />
          <div className="relative mx-auto flex max-w-[760px] items-end justify-center gap-4 sm:gap-8">
            <PhoneFrame
              src="/talise/send.png"
              alt="Talise send flow"
              className="hidden w-[120px] translate-y-6 sm:block sm:w-[150px]"
            />
            <PhoneFrame src="/talise/home.png" alt="Talise home screen" priority className="w-[176px] sm:w-[184px]" />
            <PhoneFrame
              src="/maren/home.png"
              alt="Maren home screen"
              className="hidden w-[120px] translate-y-6 sm:block sm:w-[150px]"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
