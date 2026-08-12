import { getMyProfile, getTasks, getTeam } from "@/lib/panel/data";
import { initials } from "@/lib/panel/types";
import { PageHeader } from "../../_components/page-header";
import { RoleSelect } from "../../_components/role-select";

export const metadata = { title: "Team" };

export default async function TeamPage() {
  const [profile, team, tasks] = await Promise.all([
    getMyProfile(),
    getTeam(),
    getTasks(),
  ]);
  if (!profile) return null;
  const isAdmin = profile.role === "admin";

  return (
    <>
      <PageHeader
        title="Team"
        subtitle={isAdmin ? "Manage who's an admin and who's a worker." : "Everyone building at 71Labs."}
      />

      <div className="overflow-hidden rounded-2xl border border-neutral-200">
        <div className="hidden grid-cols-[2fr_1fr_0.8fr_0.8fr] gap-4 border-b border-neutral-200 bg-neutral-50 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-400 sm:grid">
          <span>Name</span>
          <span>Title</span>
          <span>Open tasks</span>
          <span>Role</span>
        </div>
        {team.map((m) => {
          const open = tasks.filter((t) => t.assignee_id === m.id && t.status !== "done").length;
          return (
            <div
              key={m.id}
              className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-neutral-100 px-5 py-3.5 last:border-0 sm:grid-cols-[2fr_1fr_0.8fr_0.8fr]"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-medium text-white">
                  {initials(m.full_name)}
                </span>
                <span className="text-sm font-medium text-neutral-900">
                  {m.full_name}
                  {m.id === profile.id && <span className="ml-1.5 text-xs text-neutral-400">(you)</span>}
                </span>
              </span>
              <span className="hidden text-sm text-neutral-500 sm:block">{m.title ?? "—"}</span>
              <span className="hidden font-mono text-sm text-neutral-700 sm:block">{open}</span>
              <span>
                {isAdmin && m.id !== profile.id ? (
                  <RoleSelect id={m.id} role={m.role} />
                ) : (
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                    {m.role}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
