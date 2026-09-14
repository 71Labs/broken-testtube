"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  PRIORITY_META,
  STATUS_META,
  STATUS_PROGRESS,
  TASK_COLUMNS,
  type Profile,
  type Task,
  type TaskStatus,
} from "@/lib/panel/types";
import { assignTask, deleteTask, updateTaskStatus } from "../actions";
import { runAction } from "./use-action";
import { toast } from "./ui/toast";
import { cn } from "@/lib/utils";
import { Select, type Option } from "./ui/select";
import { GradientAvatar } from "./ui/avatar";
import { EmptyState } from "./ui/empty-state";
import { Calendar03Icon, Delete02Icon, DragDropVerticalIcon, Icon } from "./ui/icons";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fmtDate(d: string) {
  const [, m, day] = d.split("-").map(Number);
  return `${MONTHS[m - 1]} ${day}`;
}
const STATUS_ITEMS: Option[] = TASK_COLUMNS.map((s) => ({ value: s, label: STATUS_META[s].label }));
const UNDO_MS = 5000;

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
  const [items, setItems] = useState<Task[]>(tasks);
  const [serverTasks, setServerTasks] = useState<Task[]>(tasks);
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(null);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // accept server truth whenever it changes (create, revalidate, navigation) —
  // reset during render per React's guidance, not from an effect
  if (tasks !== serverTasks) {
    setServerTasks(tasks);
    setItems(tasks);
  }

  useEffect(() => {
    const map = timers.current;
    return () => map.forEach((t) => clearTimeout(t));
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  );

  const assigneeItems: Option[] = [
    { value: "", label: "Unassigned" },
    ...team.map((m) => ({ value: m.id, label: m.full_name })),
  ];

  const move = async (id: string, status: TaskStatus) => {
    const prev = items.find((t) => t.id === id);
    if (!prev || prev.status === status) return;
    setItems((list) => list.map((t) => (t.id === id ? { ...t, status } : t)));
    const ok = await runAction(() => updateTaskStatus(id, status), {
      error: "Couldn't move that task",
    });
    if (!ok) setItems(tasks); // revert to server truth
  };

  const assign = async (id: string, assigneeId: string | null) => {
    const who = team.find((m) => m.id === assigneeId) ?? null;
    setItems((list) =>
      list.map((t) => (t.id === id ? { ...t, assignee_id: assigneeId, assignee: who } : t)),
    );
    const ok = await runAction(() => assignTask(id, assigneeId), { error: "Couldn't reassign" });
    if (!ok) setItems(tasks);
  };

  const removeWithUndo = (t: Task) => {
    setHidden((h) => new Set(h).add(t.id));
    const timeout = setTimeout(async () => {
      timers.current.delete(t.id);
      const ok = await runAction(() => deleteTask(t.id), { error: "Couldn't delete the task" });
      if (ok) setItems((list) => list.filter((x) => x.id !== t.id));
      else setHidden((h) => reject(h, t.id)); // restore on failure
    }, UNDO_MS);
    timers.current.set(t.id, timeout);
    toast("Task deleted", {
      description: t.title,
      duration: UNDO_MS,
      action: {
        label: "Undo",
        onClick: () => {
          const tm = timers.current.get(t.id);
          if (tm) clearTimeout(tm);
          timers.current.delete(t.id);
          setHidden((h) => reject(h, t.id));
        },
      },
    });
  };

  const onDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id));
  const onDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    const over = e.over?.id;
    if (over && TASK_COLUMNS.includes(over as TaskStatus)) {
      move(String(e.active.id), over as TaskStatus);
    }
  };

  const visible = items.filter((t) => !hidden.has(t.id));
  const activeTask = activeId ? visible.find((t) => t.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 xl:grid-cols-4">
        {TASK_COLUMNS.map((col) => {
          const colItems = visible.filter((t) => t.status === col);
          return (
            <Column key={col} col={col} count={colItems.length}>
              {col === "todo" && createSlot}
              {colItems.map((t) => (
                <Card
                  key={t.id}
                  t={t}
                  isAdmin={isAdmin}
                  myId={myId}
                  assigneeItems={assigneeItems}
                  onStatus={move}
                  onAssign={assign}
                  onDelete={removeWithUndo}
                  dragging={t.id === activeId}
                />
              ))}
              {colItems.length === 0 && col !== "todo" && (
                <EmptyState compact title="Nothing here" hint="Drag a card in, or move one along." />
              )}
            </Column>
          );
        })}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeTask ? <Card t={activeTask} isAdmin={isAdmin} myId={myId} assigneeItems={assigneeItems} overlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}

function reject(set: Set<string>, id: string) {
  const n = new Set(set);
  n.delete(id);
  return n;
}

/* ------------------------------------ column ------------------------------ */

