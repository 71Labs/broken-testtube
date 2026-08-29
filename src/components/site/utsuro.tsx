import Image from "next/image";
import { ProductSection } from "./product-section";
import { Parallax } from "@/components/motion/parallax";
import { UtsuroMark } from "./utsuro-mark";

const ACCENT = "#e8681e";

const RENDERS = ["out-coffee", "out-shoe", "out-skincare", "out-portrait"];

function UtsuroPreview() {
  return (
    <Parallax amount={40}>
      <div className="rounded-3xl border border-border bg-card p-6">
        {/* app in a browser frame */}
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
            </div>
            <div className="mx-auto rounded-md border border-border bg-neutral-50 px-3 py-1 font-mono text-[10px] text-grey-2">
              utsuro.xyz/home
            </div>
          </div>
          <Image
            src="/utsuro/app.png"
            alt="Utsuro app"
            width={3456}
            height={1964}
            sizes="(min-width:1024px) 520px, 100vw"
            className="h-auto w-full"
          />
        </div>
        {/* render strip */}
        <div className="mt-3 grid grid-cols-4 gap-2">
          {RENDERS.map((r) => (
            <Image
              key={r}
              src={`/utsuro/${r}.png`}
              alt="Utsuro render"
              width={378}
              height={378}
              sizes="120px"
              className="aspect-square w-full rounded-lg object-cover shadow-sm"
            />
          ))}
        </div>
      </div>
    </Parallax>
  );
}

export function Utsuro() {
  return (
    <ProductSection
      id="utsuro"
      name="Utsuro"
      eyebrow="AI image & video · 0G"
      accent={ACCENT}
      icon={<UtsuroMark className="h-8 w-8" />}
      title={
        <>
          Describe an idea. It renders the{" "}
          <span className="text-[#e8681e]">images and video.</span>
        </>
      }
      description="An assistant sharpens your prompt and explains why each answer changes the result. Then 0G Compute renders stills and motion over a route you can verify on-chain."
      bullets={[
        "Reference read, not pasted. Qwen3-VL describes subject, palette and mood.",
        "Approve the still, then it becomes the locked first frame of your video.",
        "Z-Image-Turbo and MiniMax H3, with 200 free credits on signup.",
      ]}
      primary={{ label: "Visit utsuro.xyz", href: "https://utsuro.xyz", external: true }}
      secondary={{ label: "Explore Utsuro", href: "#utsuro" }}
      preview={<UtsuroPreview />}
      reverse
    />
  );
}
