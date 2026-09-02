"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "../actions";
import { Button } from "./ui/button";
import { Add01Icon } from "./ui/icons";

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
      <Button icon={Add01Icon} onClick={() => setOpen(true)}>
        New project
      </Button>
    );
  }

  return (
    <form
      ref={ref}
      action={action}
      className="flex items-center gap-2 rounded-full border border-border bg-white p-1.5 pl-3 transition-colors focus-within:border-ink/40"
    >
      <input
        name="name"
        required
        aria-label="Project name"
        placeholder="Project name"
        className="w-40 bg-transparent text-sm text-ink outline-none placeholder:text-grey-2"
      />
      <input
        name="color"
        type="color"
        defaultValue="#757575"
        aria-label="Project color"
        className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent p-0"
      />
      <Button type="submit" size="sm" className="rounded-full" disabled={pending}>
        {pending ? "…" : "Add"}
      </Button>
      {state?.error && (
        <span role="alert" className="pr-2 text-xs text-red-600">
          {state.error}
        </span>
      )}
    </form>
  );
}
