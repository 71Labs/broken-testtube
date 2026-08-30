import { Reveal } from "@/components/motion/reveal";
import { OutlineButton, GhostLink, Caption } from "./ui";
import { cn } from "@/lib/utils";

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
    <section id={id} className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* text */}
        <div className={cn(reverse && "lg:order-2")}>
          <Reveal>
            <Caption>
              {name} · {eyebrow}
            </Caption>
          </Reveal>

          <Reveal as="h2" delay={0.06} className="ed-heading mt-5 max-w-[15ch] text-ink">
            {title}
          </Reveal>

          <Reveal as="p" delay={0.1} className="mt-6 max-w-[440px] text-[17px] leading-[1.6] text-grey">
            {description}
          </Reveal>

          {badge && (
            <Reveal delay={0.14} className="mt-7">
              {badge}
            </Reveal>
          )}

          <ul className="mt-8 max-w-[460px] border-t border-hairline">
            {bullets.map((b, i) => (
              <Reveal
                as="li"
                key={i}
                delay={0.16 + i * 0.06}
                y={14}
                className="border-b border-hairline py-3.5 text-[15px] leading-relaxed text-ink-2"
              >
                {b}
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.16 + bullets.length * 0.06} className="mt-9 flex flex-wrap items-center gap-6">
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
