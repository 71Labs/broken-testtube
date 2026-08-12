"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createTask } from "../actions";
import type { Profile, Project } from "@/lib/panel/types";

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

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
      >
        <span className="text-base leading-none">{open ? "×" : "+"}</span>
        {open ? "Close" : "New task"}
      </button>

      {open && (
        <form
          ref={formRef}
          action={action}
          className="mt-4 space-y-3 rounded-2xl border border-neutral-200 bg-white p-4"
        >
          <input
            name="title"
            required
            placeholder="Task title"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-900"
          />
          <textarea
            name="description"
            rows={2}
            placeholder="Details (optional)"
            className="w-full resize-none rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-900"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Select name="project_id" label="Project">
              <option value="">No project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </Select>
            <Select name="priority" label="Priority" defaultValue="medium">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
            {isAdmin && (
              <Select name="assignee_id" label="Assignee">
                <option value="">Assign to me</option>
                {team.map((m) => (
                  <option key={m.id} value={m.id}>{m.full_name}</option>
                ))}
              </Select>
            )}
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-neutral-500">Due date</span>
              <input
                name="due_date"
                type="date"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-900"
              />
            </label>
          </div>

          {state?.error && <p className="text-xs text-red-600">{state.error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {pending ? "Creating…" : "Create task"}
          </button>
        </form>
      )}
    </div>
  );
}

function Select({
  name,
  label,
  children,
  defaultValue,
}: {
  name: string;
  label: string;
  children: React.ReactNode;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium text-neutral-500">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900"
      >
        {children}
      </select>
    </label>
  );
}
