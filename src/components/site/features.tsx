import { Reveal } from "./reveal";

function IconHandle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M20 12a8 8 0 1 0-3.2 6.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15.2 12v1.5a2.3 2.3 0 0 0 4.6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconCheque() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 14l2.5-2.5L12 14M7 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 15h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconLeaf() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M20 4C10 4 4 9 4 17c0 1.5.3 2.5.3 2.5S6 12 20 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4.5 19.5C7 14 11 11 16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconRoundup() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M4 13a8 8 0 0 1 14-5m2-2v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="16" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 14.2v3.6M10.8 15h1.7a.9.9 0 0 1 0 1.8h-1.3a.9.9 0 0 0 0 1.8h1.7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}
function IconBank() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M4 10h16M5 10 12 4l7 6M6 10v7M10 10v7M14 10v7M18 10v7M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FEATURES = [
  {
    icon: <IconHandle />,
    title: "Handle-based sends",
    body: "Send to a name like eromonsele@talise.sui instead of a 42-character wallet address. It settles on Sui in under a second.",
  },
  {
    icon: <IconCheque />,
    title: "Money in a link",
    body: "Write a cheque and drop it in any DM — the recipient claims it as real money, protected by captcha and no-VPN checks.",
  },
  {
    icon: <IconLock />,
    title: "Private send",
    body: "Send smaller amounts privately, with the value kept off the public record. Discretion by default for everyday payments.",
  },
  {
    icon: <IconLeaf />,
    title: "Earn up to 8%",
    body: "Idle USDsui earns yield through vetted Sui protocols while staying fully liquid — spend or send it at any moment.",
  },
  {
    icon: <IconRoundup />,
    title: "Round-up & Save",
    body: "Auto-save a slice of every send into named savings goals, and earn on the balance as it grows toward the target.",
  },
  {
    icon: <IconBank />,
    title: "Cash out to your bank",
    body: "Withdraw straight to a local bank — Nigeria live today, more rails on the way — paid out 1:1 from your USDsui.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28"
      style={{ ["--glow" as string]: "140 231 90" }}
    >
      <Reveal className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Inside the app
        </p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl">
          Real dollars, without the crypto friction.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Talise hides the blockchain so completely that it feels like a normal
          money app — while keeping you non-custodial and in control.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 80} className="h-full">
            <div className="group flex h-full flex-col bg-card p-6 transition-colors duration-300 hover:bg-[#0e0e0e]">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[rgb(var(--glow))] transition-colors">
                {f.icon}
              </span>
              <h3 className="mt-5 text-base font-medium text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
