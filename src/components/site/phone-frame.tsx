import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Real iPhone 16 Pro frame: thin titanium rail, uniform corners, side buttons.
 * Sizes to its parent's width (set a width via `className`, e.g. "w-[188px]").
 * All metrics use `cqw` so corners stay uniform at any size. Screenshots are
 * 1206×2622 (16 Pro native) and already include the status bar + Dynamic Island.
 */
export function PhoneFrame({
  src,
  alt,
  priority = false,
  sizes = "(min-width:1024px) 220px, 45vw",
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={cn("[container-type:inline-size] w-full", className)}>
      <div
        className="relative shadow-[0_30px_60px_-24px_rgba(18,18,28,0.5)]"
        style={{
          borderRadius: "18cqw",
          padding: "2.7cqw",
          background: "linear-gradient(150deg,#4a4a4e,#1c1c1f 42%,#0d0d0f)",
        }}
      >
        {/* side buttons */}
        <span aria-hidden className="absolute rounded-full bg-[#2b2b2e]" style={{ width: "1.4cqw", height: "5cqw", left: "-1.1cqw", top: "27cqw" }} />
        <span aria-hidden className="absolute rounded-full bg-[#2b2b2e]" style={{ width: "1.4cqw", height: "10cqw", left: "-1.1cqw", top: "40cqw" }} />
        <span aria-hidden className="absolute rounded-full bg-[#2b2b2e]" style={{ width: "1.4cqw", height: "15cqw", right: "-1.1cqw", top: "34cqw" }} />

        <Image
          src={src}
          alt={alt}
          width={1206}
          height={2622}
          priority={priority}
          sizes={sizes}
          quality={90}
          className="relative block h-auto w-full bg-black ring-1 ring-white/[0.06]"
          style={{ borderRadius: "15.3cqw" }}
        />
      </div>
    </div>
  );
}
