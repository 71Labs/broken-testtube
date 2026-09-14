"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Tiny brand-native toast system. Module-level pub/sub so any client
 * component can `import { toast }` and fire one — no provider tree.
 * Mount <Toaster/> once (in the panel app layout).
 * ------------------------------------------------------------------ */

type ToastType = "success" | "error" | "info";
type ToastAction = { label: string; onClick: () => void };

export type ToastRecord = {
  id: number;
  title: string;
  description?: string;
  type: ToastType;
  duration: number;
  action?: ToastAction;
};

type Options = {
  description?: string;
  duration?: number;
  action?: ToastAction;
};

let seq = 0;
let records: ToastRecord[] = [];
const listeners = new Set<(r: ToastRecord[]) => void>();

function emit() {
  for (const l of listeners) l(records);
}

function show(title: string, type: ToastType, opts: Options = {}) {
  const id = ++seq;
  const duration = opts.duration ?? (type === "error" ? 6000 : 4000);
  records = [{ id, title, type, duration, description: opts.description, action: opts.action }, ...records].slice(0, 4);
  emit();
  return id;
}

function dismiss(id: number) {
  records = records.filter((r) => r.id !== id);
  emit();
}

export const toast = Object.assign(
  (title: string, opts?: Options) => show(title, "info", opts),
  {
    success: (title: string, opts?: Options) => show(title, "success", opts),
    error: (title: string, opts?: Options) => show(title, "error", opts),
    info: (title: string, opts?: Options) => show(title, "info", opts),
    dismiss,
  },
);

/* --------------------------------- view ---------------------------------- */

const ICONS: Record<ToastType, React.ReactNode> = {
  success: (
    <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="#3c9a4e" />
      <path d="M6 10.2 8.8 13 14 7.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="#dc2626" />
      <path d="M10 5.6v5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="10" cy="14" r="1.05" fill="#fff" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="#1a1a1a" />
      <path d="M10 9v5.2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="10" cy="6" r="1.05" fill="#fff" />
    </svg>
  ),
};

function ToastRow({ rec, onClose }: { rec: ToastRecord; onClose: () => void }) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const start = () => {
    stop();
    timer.current = setTimeout(onClose, rec.duration);
  };
  const stop = () => {
    if (timer.current) clearTimeout(timer.current);
  };
  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role={rec.type === "error" ? "alert" : "status"}
      aria-live={rec.type === "error" ? "assertive" : "polite"}
      onMouseEnter={stop}
      onMouseLeave={start}
      className={cn(
        "pointer-events-auto flex w-[min(22rem,calc(100vw-2rem))] items-start gap-3 rounded-xl border border-hairline bg-white p-3.5 pr-3",
        "shadow-[0_16px_40px_-16px_rgba(26,26,26,0.35)]",
        "motion-safe:animate-[toast-in_.28s_cubic-bezier(.22,1,.36,1)]",
      )}
    >
      <span className="mt-px shrink-0">{ICONS[rec.type]}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium leading-snug text-ink">{rec.title}</p>
        {rec.description && (
          <p className="mt-0.5 break-words text-xs leading-relaxed text-grey">{rec.description}</p>
        )}
        {rec.action && (
          <button
            onClick={() => {
              rec.action?.onClick();
              onClose();
            }}
            className="mt-2 rounded-md text-[12px] font-medium text-ink underline decoration-hairline underline-offset-2 outline-none transition-colors hover:decoration-ink focus-visible:ring-2 focus-visible:ring-ink/15"
          >
            {rec.action.label}
          </button>
        )}
      </div>
      <button
        onClick={onClose}
        aria-label="Dismiss notification"
        className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-grey-2 outline-none transition-colors hover:bg-secondary hover:text-ink focus-visible:ring-2 focus-visible:ring-ink/15"
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export function Toaster() {
  const [items, setItems] = useState<ToastRecord[]>(() => [...records]);
  useEffect(() => {
    const fn = (r: ToastRecord[]) => setItems([...r]);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:right-0 sm:items-end"
    >
      {items.map((rec) => (
        <ToastRow key={rec.id} rec={rec} onClose={() => dismiss(rec.id)} />
      ))}
    </div>
  );
}
