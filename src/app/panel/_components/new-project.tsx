"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "../actions";

export function NewProject() {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(createProject, null);
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) {
      setOpen(false);
      ref.current?.reset();
      router.refresh();
    }
  }, [state, router]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
      >
        <span className="text-base leading-none">+</span> New project
      </button>
    );
  }

  return (
    <form ref={ref} action={action} className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white p-1.5 pl-3">
      <input
        name="name"
        required
        placeholder="Project name"
        className="w-40 text-sm outline-none placeholder:text-neutral-400"
      />
      <input name="color" type="color" defaultValue="#71717a" className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent p-0" />
      <button disabled={pending} className="rounded-full bg-neutral-950 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-60">
        {pending ? "…" : "Add"}
      </button>
      {state?.error && <span className="pr-2 text-xs text-red-600">{state.error}</span>}
    </form>
  );
}
