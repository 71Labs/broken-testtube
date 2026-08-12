import Image from "next/image";
import { Reveal } from "./reveal";
import { UtsuroMark } from "./utsuro-mark";

const OUTPUTS = [
  { src: "/utsuro/out-coffee.png", label: "Product" },
  { src: "/utsuro/out-shoe.png", label: "Footwear" },
  { src: "/utsuro/out-skincare.png", label: "Skincare" },
  { src: "/utsuro/out-portrait.png", label: "Portrait" },
];

/* Light browser frame wrapping the Utsuro app screenshot. */
function AppFrame() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.25)]">
      <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1 font-mono text-[10px] text-neutral-400">
          utsuro.xyz/home
        </div>
      </div>
      <Image
        src="/utsuro/app.png"
        alt="Utsuro app — describe what you want to make and it renders"
        width={3456}
        height={1964}
        sizes="(min-width: 1024px) 560px, 100vw"
        className="h-auto w-full"
      />
    </div>
  );
}

export function Utsuro() {
  return (
    <section id="utsuro" className="bg-[#f6f5f2] text-neutral-900">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        {/* spotlight */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-400">
              <span className="flex items-center gap-1.5">
                <UtsuroMark className="h-4 w-4" />
              </span>
              Utsuro · AI image &amp; video
              <span className="rounded-full bg-[#e8681e]/12 px-1.5 py-0.5 text-[9px] text-[#c2560f]">
                Beta
              </span>
            </p>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.025em] text-neutral-900 sm:text-[3.25rem]">
              Describe an idea.
              <br />
              It renders the{" "}
              <span className="text-[#e8681e]">images and video.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-500">
              The assistant asks what you left out and explains why each answer
              changes the result. Then Z-Image-Turbo and MiniMax H3 render it
              through 0G Compute, over a route you can verify on-chain.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="https://utsuro.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 py-1.5 pl-5 pr-1.5 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                Visit utsuro.xyz
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-900">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                    <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <a
                href="#utsuro-how"
                className="inline-flex items-center rounded-full border border-neutral-300 px-5 py-2.5 text-sm text-neutral-900 transition-colors hover:bg-white"
              >
                See how it works
              </a>
              <span className="font-mono text-[11px] text-neutral-400">
                200 credits on signup. No card.
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <AppFrame />
          </Reveal>
        </div>

        {/* feature bento */}
        <div id="utsuro-how" className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* one reference */}
          <Reveal className="sm:col-span-2">
            <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="text-lg font-medium text-neutral-900">
                One reference, read into every prompt
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-500">
                Z-Image takes no image input, so a reference is read rather than
                pasted. Qwen3-VL writes a precise description and folds it into
                the prompt behind every image. Described, not copied — subject,
                palette, framing and mood carry over. The pixels do not.
              </p>
              <div className="mt-5 grid grid-cols-4 gap-2">
                {OUTPUTS.map((o, i) => (
                  <div key={o.src} className="relative aspect-square overflow-hidden rounded-lg">
                    <Image src={o.src} alt={`Utsuro ${o.label}`} width={378} height={378} sizes="140px" className="h-full w-full object-cover" />
                    <span className="absolute left-1.5 top-1.5 rounded bg-white/85 px-1 font-mono text-[8px] text-neutral-500">
                      0{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* guided prompting */}
          <Reveal delay={80}>
            <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="text-lg font-medium text-neutral-900">Guided prompting</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                Every question the assistant asks comes with the reason it
                matters — so the next brief you write is better than this one.
              </p>
              <div className="mt-4 rounded-xl border-l-2 border-[#e8681e] bg-neutral-50 p-3">
                <p className="text-xs font-medium text-neutral-900">How close are we?</p>
                <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
                  Framing decides what the image is about. A macro of one detail
                  and a wide of the whole thing are two different arguments.
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {["Macro", "Product", "Portrait"].map((c) => (
                    <span key={c} className="rounded-full border border-neutral-200 px-2 py-0.5 text-[10px] text-neutral-600">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* approve the frame */}
          <Reveal delay={120}>
            <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="text-lg font-medium text-neutral-900">
                Approve the frame, then move it
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                A still is a finished deliverable on its own. When you want
                motion, that exact image becomes the locked first frame — you
                know what is moving before you pay for it.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Image src="/utsuro/out-coffee.png" alt="Still frame" width={378} height={378} sizes="120px" className="h-20 w-20 rounded-lg object-cover" />
                <span className="text-neutral-300">→</span>
                <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                  <Image src="/utsuro/out-coffee.png" alt="Rendered to video" width={378} height={378} sizes="120px" className="h-full w-full object-cover" />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-neutral-900">
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor"><path d="M5 3.5v9l7-4.5z" /></svg>
                    </span>
                  </span>
                  <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1 font-mono text-[8px] text-white">0:04</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* brand kit */}
          <Reveal delay={160}>
            <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="text-lg font-medium text-neutral-900">Brand kit</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                Brand name, palette, a default look and aspect ratio — saved to
                your profile once, so you are not retyping them into every brief.
              </p>
              <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200">
                {[
                  ["Brand", "Utsuro"],
                  ["Default look", "Photoreal"],
                  ["Default ratio", "4:5"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-b border-neutral-100 px-3 py-2 text-[11px] last:border-0">
                    <span className="text-neutral-400">{k}</span>
                    <span className="font-medium text-neutral-900">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-1.5">
                {["#111111", "#6b7280", "#f3f4f6", "#ffffff", "#e8681e"].map((c) => (
                  <span key={c} className="h-6 flex-1 rounded-md border border-neutral-200" style={{ background: c }} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* output gallery */}
        <Reveal delay={80}>
          <div className="mt-14 flex items-end justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">
              Rendered on 0G Compute · Z-Image-Turbo
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {OUTPUTS.map((o) => (
              <figure key={o.src} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <Image src={o.src} alt={`Utsuro ${o.label} render`} width={378} height={378} sizes="(min-width:640px) 260px, 45vw" className="aspect-square w-full object-cover" />
                <figcaption className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-400">
                  {o.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
