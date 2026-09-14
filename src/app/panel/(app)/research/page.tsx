import { getMyProfile, getResearch, getTeam } from "@/lib/panel/data";
import { RESEARCH_STAGES, RESEARCH_STAGE_META } from "@/lib/panel/types";
import { PageHeader } from "../../_components/page-header";
import { NewResearch } from "../../_components/pipeline-modals";
import { PipelineRow } from "../../_components/pipeline-actions";
import { StageGroups, PipelineEmpty } from "../../_components/stage-groups";
import { Icon, TestTube01Icon } from "../../_components/ui/icons";

export const metadata = { title: "Research" };

export default async function ResearchPage() {
  const [profile, research, team] = await Promise.all([
    getMyProfile(),
    getResearch(),
    getTeam(),
  ]);
  if (!profile) return null;

  return (
    <>
      <PageHeader
        title="Research"
        subtitle="Question → Experiment → Findings → Documented → Applied. Every cycle ends in a decision."
      >
        <NewResearch team={team} />
      </PageHeader>

      {research.length === 0 ? (
        <PipelineEmpty>
          <Icon icon={TestTube01Icon} size={24} className="text-grey-2" />
          <p className="text-sm text-grey-2">
            No research yet. Log a question you want answered.
          </p>
        </PipelineEmpty>
      ) : (
        <StageGroups
          stages={RESEARCH_STAGES}
          meta={RESEARCH_STAGE_META}
          items={research}
          getStage={(r) => r.stage}
          renderCard={(r) => (
            <PipelineRow key={r.id} kind="research" id={r.id} stage={r.stage} name={r.title}>
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">{r.title}</p>
                {r.notes && (
                  <p className="mt-0.5 line-clamp-1 text-xs text-grey">{r.notes}</p>
                )}
                <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-grey-2">
                  <span>{r.owner?.full_name ? `Owner · ${r.owner.full_name}` : "No owner"}</span>
                  {r.outcome && (
                    <>
                      <span>·</span>
                      <span className="text-grey">{r.outcome}</span>
                    </>
                  )}
                </p>
              </div>
            </PipelineRow>
          )}
        />
      )}
    </>
  );
}
