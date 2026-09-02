import { getMyProfile, getTasks } from "@/lib/panel/data";
import { PRIORITY_META, STATUS_META, initials } from "@/lib/panel/types";
import { PageHeader } from "../../_components/page-header";
import { ProfileForm } from "../../_components/profile-form";
import { Icon, InboxIcon } from "../../_components/ui/icons";

export const metadata = { title: "Profile" };

export default async function ProfilePage() {
  const [profile, tasks] = await Promise.all([getMyProfile(), getTasks()]);
  if (!profile) return null;
  const mine = tasks.filter((t) => t.assignee_id === profile.id);

  return (
    <>
      <PageHeader title="Your profile" subtitle="Update how you show up across the panel." />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-lg font-medium text-white">
              {initials(profile.full_name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-lg font-medium text-ink">
                {profile.full_name}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-grey-2">
                {profile.role} · {profile.title ?? "no title"}
              </p>
            </div>
          </div>
          <ProfileForm profile={profile} />
        </div>

        <div>
          <h2 className="mb-4 text-sm font-medium text-ink">
            Your tasks{" "}
            <span className="tabular-nums text-grey-2">({mine.length})</span>
          </h2>
          <div className="overflow-hidden rounded-xl border border-hairline">
            {mine.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
                <Icon icon={InboxIcon} size={20} className="text-grey-2" />
                <p className="text-xs text-grey-2">Nothing assigned to you yet.</p>
              </div>
            ) : (
              mine.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-ink">{t.title}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-grey-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: STATUS_META[t.status].dot }}
                      />
                      {STATUS_META[t.status].label}
                      {t.project && <span>· {t.project.name}</span>}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${PRIORITY_META[t.priority].className}`}
                  >
                    {PRIORITY_META[t.priority].label}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
