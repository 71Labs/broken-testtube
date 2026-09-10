import Image from "next/image";
import Link from "next/link";

/** Clickable product tile: abstract gradient, tagline, name — links to the product page. */
export function ProductCard({
  href,
  bg,
  name,
  tagline,
}: {
  href: string;
  bg: string;
  name: string;
  tagline: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block aspect-[4/3] overflow-hidden rounded-[28px] outline-none focus-visible:ring-2 focus-visible:ring-ink/25"
    >
      <Image
        src={bg}
        alt=""
        fill
        sizes="(min-width:1024px) 560px, 100vw"
        quality={82}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-9">
        <p className="font-lead max-w-[16ch] text-[22px] leading-tight text-white sm:text-[26px]">
          {tagline}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <span className="font-wordmark text-[17px] text-white">{name}</span>
          <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-white/85 transition-colors group-hover:text-white">
            Explore
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
