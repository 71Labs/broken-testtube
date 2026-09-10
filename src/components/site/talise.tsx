import Image from "next/image";
import { ProductSection } from "./product-section";
import { PhoneFrame } from "./phone-frame";

const ACCENT = "#3c9a4e";

function TalisePreview() {
  return (
    <div className="relative overflow-hidden rounded-[28px] p-6 sm:p-14">
      <Image
        src="/bg/bg-054.webp"
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
          src="/talise/send.png"
          alt="Talise send flow"
          className="hidden w-[132px] translate-y-6 sm:block sm:w-[150px]"
        />
        <PhoneFrame src="/talise/home.png" alt="Talise home screen" className="w-[172px] sm:w-[188px]" />
      </div>
    </div>
  );
}

function AwardBadge() {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-white py-1.5 pl-1.5 pr-4">
      <Image
        src="/logo/sui-overflow.webp"
        alt="Sui Overflow"
        width={160}
        height={160}
        className="h-6 w-6 rounded-full"
      />
      <span className="text-[13px] font-medium text-ink">Sui Overflow 2026 Winner</span>
    </span>
  );
}

export function Talise() {
  return (
    <ProductSection
      id="talise"
      name="Talise"
      eyebrow="Payments on Sui"
      accent={ACCENT}
      title="Money that moves like a message."
      description="Talise lets anyone hold real dollars on Sui and send them to a name, as easily as texting. No wallet addresses, no gas, no seed phrases."
      badge={<AwardBadge />}
      bullets={[
        "Send to a handle like eromonsele@talise.sui, never a 0x address.",
        "Balances are USDsui, 1:1 with the US dollar, earning up to 8%.",
        "Cheque links, private send, and cash-out to a local bank.",
      ]}
      primary={{ label: "Visit talise.io", href: "https://talise.io", external: true }}
      secondary={{ label: "Explore Talise", href: "/talise" }}
      preview={<TalisePreview />}
    />
  );
}
