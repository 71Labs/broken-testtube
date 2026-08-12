"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setRole } from "../actions";
import type { Role } from "@/lib/panel/types";

export function RoleSelect({ id, role }: { id: string; role: Role }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <select
      value={role}
      disabled={pending}
      onChange={(e) =>
        start(async () => {
          await setRole(id, e.target.value as Role);
          router.refresh();
        })
      }
      className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs text-neutral-700 outline-none focus:border-neutral-900 disabled:opacity-60"
    >
      <option value="worker">Worker</option>
      <option value="admin">Admin</option>
    </select>
  );
}
