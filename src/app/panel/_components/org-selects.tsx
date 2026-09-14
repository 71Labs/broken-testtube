"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setDepartment, setManager, setDepartmentLead } from "../actions";
import type { Department, Profile } from "@/lib/panel/types";
import { runAction } from "./use-action";
import { Select, type Option } from "./ui/select";

function Picker({
  value,
  placeholder,
  options,
  ariaLabel,
  success,
  onPick,
}: {
  value: string | null;
  placeholder: string;
  options: Option[];
  ariaLabel: string;
  success: string;
  onPick: (v: string | null) => Promise<unknown>;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <Select
      size="sm"
      value={value ?? ""}
      disabled={pending}
      ariaLabel={ariaLabel}
      placeholder={placeholder}
      items={[{ value: "", label: placeholder }, ...options]}
      onValueChange={(v) =>
        start(async () => {
          const ok = await runAction(() => onPick(v || null), { success, error: "Couldn't save that" });
          if (ok) router.refresh();
        })
      }
    />
  );
}

export function DepartmentSelect({
  profileId,
  value,
  departments,
}: {
  profileId: string;
  value: string | null;
  departments: Department[];
}) {
  return (
    <Picker
      value={value}
      placeholder="No department"
      ariaLabel="Department"
      success="Department updated"
      options={departments.map((d) => ({ value: d.id, label: d.name }))}
      onPick={(v) => setDepartment(profileId, v)}
    />
  );
}

export function ManagerSelect({
  profileId,
  value,
  people,
}: {
  profileId: string;
  value: string | null;
  people: Profile[];
}) {
  return (
    <Picker
      value={value}
      placeholder="No manager"
      ariaLabel="Manager"
      success="Manager updated"
      options={people
        .filter((p) => p.id !== profileId)
        .map((p) => ({ value: p.id, label: p.full_name }))}
      onPick={(v) => setManager(profileId, v)}
    />
  );
}

export function LeadSelect({
  departmentId,
  value,
  members,
}: {
  departmentId: string;
  value: string | null;
  members: Profile[];
}) {
  return (
    <Picker
      value={value}
      placeholder="No lead"
      ariaLabel="Department lead"
      success="Lead updated"
      options={members.map((p) => ({ value: p.id, label: p.full_name }))}
      onPick={(v) => setDepartmentLead(departmentId, v)}
    />
  );
}
