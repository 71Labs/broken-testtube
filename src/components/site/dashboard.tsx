"use client";

import { useState } from "react";
import { Reveal } from "./reveal";
import { LogoMark } from "./logo";
import { cn } from "@/lib/utils";

/* --------------------------------- data ----------------------------------- */

type TxType = "received" | "sent" | "cashout" | "swap";

const TX: {
  id: string;
  who: string;
  handle: string;
  type: TxType;
  amount: string;
  positive: boolean;
  date: string;
  status: "Completed" | "Pending";
}[] = [
  { id: "1", who: "Ada Okafor", handle: "ada@talise.sui", type: "received", amount: "+$240.00", positive: true, date: "Today", status: "Completed" },
  { id: "2", who: "Cash out · GTBank", handle: "•••• 5320", type: "cashout", amount: "−$500.00", positive: false, date: "Today", status: "Pending" },
  { id: "3", who: "USDC → USDsui", handle: "Swap", type: "swap", amount: "$120.00", positive: false, date: "Yesterday", status: "Completed" },
  { id: "4", who: "John Mensah", handle: "john@talise.sui", type: "sent", amount: "−$50.00", positive: false, date: "Yesterday", status: "Completed" },
  { id: "5", who: "Sui Community", handle: "cheque · claimed", type: "received", amount: "+$100.00", positive: true, date: "Mar 4", status: "Completed" },
  { id: "6", who: "Cash out · Moniepoint", handle: "•••• 1187", type: "cashout", amount: "−$320.00", positive: false, date: "Mar 3", status: "Completed" },
  { id: "7", who: "Zara Bello", handle: "zara@talise.sui", type: "received", amount: "+$75.00", positive: true, date: "Mar 2", status: "Completed" },
];

const TABS = [
  { key: "all", label: "All" },
  { key: "received", label: "Received" },
  { key: "sent", label: "Sent" },
  { key: "cashout", label: "Cash out" },
  { key: "swap", label: "Swapped" },
] as const;

const TYPE_CHIP: Record<TxType, { label: string; className: string }> = {
  received: { label: "Received", className: "bg-[rgb(140,231,90)]/12 text-[rgb(140,231,90)]" },
  sent: { label: "Sent", className: "bg-white/8 text-foreground/80" },
  cashout: { label: "Cash out", className: "bg-amber-400/12 text-amber-300" },
  swap: { label: "Swap", className: "bg-sky-400/12 text-sky-300" },
};

/* --------------------------------- icons ---------------------------------- */

const nav = [
  { key: "home", label: "Home", d: "M4 11l8-6 8 6M6 10v9h12v-9" },
  { key: "send", label: "Send", d: "M4 12l16-8-6 16-3-6-7-2Z" },
  { key: "requests", label: "Requests", d: "M4 6h16M4 12h10M4 18h7" },
  { key: "earn", label: "Earn", d: "M20 5C11 5 5 9 5 16M5 16c6 0 10-3 12-8M5 16v-4" },
  { key: "activity", label: "Activity", d: "M3 12h4l3 7 4-14 3 7h4" },
  { key: "cards", label: "Cards", d: "M3 7h18v10H3zM3 10h18" },
];

function NavIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------ sub-sections ------------------------------ */

function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-[#080808] p-3 lg:flex">
      {/* workspace switcher */}
      <div className="flex items-center gap-2.5 rounded-lg border border-border bg-white/[0.02] p-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#b7f486] text-black">
          <LogoMark className="h-4 w-4" />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-xs font-medium text-foreground">Personal</p>
          <p className="truncate font-mono text-[9px] text-muted-foreground">talise.sui</p>
        </div>
        <svg viewBox="0 0 16 16" className="ml-auto h-3.5 w-3.5 text-muted-foreground" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* quick search */}
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-white/[0.02] px-2.5 py-2 text-muted-foreground">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <span className="text-xs">Quick search</span>
        <kbd className="ml-auto rounded border border-border px-1 font-mono text-[9px]">/</kbd>
      </div>

      <nav className="mt-4 flex flex-col gap-0.5">
        {nav.map((n) => (
          <a
            key={n.key}
            href="#"
            onClick={(e) => e.preventDefault()}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors",
              n.key === "activity"
                ? "bg-white/[0.06] text-foreground"
                : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground",
            )}
          >
            <NavIcon d={n.d} />
            {n.label}
            {n.key === "requests" && (
              <span className="ml-auto rounded-full bg-white/8 px-1.5 font-mono text-[9px] text-muted-foreground">
                2
              </span>
            )}
          </a>
        ))}
      </nav>

      <p className="mt-5 px-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/70">
        Objects
      </p>
      <nav className="mt-1 flex flex-col gap-0.5">
        {["Recipients", "Contacts"].map((o) => (
          <a
            key={o}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-white/[0.03] hover:text-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            {o}
          </a>
        ))}
      </nav>

      <div className="mt-auto flex items-center gap-2 rounded-lg border border-border bg-white/[0.02] p-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(140,231,90)] to-[#4b9b2e] text-[10px] font-medium text-black">
          E
        </span>
        <span className="truncate text-xs text-foreground">eromonsele</span>
      </div>
    </aside>
  );
}

const SPARK = "M0,26 L14,22 L28,24 L42,16 L56,18 L70,10 L84,13 L98,6 L112,9 L126,3";

