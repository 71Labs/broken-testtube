import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Recognition } from "@/components/site/recognition";
import { OutlineButton, GhostLink, Caption } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const metadata = { title: "Talise" };

/* One phone screenshot, no rotation, no shadow, thin hairline rounding. */
function Phone({
  src,
  alt,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1206}
      height={2622}
      sizes={sizes}
      quality={88}
      className={cn("w-full rounded-[16px] border border-hairline", className)}
    />
  );
}

type Feature = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  media: React.ReactNode;
  surface: "surface" | "surface-cream";
  reverse?: boolean;
};

const FEATURES: Feature[] = [
  {
    eyebrow: "Send",
    title: "Send to a name, not an address.",
    body: "Money on Talise moves to a handle like eromonsele@talise.sui. It settles on Sui in under a second, and it is gasless, so you never touch a 0x address or a network fee.",
    bullets: [
      "Human handles instead of wallet addresses",
      "Settles on Sui in under a second",
      "Gasless on every transfer",
    ],
    surface: "surface-cream",
    media: (
      <div className="mx-auto w-[240px] sm:w-[268px]">
        <Phone
          src="/talise/send.png"
          alt="Sending money to a Talise handle"
          sizes="(min-width: 640px) 268px, 240px"
        />
      </div>
    ),
  },
  {
    eyebrow: "Earn",
    title: "Your balance earns while it sits.",
    body: "Balances are held in USDsui, worth one US dollar each, and they earn up to 8 percent while they wait. No lockups, no staking screens, nothing to manage.",
    bullets: [
      "USDsui, 1:1 with the US dollar",
      "Up to 8 percent on an idle balance",
      "Withdraw or spend at any time",
    ],
    surface: "surface",
    reverse: true,
    media: (
      <div className="mx-auto w-[240px] sm:w-[268px]">
        <Phone
          src="/talise/earn.png"
          alt="Talise balance earning yield"
          sizes="(min-width: 640px) 268px, 240px"
        />
      </div>
    ),
  },
  {
    eyebrow: "Share",
    title: "Send money as a link, or send it quietly.",
    body: "Turn a balance into a cheque link and hand it to anyone; they claim it as real money. Or use private send when a transfer is nobody else's business.",
    bullets: [
      "Cheque links claimed as real money",
      "Private send for discreet transfers",
      "Works with anyone, wallet or not",
    ],
    surface: "surface-cream",
    media: (
      <div className="flex items-end justify-center gap-4">
        <div className="w-[150px] translate-y-4 sm:w-[172px]">
          <Phone
            src="/talise/cheque.png"
            alt="Talise cheque link"
            sizes="(min-width: 640px) 172px, 150px"
          />
        </div>
        <div className="w-[168px] sm:w-[196px]">
          <Phone
            src="/talise/private.png"
            alt="Talise private send"
            sizes="(min-width: 640px) 196px, 168px"
          />
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Cash out",
    title: "Move it to a local bank account.",
    body: "Cash out straight to a bank account. Nigeria is live today, with more rails on the way, and every payout settles 1:1 from USDsui.",
    bullets: [
      "Nigeria live today",
      "More rails coming",
      "1:1 from USDsui to local currency",
    ],
    surface: "surface",
    reverse: true,
    media: (
      <div className="mx-auto w-[240px] sm:w-[268px]">
        <Phone
          src="/talise/cashout.png"
          alt="Cashing out to a local bank"
          sizes="(min-width: 640px) 268px, 240px"
        />
      </div>
    ),
  },
];

function FeatureRow({ feature }: { feature: Feature }) {
  const { eyebrow, title, body, bullets, media, surface, reverse } = feature;
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* text */}
        <div className={cn(reverse && "lg:order-2")}>
          <Reveal>
            <Caption>{eyebrow}</Caption>
          </Reveal>
          <Reveal as="h2" delay={0.06} className="ed-heading mt-5 max-w-[16ch] text-balance text-ink">
            {title}
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-6 max-w-[440px] text-[17px] leading-[1.6] text-grey">
            {body}
          </Reveal>
          <ul className="mt-8 max-w-[460px] border-t border-hairline">
            {bullets.map((b, i) => (
              <Reveal
                as="li"
                key={b}
                delay={0.16 + i * 0.06}
                y={14}
                className="border-b border-hairline py-3.5 text-[15px] leading-relaxed text-ink-2"
              >
                {b}
              </Reveal>
            ))}
          </ul>
        </div>

        {/* media */}
        <Reveal delay={0.1} className={cn(reverse && "lg:order-1")}>
          <div className={cn(surface, "flex items-center justify-center rounded-lg p-10 sm:p-14")}>
            {media}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function TalisePage() {
  return (
    <>
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-[1440px] px-6 pt-24 sm:px-10 sm:pt-32 lg:px-12">
          <div className="max-w-[900px]">
            <Reveal>
              <Caption>Talise · Payments on Sui</Caption>
            </Reveal>
            <Reveal as="h1" delay={0.06} className="ed-display mt-6 text-balance text-ink">
              Money that moves like a message.
            </Reveal>
            <Reveal as="p" delay={0.12} className="font-lead mt-8 max-w-[560px] text-[20px] leading-[1.5] text-ink-2">
              Talise lets anyone hold real dollars on Sui and send them to a name,
              as easily as texting. No wallet addresses, no gas, no seed phrases.
            </Reveal>
            <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center gap-6">
              <OutlineButton href="https://talise.io" external>
                Visit talise.io
              </OutlineButton>
              <GhostLink href="/">Back to 71Labs</GhostLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Full-bleed clean app still */}
      <Reveal className="mt-16 sm:mt-24">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f2f2f2]">
          <Image
            src="/cine/opt/app-poster.jpg"
            alt="The Talise app"
            fill
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      {/* Feature deep-dive */}
      {FEATURES.map((feature) => (
        <FeatureRow key={feature.eyebrow} feature={feature} />
      ))}

      {/* Recognition */}
      <Recognition />

      {/* Closing CTA */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 sm:pb-32 lg:px-12">
        <Reveal>
          <div className="surface-cream rounded-lg px-8 py-20 sm:px-16 sm:py-28 lg:px-20">
            <div className="max-w-[720px]">
              <h2 className="ed-heading text-balance text-ink">
                Hold dollars that move like a message.
              </h2>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <OutlineButton href="https://talise.io" external>
                  Visit talise.io
                </OutlineButton>
                <GhostLink href="/maren">See Maren</GhostLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
