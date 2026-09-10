import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { GhostLink } from "@/components/site/ui";
import { Logo } from "@/components/site/logo";

type Capability = {
  title: string;
  blurb: string;
  center: string;
  accent: string;
  leaves: string[];
};

const CAPABILITIES: Capability[] = [
  {
    title: "Applied AI systems",
    blurb: "Workflow systems that remove repetitive work and improve operations.",
    center: "AI Ops",
    accent: "#5b3df5",
    leaves: ["Support & lead qual", "Document intelligence", "Onboarding & follow-up", "Internal knowledge"],
  },
  {
    title: "Digital products",
    blurb: "Investor-ready MVPs, internal platforms, and customer-facing software.",
    center: "Product",
    accent: "#e8681e",
    leaves: ["Product strategy", "Brand & UX", "Engineering", "Launch system"],
  },
  {
    title: "Emerging technology",
    blurb: "Fintech and blockchain products where architecture matters early.",
    center: "Onchain",
    accent: "#3c9a4e",
    leaves: ["Consumer payments", "Bitcoin-backed dollars", "On-chain infra", "Wallets & rails"],
  },
];

function NodeGraph({ center, accent, leaves }: Pick<Capability, "center" | "accent" | "leaves">) {
  return (
    <div
      className="relative mt-6 overflow-hidden rounded-xl border border-hairline"
      style={{
        backgroundColor: "#fbfbfa",
        backgroundImage: "radial-gradient(circle, rgba(10,10,10,0.06) 1px, transparent 1px)",
        backgroundSize: "15px 15px",
      }}
    >
      <div className="flex items-center gap-3 px-5 py-6">
        {/* center node */}
        <div className="relative shrink-0">
          <span
            aria-hidden
            className="absolute inset-0 -z-0 rounded-full blur-md"
            style={{ background: `${accent}66` }}
          />
          <span
            className="relative grid h-12 w-12 place-items-center rounded-full border border-white bg-white text-[10px] font-medium text-ink shadow-[0_4px_14px_-4px_rgba(0,0,0,0.2)]"
          >
            <span
              className="grid h-7 w-7 place-items-center rounded-full text-[9px] font-semibold text-white"
              style={{ backgroundImage: `linear-gradient(140deg, ${accent}, ${accent}bb)` }}
            >
              {center === "AI Ops" ? "AI" : center.slice(0, 2)}
            </span>
          </span>
        </div>

        {/* connector + leaves */}
        <span aria-hidden className="h-px w-5 shrink-0" style={{ background: "rgba(10,10,10,0.12)" }} />
        <div className="relative flex-1">
          <span
            aria-hidden
            className="absolute bottom-3 left-0 top-3 w-px"
            style={{ background: "rgba(10,10,10,0.12)" }}
          />
          <ul className="flex flex-col gap-2.5">
            {leaves.map((l) => (
              <li key={l} className="relative pl-4">
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-px w-3"
                  style={{ background: "rgba(10,10,10,0.12)" }}
                />
                <span className="inline-flex items-center gap-2 rounded-lg border border-hairline bg-white px-2.5 py-1.5 text-[13px] text-ink-2 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                  {l}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function WhatWeBuild() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
      {/* header row */}
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <Reveal>
            <span className="inline-flex rounded-full border border-hairline px-3 py-1 text-[12px] font-medium uppercase tracking-[0.12em] text-grey-2">
              What we build
            </span>
          </Reveal>
          <Reveal as="h2" delay={0.06} className="ed-heading mt-6 max-w-[16ch] text-ink">
            The kind of work we take on.
          </Reveal>
          <Reveal as="p" delay={0.1} className="font-lead mt-6 max-w-[440px] text-[18px] leading-[1.55] text-grey">
            One senior team, three ways in — from a focused AI system to a full
            product built and launched end to end.
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="relative flex aspect-[16/9] items-end overflow-hidden rounded-2xl p-7">
            <Image src="/bg/bg-055.webp" alt="" fill sizes="(min-width:1024px) 620px, 100vw" quality={82} className="object-cover" />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 to-black/5" />
            <div className="relative">
              <p className="font-lead max-w-[22ch] text-[19px] leading-tight text-white">
                Powerful systems, thoughtfully designed to fit right into your workflow.
              </p>
              <span className="mt-3 inline-block"><Logo variant="white" size={18} /></span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* capability cards */}
      <div className="mt-12 grid gap-5 border-t border-hairline pt-12 lg:grid-cols-3">
        {CAPABILITIES.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <div className="flex h-full flex-col rounded-2xl border border-hairline p-6">
              <h3 className="font-lead text-[20px] leading-tight text-ink">{c.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.55] text-grey">{c.blurb}</p>
              <NodeGraph center={c.center} accent={c.accent} leaves={c.leaves} />
              <div className="mt-6">
                <GhostLink href="/work-with-us">Learn more</GhostLink>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
