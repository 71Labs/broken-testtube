import Image from "next/image";
import { ProductSection } from "./product-section";

const ACCENT = "#5b3df5";

function MarenPreview() {
  return (
    <div className="relative overflow-hidden rounded-[28px] p-10 sm:p-14">
      <Image
        src="/bg/bg-055.webp"
        alt=""
        fill
        sizes="(min-width:1024px) 560px, 100vw"
        quality={80}
        className="object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10"
      />
      <div className="relative flex items-end justify-center gap-5">
        <div className="w-[148px] translate-y-5 sm:w-[168px]">
          <Image
            src="/maren/send.png"
            alt="Maren send-by-handle flow"
            width={1206}
            height={2622}
            sizes="168px"
            quality={90}
            className="w-full rounded-[18px] shadow-[0_26px_50px_-22px_rgba(30,20,60,0.32)] ring-1 ring-black/[0.06]"
          />
        </div>
        <div className="w-[176px] sm:w-[204px]">
          <Image
            src="/maren/home.png"
            alt="Maren home screen showing an MUSD balance"
            width={1206}
            height={2622}
            sizes="204px"
            quality={90}
            className="w-full rounded-[22px] shadow-[0_30px_60px_-24px_rgba(30,20,60,0.36)] ring-1 ring-black/[0.06]"
          />
        </div>
      </div>
    </div>
  );
}

export function Maren() {
  return (
    <ProductSection
      id="maren"
      name="Maren"
      eyebrow="Bitcoin-backed dollars · Mezo"
      accent={ACCENT}
      title="Spend Bitcoin. Never sell it."
      description="Maren lets you borrow MUSD against your Bitcoin and pay anyone by @handle. Gasless, non-custodial, and honest about every on-chain receipt, in one clean app."
      bullets={[
        "Borrow MUSD against your Bitcoin, and spend without ever selling it.",
        "Pay anyone by @handle; it resolves to an address before you sign.",
        "Gasless on Mezo, non-custodial, with honest on-chain receipts.",
      ]}
      primary={{ label: "Visit marenfinance.xyz", href: "https://marenfinance.xyz", external: true }}
      secondary={{ label: "Explore Maren", href: "/maren" }}
      preview={<MarenPreview />}
      reverse
    />
  );
}
