"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createTask } from "../actions";
import type { Profile, Project } from "@/lib/panel/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Field, Select, type Option } from "./ui/select";
import { DateField } from "./ui/date-field";
import { Add01Icon, Cancel01Icon } from "./ui/icons";

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
    <div className="w-full sm:w-auto">
      <Button
        variant={open ? "secondary" : "primary"}
        icon={open ? Cancel01Icon : Add01Icon}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? "Cancel" : "New task"}
      </Button>

      {open && (
        <form
          ref={formRef}
          action={action}
          className="mt-3 w-full space-y-4 rounded-xl border border-hairline bg-white p-5 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1 motion-safe:duration-200 sm:w-[30rem]"
        >
          <div className="space-y-2.5">
            <input
              name="title"
              required
              aria-label="Task title"
              placeholder="Task title"
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

          <div className="flex items-center gap-2 border-t border-hairline pt-4">
            <Button type="submit" icon={Add01Icon} disabled={pending}>
              {pending ? "Creating…" : "Create task"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
