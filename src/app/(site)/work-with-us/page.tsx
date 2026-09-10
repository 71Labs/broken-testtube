import { Reveal } from "@/components/motion/reveal";
import { OutlineButton, GhostLink, Caption } from "@/components/site/ui";

export const metadata = {
  title: "Work with us",
  description:
    "71Labs is a product & R&D studio. We turn AI ambition into working systems: validation sprints, AI operations systems, and venture MVPs, delivered by one senior team.",
};

const BUYERS_NEED = [
  "One accountable team",
  "A clear business case",
  "Production software",
  "Design that earns trust",
  "Support after launch",
];

const OFFERS = [
  {
    name: "Product Validation Sprint",
    price: "$3k–$6k",
    timeline: "10–15 working days",
    summary: "Research, requirements, a prototype, and a technical plan, so you commit with evidence, not a hunch.",
    includes: [
      "Discovery and requirements",
      "A clickable prototype",
      "Technical plan and estimate",
      "A clear go / no-go",
    ],
  },
  {
    name: "AI Operations System",
    price: "$7.5k–$15k",
    timeline: "4–6 weeks · + $750–$2k/mo",
    summary: "A custom workflow system tied to a measurable business result, not an isolated chatbot.",
    includes: [
      "Workflow redesign",
      "Production software and integrations",
      "A measurable operational outcome",
      "Support after launch",
    ],
    featured: true,
  },
  {
    name: "Venture MVP Sprint",
    price: "$12k–$25k",
    timeline: "6–10 weeks",
    summary: "A complete product team in one engagement, ready for users and the next funding conversation.",
    includes: [
      "Product strategy and brand",
      "UX and interface design",
      "Engineering",
      "Launch system and assets",
    ],
  },
];

const USE_CASES = [
  { title: "Support and lead qualification", body: "Respond faster and route serious prospects to the right person." },
  { title: "Document processing and reporting", body: "Turn scattered inputs into structured records and useful reports." },
  { title: "Onboarding and follow-up", body: "Keep every required step visible and automate routine communication." },
  { title: "Internal knowledge and research", body: "Give teams one dependable place to search company information." },
];

const DISCIPLINES = [
  "Technology and delivery",
  "Product strategy and UX",
  "Brand and illustration",
  "Operations and partnerships",
  "Content and distribution",
];

