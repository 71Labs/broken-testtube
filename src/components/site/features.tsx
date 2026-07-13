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
function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M13 3 5 13h5l-1 8 8-10h-5l1-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function IconNoGas() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <rect x="4" y="4" width="9" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 9h3.5a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0v-6l-2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="m4 20 16-16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconYield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M12 21c0-5 3-8 8-8-1 5-4 8-8 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 21c0-6-3-9-8-9 1 5 4 9 8 9ZM12 21v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconLogin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconCashOut() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 12h.01M17 12h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const FEATURES = [
  {
    icon: <IconHandle />,
    title: "Handle-based sends",
    body: "Send money to a name like sele@talise instead of a 42-character wallet address.",
  },
  {
    icon: <IconBolt />,
    title: "Sub-second settlement",
    body: "Transfers finalize in under a second on Sui — money that keeps up with a conversation.",
  },
  {
    icon: <IconNoGas />,
    title: "No gas, ever",
    body: "Talise covers all network fees. Send the whole amount, with nothing skimmed off the top.",
  },
  {
    icon: <IconYield />,
    title: "Automatic yield",
    body: "Idle dollars earn yield through vetted Sui protocols while staying fully liquid.",
  },
  {
    icon: <IconLogin />,
    title: "Sign in with Google",
    body: "zkLogin onboarding means no seed phrase and no wallet to install — just tap and go.",
  },
  {
    icon: <IconCashOut />,
    title: "Cash out anywhere",
    body: "Withdraw to your local currency or wire USD to a bank account, across borders.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          How it works
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
            <div className="group flex h-full flex-col bg-card p-6 transition-colors duration-300 hover:bg-[#101014]">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors group-hover:text-foreground">
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
