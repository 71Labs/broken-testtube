"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "../actions";
import { EMPLOYMENT_TYPES, type Department } from "@/lib/panel/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Field, Select, type Option } from "./ui/select";
import { Add01Icon, Cancel01Icon, Icon } from "./ui/icons";

const inputCls =
  "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink placeholder:text-grey-2 outline-none transition-[border-color,box-shadow] duration-150 focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/10";

export function NewJob({ departments }: { departments: Department[] }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(createJob, null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.ok) {
      setOpen(false);
      formRef.current?.reset();
      router.refresh();
    }
  }, [state, router]);

  const deptItems: Option[] = [
    { value: "", label: "No department" },
    ...departments.map((d) => ({ value: d.id, label: d.name })),
  ];
  const typeItems: Option[] = EMPLOYMENT_TYPES.map((t) => ({ value: t, label: t }));
  const statusItems: Option[] = [
    { value: "draft", label: "Draft — hidden" },
    { value: "open", label: "Open — live on /careers" },
    { value: "closed", label: "Closed" },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger render={<Button icon={Add01Icon}>Open a role</Button>} />

      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-ink/30 backdrop-blur-[2px]",
            "motion-safe:transition-opacity motion-safe:duration-200",
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
          )}
        />
        <Dialog.Popup
          initialFocus={titleRef}
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
                Open a role
              </Dialog.Title>
              <Dialog.Description className="mt-0.5 text-sm text-grey">
                Set it to “Open” to publish it on the public careers page.
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-grey outline-none transition-colors hover:bg-secondary hover:text-ink focus-visible:ring-2 focus-visible:ring-ink/10"
            >
              <Icon icon={Cancel01Icon} size={17} />
            </Dialog.Close>
          </div>

          <form ref={formRef} action={action} className="space-y-4">
            <input
              ref={titleRef}
              name="title"
              required
              aria-label="Role title"
              placeholder="Role title — e.g. Founding Mobile Engineer"
              className={cn(inputCls, "text-[15px] font-medium")}
            />
            <textarea
              name="description"
              rows={5}
              aria-label="Role description"
              placeholder="What they'll own, who they'll work with, what you're looking for…"
              className={cn(inputCls, "resize-y")}
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Department">
                <Select name="department_id" items={deptItems} ariaLabel="Department" />
              </Field>
              <Field label="Employment type">
                <Select
                  name="employment_type"
                  items={typeItems}
                  defaultValue="Full-time"
                  ariaLabel="Employment type"
                />
              </Field>
              <Field label="Location">
                <input
                  name="location"
                  defaultValue="Remote / Global"
                  aria-label="Location"
                  className={inputCls}
                />
              </Field>
              <Field label="Status">
                <Select
                  name="status"
                  items={statusItems}
                  defaultValue="draft"
                  ariaLabel="Status"
                />
              </Field>
            </div>

            {state?.error && (
              <p role="alert" className="text-xs text-red-600">
                {state.error}
              </p>
            )}

            <div className="flex items-center justify-end gap-2 border-t border-hairline pt-4">
              <Dialog.Close render={<Button type="button" variant="ghost">Cancel</Button>} />
              <Button type="submit" icon={Add01Icon} disabled={pending}>
                {pending ? "Saving…" : "Save role"}
              </Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
