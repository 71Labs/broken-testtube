import { getMyProfile, getProjects, getTasks } from "@/lib/panel/data";
import { STATUS_META } from "@/lib/panel/types";
import { PageHeader } from "../../_components/page-header";
import { NewProject } from "../../_components/new-project";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const [profile, projects, tasks] = await Promise.all([
    getMyProfile(),
    getProjects(),
    getTasks(),
  ]);
  if (!profile) return null;
  const isAdmin = profile.role === "admin";

  return (
    <>
      <PageHeader title="Projects" subtitle="Work grouped by product.">
        {isAdmin && <NewProject />}
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const pt = tasks.filter((t) => t.project_id === p.id);
          const done = pt.filter((t) => t.status === "done").length;
          const pct = pt.length ? Math.round((done / pt.length) * 100) : 0;
          return (
            <div key={p.id} className="rounded-2xl border border-neutral-200 bg-white p-5">
              <div className="flex items-center gap-2.5">
                <span className="h-3 w-3 rounded-full" style={{ background: p.color }} />
                <span className="font-wordmark text-lg font-medium tracking-tight text-neutral-950">{p.name}</span>
              </div>
              <p className="mt-4 text-3xl font-medium tracking-tight text-neutral-950">
                {pt.length}
                <span className="ml-1 text-sm text-neutral-400">tasks</span>
              </p>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: p.color }} />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-400">
                <span>{pct}% done</span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_META.in_progress.dot }} />
                  {pt.filter((t) => t.status === "in_progress").length} active
                </span>
              </div>
            </div>
          );
        })}
        {projects.length === 0 && (
          <p className="text-sm text-neutral-400">No projects yet.</p>
        )}
      </div>
    </>
  );
}
