import { Reveal } from "./reveal";

export function ProductsIntro() {
  return (
    <section id="products" className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-400">
          Our products
        </p>
        <h2 className="mt-4 text-balance text-3xl font-medium tracking-[-0.02em] text-neutral-950 sm:text-4xl">
          Two products, one studio.
        </h2>
        <p className="mt-4 text-neutral-500">
          We build and ship the whole thing, from research to the app in your
          hands. Each lives in its own world; both are built by 71Labs.
        </p>
      </Reveal>
    </section>
  );
}
