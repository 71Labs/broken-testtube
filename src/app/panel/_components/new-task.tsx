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
  variant = "button",
}: {
  projects: Project[];
  team: Profile[];
  isAdmin: boolean;
  variant?: "button" | "card";
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
      {variant === "card" ? (
        <Dialog.Trigger
          className="group w-full rounded-xl border border-dashed border-border bg-white p-4 text-left outline-none transition-colors duration-150 hover:border-ink/30 hover:bg-fog/40 focus-visible:ring-2 focus-visible:ring-ink/10"
        >
          {/* stacked-cards illustration */}
          <span className="relative mb-3 flex h-24 items-center justify-center overflow-hidden rounded-lg bg-fog/60">
            <svg viewBox="0 0 120 64" className="h-16 w-auto" fill="none" aria-hidden>
              <rect x="10" y="12" width="34" height="40" rx="4" fill="#fff" stroke="rgba(10,10,10,0.12)" />
              <rect x="30" y="8" width="34" height="44" rx="4" fill="#fff" stroke="rgba(10,10,10,0.14)" />
              <rect x="38" y="16" width="18" height="3" rx="1.5" fill="rgba(10,10,10,0.18)" />
              <rect x="38" y="23" width="14" height="3" rx="1.5" fill="rgba(10,10,10,0.12)" />
              <rect x="38" y="30" width="16" height="3" rx="1.5" fill="rgba(10,10,10,0.12)" />
              <g>
                <rect x="66" y="18" width="30" height="34" rx="4" fill="#fff" stroke="rgba(10,10,10,0.16)" />
                <circle cx="81" cy="35" r="8" fill="#1a1a1a" />
                <path d="M81 31.5v7M77.5 35h7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
              </g>
            </svg>
          </span>
          <span className="flex items-center gap-2 text-sm font-medium text-ink">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-ink text-white">
              <Icon icon={Add01Icon} size={14} />
            </span>
            New task
          </span>
          <span className="mt-1.5 block text-xs leading-relaxed text-grey-2">
            Create a task and define its priority, assignee, and due date.
          </span>
        </Dialog.Trigger>
      ) : (
        <Dialog.Trigger render={<Button icon={Add01Icon}>New task</Button>} />
      )}

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
