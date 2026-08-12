import { Reveal } from "./reveal";
import { PillButton } from "./pill-button";
import { cn } from "@/lib/utils";

export function ProductSection({
  id,
  name,
  eyebrow,
  accent,
  icon,
  title,
  description,
  bullets,
  primary,
  secondary,
  preview,
  reverse = false,
}: {
  id: string;
  name: string;
  eyebrow: string;
  accent: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  description: string;
  bullets: string[];
  primary: { label: string; href: string; external?: boolean };
  secondary: { label: string; href: string };
  preview: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <section id={id} className="border-t border-border">
      <div className="mx-auto grid max-w-[90rem] items-center gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-16">
        {/* text */}
        <Reveal className={cn(reverse && "lg:order-2")}>
          <div className="flex items-center gap-2.5">
            {icon}
            <span className="font-wordmark text-xl font-medium tracking-tight text-neutral-950">
              {name}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: accent }}>
              {eyebrow}
            </span>
          </div>

          <h2 className="mt-5 text-balance text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-neutral-950 sm:text-[3rem]">
            {title}
          </h2>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-neutral-500">
            {description}
          </p>

          <ul className="mt-7 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-neutral-700">
                <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0" fill="none" style={{ color: accent }}>
                  <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <PillButton href={primary.href} external={primary.external} icon={primary.external ? "up-right" : "arrow"}>
              {primary.label}
            </PillButton>
            <a
              href={secondary.href}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900"
            >
              {secondary.label}
              <span style={{ color: accent }}>→</span>
            </a>
          </div>
        </Reveal>

        {/* preview */}
        <Reveal delay={120} className={cn(reverse && "lg:order-1")}>
          {preview}
        </Reveal>
      </div>
    </section>
  );
}
