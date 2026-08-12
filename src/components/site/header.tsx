"use client";

import { useEffect, useState } from "react";
import { Logo, LogoMark } from "./logo";
import { UtsuroMark } from "./utsuro-mark";
import { PillButton } from "./pill-button";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

const PRODUCTS = [
  {
    name: "Talise",
    href: "#talise",
    desc: "Consumer stablecoin payments on Sui.",
    mark: (
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#b7f486] text-black">
        <LogoMark className="h-4 w-4" />
      </span>
    ),
  },
  {
    name: "Utsuro",
    href: "#utsuro",
    desc: "AI image & video generation.",
    mark: <UtsuroMark className="h-8 w-8" />,
  },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-white/80 backdrop-blur-xl"
          : "border-b border-transparent bg-white/0",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="shrink-0" aria-label="71Labs home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {/* Products dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setMenu(true)}
            onMouseLeave={() => setMenu(false)}
          >
            <button
              className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm text-neutral-600 transition-colors hover:text-neutral-950"
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
            >
              Products
              <svg viewBox="0 0 16 16" className={cn("h-3.5 w-3.5 transition-transform", menu && "rotate-180")} fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              className={cn(
                "absolute left-0 top-full w-80 pt-2 transition-all duration-200",
                menu ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
              )}
            >
              <div className="overflow-hidden rounded-2xl border border-border bg-white p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.18)]">
                {PRODUCTS.map((p) => (
                  <a
                    key={p.name}
                    href={p.href}
                    onClick={() => setMenu(false)}
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-neutral-50"
                  >
                    {p.mark}
                    <span>
                      <span className="block text-sm font-medium text-neutral-950">{p.name}</span>
                      <span className="mt-0.5 block text-xs text-neutral-500">{p.desc}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-neutral-600 transition-colors hover:text-neutral-950"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center md:flex">
          <PillButton href="#contact" icon="up-right">
            Work with us
          </PillButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-neutral-900 md:hidden"
        >
          <div className="relative h-3 w-4">
            <span className={cn("absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300", open && "translate-y-[5.5px] rotate-45")} />
            <span className={cn("absolute left-0 top-[5.5px] h-px w-full bg-current transition-opacity duration-200", open && "opacity-0")} />
            <span className={cn("absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300", open && "-translate-y-[5.5px] -rotate-45")} />
          </div>
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        className={cn(
          "overflow-hidden border-border bg-white transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-96 border-b opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
          <p className="px-3 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">Products</p>
          {PRODUCTS.map((p) => (
            <a key={p.name} href={p.href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-neutral-50">
              {p.mark}
              <span className="text-sm text-neutral-900">{p.name}</span>
            </a>
          ))}
          <div className="my-1 h-px bg-border" />
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950">
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-between rounded-lg bg-neutral-950 px-3 py-2.5 text-sm text-white">
            Work with us <span>→</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
