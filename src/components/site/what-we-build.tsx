import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiBrain01Icon,
  Bitcoin01Icon,
  BlockchainIcon,
  CodeCircleIcon,
  Compass01Icon,
  CreditCardIcon,
  CustomerSupportIcon,
  DocumentCodeIcon,
  LibraryIcon,
  PaintBoardIcon,
  Rocket01Icon,
  SentIcon,
  ServerStack01Icon,
  UserAdd01Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { Reveal } from "@/components/motion/reveal";
import { GhostLink } from "@/components/site/ui";
import { Logo } from "@/components/site/logo";

type Leaf = { icon: typeof AiBrain01Icon; label: string };
type Capability = {
  title: string;
  blurb: string;
  center: typeof AiBrain01Icon;
  accent: string;
  leaves: Leaf[];
};

const CAPABILITIES: Capability[] = [
  {
    title: "Applied AI systems",
    accent: "#5b3df5",
    center: AiBrain01Icon,
    blurb:
      "We redesign the workflow first, then build the system around it. Support triage, document processing, onboarding, and internal search, backed by production software wired into your tools and tied to a measurable operational result, not a chatbot bolted on the side.",
    leaves: [
      { icon: CustomerSupportIcon, label: "Support & lead qualification" },
      { icon: DocumentCodeIcon, label: "Document processing & reporting" },
      { icon: UserAdd01Icon, label: "Onboarding & follow-up" },
      { icon: LibraryIcon, label: "Internal knowledge & search" },
    ],
  },
  {
    title: "Digital products",
    accent: "#e8681e",
    center: Rocket01Icon,
    blurb:
      "Investor-ready MVPs, internal platforms, and customer-facing software, taken from strategy to launch by one senior team. Product thinking, brand, interface, and engineering in a single engagement, shipped to real users rather than left as a deck.",
    leaves: [
      { icon: Compass01Icon, label: "Product strategy" },
      { icon: PaintBoardIcon, label: "Brand & interface design" },
      { icon: CodeCircleIcon, label: "Full-stack engineering" },
      { icon: SentIcon, label: "Launch system & assets" },
    ],
  },
  {
    title: "Emerging technology",
    accent: "#3c9a4e",
    center: BlockchainIcon,
    blurb:
      "Fintech and blockchain products where architecture matters from day one. Payments, Bitcoin-backed dollars, on-chain infrastructure, and wallets: the same stack behind Talise and Maren, applied to your problem with the security thinking it demands.",
    leaves: [
      { icon: CreditCardIcon, label: "Consumer payments" },
      { icon: Bitcoin01Icon, label: "Bitcoin-backed dollars" },
      { icon: ServerStack01Icon, label: "On-chain infrastructure" },
      { icon: Wallet01Icon, label: "Wallets & rails" },
    ],
  },
];

function Tree({ center, accent, leaves }: Pick<Capability, "center" | "accent" | "leaves">) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-hairline"
      style={{
        backgroundColor: "#fbfbfa",
        backgroundImage: "radial-gradient(circle, rgba(10,10,10,0.055) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      <div className="flex items-center gap-4 px-6 py-8 sm:px-8 sm:py-10">
        {/* center node: icon, no glow */}
        <span
          className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white shadow-[0_6px_18px_-6px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
        >
          <span
            className="grid h-11 w-11 place-items-center rounded-xl text-white"
            style={{ backgroundImage: `linear-gradient(145deg, ${accent}, ${accent}cc)` }}
          >
            <HugeiconsIcon icon={center} size={22} strokeWidth={1.8} color="#fff" />
          </span>
        </span>

        {/* connectors + leaves */}
        <span aria-hidden className="h-px w-6 shrink-0" style={{ background: "rgba(10,10,10,0.14)" }} />
        <div className="relative flex-1">
          <span
            aria-hidden
            className="absolute bottom-5 left-0 top-5 w-px"
            style={{ background: "rgba(10,10,10,0.14)" }}
          />
          <ul className="flex flex-col gap-3">
            {leaves.map((l) => (
              <li key={l.label} className="relative pl-5">
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-px w-4"
                  style={{ background: "rgba(10,10,10,0.14)" }}
                />
                <span className="inline-flex items-center gap-2.5 rounded-xl border border-hairline bg-white px-3 py-2 text-[14px] text-ink shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <span
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-lg"
                    style={{ background: `${accent}14`, color: accent }}
                  >
                    <HugeiconsIcon icon={l.icon} size={14} strokeWidth={1.8} color={accent} />
                  </span>
                  {l.label}
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
          <Reveal as="p" delay={0.1} className="font-lead mt-6 max-w-[460px] text-[18px] leading-[1.55] text-grey">
            One senior team, three ways in: a focused AI system, a full product
            built and launched, or emerging-tech work where the architecture has
            to be right the first time.
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="relative flex aspect-[16/9] items-end overflow-hidden rounded-2xl p-7">
            <Image
              src="/bg/bg-055.webp"
              alt=""
              fill
              sizes="(min-width:1024px) 620px, 100vw"
              quality={82}
              className="object-cover"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 to-black/5" />
            <div className="relative">
              <p className="font-lead max-w-[22ch] text-[19px] leading-tight text-white">
                Powerful systems, thoughtfully designed to fit right into your workflow.
              </p>
              <span className="mt-3 inline-block">
                <Logo variant="white" size={18} />
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* capability rows */}
      <div className="mt-16 border-t border-hairline">
        {CAPABILITIES.map((c, i) => (
          <Reveal
            key={c.title}
            delay={0.05}
            className="grid gap-10 border-b border-hairline py-14 lg:grid-cols-2 lg:items-center lg:gap-20"
          >
            <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
              <span className="flex items-center gap-2.5">
                <span
                  className="grid h-8 w-8 place-items-center rounded-lg"
                  style={{ background: `${c.accent}14`, color: c.accent }}
                >
                  <HugeiconsIcon icon={c.center} size={17} strokeWidth={1.8} color={c.accent} />
                </span>
                <h3 className="font-lead text-[24px] leading-tight text-ink">{c.title}</h3>
              </span>
              <p className="mt-5 max-w-[500px] text-[17px] leading-[1.6] text-grey">{c.blurb}</p>
              <div className="mt-7">
                <GhostLink href="/work-with-us">Learn more</GhostLink>
              </div>
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : undefined}>
              <Tree center={c.center} accent={c.accent} leaves={c.leaves} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
