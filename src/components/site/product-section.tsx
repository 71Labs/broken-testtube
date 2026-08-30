import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
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
  badge,
}: {
  id: string;
  name: string;
  eyebrow: string;
  accent: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  description: string;
  bullets: React.ReactNode[];
  primary: { label: string; href: string; external?: boolean };
  secondary: { label: string; href: string };
  preview: React.ReactNode;
  reverse?: boolean;
  /** Optional slot rendered between the description and the bullets. */
  badge?: React.ReactNode;
}) {
  return (
    <section id={id}>
      <div className="mx-auto grid max-w-[90rem] items-center gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-16 lg:px-12">
        {/* text */}
        <div className={cn(reverse && "lg:order-2")}>
          <Reveal className="flex items-center gap-2.5">
            {icon}
            <span className="font-wordmark text-xl font-medium tracking-tight text-ink">
              {name}
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: accent }}
            >
              {eyebrow}
            </span>
          </Reveal>

          <Reveal
            as="h2"
            delay={0.06}
            className="mt-5 text-balance font-editorial text-[2.6rem] font-normal leading-[1.02] tracking-[-0.02em] text-ink sm:text-[3.4rem]"
          >
            {title}
          </Reveal>

          <Reveal
            as="p"
            delay={0.12}
            className="mt-5 max-w-md text-lg leading-relaxed text-grey"
          >
            {description}
          </Reveal>

          {badge && (
            <Reveal delay={0.16} className="mt-6">
              {badge}
            </Reveal>
          )}

          <ul className="mt-7 space-y-3">
            {bullets.map((b, i) => (
              <Reveal
                as="li"
                key={i}
                delay={0.18 + i * 0.08}
                y={16}
                className="flex items-start gap-2.5 text-sm text-ink-2"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="mt-0.5 h-4 w-4 shrink-0"
                  fill="none"
                  style={{ color: accent }}
                >
                  <path
                    d="M3.5 8.5l3 3 6-7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {b}
              </Reveal>
            ))}
          </ul>

          <Reveal
            delay={0.18 + bullets.length * 0.08}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <PillButton
                href={primary.href}
                external={primary.external}
                icon={primary.external ? "up-right" : "arrow"}
              >
                {primary.label}
              </PillButton>
            </Magnetic>
            <a
              href={secondary.href}
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink"
            >
              {secondary.label}
              <span
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                style={{ color: accent }}
              >
                →
              </span>
            </a>
          </Reveal>
        </div>

        {/* preview */}
        <Reveal delay={0.12} className={cn(reverse && "lg:order-1")}>
          {preview}
        </Reveal>
      </div>
    </section>
  );
}
