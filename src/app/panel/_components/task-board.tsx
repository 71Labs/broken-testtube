"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  PRIORITY_META,
  STATUS_META,
  initials,
  type Profile,
  type Task,
  type TaskStatus,
} from "@/lib/panel/types";
import { assignTask, deleteTask, updateTaskStatus } from "../actions";
import { cn } from "@/lib/utils";

const COLUMNS: TaskStatus[] = ["todo", "in_progress", "done"];

export function TaskBoard({
  tasks,
  team,
  isAdmin,
  myId,
}: {
  tasks: Task[];
  team: Profile[];
  isAdmin: boolean;
  myId: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();

  const run = (fn: () => Promise<unknown>) =>
    start(async () => {
      await fn();
      router.refresh();
    });

  return (
    <div className={cn("grid gap-4 md:grid-cols-3", pending && "opacity-70")}>
      {COLUMNS.map((col) => {
        const items = tasks.filter((t) => t.status === col);
        return (
          <div key={col} className="rounded-2xl border border-neutral-200 bg-neutral-50/60">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="flex items-center gap-2 text-sm font-medium text-neutral-900">
                <span className="h-2 w-2 rounded-full" style={{ background: STATUS_META[col].dot }} />
                {STATUS_META[col].label}
              </span>
              <span className="font-mono text-[11px] text-neutral-400">{items.length}</span>
            </div>
            <div className="space-y-2 px-2 pb-2">
              {items.length === 0 && (
                <p className="px-2 py-6 text-center text-xs text-neutral-400">Nothing here yet.</p>
              )}
              {items.map((t) => {
                const canEdit = isAdmin || t.assignee_id === myId;
                const canDelete = isAdmin || t.created_by === myId;
                return (
                  <div key={t.id} className="rounded-xl border border-neutral-200 bg-white p-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-snug text-neutral-900">{t.title}</p>
                      {canDelete && (
                        <button
                          onClick={() => run(() => deleteTask(t.id))}
                          className="shrink-0 text-neutral-300 transition-colors hover:text-red-500"
                          aria-label="Delete task"
                        >
                          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {t.description && (
                      <p className="mt-1 line-clamp-2 text-xs text-neutral-500">{t.description}</p>
                    )}

                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      {t.project && (
                        <span
                          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                          style={{ background: `${t.project.color}1a`, color: t.project.color }}
                        >
                          {t.project.name}
                        </span>
                      )}
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", PRIORITY_META[t.priority].className)}>
                        {PRIORITY_META[t.priority].label}
                      </span>
                      {t.due_date && (
                        <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-[10px] text-neutral-500">
                          {t.due_date}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2 border-t border-neutral-100 pt-2.5">
                      <span className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-200 text-[9px] font-medium text-neutral-600">
                          {t.assignee ? initials(t.assignee.full_name) : "—"}
                        </span>
                        {t.assignee?.full_name ?? "Unassigned"}
                      </span>

                      {canEdit ? (
                        <select
                          value={t.status}
                          onChange={(e) => run(() => updateTaskStatus(t.id, e.target.value as TaskStatus))}
                          className="rounded-md border border-neutral-200 bg-white px-1.5 py-1 text-[11px] text-neutral-700 outline-none focus:border-neutral-900"
                        >
                          {COLUMNS.map((s) => (
                            <option key={s} value={s}>
                              {STATUS_META[s].label}
                            </option>
                          ))}
                        </select>
                      ) : null}
                    </div>

                    {isAdmin && (
                      <select
                        value={t.assignee_id ?? ""}
                        onChange={(e) => run(() => assignTask(t.id, e.target.value || null))}
                        className="mt-2 w-full rounded-md border border-neutral-200 bg-white px-1.5 py-1 text-[11px] text-neutral-600 outline-none focus:border-neutral-900"
                      >
                        <option value="">Unassigned</option>
                        {team.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.full_name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
