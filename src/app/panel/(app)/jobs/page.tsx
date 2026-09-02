import Link from "next/link";
import { getDepartments, getJobs, getMyProfile } from "@/lib/panel/data";
import { JOB_STATUS_META } from "@/lib/panel/types";
import { PageHeader } from "../../_components/page-header";
import { NewJob } from "../../_components/new-job";
import { JobActions } from "../../_components/job-actions";
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
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-hairline py-16 text-center">
          <Icon icon={Briefcase01Icon} size={24} className="text-grey-2" />
          <p className="text-sm text-grey-2">
            No roles yet.{isAdmin ? " Open your first one to start hiring." : ""}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-hairline">
          {jobs.map((j) => {
            const meta = JOB_STATUS_META[j.status];
            return (
              <div
                key={j.id}
                className="flex flex-col gap-3 border-b border-hairline px-5 py-4 transition-colors duration-150 last:border-0 hover:bg-fog/50 sm:flex-row sm:items-center sm:justify-between"
              >
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

                {isAdmin ? (
                  <JobActions id={j.id} status={j.status} />
                ) : (
                  <span className="w-fit rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-grey">
                    {meta.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
