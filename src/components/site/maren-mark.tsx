import Image from "next/image";
import { cn } from "@/lib/utils";

/** Maren mark: the purple peak logomark on a soft lavender tile. */
export function MarenMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-grid h-7 w-7 place-items-center rounded-[9px] bg-[#f1eeff]",
        className,
      )}
    >
      <Image src="/maren/mark.png" alt="" width={256} height={193} className="h-4 w-auto" />
    </span>
  );
}
