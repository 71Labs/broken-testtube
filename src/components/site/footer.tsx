const COLUMNS = [
  {
    title: "Products",
    links: [
      { label: "Talise", href: "/talise" },
      { label: "talise.io", href: "https://talise.io" },
      { label: "Maren", href: "/maren" },
      { label: "marenfinance.xyz", href: "https://marenfinance.xyz" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About the studio", href: "/studio" },
      { label: "Writing", href: "/writing" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/#contact" },
      { label: "Team panel", href: "/panel" },
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
    <footer className="border-t border-hairline pb-14">
      <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-28 lg:px-12">
        <div className="flex flex-col justify-between gap-14 lg:flex-row">
          <div>
            <span className="font-wordmark text-xl text-ink">
              71labs<span className="text-grey-2">/</span>
            </span>
            <p className="mt-5 max-w-[260px] text-[15px] leading-relaxed text-grey">
              An independent product studio building Talise and Maren.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-14 gap-y-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-grey-2">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="link-ghost text-[15px]"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center">
          <p className="text-[13px] text-grey-2">© 2026 71Labs. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[14px]">
            {["X", "GitHub", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="link-ghost">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
