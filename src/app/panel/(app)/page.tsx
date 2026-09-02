import { getActivity, getMyProfile, getProjects, getTasks, getTeam } from "@/lib/panel/data";
import { STATUS_META, initials } from "@/lib/panel/types";
import { PageHeader } from "../_components/page-header";
import { NewTask } from "../_components/new-task";
import { TaskBoard } from "../_components/task-board";
import {
  CheckmarkCircle02Icon,
  Clock01Icon,
  Icon,
  InboxIcon,
  SentIcon,
  Task01Icon,
  type HugeIcon,
} from "../_components/ui/icons";

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
  const stats: { label: string; value: number; icon: HugeIcon }[] = [
    { label: "Open tasks", value: tasks.filter((t) => t.status !== "done").length, icon: Task01Icon },
    { label: "In progress", value: tasks.filter((t) => t.status === "in_progress").length, icon: Clock01Icon },
    { label: "Done", value: tasks.filter((t) => t.status === "done").length, icon: CheckmarkCircle02Icon },
    { label: "Assigned to you", value: mine.length, icon: SentIcon },
  ];

  return (
    <>
      <PageHeader
        title={`Welcome back, ${profile.full_name.split(" ")[0]}`}
        subtitle={
          isAdmin
            ? "You're an admin. Assign work and keep things moving."
            : "Here's what's on your plate."
        }
      >
        <NewTask projects={projects} team={team} isAdmin={isAdmin} />
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-hairline bg-white p-5 transition-colors duration-150 hover:border-ink/15"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-grey-2">
                {s.label}
              </p>
              <Icon icon={s.icon} size={16} className="text-grey-2" />
            </div>
            <p className="mt-3 text-3xl font-medium tracking-tight tabular-nums text-ink">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <section>
          <h2 className="mb-4 text-sm font-medium text-ink">Your board</h2>
          <TaskBoard
            tasks={mine.length ? mine : tasks.slice(0, 9)}
            team={team}
            isAdmin={isAdmin}
            myId={profile.id}
          />
        </section>

        <section>
          <h2 className="mb-4 text-sm font-medium text-ink">Recent activity</h2>
          <div className="overflow-hidden rounded-xl border border-hairline bg-white">
            {activity.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
                <Icon icon={InboxIcon} size={20} className="text-grey-2" />
                <p className="text-xs text-grey-2">
                  No activity yet. Create a task to get started.
                </p>
              </div>
            ) : (
              activity.map((a) => (
                <div
                  key={a.id}
                  className="flex items-start gap-3 border-b border-hairline px-4 py-3 last:border-0"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-[9px] font-medium text-white">
                    {initials(a.actor?.full_name ?? "—")}
                  </span>
                  <p className="text-xs text-grey">
                    <span className="font-medium text-ink">
                      {a.actor?.full_name ?? "Someone"}
                    </span>{" "}
                    {a.message}
                    <span className="mt-0.5 block font-mono text-[10px] tabular-nums text-grey-2">
                      {timeAgo(a.created_at)}
                    </span>
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <p className="mt-8 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-grey-2">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: STATUS_META.done.dot }}
        />
        <span className="tabular-nums">{team.length}</span> teammates ·{" "}
        <span className="tabular-nums">{projects.length}</span> projects
      </p>
    </>
  );
}
