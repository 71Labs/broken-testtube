"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  PRIORITY_META,
  STATUS_META,
  STATUS_PROGRESS,
  TASK_COLUMNS,
  initials,
  type Profile,
  type Task,
  type TaskStatus,
} from "@/lib/panel/types";
import { assignTask, deleteTask, updateTaskStatus } from "../actions";
import { cn } from "@/lib/utils";
import { Select, type Option } from "./ui/select";
import { Calendar03Icon, Delete02Icon, Icon } from "./ui/icons";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fmtDate(d: string) {
  const [, m, day] = d.split("-").map(Number);
  return `${MONTHS[m - 1]} ${day}`;
}
const STATUS_ITEMS: Option[] = TASK_COLUMNS.map((s) => ({ value: s, label: STATUS_META[s].label }));

export function TaskBoard({
  tasks,
  team,
  isAdmin,
  myId,
  createSlot,
}: {
  tasks: Task[];
  team: Profile[];
  isAdmin: boolean;
  myId: string;
  createSlot?: ReactNode;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();

  const run = (fn: () => Promise<unknown>) =>
    start(async () => {
      await fn();
      router.refresh();
    });

  const assigneeItems: Option[] = [
    { value: "", label: "Unassigned" },
    ...team.map((m) => ({ value: m.id, label: m.full_name })),
  ];

  return (
    <div
      className={cn(
        "grid gap-4 transition-opacity duration-150 sm:grid-cols-2 xl:grid-cols-4",
        pending && "opacity-60",
      )}
    >
      {TASK_COLUMNS.map((col) => {
        const items = tasks.filter((t) => t.status === col);
        return (
          <div key={col} className="flex flex-col gap-3">
            {/* column header */}
            <div className="flex items-center justify-between px-1">
              <span className="flex items-center gap-2 text-sm font-medium text-ink">
                <span className="h-2 w-2 rounded-full" style={{ background: STATUS_META[col].dot }} />
                {STATUS_META[col].label}
              </span>
              <span className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[11px] tabular-nums text-grey">
                {items.length}
              </span>
            </div>

            {/* the create-card sits at the top of "To do" */}
            {col === "todo" && createSlot}

            {items.length === 0 && col !== "todo" && (
              <p className="rounded-xl border border-dashed border-hairline px-3 py-6 text-center text-xs text-grey-2">
                Nothing here.
              </p>
            )}

            {items.map((t) => {
              const canEdit = isAdmin || t.assignee_id === myId;
              const canDelete = isAdmin || t.created_by === myId;
              const pct = STATUS_PROGRESS[t.status];
              return (
                <div
                  key={t.id}
                  className="rounded-xl border border-hairline bg-white p-3.5 transition-colors duration-150 hover:border-ink/15"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={cn(
                          "rounded-md px-1.5 py-0.5 text-[10px] font-medium",
                          PRIORITY_META[t.priority].className,
                        )}
                      >
                        {PRIORITY_META[t.priority].label}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-1.5 py-0.5 text-[10px] tabular-nums text-grey">
                        <Icon icon={Calendar03Icon} size={11} className="text-grey-2" />
                        {t.due_date ? fmtDate(t.due_date) : "No date"}
                      </span>
                    </div>
                    {canDelete && (
                      <button
                        onClick={() => run(() => deleteTask(t.id))}
                        aria-label={`Delete task: ${t.title}`}
                        className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-grey-2 outline-none transition-colors hover:bg-red-50 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-ink/10"
                      >
                        <Icon icon={Delete02Icon} size={14} />
                      </button>
                    )}
                  </div>

                  <p className="mt-3 text-sm font-medium leading-snug text-ink">{t.title}</p>
                  {t.description && (
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-grey">
                      {t.description}
                    </p>
                  )}
                  {t.project && (
                    <span
                      className="mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ background: `${t.project.color}1a`, color: t.project.color }}
                    >
                      {t.project.name}
                    </span>
                  )}

                  {/* progress */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11px] text-grey-2">
                      <span>Progress</span>
                      <span className="tabular-nums">{pct}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full transition-[width] duration-300"
                        style={{ width: `${pct}%`, background: "#3c9a4e" }}
                      />
                    </div>
                  </div>

                  {/* footer: assignee + status */}
                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-hairline pt-3">
                    {isAdmin ? (
                      <div className="w-28 shrink-0">
                        <Select
                          size="sm"
                          value={t.assignee_id ?? ""}
                          ariaLabel="Assign task"
                          items={assigneeItems}
                          onValueChange={(v) => run(() => assignTask(t.id, v || null))}
                        />
                      </div>
                    ) : (
                      <span className="flex min-w-0 items-center gap-1.5 text-[11px] text-grey">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink text-[8px] font-medium text-white">
                          {t.assignee ? initials(t.assignee.full_name) : "—"}
                        </span>
                        <span className="truncate">{t.assignee?.full_name ?? "Unassigned"}</span>
                      </span>
                    )}

                    {canEdit ? (
                      <div className="w-28 shrink-0">
                        <Select
                          size="sm"
                          value={t.status}
                          ariaLabel="Task status"
                          items={STATUS_ITEMS}
                          onValueChange={(v) => run(() => updateTaskStatus(t.id, v as TaskStatus))}
                        />
                      </div>
                    ) : (
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-grey">
                        {STATUS_META[t.status].label}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
