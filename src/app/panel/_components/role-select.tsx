"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setRole } from "../actions";
import type { Role } from "@/lib/panel/types";
import { runAction } from "./use-action";
import { Select } from "./ui/select";

export function RoleSelect({ id, role }: { id: string; role: Role }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <Select
      size="sm"
      value={role}
      disabled={pending}
      ariaLabel="Role"
      className="w-28"
      items={[
        { value: "worker", label: "Worker" },
        { value: "admin", label: "Admin" },
      ]}
      onValueChange={(v) =>
        start(async () => {
          const ok = await runAction(() => setRole(id, v as Role), {
            success: `Role set to ${v === "admin" ? "Admin" : "Worker"}`,
            error: "Couldn't change the role",
          });
          if (ok) router.refresh();
        })
      }
    />
  );
}
