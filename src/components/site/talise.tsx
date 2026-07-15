import { Reveal } from "./reveal";
import { PhoneFrame } from "./phone-frame";
import { PillButton } from "./pill-button";

const POINTS = [
  "Send to a handle like eromonsele@talise.sui — never a 0x address.",
  "Balances are USDsui, 1:1 with the US dollar, earning up to 8%.",
  "Sign in with Google. No seed phrase, and we cover the gas.",
];

const STATS = [
  { label: "Settlement", value: "< 1s", note: "on Sui" },
  { label: "Network fees", value: "$0", note: "we sponsor gas" },
  { label: "Earn on balance", value: "8%", note: "up to, APY" },
  { label: "USDsui", value: "1:1", note: "to US dollar" },
];

export function Talise() {
  return (
    <section
      id="talise"
      className="relative overflow-hidden border-y border-border"
      // Talise's own lime-green accent, scoped to the product sections.
      style={{ ["--glow" as string]: "140 231 90" }}
    >
      <div
        className="pointer-events-none absolute right-[6%] top-1/4 h-[460px] w-[460px] rounded-full opacity-40 blur-[130px]"
        style={{ background: "radial-gradient(closest-side, rgba(140,231,90,0.22), transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <Reveal>
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--glow))]" />
            Our product · Live on Sui
          </p>

          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-[3.25rem]">
            Money that moves freely{" "}
            <span className="font-serif text-[1.08em] font-normal italic text-[#dcf24a]">
              like messages.
            </span>
          </h2>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Talise lets anyone hold real dollars on Sui and send them to a name —
            as easily as texting. No wallet addresses, no gas, no seed phrases.
          </p>

          <ul className="mt-8 space-y-3.5">
            {POINTS.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--glow))]" />
                <span className="text-sm text-muted-foreground">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <PillButton href="https://talise.io" variant="accent" external icon="up-right">
              Visit talise.io
            </PillButton>
            <PillButton href="#gallery" variant="secondary">
              See the app
            </PillButton>
          </div>
        </Reveal>

        {/* Real app screenshots — Home in front, Cheque staggered behind. */}
        <Reveal delay={120}>
          <div className="relative mx-auto h-[540px] w-full max-w-[420px]">
            <div
              className="absolute right-0 top-6 w-[200px] rotate-[6deg]"
              style={{ animation: "drift 11s ease-in-out infinite", ["--dy" as string]: "10px" }}
            >
              <PhoneFrame
                src="/talise/cheque.png"
                alt="Talise cheque link — send money in any DM"
                sizes="200px"
                className="opacity-90"
              />
            </div>
            <div
              className="absolute left-0 top-0 w-[248px]"
              style={{ animation: "drift 9s ease-in-out infinite", ["--dy" as string]: "-10px" }}
            >
              <PhoneFrame
                src="/talise/home.png"
                alt="Talise home screen — USDsui balance and recent activity"
                priority
                sizes="248px"
              />
            </div>
          </div>
        </Reveal>
      </div>

      {/* professional stat strip */}
      <Reveal className="relative mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-28">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-card px-6 py-7">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {s.label}
              </dt>
              <dd className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {s.value}
                </span>
                <span className="font-mono text-[10px] text-[rgb(var(--glow))]">
                  {s.note}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