export default function WorkWithUsPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
        <div className="max-w-[920px]">
          <Reveal>
            <Caption>Work with us</Caption>
          </Reveal>
          <Reveal as="h1" delay={0.06} className="ed-display mt-6 text-ink">
            Applied intelligence. Products that move.
          </Reveal>
          <Reveal as="p" delay={0.12} className="font-lead mt-8 max-w-[620px] text-[20px] leading-[1.5] text-ink-2">
            71Labs is a product and R&amp;D studio. We help startups and
            organizations research, design, and build technology products, with
            one compact senior team that owns delivery end to end.
          </Reveal>
          <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center gap-6">
            <OutlineButton href="mailto:hello@71labs.xyz" external>
              Start a conversation
            </OutlineButton>
            <GhostLink href="/#products">See what we build</GhostLink>
          </Reveal>
        </div>
      </section>

      {/* The gap */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 sm:pb-32 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div className="max-w-[560px]">
            <Reveal>
              <Caption>The opening</Caption>
            </Reveal>
            <Reveal as="h2" delay={0.06} className="ed-heading mt-5 text-ink">
              The gap sits between AI ambition and working systems.
            </Reveal>
            <Reveal as="p" delay={0.1} className="font-lead mt-6 text-[18px] leading-[1.6] text-grey">
              Everyone can reach powerful models. Most teams still need someone to
              redesign the workflow, integrate the software, and own delivery. We
              sell a measurable operational outcome, not a chatbot or a design file.
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="rounded-2xl border border-hairline p-8 sm:p-10">
              <Caption>What buyers need</Caption>
              <ul className="mt-6 space-y-0">
                {BUYERS_NEED.map((b) => (
                  <li
                    key={b}
                    className="border-t border-hairline py-3.5 text-[16px] text-ink-2 first:border-t-0 first:pt-0"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Offers */}
      <section id="offers" className="mx-auto max-w-[1440px] scroll-mt-24 px-6 pb-24 sm:px-10 sm:pb-32 lg:px-12">
        <div className="max-w-[900px]">
          <Reveal>
            <Caption>How we work together</Caption>
          </Reveal>
          <Reveal as="h2" delay={0.06} className="ed-heading mt-5 text-ink">
            Three offers, from uncertainty to implementation.
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {OFFERS.map((o, i) => (
            <Reveal key={o.name} delay={i * 0.06}>
              <div
                className={
                  "flex h-full flex-col rounded-2xl border p-8 " +
                  (o.featured ? "border-ink/85 bg-[#fbfbf9]" : "border-hairline")
                }
              >
                {o.featured && (
                  <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-white">
                    Most popular
                  </span>
                )}
                <h3 className="font-lead text-[22px] leading-tight text-ink">{o.name}</h3>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="font-lead text-[28px] tabular-nums text-ink">{o.price}</span>
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-grey-2">
                  {o.timeline}
                </p>
                <p className="mt-5 text-[15px] leading-[1.55] text-grey">{o.summary}</p>
                <ul className="mt-6 space-y-2.5 border-t border-hairline pt-6">
                  {o.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-ink-2">
                      <svg viewBox="0 0 16 16" className="mt-1 h-3 w-3 shrink-0 text-ink" fill="none" aria-hidden>
                        <path d="M3.5 8.5 6.5 11.5 12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-[620px] text-[15px] leading-[1.6] text-grey">
            Validation lowers the first commitment. Strong discovery then converts
            qualified teams into larger builds.
          </p>
        </Reveal>
      </section>

      {/* AI operations use cases */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 sm:pb-32 lg:px-12">
        <div className="max-w-[900px]">
          <Reveal>
            <Caption>AI operations systems</Caption>
          </Reveal>
          <Reveal as="h2" delay={0.06} className="ed-heading mt-5 text-balance text-ink">
            Turn fragmented work into one reliable flow.
          </Reveal>
        </div>
        <div className="mt-12 grid gap-x-16 gap-y-10 border-t border-hairline pt-10 sm:grid-cols-2">
          {USE_CASES.map((u, i) => (
            <Reveal key={u.title} delay={i * 0.05}>
              <h3 className="font-lead text-[19px] leading-tight text-ink">{u.title}</h3>
              <p className="mt-2.5 max-w-[440px] text-[15px] leading-[1.6] text-grey">{u.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* One team */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 sm:pb-32 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-20">
          <div className="max-w-[440px]">
            <Reveal>
              <Caption>One team</Caption>
            </Reveal>
            <Reveal as="h2" delay={0.06} className="ed-heading mt-5 text-ink">
              Five disciplines, operating as one launch team.
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-6 text-[16px] leading-[1.6] text-grey">
              Technical sales stays close to delivery, and every engagement gets
              product, brand, and distribution behind it. The person closest to the
              result owns the conversation around it.
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <ul className="border-t border-hairline">
              {DISCIPLINES.map((d) => (
                <li key={d} className="border-b border-hairline py-5 text-[18px] text-ink-2">
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Close CTA */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 sm:pb-32 lg:px-12">
        <Reveal>
          <div className="surface-cream rounded-lg px-8 py-16 sm:px-16 sm:py-24">
            <h2 className="ed-heading max-w-[18ch] text-ink">
              Bring the ambition. We&apos;ll bring the working system.
            </h2>
            <p className="font-lead mt-6 max-w-[480px] text-[18px] leading-[1.6] text-grey">
              Start with a validation sprint or tell us the outcome you need. We
              read every note that comes in.
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
