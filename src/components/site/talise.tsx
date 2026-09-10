import Image from "next/image";
import { ProductSection } from "./product-section";
import { ProductCard } from "./product-card";

const ACCENT = "#3c9a4e";

function TalisePreview() {
  return (
    <ProductCard
      href="/talise"
      bg="/bg/bg-054.webp"
      name="Talise"
      tagline="Money that moves like a message."
    />
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
