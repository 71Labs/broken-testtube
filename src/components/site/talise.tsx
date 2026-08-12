import Image from "next/image";
import { ProductSection } from "./product-section";
import { LogoMark } from "./logo";

const ACCENT = "#3c9a4e";

function TalisePreview() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-[#f6f6f4] p-8">
      <div className="relative mx-auto flex h-[380px] max-w-sm items-end justify-center">
        <div
          className="absolute bottom-0 left-2 w-[150px] rotate-[-6deg] sm:left-6"
          style={{ animation: "drift 11s ease-in-out infinite", ["--dy" as string]: "8px" }}
        >
          <Image src="/talise/send.png" alt="Talise send flow" width={1206} height={2622} sizes="150px" className="rounded-[1.3rem] border border-black/10 shadow-lg" />
        </div>
        <div
          className="absolute bottom-3 right-2 w-[150px] rotate-[6deg] sm:right-6"
          style={{ animation: "drift 13s ease-in-out infinite", ["--dy" as string]: "-8px" }}
        >
          <Image src="/talise/cheque.png" alt="Talise cheque link" width={1206} height={2622} sizes="150px" className="rounded-[1.3rem] border border-black/10 shadow-lg" />
        </div>
        <div className="relative w-[172px]">
          <Image src="/talise/home.png" alt="Talise home screen" width={1206} height={2622} sizes="172px" priority className="rounded-[1.5rem] border border-black/10 shadow-xl" />
        </div>
      </div>
    </div>
  );
}

export function Talise() {
  return (
    <ProductSection
      id="talise"
      name="Talise"
      eyebrow="Payments · Sui"
      accent={ACCENT}
      icon={
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#b7f486] text-black">
          <LogoMark className="h-4 w-4" />
        </span>
      }
      title="Money that moves like a message."
      description="Talise lets anyone hold real dollars on Sui and send them to a name, as easily as texting. No wallet addresses, no gas, no seed phrases."
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