function Column({ col, count, children }: { col: TaskStatus; count: number; children: ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: col });
  return (
    <div className="flex min-w-[82%] shrink-0 snap-start flex-col gap-3 sm:min-w-0 sm:shrink">
      <div className="flex items-center justify-between px-1">
        <span className="flex items-center gap-2 text-sm font-medium text-ink">
          <span className="h-2 w-2 rounded-full" style={{ background: STATUS_META[col].dot }} />
          {STATUS_META[col].label}
        </span>
        <span className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[11px] tabular-nums text-grey">
          {count}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-[6rem] flex-col gap-3 rounded-xl transition-colors duration-150",
          isOver && "bg-fog/70 outline-2 outline-dashed outline-ink/15",
        )}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------- card ------------------------------- */

function Card({
  t,
  isAdmin,
  myId,
  assigneeItems,
  onStatus,
  onAssign,
  onDelete,
  dragging,
  overlay,
}: {
  t: Task;
  isAdmin: boolean;
  myId: string;
  assigneeItems: Option[];
  onStatus?: (id: string, s: TaskStatus) => void;
  onAssign?: (id: string, a: string | null) => void;
  onDelete?: (t: Task) => void;
  dragging?: boolean;
  overlay?: boolean;
}) {
  const { setNodeRef, listeners, isDragging } = useDraggable({
    id: overlay ? `overlay-${t.id}` : t.id,
    disabled: overlay,
  });
  const canEdit = isAdmin || t.assignee_id === myId;
  const canDelete = isAdmin || t.created_by === myId;
  const pct = STATUS_PROGRESS[t.status];
  // stop drag from starting when interacting with controls
  const stop = { onPointerDown: (e: React.PointerEvent) => e.stopPropagation() };

  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      {...(overlay ? {} : listeners)}
      className={cn(
        "rounded-xl border border-hairline bg-white p-3.5 transition-colors duration-150 hover:border-ink/15",
        !overlay && "cursor-grab touch-none active:cursor-grabbing",
        (isDragging || dragging) && !overlay && "opacity-40",
        overlay && "w-72 cursor-grabbing shadow-[0_20px_48px_-16px_rgba(26,26,26,0.4)] rotate-[1.5deg]",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="grid h-5 w-5 place-items-center rounded text-grey-2" aria-hidden="true">
            <Icon icon={DragDropVerticalIcon} size={13} />
          </span>
          <span className={cn("rounded-md px-1.5 py-0.5 text-[10px] font-medium", PRIORITY_META[t.priority].className)}>
            {PRIORITY_META[t.priority].label}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-1.5 py-0.5 text-[10px] tabular-nums text-grey">
            <Icon icon={Calendar03Icon} size={11} className="text-grey-2" />
            {t.due_date ? fmtDate(t.due_date) : "No date"}
          </span>
        </div>
        {canDelete && !overlay && (
          <button
            {...stop}
            onClick={() => onDelete?.(t)}
            aria-label={`Delete task: ${t.title}`}
            className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-grey-2 outline-none transition-colors hover:bg-red-50 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-ink/10"
          >
            <Icon icon={Delete02Icon} size={14} />
          </button>
        )}
      </div>

      <p className="mt-3 text-sm font-medium leading-snug text-ink">{t.title}</p>
      {t.description && (
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-grey">{t.description}</p>
      )}
      {t.project && (
        <span
          className="mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={{ background: `${t.project.color}1a`, color: t.project.color }}
        >
          {t.project.name}
        </span>
      )}

      <div className="mt-3">
        <div className="flex items-center justify-between text-[11px] text-grey-2">
          <span>Progress</span>
          <span className="tabular-nums">{pct}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full transition-[width] duration-300" style={{ width: `${pct}%`, background: "#3c9a4e" }} />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-hairline pt-3">
        {isAdmin && !overlay ? (
          <div className="w-28 shrink-0" {...stop}>
            <Select
              size="sm"
              value={t.assignee_id ?? ""}
              ariaLabel="Assign task"
              items={assigneeItems}
              onValueChange={(v) => onAssign?.(t.id, v || null)}
            />
          </div>
        ) : (
          <span className="flex min-w-0 items-center gap-1.5 text-[11px] text-grey">
            {t.assignee ? (
              <GradientAvatar seed={t.assignee.id} gradient={t.assignee.avatar_gradient} name={t.assignee.full_name} size={20} />
            ) : (
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-dashed border-border text-[8px] text-grey-2">
                &mdash;
              </span>
            )}
            <span className="truncate">{t.assignee?.full_name ?? "Unassigned"}</span>
          </span>
        )}

        {canEdit && !overlay ? (
          <div className="w-28 shrink-0" {...stop}>
            <Select
              size="sm"
              value={t.status}
              ariaLabel="Task status"
              items={STATUS_ITEMS}
              onValueChange={(v) => onStatus?.(t.id, v as TaskStatus)}
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
}
