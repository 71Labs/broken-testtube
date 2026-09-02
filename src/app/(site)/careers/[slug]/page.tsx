import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { OutlineButton, GhostLink, Caption } from "@/components/site/ui";
import { getOpenJob } from "@/lib/panel/data";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const job = await getOpenJob(slug);
  return { title: job ? `${job.title} · Careers` : "Careers" };
}

export default async function JobPage({ params }: Params) {
  const { slug } = await params;
  const job = await getOpenJob(slug);
  if (!job) notFound();

  const meta = [job.department?.name, job.location, job.employment_type]
    .filter(Boolean)
    .join(" · ");
  const mailto = `mailto:hello@71labs.xyz?subject=${encodeURIComponent(
    `Application: ${job.title}`,
  )}`;

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
      <div className="max-w-[760px]">
        <Reveal>
          <GhostLink href="/careers">Careers</GhostLink>
        </Reveal>

        <Reveal delay={0.04}>
          <div className="mt-8">
            <Caption>{job.department?.name ?? "Open role"}</Caption>
          </div>
        </Reveal>
        <Reveal as="h1" delay={0.08} className="ed-heading mt-5 text-ink">
          {job.title}
        </Reveal>
        <Reveal
          as="p"
          delay={0.12}
          className="mt-5 text-[13px] font-medium uppercase tracking-[0.14em] text-grey-2"
        >
          {meta}
        </Reveal>

        {job.description && (
          <Reveal delay={0.16}>
            <div className="mt-10 border-t border-hairline pt-10">
              <p className="max-w-[640px] whitespace-pre-line text-[17px] leading-[1.7] text-grey">
                {job.description}
              </p>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <OutlineButton href={mailto} external>
              Apply for this role
            </OutlineButton>
            <GhostLink href="/careers">See all roles</GhostLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
