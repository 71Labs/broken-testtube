import { ProductSection } from "./product-section";
import { ProductCard } from "./product-card";

const ACCENT = "#5b3df5";

function MarenPreview() {
  return (
    <ProductCard
      href="/maren"
      bg="/bg/bg-055.webp"
      name="Maren"
      tagline="Spend Bitcoin. Never sell it."
    />
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
