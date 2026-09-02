"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "../actions";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Field } from "./ui/select";
import { Add01Icon, Cancel01Icon, Icon } from "./ui/icons";

const inputCls =
  "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink placeholder:text-grey-2 outline-none transition-[border-color,box-shadow] duration-150 focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/10";

export function NewProject() {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(createProject, null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.ok) {
      setOpen(false);
      formRef.current?.reset();
      router.refresh();
    }
  }, [state, router]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger render={<Button icon={Add01Icon}>New project</Button>} />
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-ink/30 backdrop-blur-[2px]",
            "motion-safe:transition-opacity motion-safe:duration-200",
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
          )}
        />
        <Dialog.Popup
          initialFocus={nameRef}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2",
            "rounded-2xl border border-hairline bg-white p-6 shadow-[0_24px_60px_-12px_rgba(26,26,26,0.28)] outline-none",
            "origin-center motion-safe:transition-[transform,opacity] motion-safe:duration-200",
            "data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0",
          )}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <Dialog.Title className="text-lg font-medium tracking-tight text-ink">
              New project
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-grey outline-none transition-colors hover:bg-secondary hover:text-ink focus-visible:ring-2 focus-visible:ring-ink/10"
            >
              <Icon icon={Cancel01Icon} size={17} />
            </Dialog.Close>
          </div>

          <form ref={formRef} action={action} className="space-y-4">
            <Field label="Name">
              <input
                ref={nameRef}
                name="name"
                required
                aria-label="Project name"
                placeholder="e.g. Talise"
                className={inputCls}
              />
            </Field>
            <Field label="Color">
              <input
                name="color"
                type="color"
                defaultValue="#757575"
                aria-label="Project color"
                className="h-10 w-16 cursor-pointer rounded-lg border border-border bg-white p-1"
              />
            </Field>

            {state?.error && (
              <p role="alert" className="text-xs text-red-600">
                {state.error}
              </p>
            )}

            <div className="flex items-center justify-end gap-2 border-t border-hairline pt-4">
              <Dialog.Close render={<Button type="button" variant="ghost">Cancel</Button>} />
              <Button type="submit" icon={Add01Icon} disabled={pending}>
                {pending ? "Adding…" : "Add project"}
              </Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
