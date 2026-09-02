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
import { Select, type Option } from "./ui/select";
import { Delete02Icon, Icon, InboxIcon } from "./ui/icons";

const COLUMNS: TaskStatus[] = ["todo", "in_progress", "done"];
const STATUS_ITEMS: Option[] = COLUMNS.map((s) => ({
  value: s,
  label: STATUS_META[s].label,
}));

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

  const assigneeItems: Option[] = [
    { value: "", label: "Unassigned" },
    ...team.map((m) => ({ value: m.id, label: m.full_name })),
  ];

  return (
    <div
      className={cn(
        "grid gap-4 transition-opacity duration-150 md:grid-cols-3",
        pending && "opacity-60",
      )}
    >
      {COLUMNS.map((col) => {
        const items = tasks.filter((t) => t.status === col);
        return (
          <div key={col} className="rounded-xl border border-hairline bg-fog/60">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="flex items-center gap-2 text-sm font-medium text-ink">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: STATUS_META[col].dot }}
                />
                {STATUS_META[col].label}
              </span>
              <span className="font-mono text-[11px] tabular-nums text-grey-2">
                {items.length}
              </span>
            </div>
            <div className="space-y-2 px-2 pb-2">
              {items.length === 0 && (
                <div className="flex flex-col items-center gap-2 px-2 py-8 text-center">
                  <Icon icon={InboxIcon} size={18} className="text-grey-2" />
                  <p className="text-xs text-grey-2">Nothing here yet.</p>
                </div>
              )}
              {items.map((t) => {
                const canEdit = isAdmin || t.assignee_id === myId;
                const canDelete = isAdmin || t.created_by === myId;
                return (
                  <div
                    key={t.id}
                    className="rounded-lg border border-hairline bg-white p-3 transition-colors duration-150 hover:border-ink/15"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-snug text-ink">
                        {t.title}
                      </p>
                      {canDelete && (
                        <button
                          onClick={() => run(() => deleteTask(t.id))}
                          className="-mr-1 -mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-md text-grey-2 outline-none transition-colors hover:bg-red-50 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-ink/10"
                          aria-label={`Delete task: ${t.title}`}
                        >
                          <Icon icon={Delete02Icon} size={15} />
                        </button>
                      )}
                    </div>
                    {t.description && (
                      <p className="mt-1 line-clamp-2 text-xs text-grey">
                        {t.description}
                      </p>
                    )}

                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      {t.project && (
                        <span
                          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                          style={{
                            background: `${t.project.color}1a`,
                            color: t.project.color,
                          }}
                        >
                          {t.project.name}
                        </span>
                      )}
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium",
                          PRIORITY_META[t.priority].className,
                        )}
                      >
                        {PRIORITY_META[t.priority].label}
                      </span>
                      {t.due_date && (
                        <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] tabular-nums text-grey">
                          {t.due_date}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2 border-t border-hairline pt-2.5">
                      <span className="flex min-w-0 items-center gap-1.5 text-[11px] text-grey">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary text-[9px] font-medium text-ink-2">
                          {t.assignee ? initials(t.assignee.full_name) : "—"}
                        </span>
                        <span className="truncate">
                          {t.assignee?.full_name ?? "Unassigned"}
                        </span>
                      </span>

                      {canEdit && (
                        <div className="w-28 shrink-0">
                          <Select
                            size="sm"
                            value={t.status}
                            ariaLabel="Task status"
                            items={STATUS_ITEMS}
                            onValueChange={(v) =>
                              run(() => updateTaskStatus(t.id, v as TaskStatus))
                            }
                          />
                        </div>
                      )}
                    </div>

                    {isAdmin && (
                      <div className="mt-2">
                        <Select
                          size="sm"
                          value={t.assignee_id ?? ""}
                          ariaLabel="Assign task"
                          items={assigneeItems}
                          onValueChange={(v) => run(() => assignTask(t.id, v || null))}
                        />
                      </div>
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
