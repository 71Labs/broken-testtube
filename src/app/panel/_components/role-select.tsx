"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setRole } from "../actions";
import type { Role } from "@/lib/panel/types";
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
          await setRole(id, v as Role);
          router.refresh();
        })
      }
    />
  );
}
