import Link from "next/link";
import { OutlineButton } from "./ui";

const NAV = [
  { label: "Talise", href: "/talise" },
  { label: "Utsuro", href: "/utsuro" },
  { label: "Studio", href: "/studio" },
  { label: "Writing", href: "/writing" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-12">
        <Link href="/" className="font-wordmark text-lg text-ink" aria-label="71Labs home">
          71labs<span className="text-grey-2">/</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="link-ghost text-[15px] font-medium">
              {n.label}
            </Link>
          ))}
        </nav>

        <OutlineButton href="/#contact">Work with us</OutlineButton>
      </div>
    </header>
  );
}
