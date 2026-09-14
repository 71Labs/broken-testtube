import Link from "next/link";
import { getDepartments, getJobs, getMyProfile } from "@/lib/panel/data";
import { JOB_STATUS_META } from "@/lib/panel/types";
import { PageHeader } from "../../_components/page-header";
import { NewJob } from "../../_components/new-job";
import { JobRow } from "../../_components/job-actions";
import { EmptyState } from "../../_components/ui/empty-state";
import { Briefcase01Icon, Icon, Location01Icon } from "../../_components/ui/icons";

export const metadata = { title: "Careers" };

export default async function JobsPage() {
  const [profile, jobs, departments] = await Promise.all([
    getMyProfile(),
    getJobs(),
    getDepartments(),
  ]);
  if (!profile) return null;
  const isAdmin = profile.role === "admin";

  return (
    <>
      <PageHeader
        title="Careers"
        subtitle={
          isAdmin
            ? "Open roles here to publish them on the public careers page."
            : "Roles the studio is hiring for."
        }
      >
        {isAdmin && <NewJob departments={departments} />}
      </PageHeader>

      {jobs.length === 0 ? (
        <EmptyState
          icon={<Icon icon={Briefcase01Icon} size={24} />}
          title="No roles yet"
          hint={isAdmin ? "Open your first one to start hiring — it publishes to the public careers page." : "The studio isn't hiring for anything right now. Check back soon."}
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-hairline">
          {jobs.map((j) => {
            const meta = JOB_STATUS_META[j.status];
            return (
              <JobRow key={j.id} id={j.id} status={j.status} title={j.title} isAdmin={isAdmin}>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: meta.dot }}
                    />
                    <p className="truncate text-sm font-medium text-ink">{j.title}</p>
                    {j.status === "open" && (
                      <Link
                        href={`/careers/${j.slug}`}
                        target="_blank"
                        className="rounded text-xs text-grey underline-offset-2 outline-none transition-colors hover:text-ink hover:underline focus-visible:ring-2 focus-visible:ring-ink/10"
                      >
                        View
                      </Link>
                    )}
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 pl-4 text-xs text-grey">
                    {j.department?.name && (
                      <span className="inline-flex items-center gap-1">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: j.department.color }}
                        />
                        {j.department.name}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Icon icon={Location01Icon} size={12} className="text-grey-2" />
                      {j.location}
                    </span>
                    <span className="text-grey-2">·</span>
                    <span>{j.employment_type}</span>
                  </p>
                </div>
              </JobRow>
            );
          })}
        </div>
      )}
    </>
  );
}
