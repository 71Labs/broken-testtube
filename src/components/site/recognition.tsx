import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { LogoMark } from "./logo";

const STATS = [
  { node: <>2nd</>, label: "DeFi & Payments" },
  { node: <CountUp to={15000} prefix="$" />, label: "Prize won" },
  { node: <CountUp to={1233} />, label: "On-chain transactions" },
  { node: <CountUp to={5000} prefix="$" suffix="+" />, label: "Settled volume" },
];

export function Recognition() {
  return (
    <section className="mx-auto max-w-[90rem] px-5 pb-6 pt-12 sm:px-8 sm:pt-16 lg:px-12">
      <Reveal className="relative">
        {/* peeking badge */}
        <div className="absolute left-1/2 top-0 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4f46e5] text-white">
            <LogoMark className="h-6 w-6" />
          </span>
        </div>

        <div className="overflow-hidden rounded-[2rem] bg-[#141416] px-6 pb-14 pt-20 text-center sm:px-16 sm:pb-16">
          <div className="pointer-events-none absolute inset-0 bg-grid-lines opacity-[0.05]" />

          <Reveal delay={0.06} className="relative inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-[#8ce65a]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
              Recognition
            </span>
          </Reveal>

          <Reveal
            as="h2"
            delay={0.12}
            className="relative mx-auto mt-7 max-w-4xl text-serif text-[clamp(1.9rem,3.4vw,3.1rem)] leading-[1.12] text-white"
          >
            Talise placed 2nd in DeFi &amp; Payments at Sui Overflow 2026,{" "}
            <span className="text-white/50">
              out of a genuinely high field judged by Mysten Labs and the Sui
              ecosystem.
            </span>
          </Reveal>

          <div className="relative mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={i} delay={0.12 + i * 0.08}>
                <div className="text-4xl font-semibold tracking-tight tabular-nums text-white sm:text-5xl">
                  {s.node}
                </div>
                <p className="mt-2 text-sm text-white/55">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
