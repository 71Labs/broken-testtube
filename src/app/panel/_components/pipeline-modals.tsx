"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "./ui/toast";
import { createLead, createProduct, createResearch } from "../actions";
import {
  LEAD_STAGES, LEAD_STAGE_META, LEAD_TYPES, LEAD_TYPE_META,
  PRODUCT_STAGES, PRODUCT_STAGE_META, RESEARCH_STAGES, RESEARCH_STAGE_META,
  type Profile,
} from "@/lib/panel/types";
import { Button } from "./ui/button";
import { Field, Select, type Option } from "./ui/select";
import { Add01Icon, Cancel01Icon, Icon } from "./ui/icons";

const inputCls =
  "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink placeholder:text-grey-2 outline-none transition-[border-color,box-shadow] duration-150 focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/10";

type Action = (prev: unknown, fd: FormData) => Promise<{ ok?: boolean; error?: string } | null>;

function Modal({
  triggerLabel,
  title,
  description,
  action,
  success,
  children,
}: {
  triggerLabel: string;
  title: string;
  description: string;
  action: Action;
  success: string;
  children: (firstRef: React.RefObject<HTMLInputElement | null>) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(action, null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.ok) {
      setOpen(false);
      formRef.current?.reset();
      toast.success(success);
      router.refresh();
    }
  }, [state, router, success]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger render={<Button icon={Add01Icon}>{triggerLabel}</Button>} />
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-ink/30 backdrop-blur-[2px]",
            "motion-safe:transition-opacity motion-safe:duration-200",
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
          )}
        />
        <Dialog.Popup
          initialFocus={firstRef}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto",
            "rounded-2xl border border-hairline bg-white p-6 shadow-[0_24px_60px_-12px_rgba(26,26,26,0.28)] outline-none",
            "origin-center motion-safe:transition-[transform,opacity] motion-safe:duration-200",
            "data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0",
          )}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-lg font-medium tracking-tight text-ink">
                {title}
              </Dialog.Title>
              <Dialog.Description className="mt-0.5 text-sm text-grey">
                {description}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-grey outline-none transition-colors hover:bg-secondary hover:text-ink focus-visible:ring-2 focus-visible:ring-ink/10"
            >
              <Icon icon={Cancel01Icon} size={17} />
            </Dialog.Close>
          </div>

          <form ref={formRef} action={formAction} className="space-y-4">
            {children(firstRef)}
            {state?.error && (
              <p role="alert" className="text-xs text-red-600">
                {state.error}
              </p>
            )}
            <div className="flex items-center justify-end gap-2 border-t border-hairline pt-4">
              <Dialog.Close render={<Button type="button" variant="ghost">Cancel</Button>} />
              <Button type="submit" icon={Add01Icon} disabled={pending}>
                {pending ? "Saving…" : "Save"}
              </Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ownerItems(team: Profile[]): Option[] {
  return [{ value: "", label: "Unassigned" }, ...team.map((m) => ({ value: m.id, label: m.full_name }))];
}

export function NewProduct({ team }: { team: Profile[] }) {
  const stages: Option[] = PRODUCT_STAGES.map((s) => ({ value: s, label: PRODUCT_STAGE_META[s].label }));
  return (
    <Modal triggerLabel="New product" title="New product" description="A bet moving through the pipeline." action={createProduct} success="Product added">
      {(firstRef) => (
        <>
          <input ref={firstRef} name="name" required aria-label="Product name" placeholder="Product name" className={cn(inputCls, "text-[15px] font-medium")} />
          <textarea name="description" rows={2} aria-label="Description" placeholder="What it is, who it's for (optional)" className={cn(inputCls, "resize-none")} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Owner"><Select name="owner_id" items={ownerItems(team)} ariaLabel="Owner" /></Field>
            <Field label="Stage"><Select name="stage" items={stages} defaultValue="idea" ariaLabel="Stage" /></Field>
          </div>
          <Field label="ROI target / note">
            <input name="roi_note" aria-label="ROI note" placeholder="e.g. $5k MRR by Dec, or grant target" className={inputCls} />
          </Field>
        </>
      )}
    </Modal>
  );
}

export function NewResearch({ team }: { team: Profile[] }) {
  const stages: Option[] = RESEARCH_STAGES.map((s) => ({ value: s, label: RESEARCH_STAGE_META[s].label }));
  return (
    <Modal triggerLabel="New research" title="New research" description="Question → Experiment → Findings → Applied." action={createResearch} success="Research question added">
      {(firstRef) => (
        <>
          <input ref={firstRef} name="title" required aria-label="Research question" placeholder="The question you're answering" className={cn(inputCls, "text-[15px] font-medium")} />
          <textarea name="notes" rows={3} aria-label="Notes" placeholder="Experiment, notes, findings so far (optional)" className={cn(inputCls, "resize-y")} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Owner"><Select name="owner_id" items={ownerItems(team)} ariaLabel="Owner" /></Field>
            <Field label="Stage"><Select name="stage" items={stages} defaultValue="question" ariaLabel="Stage" /></Field>
          </div>
          <Field label="Outcome / application">
            <input name="outcome" aria-label="Outcome" placeholder="e.g. becomes a product, a capability, or 'don't pursue'" className={inputCls} />
          </Field>
        </>
      )}
    </Modal>
  );
}

export function NewLead({ team }: { team: Profile[] }) {
  const stages: Option[] = LEAD_STAGES.map((s) => ({ value: s, label: LEAD_STAGE_META[s].label }));
  const types: Option[] = LEAD_TYPES.map((t) => ({ value: t, label: LEAD_TYPE_META[t] }));
  return (
    <Modal triggerLabel="New lead" title="New lead" description="An opportunity to pursue." action={createLead} success="Lead added">
      {(firstRef) => (
        <>
          <input ref={firstRef} name="name" required aria-label="Name" placeholder="Org or person" className={cn(inputCls, "text-[15px] font-medium")} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Type"><Select name="type" items={types} defaultValue="client" ariaLabel="Type" /></Field>
            <Field label="Owner"><Select name="owner_id" items={ownerItems(team)} ariaLabel="Owner" /></Field>
            <Field label="Stage"><Select name="stage" items={stages} defaultValue="identified" ariaLabel="Stage" /></Field>
            <Field label="Value / note">
              <input name="value_note" aria-label="Value note" placeholder="e.g. $10k, grant size" className={inputCls} />
            </Field>
          </div>
          <Field label="Next action">
            <input name="next_action" aria-label="Next action" placeholder="e.g. send tailored pitch by Fri" className={inputCls} />
          </Field>
        </>
      )}
    </Modal>
  );
}
