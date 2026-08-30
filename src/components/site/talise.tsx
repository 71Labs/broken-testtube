import Image from "next/image";
import { ProductSection } from "./product-section";

function TalisePreview() {
  return (
    <div className="surface-cream flex items-center justify-center rounded-lg p-10 sm:p-14">
      <div className="flex items-end gap-4">
        <div className="w-[150px] translate-y-4 sm:w-[168px]">
          <Image
            src="/talise/send.png"
            alt="Talise send flow"
            width={1206}
            height={2622}
            sizes="168px"
            quality={88}
            className="w-full rounded-[14px] border border-hairline"
          />
        </div>
        <div className="w-[168px] sm:w-[196px]">
          <Image
            src="/talise/home.png"
            alt="Talise home screen"
            width={1206}
            height={2622}
            sizes="196px"
            quality={88}
            className="w-full rounded-[16px] border border-hairline"
          />
        </div>
      </div>
    </div>
  );
}

function AwardBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-hairline py-1.5 pl-2 pr-3.5">
      <span className="h-2 w-2 rounded-full bg-[#fdf313]" />
      <span className="text-[12px] font-medium uppercase tracking-[0.1em] text-ink-2">
        2nd place · Sui Overflow 2026
      </span>
    </span>
  );
}

export function Talise() {
  return (
    <ProductSection
      id="talise"
      name="Talise"
      eyebrow="Payments on Sui"
      title="Money that moves like a message."
      description="Talise lets anyone hold real dollars on Sui and send them to a name, as easily as texting. No wallet addresses, no gas, no seed phrases."
      badge={<AwardBadge />}
      bullets={[
        "Send to a handle like eromonsele@talise.sui, never a 0x address.",
        "Balances are USDsui, 1:1 with the US dollar, earning up to 8%.",
        "Cheque links, private send, and cash-out to a local bank.",
      ]}
      primary={{ label: "Visit talise.io", href: "https://talise.io", external: true }}
      secondary={{ label: "Explore Talise", href: "#talise" }}
      preview={<TalisePreview />}
    />
  );
}
