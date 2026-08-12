import { Logo } from "./logo";

const COLUMNS = [
  {
    title: "Products",
    links: [
      { label: "Talise", href: "#talise" },
      { label: "talise.io", href: "https://talise.io" },
      { label: "Utsuro", href: "#utsuro" },
      { label: "utsuro.xyz", href: "https://utsuro.xyz" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "How we work", href: "#studio" },
      { label: "Contact", href: "#contact" },
      { label: "Careers", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-neutral-500">
              An independent product studio building Talise and Utsuro.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400">
              Building since 2026 · Sui &amp; 0G
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-medium text-neutral-950">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-sm text-neutral-500 transition-colors hover:text-neutral-950"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-neutral-400">© 2026 71Labs. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {["X", "GitHub", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="text-xs text-neutral-500 transition-colors hover:text-neutral-950">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
