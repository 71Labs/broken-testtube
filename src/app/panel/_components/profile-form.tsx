"use client";

import { useActionState } from "react";
import type { Profile } from "@/lib/panel/types";
import { updateProfile } from "../actions";
import { Button } from "./ui/button";
import { CheckmarkCircle02Icon, Icon } from "./ui/icons";

const inputCls =
  "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink placeholder:text-grey-2 outline-none transition-[border-color,box-shadow] duration-150 focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/10";

export function ProfileForm({ profile }: { profile: Profile }) {
  const [state, action, pending] = useActionState(updateProfile, null);
  return (
    <form
      action={action}
      className="max-w-md space-y-4 rounded-xl border border-hairline bg-white p-6"
    >
      <label className="block">
        <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-grey">
          Full name
        </span>
        <input
          name="full_name"
          defaultValue={profile.full_name}
          required
          className={inputCls}
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-grey">
          Title
        </span>
        <input
          name="title"
          defaultValue={profile.title ?? ""}
          placeholder="e.g. Product engineer"
          className={inputCls}
        />
      </label>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save changes"}
        </Button>
        {state?.ok && (
          <span
            role="status"
            className="flex items-center gap-1 text-xs text-grey"
          >
            <Icon icon={CheckmarkCircle02Icon} size={14} className="text-ink" />
            Saved
          </span>
        )}
        {state?.error && (
          <span role="alert" className="text-xs text-red-600">
            {state.error}
          </span>
        )}
      </div>
    </form>
  );
}
