import { Reveal } from "@/components/motion/reveal";
import { Caption } from "@/components/site/ui";

export const metadata = { title: "Writing" };

const POSTS = [
  {
    title: "Money that moves like a message",
    meta: "Mar 2026 · Payments",
    excerpt:
      "Why a dollar wallet should feel like texting, and what it took to make sends settle under a second on Sui.",
  },
  {
    title: "Resolve before you sign",
    meta: "Feb 2026 · Product",
    excerpt:
      "How Maren turns a @handle into a real address and shows it to you before you sign, so paying a name never means trusting a black box.",
  },
  {
    title: "What 2nd place taught us",
    meta: "Feb 2026 · Studio",
    excerpt:
      "Notes from Sui Overflow 2026: what the judges cared about, and why the numbers mattered more than the placement.",
  },
  {
    title: "Approve the frame, then move it",
    meta: "Jan 2026 · AI",
    excerpt:
      "Treating a still as a finished deliverable, and turning the approved image into the locked first frame of a video.",
  },
  {
    title: "Designing for the onchain economy",
    meta: "Dec 2025 · Design",
    excerpt:
      "Hiding the blockchain so completely that it feels like a normal money app, without giving up custody.",
  },
];

export default function WritingPage() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
      <div className="max-w-[900px]">
        <Reveal>
          <Caption>Writing</Caption>
        </Reveal>
        <Reveal as="h1" delay={0.06} className="ed-display mt-6 text-ink">
          Notes from the studio.
        </Reveal>
        <Reveal
          as="p"
          delay={0.12}
          className="mt-8 max-w-[540px] text-[19px] leading-[1.55] text-grey"
        >
          Essays on payments, AI rendering, and building products for the
          onchain economy.
        </Reveal>
      </div>

      <div className="mt-16 max-w-[900px] border-t border-hairline sm:mt-20">
        {POSTS.map((post, i) => (
          <Reveal key={post.title} delay={i * 0.06}>
            <a
              href="#"
              className="group block border-b border-hairline py-8 transition-colors duration-300 [transition-timing-function:var(--ease-snap)]"
            >
              <Caption className="text-grey">{post.meta}</Caption>
              <h2 className="mt-4 text-[22px] leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:text-grey-2 sm:text-[26px]">
                {post.title}
              </h2>
              <p className="mt-3 max-w-[620px] text-[16px] leading-[1.55] text-grey">
                {post.excerpt}
              </p>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-12 max-w-[900px]">
        <p className="text-[15px] text-grey-2">More soon.</p>
      </Reveal>
    </section>
  );
}
