import { Reveal } from "@/components/motion/reveal";
import { OutlineButton, GhostLink, Caption } from "./ui";
import { cn } from "@/lib/utils";

function Check({ accent }: { accent: string }) {
  return (
    <span
      aria-hidden
      className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full"
      style={{ background: `${accent}1f`, color: accent }}
    >
      <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none">
        <path d="M3.5 8.5 6.5 11.5 12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function ProductSection({
  id,
  name,
  eyebrow,
  title,
  description,
  bullets,
  primary,
  secondary,
  preview,
  reverse = false,
  badge,
  accent = "#1a1a1a",
}: {
  id: string;
  name: string;
  eyebrow: string;
  accent?: string;
  icon?: React.ReactNode;
  title: React.ReactNode;
  description: string;
  bullets: React.ReactNode[];
  primary: { label: string; href: string; external?: boolean };
  secondary: { label: string; href: string };
  preview: React.ReactNode;
  reverse?: boolean;
  badge?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-24 sm:px-10 sm:py-32 lg:px-12"
    >
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        {/* text */}
        <div className={cn(reverse && "lg:order-2")}>
          <Reveal>
            <span className="inline-flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: accent }}
              />
              <Caption>{eyebrow}</Caption>
            </span>
          </Reveal>

          <Reveal as="h2" delay={0.06} className="ed-heading mt-4 max-w-[15ch] text-ink">
            {title}
          </Reveal>

          <Reveal
            as="p"
            delay={0.1}
            className="font-lead mt-6 max-w-[460px] text-[19px] leading-[1.5] text-ink-2"
          >
            {description}
          </Reveal>

          {badge && (
            <Reveal delay={0.14} className="mt-7">
              {badge}
            </Reveal>
          )}

          <ul className="mt-9 max-w-[480px] space-y-3.5">
            {bullets.map((b, i) => (
              <Reveal
                as="li"
                key={i}
                delay={0.16 + i * 0.06}
                y={14}
                className="flex items-start gap-3 text-[15px] leading-[1.5] text-grey"
              >
                <Check accent={accent} />
                <span>{b}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.16 + bullets.length * 0.06} className="mt-10 flex flex-wrap items-center gap-6">
            <OutlineButton href={primary.href} external={primary.external}>
              {primary.label}
            </OutlineButton>
            <GhostLink href={secondary.href}>{secondary.label}</GhostLink>
          </Reveal>
        </div>

        {/* media */}
        <Reveal delay={0.1} className={cn(reverse && "lg:order-1")}>
          {preview}
        </Reveal>
      </div>
    </section>
  );
}
