"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteJob, setJobStatus } from "../actions";
import type { JobStatus } from "@/lib/panel/types";
import { Select } from "./ui/select";
import { Delete02Icon, Icon } from "./ui/icons";

export function JobActions({ id, status }: { id: string; status: JobStatus }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const run = (fn: () => Promise<unknown>) =>
    start(async () => {
      await fn();
      router.refresh();
    });

  return (
    <div className={pending ? "flex items-center gap-2 opacity-60" : "flex items-center gap-2"}>
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
          onValueChange={(v) => run(() => setJobStatus(id, v as JobStatus))}
        />
      </div>
      <button
        onClick={() => run(() => deleteJob(id))}
        aria-label="Delete role"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-grey-2 outline-none transition-colors hover:bg-red-50 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-ink/10"
      >
        <Icon icon={Delete02Icon} size={15} />
      </button>
    </div>
  );
}
