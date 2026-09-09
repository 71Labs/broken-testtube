import Image from "next/image";
import { ProductSection } from "./product-section";

const ACCENT = "#3c9a4e";

function TalisePreview() {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-[#e9f5ec] to-[#f4efe9] p-10 sm:p-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `${ACCENT}26` }}
      />
      <div className="relative flex items-end justify-center gap-5">
        <div className="w-[148px] translate-y-5 sm:w-[168px]">
          <Image
            src="/talise/send.png"
            alt="Talise send flow"
            width={1206}
            height={2622}
            sizes="168px"
            quality={90}
            className="w-full rounded-[18px] shadow-[0_26px_50px_-22px_rgba(20,40,25,0.32)] ring-1 ring-black/[0.06]"
          />
        </div>
        <div className="w-[176px] sm:w-[204px]">
          <Image
            src="/talise/home.png"
            alt="Talise home screen"
            width={1206}
            height={2622}
            sizes="204px"
            quality={90}
            className="w-full rounded-[22px] shadow-[0_30px_60px_-24px_rgba(20,40,25,0.36)] ring-1 ring-black/[0.06]"
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
