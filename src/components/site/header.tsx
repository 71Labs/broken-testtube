import Link from "next/link";
import { OutlineButton } from "./ui";
import { Logo } from "./logo";

const NAV = [
  { label: "Talise", href: "/talise" },
  { label: "Maren", href: "/maren" },
  { label: "Work with us", href: "/work-with-us" },
  { label: "Studio", href: "/studio" },
  { label: "Writing", href: "/writing" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-12">
        <Link href="/" aria-label="71Labs home">
          <Logo variant="black" size={26} />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded text-[15px] font-medium text-ink/70 no-underline outline-none transition-colors duration-200 hover:text-ink focus-visible:ring-2 focus-visible:ring-ink/15"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <OutlineButton href="/work-with-us">Work with us</OutlineButton>
      </div>
    </header>
  );
}
