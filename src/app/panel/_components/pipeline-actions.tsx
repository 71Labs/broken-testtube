"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  deleteLead, deleteProduct, deleteResearch,
  setLeadStage, setProductStage, setResearchStage,
} from "../actions";
import {
  LEAD_STAGES, LEAD_STAGE_META, PRODUCT_STAGES, PRODUCT_STAGE_META,
  RESEARCH_STAGES, RESEARCH_STAGE_META,
  type LeadStage, type ProductStage, type ResearchStage,
} from "@/lib/panel/types";
import { Select, type Option } from "./ui/select";
import { Delete02Icon, Icon } from "./ui/icons";

function Row({
  id,
  value,
  stages,
  onStage,
  onDelete,
}: {
  id: string;
  value: string;
  stages: Option[];
  onStage: (id: string, stage: string) => Promise<unknown>;
  onDelete: (id: string) => Promise<unknown>;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const run = (fn: () => Promise<unknown>) =>
    start(async () => {
      await fn();
      router.refresh();
    });
  return (
    <div className={pending ? "flex items-center gap-2 opacity-60" : "flex items-center gap-2"}>
      <div className="w-36">
        <Select
          size="sm"
          value={value}
          ariaLabel="Stage"
          items={stages}
          onValueChange={(v) => run(() => onStage(id, v))}
        />
      </div>
      <button
        onClick={() => run(() => onDelete(id))}
        aria-label="Delete"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-grey-2 outline-none transition-colors hover:bg-red-50 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-ink/10"
      >
        <Icon icon={Delete02Icon} size={15} />
      </button>
    </div>
  );
}

const productItems: Option[] = PRODUCT_STAGES.map((s) => ({ value: s, label: PRODUCT_STAGE_META[s].label }));
const researchItems: Option[] = RESEARCH_STAGES.map((s) => ({ value: s, label: RESEARCH_STAGE_META[s].label }));
const leadItems: Option[] = LEAD_STAGES.map((s) => ({ value: s, label: LEAD_STAGE_META[s].label }));

export function ProductActions({ id, stage }: { id: string; stage: ProductStage }) {
  return (
    <Row id={id} value={stage} stages={productItems}
      onStage={(i, s) => setProductStage(i, s as ProductStage)} onDelete={deleteProduct} />
  );
}
export function ResearchActions({ id, stage }: { id: string; stage: ResearchStage }) {
  return (
    <Row id={id} value={stage} stages={researchItems}
      onStage={(i, s) => setResearchStage(i, s as ResearchStage)} onDelete={deleteResearch} />
  );
}
export function LeadActions({ id, stage }: { id: string; stage: LeadStage }) {
  return (
    <Row id={id} value={stage} stages={leadItems}
      onStage={(i, s) => setLeadStage(i, s as LeadStage)} onDelete={deleteLead} />
  );
}
