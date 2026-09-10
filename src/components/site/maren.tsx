import Image from "next/image";
import { ProductSection } from "./product-section";
import { PhoneFrame } from "./phone-frame";

const ACCENT = "#5b3df5";

function MarenPreview() {
  return (
    <div className="relative overflow-hidden rounded-[28px] p-6 sm:p-14">
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
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/12 to-transparent"
      />
      <div className="relative flex items-end justify-center gap-4 sm:gap-6">
        <PhoneFrame
          src="/maren/send.png"
          alt="Maren send-by-handle flow"
          className="hidden w-[132px] translate-y-6 sm:block sm:w-[150px]"
        />
        <PhoneFrame
          src="/maren/home.png"
          alt="Maren home screen showing an MUSD balance"
          className="w-[172px] sm:w-[188px]"
        />
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
