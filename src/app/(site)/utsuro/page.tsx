import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { OutlineButton, GhostLink, Caption } from "@/components/site/ui";

export const metadata = { title: "Utsuro" };

const RENDERS = [
  { file: "out-coffee", alt: "AI-rendered coffee product still" },
  { file: "out-shoe", alt: "AI-rendered sneaker product still" },
  { file: "out-skincare", alt: "AI-rendered skincare product still" },
  { file: "out-portrait", alt: "AI-rendered portrait still" },
];

const FEATURES: { name: string; title: string; body: string }[] = [
  {
    name: "Guided prompting",
    title: "Every question comes with the reason it matters.",
    body: "The assistant does not just ask for more detail. It tells you why a choice about lens, light or framing will change the render, so you learn the controls while you use them.",
  },
  {
    name: "One reference, read not pasted",
    title: "Qwen3-VL describes the subject, palette and mood.",
    body: "Bring a single image and the model reads it into words. Your reference is described, not copied, so the output carries the feel without lifting the pixels.",
  },
  {
    name: "Approve the still, then move it",
    title: "The approved image becomes the locked first frame.",
    body: "Nothing animates until you are happy with the frame. Once you approve the still, it is fixed as the opening frame of your video, so motion builds from a look you already signed off.",
  },
  {
    name: "Brand kit",
    title: "Your look, saved and reused across every render.",
    body: "Brand name, palette, default look and aspect ratio live on your profile. New work starts from your identity instead of a blank prompt.",
  },
];

/** Browser-frame preview, ported from the home-page Utsuro section. */
function AppFrame() {
  return (
    <div className="surface rounded-lg p-4 sm:p-8">
      <div className="overflow-hidden rounded-[6px] border border-hairline bg-white">
        <div className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e0e0e0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e0e0e0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e0e0e0]" />
          <span className="mx-auto text-[11px] text-grey-2">utsuro.xyz</span>
        </div>
        <Image
          src="/utsuro/app.png"
          alt="The Utsuro app rendering an image from a described prompt"
          width={3456}
          height={1964}
          sizes="(min-width:1024px) 900px, 100vw"
          quality={88}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

export default function UtsuroPage() {
  return (
    <>
      {/* 1 · Hero */}
      <section className="mx-auto max-w-[1440px] px-6 pt-24 sm:px-10 sm:pt-32 lg:px-12">
        <div className="max-w-[900px]">
          <Reveal>
            <Caption>Utsuro · AI image &amp; video · Beta</Caption>
          </Reveal>
          <Reveal as="h1" delay={0.06} className="ed-display mt-6 text-balance text-ink">
            Describe an idea. It renders the images and video.
          </Reveal>
          <Reveal as="p" delay={0.12} className="mt-8 max-w-[560px] text-[19px] leading-[1.55] text-grey">
            An assistant sharpens your prompt and explains why each answer changes
            the result. Then 0G Compute renders stills and motion over a route you
            can verify on-chain.
          </Reveal>
          <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center gap-6">
            <OutlineButton href="https://utsuro.xyz" external>
              Visit utsuro.xyz
            </OutlineButton>
            <GhostLink href="/">Back to 71Labs</GhostLink>
          </Reveal>
        </div>
      </section>

      {/* 2 · Output gallery */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {RENDERS.map((r, i) => (
            <Reveal key={r.file} delay={i * 0.06}>
              <Image
                src={`/utsuro/${r.file}.png`}
                alt={r.alt}
                width={378}
                height={378}
                sizes="(min-width:1024px) 330px, 45vw"
                quality={88}
                className="aspect-square w-full rounded-lg border border-hairline object-cover"
              />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.24}>
          <Caption className="mt-6">Rendered on 0G Compute, Z-Image-Turbo</Caption>
        </Reveal>
      </section>

      {/* 3 · The app in a browser frame */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 sm:pb-32 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="max-w-[440px]">
            <Reveal>
              <Caption>Inside the app</Caption>
            </Reveal>
            <Reveal as="h2" delay={0.06} className="ed-heading mt-5 text-ink">
              A conversation on one side, the render on the other.
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-6 text-[17px] leading-[1.6] text-grey">
              You talk through the idea and watch it resolve. The assistant carries
              the prompt, the canvas carries the result, and every render is tied to
              a route you can check on-chain.
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <AppFrame />
          </Reveal>
        </div>
      </section>

      {/* 4 · Feature list */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
        <div className="max-w-[900px]">
          <Reveal>
            <Caption>How it works</Caption>
          </Reveal>
          <Reveal as="h2" delay={0.06} className="ed-heading mt-5 text-balance text-ink">
            Fewer knobs, more intent.
          </Reveal>
        </div>

        <div className="mt-16 border-t border-hairline">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.name}
              delay={i * 0.06}
              className="grid gap-4 border-b border-hairline py-10 lg:grid-cols-[300px_1fr] lg:gap-16"
            >
              <Caption className="lg:pt-1.5">{f.name}</Caption>
              <div className="max-w-[620px]">
                <h3 className="text-[22px] leading-[1.25] tracking-[-0.01em] text-ink">
                  {f.title}
                </h3>
                <p className="mt-4 text-[17px] leading-[1.6] text-grey">{f.body}</p>

                {f.name === "One reference, read not pasted" && (
                  <div className="mt-8 grid grid-cols-4 gap-3 sm:max-w-[440px]">
                    {RENDERS.map((r) => (
                      <Image
                        key={r.file}
                        src={`/utsuro/${r.file}.png`}
                        alt={r.alt}
                        width={378}
                        height={378}
                        sizes="110px"
                        quality={88}
                        className="aspect-square w-full rounded-lg border border-hairline object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}

          {/* Models & verifiability — the closing row, on cream */}
          <Reveal className="grid gap-4 border-b border-hairline py-10 lg:grid-cols-[300px_1fr] lg:gap-16">
            <Caption className="lg:pt-1.5">Models &amp; verifiability</Caption>
            <div className="max-w-[620px]">
              <h3 className="text-[22px] leading-[1.25] tracking-[-0.01em] text-ink">
                Z-Image-Turbo and MiniMax H3, rendered through 0G Compute.
              </h3>
              <p className="mt-4 text-[17px] leading-[1.6] text-grey">
                Every generation runs over a route that is verifiable on-chain, so
                the work is provable rather than promised. New accounts start with
                200 free credits on signup.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5 · Close CTA */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 sm:pb-32 lg:px-12">
        <Reveal>
          <div className="surface-cream rounded-lg px-6 py-16 sm:px-12 sm:py-20 lg:px-20">
            <div className="max-w-[720px]">
              <h2 className="ed-heading text-balance text-ink">
                Bring an idea. Leave with the images and video.
              </h2>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <OutlineButton href="https://utsuro.xyz" external>
                  Visit utsuro.xyz
                </OutlineButton>
                <GhostLink href="/talise">See Talise</GhostLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
