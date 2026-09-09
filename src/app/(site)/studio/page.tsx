import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { OutlineButton, GhostLink, Caption } from "@/components/site/ui";

export const metadata = { title: "Studio" };

const PROCESS = [
  {
    no: "01",
    title: "Research",
    body: "We start from first principles, prototyping the hard part first. AI systems, distributed software, and payment rails get pressure-tested before they are obviously tractable.",
  },
  {
    no: "02",
    title: "Design",
    body: "Interface and ergonomics are core engineering, not a coat of paint. We design the whole flow, the edge cases, and the copy, then cut everything that does not earn its place.",
  },
  {
    no: "03",
    title: "Build",
    body: "Small teams, short cycles, real users. We ship production software early and iterate against the way it is actually used rather than the way we imagined it.",
  },
  {
    no: "04",
    title: "Ship",
    body: "The experiments that work graduate into products in people's hands. Talise and Maren both started here and are live today.",
  },
];

const PRINCIPLES = [
  {
    title: "Ship to real users early.",
    body: "A tool in someone's hands teaches us more in a week than a quarter of planning. We put working software in front of real people and let their behaviour set the roadmap.",
  },
  {
    title: "Interface is engineering.",
    body: "The last mile of a product is the part people touch. We hold design to the same bar as the systems underneath it, because a tool people reach for beats a demo people applaud.",
  },
  {
    title: "Own the whole stack.",
    body: "Research, design, and engineering under one roof, with the same people carrying an idea from prototype to production. No handoffs to lose the intent along the way.",
  },
  {
    title: "Small teams, short cycles.",
    body: "Senior people, tight loops, and few enough of us that everyone owns real surface area. We would rather move in days than coordinate in months.",
  },
];

const DISCIPLINES = ["Engineering", "Design", "Research", "Growth"];

export default function StudioPage() {
  return (
    <>
      {/* 1 - Hero */}
      <section id="top">
        <div className="mx-auto max-w-[1440px] px-6 pt-24 sm:px-10 sm:pt-32 lg:px-12">
          <div className="max-w-[900px]">
            <Reveal>
              <Caption>The studio</Caption>
            </Reveal>
            <Reveal as="h1" delay={0.06} className="ed-display mt-6 text-ink">
              An independent product studio building at the frontier.
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-8 max-w-[560px] text-[19px] leading-[1.55] text-grey"
            >
              71Labs designs, builds, and ships software end to end. We are a
              small, senior team working on consumer payments with Talise and
              Bitcoin-backed dollars with Maren.
            </Reveal>
          </div>
        </div>

        {/* 2 - Full-bleed cinematic block */}
        <Reveal delay={0.1} className="mt-16 sm:mt-24">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src="/cine/opt/studio.jpg"
              alt="Inside the 71Labs studio"
              fill
              quality={90}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* 3 - How we work */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Reveal>
              <Caption>How we work</Caption>
            </Reveal>
            <Reveal
              as="h2"
              delay={0.06}
              className="ed-heading mt-5 max-w-[13ch] text-ink"
            >
              Research to production, under one roof.
            </Reveal>
            <Reveal
              as="p"
              delay={0.1}
              className="mt-6 max-w-[360px] text-[17px] leading-[1.6] text-grey"
            >
              One team carries an idea from a first prototype to a product people
              use every day. Four steps, run in tight loops rather than in
              sequence.
            </Reveal>
          </div>

          <div className="border-t border-hairline">
            {PROCESS.map((it, i) => (
              <Reveal key={it.no} delay={i * 0.06}>
                <div className="grid grid-cols-[2.5rem_1fr] gap-6 border-b border-hairline py-7">
                  <span className="text-[13px] font-medium tracking-[0.06em] text-grey-2">
                    {it.no}
                  </span>
                  <div>
                    <h3 className="text-[19px] font-medium text-ink">
                      {it.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-grey">
                      {it.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 - Principles */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
        <div className="max-w-[900px]">
          <Reveal>
            <Caption>What we believe</Caption>
          </Reveal>
          <Reveal
            as="h2"
            delay={0.06}
            className="ed-heading mt-5 max-w-[16ch] text-ink"
          >
            A short list of things we hold to.
          </Reveal>
        </div>

        <div className="mt-16 border-t border-hairline">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="grid gap-4 border-b border-hairline py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                <h3 className="ed-heading text-[24px] text-ink sm:text-[28px]">
                  {p.title}
                </h3>
                <p className="max-w-[440px] text-[17px] leading-[1.6] text-grey">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5 - Team */}
      <section className="mx-auto max-w-[1440px] px-6 pt-24 sm:px-10 sm:pt-32 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Reveal>
              <Caption>The team</Caption>
            </Reveal>
            <Reveal
              as="h2"
              delay={0.06}
              className="ed-heading mt-5 max-w-[12ch] text-ink"
            >
              A small, senior team.
            </Reveal>
            <Reveal
              as="p"
              delay={0.1}
              className="mt-6 max-w-[360px] text-[17px] leading-[1.6] text-grey"
            >
              We keep the team deliberately small so everyone owns real surface
              area. Engineers, designers, and researchers who have shipped
              before, working close to the problem and close to the people using
              what we make.
            </Reveal>
            <div className="mt-10 border-t border-hairline">
              {DISCIPLINES.map((d, i) => (
                <Reveal key={d} delay={0.12 + i * 0.05}>
                  <div className="flex items-baseline gap-6 border-b border-hairline py-4">
                    <span className="text-[13px] font-medium tracking-[0.06em] text-grey-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[17px] text-ink">{d}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1} className="lg:pt-1">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
              <Image
                src="/cine/opt/team.jpg"
                alt="The 71Labs team at work"
                fill
                quality={90}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6 - Close CTA */}
      <section
        id="contact"
        className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12"
      >
        <Reveal>
          <div className="surface-cream rounded-lg px-8 py-16 sm:px-16 sm:py-24">
            <Caption>Join us</Caption>
            <h2 className="ed-heading mt-6 max-w-[15ch] text-ink">
              Want to build with us?
            </h2>
            <p className="mt-6 max-w-[440px] text-[17px] leading-[1.6] text-grey">
              We are always looking for people who like the frontier, and we
              partner with founders and teams on ambitious software.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <OutlineButton href="/careers">See open roles</OutlineButton>
              <GhostLink href="mailto:hello@71labs.xyz" external>
                Contact
              </GhostLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
