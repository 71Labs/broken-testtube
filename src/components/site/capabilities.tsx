import { Reveal } from "@/components/motion/reveal";
import { Caption } from "./ui";

const ITEMS = [
  { no: "01", title: "Research", body: "We start from first principles, prototyping hard problems in AI, systems, and distributed software before they're obviously tractable." },
  { no: "02", title: "Design", body: "We treat interface and ergonomics as core engineering. A tool people reach for beats a demo people applaud." },
  { no: "03", title: "Build", body: "Small teams, short cycles, real users. We ship production software and iterate against the way it's actually used." },
  { no: "04", title: "Ship", body: "The best experiments graduate into real products in people's hands, like Talise and Maren, live today." },
];

export function Capabilities() {
  return (
    <section id="studio" className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Reveal>
            <Caption>The studio</Caption>
          </Reveal>
          <Reveal as="h2" delay={0.06} className="ed-heading mt-5 max-w-[13ch] text-ink">
            Research to production, under one roof.
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-6 max-w-[380px] text-[17px] leading-[1.6] text-grey">
            71Labs is a small, senior team. We take an idea from a first
            prototype to a product in people&apos;s hands, whether it is one of
            our own or one we build with you, owning research, design, and
            engineering end to end.
          </Reveal>
        </div>

        <div className="border-t border-hairline">
          {ITEMS.map((it, i) => (
            <Reveal key={it.no} delay={i * 0.07}>
              <div className="group grid grid-cols-[2.5rem_1fr] gap-6 border-b border-hairline py-7">
                <span className="text-[13px] font-medium tracking-[0.06em] text-grey-2">{it.no}</span>
                <div>
                  <h3 className="text-[19px] font-medium text-ink">{it.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-grey">{it.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
