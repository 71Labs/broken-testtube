"use client";

import { type ReactNode, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  deleteLead, deleteProduct, deleteResearch,
  setLeadStage, setProductStage, setResearchStage,
} from "../actions";
import {
  LEAD_STAGES, LEAD_STAGE_META, PRODUCT_STAGES, PRODUCT_STAGE_META,
  RESEARCH_STAGES, RESEARCH_STAGE_META,
} from "@/lib/panel/types";
import { runAction } from "./use-action";
import { toast } from "./ui/toast";
import { cn } from "@/lib/utils";
import { Select, type Option } from "./ui/select";
import { Delete02Icon, Icon } from "./ui/icons";

type Kind = "product" | "research" | "lead";
const UNDO_MS = 5000;

const KIND: Record<
  Kind,
  { items: Option[]; noun: string; setStage: (id: string, s: string) => Promise<unknown>; del: (id: string) => Promise<unknown> }
> = {
  product: {
    items: PRODUCT_STAGES.map((s) => ({ value: s, label: PRODUCT_STAGE_META[s].label })),
    noun: "Product",
    setStage: (id, s) => setProductStage(id, s as never),
    del: deleteProduct,
  },
  research: {
    items: RESEARCH_STAGES.map((s) => ({ value: s, label: RESEARCH_STAGE_META[s].label })),
    noun: "Research",
    setStage: (id, s) => setResearchStage(id, s as never),
    del: deleteResearch,
  },
  lead: {
    items: LEAD_STAGES.map((s) => ({ value: s, label: LEAD_STAGE_META[s].label })),
    noun: "Lead",
    setStage: (id, s) => setLeadStage(id, s as never),
    del: deleteLead,
  },
};

/**
 * A pipeline row: server-rendered content as children, with a client stage
 * picker + delete-with-undo. Hides itself optimistically on delete so the
 * undo toast reads true; the server call is deferred until the window closes.
 */
export function PipelineRow({
  kind,
  id,
  stage,
  name,
  children,
}: {
  kind: Kind;
  id: string;
  stage: string;
  name: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const cfg = KIND[kind];
  const [pending, setPending] = useState(false);
  const [removed, setRemoved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (removed) return null;

  const changeStage = async (s: string) => {
    setPending(true);
    const ok = await runAction(() => cfg.setStage(id, s), { error: `Couldn't update ${cfg.noun.toLowerCase()}` });
    setPending(false);
    if (ok) router.refresh();
  };

  const remove = () => {
    setRemoved(true);
    timer.current = setTimeout(async () => {
      timer.current = null;
      const ok = await runAction(() => cfg.del(id), { error: `Couldn't delete ${cfg.noun.toLowerCase()}` });
      if (ok) router.refresh();
      else setRemoved(false);
    }, UNDO_MS);
    toast(`${cfg.noun} deleted`, {
      description: name,
      duration: UNDO_MS,
      action: {
        label: "Undo",
        onClick: () => {
          if (timer.current) clearTimeout(timer.current);
          timer.current = null;
          setRemoved(false);
        },
      },
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 px-5 py-4 transition-[background-color,opacity] duration-150 hover:bg-fog/50 sm:flex-row sm:items-center sm:justify-between",
        pending && "opacity-60",
      )}
    >
      {children}
      <div className="flex items-center gap-2">
        <div className="w-36">
          <Select size="sm" value={stage} ariaLabel="Stage" items={cfg.items} onValueChange={changeStage} />
        </div>
        <button
          onClick={remove}
          aria-label={`Delete ${cfg.noun.toLowerCase()}: ${name}`}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-grey-2 outline-none transition-colors hover:bg-red-50 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-ink/10"
        >
          <Icon icon={Delete02Icon} size={15} />
        </button>
      </div>
    </div>
  );
}
