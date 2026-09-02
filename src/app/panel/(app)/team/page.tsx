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
        subtitle={
          isAdmin
            ? "Manage who's an admin and who's a worker."
            : "Everyone building at 71Labs."
        }
      />

      <div className="overflow-hidden rounded-xl border border-hairline">
        <div className="hidden grid-cols-[2fr_1fr_0.8fr_0.8fr] gap-4 border-b border-hairline bg-fog px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-grey-2 sm:grid">
          <span>Name</span>
          <span>Title</span>
          <span>Open tasks</span>
          <span>Role</span>
        </div>
        {team.map((m) => {
          const open = tasks.filter(
            (t) => t.assignee_id === m.id && t.status !== "done",
          ).length;
          return (
            <div
              key={m.id}
              className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-hairline px-5 py-3.5 transition-colors duration-150 last:border-0 hover:bg-fog/50 sm:grid-cols-[2fr_1fr_0.8fr_0.8fr]"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-medium text-white">
                  {initials(m.full_name)}
                </span>
                <span className="truncate text-sm font-medium text-ink">
                  {m.full_name}
                  {m.id === profile.id && (
                    <span className="ml-1.5 text-xs text-grey-2">(you)</span>
                  )}
                </span>
              </span>
              <span className="hidden text-sm text-grey sm:block">
                {m.title ?? "—"}
              </span>
              <span className="hidden font-mono text-sm tabular-nums text-ink-2 sm:block">
                {open}
              </span>
              <span>
                {isAdmin && m.id !== profile.id ? (
                  <RoleSelect id={m.id} role={m.role} />
                ) : (
                  <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-grey">
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
