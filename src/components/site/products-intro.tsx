import { Reveal } from "@/components/motion/reveal";
import { Caption } from "./ui";

export function ProductsIntro() {
  return (
    <section id="products" className="mx-auto max-w-[1440px] px-6 pt-24 sm:px-10 sm:pt-32 lg:px-12">
      <div className="max-w-[900px] border-t border-hairline pt-12">
        <Reveal>
          <Caption>Our products</Caption>
        </Reveal>
        <Reveal as="h2" delay={0.06} className="ed-heading mt-5 text-ink">
          Two products of our own.
        </Reveal>
        <Reveal as="p" delay={0.1} className="mt-5 max-w-[540px] text-[17px] leading-[1.6] text-grey">
          We build and ship the whole thing, from research to the app in your
          hands. Talise and Maren are ours, and the clearest proof of what we
          build for the teams we work with.
        </Reveal>
      </div>
    </section>
  );
}
