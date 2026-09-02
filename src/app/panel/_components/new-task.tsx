"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createTask } from "../actions";
import type { Profile, Project } from "@/lib/panel/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Field, Select, type Option } from "./ui/select";
import { DateField } from "./ui/date-field";
import { Add01Icon, Cancel01Icon, Icon } from "./ui/icons";

const inputCls =
  "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink placeholder:text-grey-2 outline-none transition-[border-color,box-shadow] duration-150 focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/10";

export function NewTask({
  projects,
  team,
  isAdmin,
}: {
  projects: Project[];
  team: Profile[];
  isAdmin: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(createTask, null);
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

  const projectItems: Option[] = [
    { value: "", label: "No project" },
    ...projects.map((p) => ({ value: p.id, label: p.name })),
  ];
  const priorityItems: Option[] = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];
  const assigneeItems: Option[] = [
    { value: "", label: "Assign to me" },
    ...team.map((m) => ({ value: m.id, label: m.full_name })),
  ];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger render={<Button icon={Add01Icon}>New task</Button>} />

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
            "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2",
            "rounded-2xl border border-hairline bg-white p-6 shadow-[0_24px_60px_-12px_rgba(26,26,26,0.28)] outline-none",
            "origin-center motion-safe:transition-[transform,opacity] motion-safe:duration-200",
            "data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0",
          )}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-lg font-medium tracking-tight text-ink">
                New task
              </Dialog.Title>
              <Dialog.Description className="mt-0.5 text-sm text-grey">
                Add it to the team board and assign it out.
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
            <div className="space-y-2.5">
              <input
                ref={titleRef}
                name="title"
                required
                aria-label="Task title"
                placeholder="What needs doing?"
                className={cn(inputCls, "text-[15px] font-medium")}
              />
              <textarea
                name="description"
                rows={2}
                aria-label="Task details"
                placeholder="Add details (optional)"
                className={cn(inputCls, "resize-none")}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Project">
                <Select name="project_id" items={projectItems} ariaLabel="Project" />
              </Field>
              <Field label="Priority">
                <Select
                  name="priority"
                  items={priorityItems}
                  defaultValue="medium"
                  ariaLabel="Priority"
                />
              </Field>
              {isAdmin && (
                <Field label="Assignee">
                  <Select name="assignee_id" items={assigneeItems} ariaLabel="Assignee" />
                </Field>
              )}
              <Field label="Due date">
                <DateField name="due_date" />
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
                {pending ? "Creating…" : "Create task"}
              </Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
