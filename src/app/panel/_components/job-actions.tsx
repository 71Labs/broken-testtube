"use client";

import { type ReactNode, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteJob, setJobStatus } from "../actions";
import { JOB_STATUS_META, type JobStatus } from "@/lib/panel/types";
import { runAction } from "./use-action";
import { toast } from "./ui/toast";
import { cn } from "@/lib/utils";
import { Select } from "./ui/select";
import { Delete02Icon, Icon } from "./ui/icons";

const UNDO_MS = 5000;

/** A careers row: server-rendered content + admin status/delete (with undo). */
export function JobRow({
  id,
  status,
  title,
  isAdmin,
  children,
}: {
  id: string;
  status: JobStatus;
  title: string;
  isAdmin: boolean;
  children: ReactNode;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [removed, setRemoved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (removed) return null;

  const changeStatus = async (v: string) => {
    setPending(true);
    const ok = await runAction(() => setJobStatus(id, v as JobStatus), {
      success: v === "open" ? "Role published to careers" : undefined,
      error: "Couldn't update the role",
    });
    setPending(false);
    if (ok) router.refresh();
  };

  const remove = () => {
    setRemoved(true);
    timer.current = setTimeout(async () => {
      timer.current = null;
      const ok = await runAction(() => deleteJob(id), { error: "Couldn't delete the role" });
      if (ok) router.refresh();
      else setRemoved(false);
    }, UNDO_MS);
    toast("Role deleted", {
      description: title,
      duration: UNDO_MS,
      action: {
        label: "Undo",
        onClick: () => {
          if (timer.current) clearTimeout(timer.current);
          timer.current = null;
          setRemoved(false);
        },
      },
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-hairline px-5 py-4 transition-[background-color,opacity] duration-150 last:border-0 hover:bg-fog/50 sm:flex-row sm:items-center sm:justify-between",
        pending && "opacity-60",
      )}
    >
      {children}
      {isAdmin ? (
        <div className="flex items-center gap-2">
          <div className="w-32">
            <Select
              size="sm"
              value={status}
              ariaLabel="Role status"
              items={[
                { value: "draft", label: "Draft" },
                { value: "open", label: "Open" },
                { value: "closed", label: "Closed" },
              ]}
              onValueChange={changeStatus}
            />
          </div>
          <button
            onClick={remove}
            aria-label={`Delete role: ${title}`}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-grey-2 outline-none transition-colors hover:bg-red-50 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-ink/10"
          >
            <Icon icon={Delete02Icon} size={15} />
          </button>
        </div>
      ) : (
        <span className="w-fit rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-grey">
          {JOB_STATUS_META[status].label}
        </span>
      )}
    </div>
  );
}
