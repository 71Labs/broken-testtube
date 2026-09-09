import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { OutlineButton, GhostLink, Caption } from "@/components/site/ui";

export const metadata = { title: "Maren" };

const SCREENS = [
  { file: "home", alt: "Maren home screen with an MUSD balance" },
  { file: "borrow", alt: "Borrowing MUSD against Bitcoin, amount first" },
  { file: "send", alt: "Sending MUSD to a @handle" },
  { file: "confirmed", alt: "An honest on-chain receipt after a transaction" },
];

const FEATURES: { name: string; title: string; body: string }[] = [
  {
    name: "Borrow, don't sell",
    title: "Borrow MUSD against your Bitcoin.",
    body: "Your Bitcoin stays yours and keeps its upside. You draw MUSD — Bitcoin-backed dollars — against it, amount-first, so you spend without ever triggering a sale.",
  },
  {
    name: "Pay by @handle",
    title: "Send to a name, not a 0x address.",
    body: "Type a @handle and Maren resolves it to a real address before you sign, and shows you that address. No copy-pasting long strings, no paying the wrong person.",
  },
  {
    name: "Honest receipts",
    title: "Every action ends in a receipt you can check.",
    body: "When something settles, Maren shows an on-chain receipt: the network, the gas you paid in BTC, and a link to the explorer. It reports what actually happened, nothing more.",
  },
  {
    name: "Your keys, your Bitcoin",
    title: "Non-custodial by default.",
    body: "Maren never holds your Bitcoin. Keys stay on your device, so the balance you see is one only you can move.",
  },
];

function AppFrame() {
  return (
    <div className="flex items-center justify-center rounded-lg bg-[#f1eeff] p-8 sm:p-12">
      <div className="w-[220px] sm:w-[260px]">
        <Image
          src="/maren/home.png"
          alt="The Maren home screen"
          width={1206}
          height={2622}
          sizes="(min-width:1024px) 260px, 60vw"
          quality={88}
          className="w-full rounded-[20px] border border-hairline"
        />
      </div>
    </div>
  );
}

export default function MarenPage() {
  return (
    <>
      {/* 1 · Hero */}
      <section className="mx-auto max-w-[1440px] px-6 pt-24 sm:px-10 sm:pt-32 lg:px-12">
        <div className="max-w-[900px]">
          <Reveal>
            <Caption>Maren · Bitcoin-backed dollars · Beta</Caption>
          </Reveal>
          <Reveal as="h1" delay={0.06} className="ed-display mt-6 text-balance text-ink">
            Spend Bitcoin. Never sell it.
          </Reveal>
          <Reveal as="p" delay={0.12} className="mt-8 max-w-[560px] text-[19px] leading-[1.55] text-grey">
            Borrow MUSD against your Bitcoin and pay anyone by @handle. Gasless,
            non-custodial, and honest about every on-chain receipt, all on Mezo.
          </Reveal>
          <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center gap-6">
            <OutlineButton href="https://marenfinance.xyz" external>
              Visit marenfinance.xyz
            </OutlineButton>
            <GhostLink href="/">Back to 71Labs</GhostLink>
          </Reveal>
        </div>
      </section>

      {/* 2 · Screens gallery */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {SCREENS.map((s, i) => (
            <Reveal key={s.file} delay={i * 0.06}>
              <Image
                src={`/maren/${s.file}.png`}
                alt={s.alt}
                width={1206}
                height={2622}
                sizes="(min-width:1024px) 300px, 45vw"
                quality={88}
                className="w-full rounded-[18px] border border-hairline"
              />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.24}>
          <Caption className="mt-6">Real screens from the app, on Mezo</Caption>
        </Reveal>
      </section>

      {/* 3 · Inside the app */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 sm:pb-32 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="max-w-[440px]">
            <Reveal>
              <Caption>Inside the app</Caption>
            </Reveal>
            <Reveal as="h2" delay={0.06} className="ed-heading mt-5 text-ink">
              A balance you can spend, backed by Bitcoin you keep.
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-6 text-[17px] leading-[1.6] text-grey">
              Your MUSD balance sits up front, with send and receive one tap away
              and your Bitcoin vault right below it. Amount-first flows, handles
              resolved before you sign, and receipts that tell the truth.
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <AppFrame />
          </Reveal>
        </div>
      </section>

      {/* 4 · Feature list */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
        <div className="max-w-[900px]">
          <Reveal>
            <Caption>How it works</Caption>
          </Reveal>
          <Reveal as="h2" delay={0.06} className="ed-heading mt-5 text-balance text-ink">
            Bitcoin-native, but it feels like a clean money app.
          </Reveal>
        </div>

        <div className="mt-16 border-t border-hairline">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.name}
              delay={i * 0.06}
              className="grid gap-4 border-b border-hairline py-10 lg:grid-cols-[300px_1fr] lg:gap-16"
            >
              <Caption className="lg:pt-1.5">{f.name}</Caption>
              <div className="max-w-[620px]">
                <h3 className="text-[22px] leading-[1.25] tracking-[-0.01em] text-ink">
                  {f.title}
                </h3>
                <p className="mt-4 text-[17px] leading-[1.6] text-grey">{f.body}</p>
              </div>
            </Reveal>
          ))}

          <Reveal className="grid gap-4 border-b border-hairline py-10 lg:grid-cols-[300px_1fr] lg:gap-16">
            <Caption className="lg:pt-1.5">Built on Mezo</Caption>
            <div className="max-w-[620px]">
              <h3 className="text-[22px] leading-[1.25] tracking-[-0.01em] text-ink">
                MUSD, gasless, on a Bitcoin layer 2.
              </h3>
              <p className="mt-4 text-[17px] leading-[1.6] text-grey">
                Maren runs on Mezo, where dollars are backed by Bitcoin and gas is
                paid in BTC under the hood, so the app stays gasless for you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5 · Close CTA */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 sm:pb-32 lg:px-12">
        <Reveal>
          <div className="surface-cream rounded-lg px-6 py-16 sm:px-12 sm:py-20 lg:px-20">
            <div className="max-w-[720px]">
              <h2 className="ed-heading text-balance text-ink">
                Keep your Bitcoin. Spend the dollars.
              </h2>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <OutlineButton href="https://marenfinance.xyz" external>
                  Visit marenfinance.xyz
                </OutlineButton>
                <GhostLink href="/talise">See Talise</GhostLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
