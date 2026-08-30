import { Reveal } from "@/components/motion/reveal";

export function ProductsIntro() {
  return (
    <section
      id="products"
      className="mx-auto max-w-[90rem] px-5 pt-24 pb-4 sm:px-8 sm:pt-28 lg:px-12"
    >
      <div className="mx-auto max-w-2xl text-center">
        <Reveal
          as="p"
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-grey-2"
        >
          Our products
        </Reveal>
        <Reveal
          as="h2"
          delay={0.08}
          className="mt-4 text-balance font-editorial text-[2.2rem] font-normal tracking-[-0.02em] text-ink sm:text-[2.9rem]"
        >
          Two products, one studio.
        </Reveal>
        <Reveal as="p" delay={0.16} className="mt-4 text-grey">
          We build and ship the whole thing, from research to the app in your
          hands. Each lives in its own world; both are built by 71Labs.
        </Reveal>
      </div>
    </section>
  );
}
