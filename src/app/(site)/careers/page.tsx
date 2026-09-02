import { Reveal } from "@/components/motion/reveal";
import { OutlineButton, GhostLink, Caption } from "@/components/site/ui";

export const metadata = { title: "Careers" };

const HOW_WE_HIRE = [
  {
    title: "A short, respectful process",
    body: "A handful of focused conversations, not a month of hoops. We move fast and tell you where you stand.",
  },
  {
    title: "A paid work trial, not a whiteboard gauntlet",
    body: "You do a small piece of real work, paid, close to what the job actually is. It tells us more than a puzzle ever could.",
  },
  {
    title: "You talk to the people you would work with",
    body: "No panel of strangers. You meet the small team you would ship alongside, and you get to interview us back.",
  },
  {
    title: "Remote-first, async-friendly",
    body: "We are spread across time zones and we write things down. Deep work over standups, output over hours online.",
  },
];

const ROLES = [
  {
    title: "Founding Mobile Engineer, Talise",
    description:
      "React Native and Sui. Own the app people actually send money in, from the send sheet to settlement.",
    meta: "Remote / Global · Full-time",
  },
  {
    title: "Product Engineer, Full-stack",
    description:
      "Next.js and TypeScript across Talise and Utsuro. Ship features end to end, from the schema to the pixel.",
    meta: "Remote / Global · Full-time",
  },
  {
    title: "Design Engineer",
    description:
      "Turn interface ideas into shipped, tactile product. Live where design and code meet, and make it feel right.",
    meta: "Remote / Global · Full-time",
  },
  {
    title: "ML / Inference Engineer, Utsuro",
    description:
      "Image and video pipelines on 0G Compute. Push quality, latency, and cost in the right direction at once.",
    meta: "Remote / Global · Full-time",
  },
  {
    title: "Growth Lead",
    description:
      "Take Talise to more corridors and rails. Find the demand, build the loops, and turn early users into a habit.",
    meta: "Remote / Global · Full-time",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
        <div className="max-w-[900px]">
          <Reveal>
            <Caption>Careers</Caption>
          </Reveal>
          <Reveal as="h1" delay={0.06} className="ed-display mt-6 text-ink">
            Come build the tools that come next.
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-8 max-w-[560px] text-[19px] leading-[1.55] text-grey"
          >
            71Labs is a small, senior team building consumer payments and AI
            creative tools. We hire people who like the frontier and ship.
          </Reveal>
        </div>
      </section>

      {/* How we hire */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 sm:pb-32 lg:px-12">
        <div className="max-w-[900px]">
          <Reveal>
            <Caption>How we hire</Caption>
          </Reveal>
          <div className="mt-10 border-t border-hairline">
            {HOW_WE_HIRE.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="border-b border-hairline py-7">
                  <h2 className="text-[20px] leading-tight tracking-tight text-ink sm:text-[24px]">
                    {item.title}
                  </h2>
                  <p className="mt-3 max-w-[620px] text-[16px] leading-[1.55] text-grey">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 sm:pb-32 lg:px-12">
        <div className="max-w-[900px]">
          <Reveal>
            <Caption>Open roles</Caption>
          </Reveal>
          <div className="mt-10 border-t border-hairline">
            {ROLES.map((role, i) => (
              <Reveal key={role.title} delay={i * 0.06}>
                <div className="grid grid-cols-1 gap-x-8 gap-y-4 border-b border-hairline py-7 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div>
                    <h3 className="text-[20px] leading-tight tracking-tight text-ink sm:text-[24px]">
                      {role.title}
                    </h3>
                    <p className="mt-3 max-w-[560px] text-[16px] leading-[1.55] text-grey">
                      {role.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:gap-4">
                    <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-grey-2">
                      {role.meta}
                    </p>
                    <GhostLink href="mailto:hello@71labs.xyz" external>
                      Apply
                    </GhostLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-12">
            <p className="text-[16px] leading-[1.55] text-grey">
              Do not see your role? Tell us what you would build.{" "}
              <GhostLink
                href="mailto:hello@71labs.xyz"
                external
                className="align-baseline"
              >
                hello@71labs.xyz
              </GhostLink>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Close CTA */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 sm:pb-32 lg:px-12">
        <Reveal>
          <div className="surface-cream rounded-lg px-8 py-16 sm:px-16 sm:py-24">
            <h2 className="ed-heading max-w-[15ch] text-ink">Build with us.</h2>
            <p className="mt-6 max-w-[440px] text-[17px] leading-[1.6] text-grey">
              If the work sounds like yours, start a conversation. We read every
              note that comes in.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <OutlineButton href="mailto:hello@71labs.xyz" external>
                hello@71labs.xyz
              </OutlineButton>
              <GhostLink href="/studio">About the studio</GhostLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
