import { getMyProfile, getProductPipeline, getTeam } from "@/lib/panel/data";
import { PRODUCT_STAGES, PRODUCT_STAGE_META } from "@/lib/panel/types";
import { PageHeader } from "../../_components/page-header";
import { NewProduct } from "../../_components/pipeline-modals";
import { PipelineRow } from "../../_components/pipeline-actions";
import { StageGroups, PipelineEmpty } from "../../_components/stage-groups";
import { Icon, Rocket01Icon } from "../../_components/ui/icons";

export const metadata = { title: "Products" };

export default async function ProductsPage() {
  const [profile, products, team] = await Promise.all([
    getMyProfile(),
    getProductPipeline(),
    getTeam(),
  ]);
  if (!profile) return null;

  return (
    <>
      <PageHeader
        title="Products"
        subtitle="Bets moving through the stage-gates — idea to scale, spin-out, or kill."
      >
        <NewProduct team={team} />
      </PageHeader>

      {products.length === 0 ? (
        <PipelineEmpty>
          <Icon icon={Rocket01Icon} size={24} className="text-grey-2" />
          <p className="text-sm text-grey-2">
            No products yet. Add your first bet to start the pipeline.
          </p>
        </PipelineEmpty>
      ) : (
        <StageGroups
          stages={PRODUCT_STAGES}
          meta={PRODUCT_STAGE_META}
          items={products}
          getStage={(p) => p.stage}
          renderCard={(p) => (
            <PipelineRow key={p.id} kind="product" id={p.id} stage={p.stage} name={p.name}>
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">{p.name}</p>
                {p.description && (
                  <p className="mt-0.5 line-clamp-1 text-xs text-grey">{p.description}</p>
                )}
                <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-grey-2">
                  <span>{p.owner?.full_name ? `Owner · ${p.owner.full_name}` : "No owner"}</span>
                  {p.roi_note && (
                    <>
                      <span>·</span>
                      <span className="text-grey">{p.roi_note}</span>
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
