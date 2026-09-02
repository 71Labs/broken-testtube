import { getDepartments, getMyProfile, getTeam } from "@/lib/panel/data";
import { initials, type Department, type Profile } from "@/lib/panel/types";
import { PageHeader } from "../../_components/page-header";
import { NewDepartment } from "../../_components/new-department";
import { DepartmentSelect, ManagerSelect, LeadSelect } from "../../_components/org-selects";

export const metadata = { title: "Organization" };

export default async function OrgPage() {
  const [profile, departments, team] = await Promise.all([
    getMyProfile(),
    getDepartments(),
    getTeam(),
  ]);
  if (!profile) return null;
  const isAdmin = profile.role === "admin";

  const inDept = (id: string) => team.filter((m) => m.department_id === id);
  const unassigned = team.filter((m) => !m.department_id);

  return (
    <>
      <PageHeader
        title="Organization"
        subtitle={
          isAdmin
            ? "Departments, leads, and reporting lines. Assign people to teams and managers."
            : "How 71Labs is organized: departments, leads, and reporting lines."
        }
      >
        {isAdmin && <NewDepartment />}
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {departments.map((d) => (
          <div key={d.id} className="rounded-2xl border border-neutral-200 bg-white p-5">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
              <span className="text-sm font-medium text-neutral-900">{d.name}</span>
            </span>
            <p className="mt-3 text-3xl font-medium tracking-tight text-neutral-950">
              {inDept(d.id).length}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-400">
              {inDept(d.id).length === 1 ? "person" : "people"}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 space-y-6">
        {departments.map((d) => (
          <DeptSection
            key={d.id}
            name={d.name}
            color={d.color}
            description={d.description}
            leadName={d.lead?.full_name ?? null}
            leadNode={
              isAdmin ? (
                <LeadSelect departmentId={d.id} value={d.lead_id} members={inDept(d.id)} />
              ) : null
            }
            members={inDept(d.id)}
            isAdmin={isAdmin}
            departments={departments}
            team={team}
          />
        ))}

        {unassigned.length > 0 && (
          <DeptSection
            name="Unassigned"
            color="#d4d4d8"
            description="Not yet placed in a department."
            leadName={null}
            leadNode={null}
            members={unassigned}
            isAdmin={isAdmin}
            departments={departments}
            team={team}
          />
        )}
      </div>
    </>
  );
}

function DeptSection({
  name,
  color,
  description,
  leadName,
  leadNode,
  members,
  isAdmin,
  departments,
  team,
}: {
  name: string;
  color: string;
  description: string | null;
  leadName: string | null;
  leadNode: React.ReactNode;
  members: Profile[];
  isAdmin: boolean;
  departments: Department[];
  team: Profile[];
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-neutral-200">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 bg-neutral-50 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="h-3 w-3 rounded-full" style={{ background: color }} />
          <div>
            <p className="text-sm font-medium text-neutral-900">{name}</p>
            {description && <p className="text-xs text-neutral-500">{description}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span className="font-mono uppercase tracking-[0.12em] text-neutral-400">Lead</span>
          {leadNode ?? <span className="text-neutral-700">{leadName ?? "—"}</span>}
        </div>
      </div>

      {members.length === 0 ? (
        <p className="px-5 py-6 text-center text-xs text-neutral-400">No one here yet.</p>
      ) : (
        <div className="divide-y divide-neutral-100">
          {members.map((m) => (
            <div key={m.id} className="grid grid-cols-1 gap-3 px-5 py-3.5 sm:grid-cols-[1.4fr_1fr_auto] sm:items-center">
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-medium text-white">
                  {initials(m.full_name)}
                </span>
                <span>
                  <span className="block text-sm font-medium text-neutral-900">{m.full_name}</span>
                  <span className="block text-xs text-neutral-500">{m.title ?? "—"}</span>
                </span>
              </span>

              <span className="text-xs text-neutral-500">
                {m.manager?.full_name ? (
                  <>Reports to <span className="text-neutral-800">{m.manager.full_name}</span></>
                ) : (
                  <span className="text-neutral-400">No manager</span>
                )}
              </span>

              {isAdmin ? (
                <span className="flex flex-wrap items-center gap-2">
                  <DepartmentSelect profileId={m.id} value={m.department_id} departments={departments} />
                  <ManagerSelect profileId={m.id} value={m.manager_id} people={team} />
                </span>
              ) : (
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500">
                  {m.role}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
