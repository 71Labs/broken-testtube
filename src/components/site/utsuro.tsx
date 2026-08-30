import Image from "next/image";
import { ProductSection } from "./product-section";

const RENDERS = ["out-coffee", "out-shoe", "out-skincare", "out-portrait"];

function UtsuroPreview() {
  return (
    <div className="surface rounded-lg p-6 sm:p-8">
      <div className="overflow-hidden rounded-[6px] border border-hairline bg-white">
        <div className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e0e0e0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e0e0e0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e0e0e0]" />
          <span className="mx-auto text-[11px] text-grey-2">utsuro.xyz</span>
        </div>
        <Image
          src="/utsuro/app.png"
          alt="Utsuro app"
          width={3456}
          height={1964}
          sizes="(min-width:1024px) 560px, 100vw"
          className="h-auto w-full"
        />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {RENDERS.map((r) => (
          <Image
            key={r}
            src={`/utsuro/${r}.png`}
            alt="Utsuro render"
            width={378}
            height={378}
            sizes="120px"
            className="aspect-square w-full rounded-[6px] object-cover"
          />
        ))}
      </div>
    </div>
  );
}

export function Utsuro() {
  return (
    <ProductSection
      id="utsuro"
      name="Utsuro"
      eyebrow="AI image & video"
      title="Describe an idea. It renders the images and video."
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
