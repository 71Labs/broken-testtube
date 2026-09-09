import { getLeads, getMyProfile, getTeam } from "@/lib/panel/data";
import { LEAD_STAGES, LEAD_STAGE_META, LEAD_TYPE_META } from "@/lib/panel/types";
import { PageHeader } from "../../_components/page-header";
import { NewLead } from "../../_components/pipeline-modals";
import { LeadActions } from "../../_components/pipeline-actions";
import { StageGroups, PipelineEmpty } from "../../_components/stage-groups";
import { Icon, Target01Icon } from "../../_components/ui/icons";

export const metadata = { title: "Leads" };

export default async function LeadsPage() {
  const [profile, leads, team] = await Promise.all([
    getMyProfile(),
    getLeads(),
    getTeam(),
  ]);
  if (!profile) return null;

  return (
    <>
      <PageHeader
        title="Leads"
        subtitle="The outbound pipeline — clients, grants, partnerships, and hackathons you're pursuing."
      >
        <NewLead team={team} />
      </PageHeader>

      {leads.length === 0 ? (
        <PipelineEmpty>
          <Icon icon={Target01Icon} size={24} className="text-grey-2" />
          <p className="text-sm text-grey-2">
            No leads yet. Add an opportunity to start the pipeline.
          </p>
        </PipelineEmpty>
      ) : (
        <StageGroups
          stages={LEAD_STAGES}
          meta={LEAD_STAGE_META}
          items={leads}
          getStage={(l) => l.stage}
          renderCard={(l) => (
            <div
              key={l.id}
              className="flex flex-col gap-3 px-5 py-4 transition-colors duration-150 hover:bg-fog/50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <span className="flex items-center gap-2">
                  <p className="text-sm font-medium text-ink">{l.name}</p>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-grey">
                    {LEAD_TYPE_META[l.type]}
                  </span>
                </span>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-grey-2">
                  <span>{l.owner?.full_name ? `Owner · ${l.owner.full_name}` : "No owner"}</span>
                  {l.value_note && (
                    <>
                      <span>·</span>
                      <span className="text-grey">{l.value_note}</span>
                    </>
                  )}
                  {l.next_action && (
                    <>
                      <span>·</span>
                      <span className="text-ink-2">Next: {l.next_action}</span>
                    </>
                  )}
                </p>
              </div>
              <LeadActions id={l.id} stage={l.stage} />
            </div>
          )}
        />
      )}
    </>
  );
}
