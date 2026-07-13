import { Reveal } from "./reveal";

const POINTS = [
  "Send to a name like sele@talise — no wallet addresses.",
  "Transfers settle in under a second, with zero fees.",
  "Sign in with Google. No seed phrase, nothing to install.",
];

/** Stylized Talise app screen: balance, a handle transfer, and confirmation. */
function PhoneMock() {
  return (
    <div
      className="relative mx-auto w-[264px]"
      style={{ animation: "drift 9s ease-in-out infinite", ["--dx" as string]: "0px", ["--dy" as string]: "-10px" }}
    >
      {/* device */}
      <div className="relative rounded-[2.4rem] border border-white/12 bg-[#0d0d11] p-2.5 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]">
        {/* screen */}
        <div className="relative overflow-hidden rounded-[1.9rem] border border-white/8 bg-gradient-to-b from-[#111119] to-[#0a0a0e] px-4 pb-5 pt-3">
          {/* status bar */}
          <div className="flex items-center justify-between px-1 pb-4 font-mono text-[9px] text-muted-foreground">
            <span>9:41</span>
            <span className="h-3 w-8 rounded-full bg-white/10" />
          </div>

          {/* app header */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-medium lowercase tracking-[0.14em] text-foreground">
              talise
            </span>
            <span className="h-6 w-6 rounded-full bg-gradient-to-br from-[rgb(var(--glow))] to-[#4b53c7]" />
          </div>

          {/* balance card */}
          <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <div
              className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full opacity-70 blur-2xl"
              style={{ background: "radial-gradient(closest-side, rgba(130,141,248,0.5), transparent)" }}
            />
            <p className="relative font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
              Total balance
            </p>
            <p className="relative mt-1 text-2xl font-semibold tracking-tight text-foreground">
              $1,240.00
            </p>
            <p className="relative mt-1.5 inline-flex items-center gap-1 font-mono text-[9px] text-[rgb(var(--glow))]">
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--glow))]" />
              earning 5.2% APY · liquid
            </p>
          </div>

          {/* transfer row */}
          <div className="mt-3 flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/8 text-[10px] font-medium text-foreground">
                S
              </span>
              <div>
                <p className="font-mono text-[10px] text-foreground">sele@talise</p>
                <p className="font-mono text-[8px] text-muted-foreground">Sending now</p>
              </div>
            </div>
            <span className="text-sm font-medium text-foreground">$50.00</span>
          </div>

          {/* send button */}
          <div className="mt-3 flex items-center justify-center rounded-xl bg-primary py-2.5 text-[11px] font-medium text-primary-foreground">
            Send
          </div>

          {/* confirmation */}
          <div className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[9px] text-muted-foreground">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[rgb(var(--glow))]/20 text-[rgb(var(--glow))]">
              ✓
            </span>
            Sent in 0.4s · $0.00 fees
          </div>
        </div>
      </div>
    </div>
  );
}

export function Talise() {
  return (
    <section
      id="talise"
      className="relative overflow-hidden border-y border-border"
    >
      <div
        className="pointer-events-none absolute right-[8%] top-1/4 h-[420px] w-[420px] rounded-full opacity-50 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(130,141,248,0.18), transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Our product · Live
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-[2.75rem] sm:leading-[1.05]">
            Talise — money that moves like a message.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            Hold real dollars, send them to a name, and cash out at home. Built
            on Sui, Talise makes digital money as simple as sending a text.
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
            <a
              href="https://talise.io"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              Visit talise.io
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="#features"
              className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-white/[0.04]"
            >
              How it works
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <PhoneMock />
        </Reveal>
      </div>
    </section>
  );
}
