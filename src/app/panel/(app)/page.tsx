import { getActivity, getMyProfile, getProjects, getTasks, getTeam } from "@/lib/panel/data";
import { STATUS_META, initials } from "@/lib/panel/types";
import { PageHeader } from "../_components/page-header";
import { NewTask } from "../_components/new-task";
import { TaskBoard } from "../_components/task-board";

export const metadata = { title: "Overview" };

function timeAgo(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default async function OverviewPage() {
  const [profile, tasks, projects, team, activity] = await Promise.all([
    getMyProfile(),
    getTasks(),
    getProjects(),
    getTeam(),
    getActivity(),
  ]);
  if (!profile) return null;
  const isAdmin = profile.role === "admin";

  const mine = tasks.filter((t) => t.assignee_id === profile.id && t.status !== "done");
  const stats = [
    { label: "Open tasks", value: tasks.filter((t) => t.status !== "done").length },
    { label: "In progress", value: tasks.filter((t) => t.status === "in_progress").length },
    { label: "Done", value: tasks.filter((t) => t.status === "done").length },
    { label: "Assigned to you", value: mine.length },
  ];

  return (
    <>
      <PageHeader
        title={`Welcome back, ${profile.full_name.split(" ")[0]}`}
        subtitle={isAdmin ? "You're an admin. Assign work and keep things moving." : "Here's what's on your plate."}
      >
        <NewTask projects={projects} team={team} isAdmin={isAdmin} />
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-neutral-200 bg-white p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">{s.label}</p>
            <p className="mt-2 text-3xl font-medium tracking-tight text-neutral-950">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <section>
          <h2 className="mb-4 text-sm font-medium text-neutral-900">Your board</h2>
          <TaskBoard tasks={mine.length ? mine : tasks.slice(0, 9)} team={team} isAdmin={isAdmin} myId={profile.id} />
        </section>

        <section>
          <h2 className="mb-4 text-sm font-medium text-neutral-900">Recent activity</h2>
          <div className="rounded-2xl border border-neutral-200 bg-white">
            {activity.length === 0 && (
              <p className="px-4 py-8 text-center text-xs text-neutral-400">No activity yet.</p>
            )}
            {activity.map((a) => (
              <div key={a.id} className="flex items-start gap-3 border-b border-neutral-100 px-4 py-3 last:border-0">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-[9px] font-medium text-white">
                  {initials(a.actor?.full_name ?? "—")}
                </span>
                <p className="text-xs text-neutral-600">
                  <span className="font-medium text-neutral-900">{a.actor?.full_name ?? "Someone"}</span>{" "}
                  {a.message}
                  <span className="mt-0.5 block font-mono text-[10px] text-neutral-400">{timeAgo(a.created_at)}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <p className="mt-8 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-400">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_META.done.dot }} />
        {team.length} teammates · {projects.length} projects
      </p>
    </>
  );
}
