import { Reveal } from "@/components/motion/reveal";
import { OutlineButton, GhostLink, Caption } from "@/components/site/ui";
import { getOpenJobs } from "@/lib/panel/data";

export const metadata = { title: "Careers" };

const HOW_WE_HIRE = [
  {
    title: "A short, respectful process",
    body: "A handful of focused conversations, not a month of hoops. We move fast and tell you where you stand.",
  },
  {
    title: "A paid work trial, not a whiteboard gauntlet",
    body: "You do a small piece of real work, paid, close to what the job actually is. It tells us more than a puzzle ever could.",
  },
  {
    title: "You talk to the people you would work with",
    body: "No panel of strangers. You meet the small team you would ship alongside, and you get to interview us back.",
  },
  {
    title: "Remote-first, async-friendly",
    body: "We are spread across time zones and we write things down. Deep work over standups, output over hours online.",
  },
];

function jobMeta(job: {
  department?: { name: string } | null;
  location: string;
  employment_type: string;
}) {
  return [job.department?.name, job.location, job.employment_type]
    .filter(Boolean)
    .join(" · ");
}

export default async function CareersPage() {
  const roles = await getOpenJobs();

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
        <div className="max-w-[900px]">
          <Reveal>
            <Caption>Careers</Caption>
          </Reveal>
          <Reveal as="h1" delay={0.06} className="ed-display mt-6 text-ink">
            Come build the tools that come next.
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-8 max-w-[560px] text-[19px] leading-[1.55] text-grey"
          >
            71Labs is a small, senior team building consumer payments and AI
            creative tools. We hire people who like the frontier and ship.
          </Reveal>
        </div>
      </section>

      {/* How we hire */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 sm:pb-32 lg:px-12">
        <div className="max-w-[900px]">
          <Reveal>
            <Caption>How we hire</Caption>
          </Reveal>
          <div className="mt-10 border-t border-hairline">
            {HOW_WE_HIRE.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="border-b border-hairline py-7">
                  <h2 className="text-[20px] leading-tight tracking-tight text-ink sm:text-[24px]">
                    {item.title}
                  </h2>
                  <p className="mt-3 max-w-[620px] text-[16px] leading-[1.55] text-grey">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 sm:pb-32 lg:px-12">
        <div className="max-w-[900px]">
          <Reveal>
            <Caption>Open roles</Caption>
          </Reveal>

          {roles.length === 0 ? (
            <Reveal delay={0.06}>
              <div className="mt-10 border-t border-hairline pt-10">
                <p className="max-w-[560px] text-[17px] leading-[1.6] text-grey">
                  No open roles right now. We are always glad to meet people who
                  like what we are building, though — tell us what you would
                  build and we will keep you in mind.
                </p>
              </div>
            </Reveal>
          ) : (
            <div className="mt-10 border-t border-hairline">
              {roles.map((role, i) => (
                <Reveal key={role.id} delay={i * 0.06}>
                  <div className="grid grid-cols-1 gap-x-8 gap-y-4 border-b border-hairline py-7 sm:grid-cols-[1fr_auto] sm:items-start">
                    <div>
                      <h3 className="text-[20px] leading-tight tracking-tight text-ink sm:text-[24px]">
                        {role.title}
                      </h3>
                      {role.description && (
                        <p className="mt-3 line-clamp-2 max-w-[560px] text-[16px] leading-[1.55] text-grey">
                          {role.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:gap-4">
                      <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-grey-2">
                        {jobMeta(role)}
                      </p>
                      <GhostLink href={`/careers/${role.slug}`}>View role</GhostLink>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal delay={0.1} className="mt-12">
            <p className="text-[16px] leading-[1.55] text-grey">
              Do not see your role? Tell us what you would build.{" "}
              <GhostLink
                href="mailto:hello@71labs.xyz"
                external
                className="align-baseline"
              >
                hello@71labs.xyz
              </GhostLink>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Close CTA */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 sm:pb-32 lg:px-12">
        <Reveal>
          <div className="surface-cream rounded-lg px-8 py-16 sm:px-16 sm:py-24">
            <h2 className="ed-heading max-w-[15ch] text-ink">Build with us.</h2>
            <p className="mt-6 max-w-[440px] text-[17px] leading-[1.6] text-grey">
              If the work sounds like yours, start a conversation. We read every
              note that comes in.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <OutlineButton href="mailto:hello@71labs.xyz" external>
                hello@71labs.xyz
              </OutlineButton>
              <GhostLink href="/studio">About the studio</GhostLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
