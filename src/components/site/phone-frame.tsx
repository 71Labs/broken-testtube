import Image from "next/image";
import { cn } from "@/lib/utils";

/** Wraps a Talise app screenshot (1206×2622) in a device bezel. */
export function PhoneFrame({
  src,
  alt,
  priority = false,
  className,
  sizes = "280px",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2.3rem] border border-white/12 bg-[#0a0a0a] p-1.5 shadow-[0_40px_120px_-24px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      {/* notch */}
      <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-black/80" />
      <div className="relative overflow-hidden rounded-[1.9rem]">
        <Image
          src={src}
          alt={alt}
          width={1206}
          height={2622}
          priority={priority}
          sizes={sizes}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
