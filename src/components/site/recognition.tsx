import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { Caption } from "./ui";

const STATS = [
  { node: <>2nd</>, label: "DeFi & Payments", accent: true },
  { node: <CountUp to={15000} prefix="$" />, label: "Prize won" },
  { node: <CountUp to={1233} />, label: "On-chain transactions" },
  { node: <CountUp to={5000} prefix="$" suffix="+" />, label: "Settled volume" },
];

export function Recognition() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
      <div className="max-w-[900px]">
        <Reveal>
          <Caption>Recognition</Caption>
        </Reveal>
        <Reveal as="h2" delay={0.06} className="ed-heading mt-5 text-ink">
          Talise placed 2nd in DeFi &amp; Payments at Sui Overflow 2026,{" "}
          <span className="text-grey-2">
            out of a genuinely high field judged by Mysten Labs and the Sui
            ecosystem.
          </span>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-hairline pt-12 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="relative inline-block text-[44px] font-medium leading-none tracking-tight tabular-nums text-ink sm:text-[54px]">
              {s.node}
              {s.accent && (
                <span className="absolute -bottom-1.5 left-0 h-2.5 w-full bg-[#fdf313]" style={{ zIndex: -1 }} />
              )}
            </div>
            <p className="mt-4 text-[15px] text-grey">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
