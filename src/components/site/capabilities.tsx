import { Reveal } from "@/components/motion/reveal";

const ITEMS = [
  { no: "1.0", title: "Research", body: "We start from first principles, prototyping hard problems in AI, systems, and distributed software before they're obviously tractable." },
  { no: "1.1", title: "Design", body: "We treat interface and ergonomics as core engineering. A tool people reach for beats a demo people applaud." },
  { no: "1.2", title: "Build", body: "Small teams, short cycles, real users. We ship production software and iterate against the way it's actually used." },
  { no: "1.3", title: "Ship", body: "The best experiments graduate into real products in people's hands, like Talise and Utsuro, live today." },
];

export function Capabilities() {
  return (
    <section id="studio">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-grey-2">
            The studio
          </p>
          <h2 className="mt-4 text-balance font-editorial text-[2.2rem] font-normal leading-[1.06] tracking-[-0.02em] text-ink sm:text-[2.9rem]">
            Research to production, under one roof.
          </h2>
          <p className="mt-5 max-w-md text-grey">
            71Labs is a small, senior team. We take an idea from a first
            prototype to a product in people&apos;s hands, owning the research,
            the design, and the engineering end to end.
          </p>
        </Reveal>

        <div className="border-t border-border">
          {ITEMS.map((it, i) => (
            <Reveal key={it.no} delay={i * 0.08}>
              <div className="group grid grid-cols-[3rem_1fr_auto] items-start gap-5 border-b border-border px-3 py-6 transition-colors duration-300 hover:bg-card sm:grid-cols-[3.5rem_1fr_auto]">
                <span className="font-mono text-xs tracking-[0.14em] text-grey-2">
                  {it.no}
                </span>
                <div>
                  <h3 className="text-lg font-medium text-ink">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-grey">
                    {it.body}
                  </p>
                </div>
                <svg
                  viewBox="0 0 16 16"
                  className="mt-1 h-4 w-4 text-grey-2 [transition:transform_.4s_var(--ease-snap),color_.3s] group-hover:translate-x-1 group-hover:text-ink"
                  fill="none"
                >
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
