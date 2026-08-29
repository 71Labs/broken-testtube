import { Reveal } from "@/components/motion/reveal";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

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

const SOCIALS = ["X", "GitHub", "LinkedIn"];

/** Link with an underline that slides in from the left on hover. */
function FooterLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      href={href}
      {...externalProps}
      className={cn(
        "group relative inline-flex text-grey transition-colors duration-300 hover:text-ink",
        className,
      )}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 [transition-timing-function:var(--ease-snap)] group-hover:scale-x-100"
      />
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-12 md:grid-cols-[1.6fr_repeat(3,1fr)]">
          <Reveal>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-grey">
              An independent product studio building Talise and Utsuro.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-grey-2">
              Building since 2026 · Sui &amp; 0G
            </p>
          </Reveal>

          {COLUMNS.map((col, i) => (
            <Reveal key={col.title} delay={0.06 + i * 0.06}>
              <h4 className="text-sm font-medium text-ink">{col.title}</h4>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink
                      href={link.href}
                      external={link.href.startsWith("http")}
                      className={cn(
                        (link.label === "Talise" || link.label === "Utsuro") &&
                          "font-wordmark text-base tracking-tight",
                      )}
                    >
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={0.1}
          className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-grey-2">
            © 2026 71Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs">
            <FooterLink href="/panel">Team panel</FooterLink>
            {SOCIALS.map((s) => (
              <FooterLink key={s} href="#">
                {s}
              </FooterLink>
            ))}
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
