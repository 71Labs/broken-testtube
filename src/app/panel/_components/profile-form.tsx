"use client";

import { useActionState } from "react";
import type { Profile } from "@/lib/panel/types";
import { updateProfile } from "../actions";

export function ProfileForm({ profile }: { profile: Profile }) {
  const [state, action, pending] = useActionState(updateProfile, null);
  return (
    <form action={action} className="max-w-md space-y-4 rounded-2xl border border-neutral-200 bg-white p-6">
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-neutral-600">Full name</span>
        <input
          name="full_name"
          defaultValue={profile.full_name}
          required
          className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-neutral-900"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-neutral-600">Title</span>
        <input
          name="title"
          defaultValue={profile.title ?? ""}
          placeholder="e.g. Product engineer"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-neutral-900"
        />
      </label>
      <div className="flex items-center gap-3">
        <button
          disabled={pending}
          className="rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
        {state?.ok && <span className="text-xs text-neutral-500">Saved.</span>}
        {state?.error && <span className="text-xs text-red-600">{state.error}</span>}
      </div>
    </form>
  );
}