function InsightCards() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {/* balance + sparkline */}
      <div className="rounded-xl border border-border bg-white/[0.015] p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Total balance
          </span>
          <span className="rounded-full bg-[rgb(140,231,90)]/12 px-1.5 py-0.5 font-mono text-[9px] text-[rgb(140,231,90)]">
            ▲ 2.4%
          </span>
        </div>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">$1,240.00</p>
        <svg viewBox="0 0 126 30" className="mt-3 h-9 w-full" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="rgb(140,231,90)" stopOpacity="0.35" />
              <stop offset="1" stopColor="rgb(140,231,90)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${SPARK} L126,30 L0,30 Z`} fill="url(#spark)" />
          <path d={SPARK} stroke="rgb(140,231,90)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* sent this month */}
      <div className="rounded-xl border border-border bg-white/[0.015] p-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Sent · 30 days
        </span>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">$1,240</p>
        <div className="mt-3 flex items-end gap-1">
          {[10, 16, 8, 20, 12, 24, 14, 18].map((h, i) => (
            <span
              key={i}
              className="w-full rounded-sm bg-white/10"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>

      {/* yield */}
      <div className="rounded-xl border border-border bg-white/[0.015] p-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Earning
        </span>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          5.2<span className="text-lg text-muted-foreground">% APY</span>
        </p>
        <p className="mt-3 font-mono text-[10px] text-muted-foreground">
          <span className="text-[rgb(140,231,90)]">$669</span> saved via round-up
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
          <div className="h-full w-[62%] rounded-full bg-[rgb(140,231,90)]" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- main mock ------------------------------- */

export function Dashboard() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("all");
  const rows = tab === "all" ? TX : TX.filter((t) => t.type === tab);

  const count = (key: string) =>
    key === "all" ? TX.length : TX.filter((t) => t.type === key).length;

  return (
    <section
      id="web"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28"
      style={{ ["--glow" as string]: "140 231 90" }}
    >
      <Reveal className="max-w-2xl">
        <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--glow))]" />
          Talise for web · Preview
        </p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl">
          Your whole account, on the big screen.
        </h2>
        <p className="mt-4 text-muted-foreground">
          The same money, from your desk — balances, activity, and cash-outs in
          one clean workspace, with a command bar for everything.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-[#0a0a0a] shadow-[0_50px_140px_-40px_rgba(0,0,0,0.9)]">
          {/* window chrome */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>
            <div className="mx-auto flex items-center gap-1.5 rounded-md border border-border bg-white/[0.02] px-3 py-1 font-mono text-[10px] text-muted-foreground">
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
                <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5.5 7V5.5a2.5 2.5 0 0 1 5 0V7" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              app.talise.io/activity
            </div>
          </div>

          <div className="flex">
            <Sidebar />

            <div className="min-w-0 flex-1 p-4 sm:p-6">
              {/* header */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-medium text-foreground">Overview</h3>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    March · USDsui account
                  </p>
                </div>
                <button className="group inline-flex items-center gap-2 rounded-full bg-[#b7f486] py-1.5 pl-4 pr-1.5 text-[13px] font-medium text-black">
                  Quick send
                  <span className="flex items-center gap-0.5 rounded-full bg-black/90 px-2 py-1 font-mono text-[9px] text-white">
                    ⌘K
                  </span>
                </button>
              </div>

              <div className="mt-5">
                <InsightCards />
              </div>

              {/* filter tabs */}
              <div className="mt-6 flex flex-wrap items-center gap-1.5">
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors",
                      tab === t.key
                        ? "border-white/15 bg-white/[0.06] text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {t.label}
                    <span className="font-mono text-[9px] text-muted-foreground">
                      {count(t.key)}
                    </span>
                  </button>
                ))}
              </div>

              {/* records table */}
              <div className="mt-3 overflow-hidden rounded-xl border border-border">
                <div className="hidden grid-cols-[1.6fr_0.8fr_0.8fr_0.7fr] gap-4 border-b border-border bg-white/[0.015] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:grid">
                  <span>Counterparty</span>
                  <span>Type</span>
                  <span className="text-right">Amount</span>
                  <span className="text-right">Status</span>
                </div>
                <div className="divide-y divide-border">
                  {rows.map((t) => {
                    const chip = TYPE_CHIP[t.type];
                    return (
                      <div
                        key={t.id}
                        className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02] sm:grid-cols-[1.6fr_0.8fr_0.8fr_0.7fr] sm:gap-4"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[11px] font-medium text-foreground">
                            {t.who[0]}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-[13px] text-foreground">{t.who}</p>
                            <p className="truncate font-mono text-[10px] text-muted-foreground">
                              {t.handle} · {t.date}
                            </p>
                          </div>
                        </div>
                        <span className={cn("hidden w-fit rounded-full px-2 py-0.5 font-mono text-[9px] sm:inline-block", chip.className)}>
                          {chip.label}
                        </span>
                        <span
                          className={cn(
                            "text-right text-[13px] font-medium tabular-nums",
                            t.positive ? "text-[rgb(140,231,90)]" : "text-foreground",
                          )}
                        >
                          {t.amount}
                        </span>
                        <span className="hidden justify-end sm:flex">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9px]",
                              t.status === "Completed"
                                ? "bg-[rgb(140,231,90)]/12 text-[rgb(140,231,90)]"
                                : "bg-amber-400/12 text-amber-300",
                            )}
                          >
                            <span className={cn("h-1 w-1 rounded-full", t.status === "Completed" ? "bg-[rgb(140,231,90)]" : "bg-amber-300")} />
                            {t.status}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between border-t border-border bg-white/[0.015] px-4 py-2.5 font-mono text-[10px] text-muted-foreground">
                  <span>{rows.length} transactions</span>
                  <span>USDsui · 1:1 USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
