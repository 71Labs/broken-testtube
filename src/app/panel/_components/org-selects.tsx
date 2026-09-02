"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setDepartment, setManager, setDepartmentLead } from "../actions";
import type { Department, Profile } from "@/lib/panel/types";

const cls =
  "rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs text-neutral-700 outline-none focus:border-neutral-900 disabled:opacity-60";

function Picker({
  value,
  placeholder,
  options,
  onPick,
}: {
  value: string | null;
  placeholder: string;
  options: { id: string; label: string }[];
  onPick: (v: string | null) => Promise<unknown>;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <select
      value={value ?? ""}
      disabled={pending}
      onChange={(e) =>
        start(async () => {
          await onPick(e.target.value || null);
          router.refresh();
        })
      }
      className={cls}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.label}
        </option>
      ))}
    </select>
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
      options={departments.map((d) => ({ id: d.id, label: d.name }))}
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
      options={people
        .filter((p) => p.id !== profileId)
        .map((p) => ({ id: p.id, label: p.full_name }))}
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
      options={members.map((p) => ({ id: p.id, label: p.full_name }))}
      onPick={(v) => setDepartmentLead(departmentId, v)}
    />
  );
}
