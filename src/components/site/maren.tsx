import Image from "next/image";
import { ProductSection } from "./product-section";

function MarenPreview() {
  return (
    <div className="flex items-center justify-center rounded-lg bg-[#f1eeff] p-10 sm:p-14">
      <div className="flex items-end gap-4">
        <div className="w-[150px] translate-y-4 sm:w-[168px]">
          <Image
            src="/maren/send.png"
            alt="Maren send-by-handle flow"
            width={1206}
            height={2622}
            sizes="168px"
            quality={88}
            className="w-full rounded-[14px] border border-hairline"
          />
        </div>
        <div className="w-[168px] sm:w-[196px]">
          <Image
            src="/maren/home.png"
            alt="Maren home screen showing an MUSD balance"
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

export function Maren() {
  return (
    <ProductSection
      id="maren"
      name="Maren"
      eyebrow="Bitcoin-backed dollars · Mezo"
      title="Spend Bitcoin. Never sell it."
      description="Maren lets you borrow MUSD against your Bitcoin and pay anyone by @handle. Gasless, non-custodial, and honest about every on-chain receipt, in one clean app."
      bullets={[
        "Borrow MUSD against your Bitcoin, and spend without ever selling it.",
        "Pay anyone by @handle; it resolves to an address before you sign.",
        "Gasless on Mezo, non-custodial, with honest on-chain receipts.",
      ]}
      primary={{ label: "Visit marenfinance.xyz", href: "https://marenfinance.xyz", external: true }}
      secondary={{ label: "Explore Maren", href: "#maren" }}
      preview={<MarenPreview />}
      reverse
    />
  );
}
