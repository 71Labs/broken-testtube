import { Reveal } from "./reveal";
import { PhoneFrame } from "./phone-frame";

const SHOTS = [
  { src: "/talise/send.png", label: "Send", caption: "Enter an amount, review, done." },
  { src: "/talise/receive.png", label: "Get paid", caption: "Share a QR or a payment link." },
  { src: "/talise/earn.png", label: "Earn & save", caption: "Up to 8%, plus round-up saving." },
  { src: "/talise/private.png", label: "Private send", caption: "Keep everyday amounts discreet." },
  { src: "/talise/cashout.png", label: "Cash out", caption: "Land it in a local bank account." },
];

export function Gallery() {
  return (
    <section
      id="gallery"
      className="border-y border-border py-24 sm:py-28"
      style={{ ["--glow" as string]: "140 231 90" }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            A closer look
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl">
            Every flow, a single tap away.
          </h2>
        </Reveal>
      </div>

      {/* horizontal, edge-bleeding rail */}
      <Reveal delay={80}>
        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* leading spacer keeps first card aligned to the max-w container on wide screens */}
          <div className="hidden shrink-0 lg:block lg:w-[max(0px,calc((100vw-72rem)/2))]" />
          {SHOTS.map((s, i) => (
            <figure
              key={s.src}
              className="w-[200px] shrink-0 snap-start sm:w-[224px]"
            >
              <PhoneFrame src={s.src} alt={`Talise — ${s.label}`} sizes="224px" priority={i === 0} />
              <figcaption className="mt-4 px-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--glow))]">
                  {s.label}
                </span>
                <p className="mt-1 text-sm text-muted-foreground">{s.caption}</p>
              </figcaption>
            </figure>
          ))}
          <div className="shrink-0 w-1 sm:w-4" />
        </div>
      </Reveal>
    </section>
  );
}
