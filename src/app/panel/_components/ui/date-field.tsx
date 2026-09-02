"use client";

import { Popover } from "@base-ui/react/popover";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft01Icon, ArrowRight01Icon, Calendar03Icon, Icon } from "./icons";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const parse = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/**
 * Brand date picker — a real calendar popover instead of the native
 * `dd/mm/yyyy` control. Submits an ISO date string via a hidden input.
 */
export function DateField({
  name,
  defaultValue = "",
  placeholder = "Pick a date",
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [view, setView] = useState(() =>
    value ? parse(value) : new Date(),
  );
  const selected = value ? parse(value) : null;
  const today = new Date();

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const shift = (delta: number) => setView(new Date(year, month + delta, 1));

  return (
    <>
      <input type="hidden" name={name} value={value} />
      <Popover.Root>
        <Popover.Trigger
          className={cn(
            "inline-flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink outline-none",
            "transition-[border-color,box-shadow] duration-150 hover:border-ink/25",
            "focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/10 data-[popup-open]:border-ink",
          )}
        >
          <span className={cn("truncate", !selected && "text-grey-2")}>
            {selected
              ? `${selected.getDate()} ${MONTHS[selected.getMonth()].slice(0, 3)} ${selected.getFullYear()}`
              : placeholder}
          </span>
          <span className="flex items-center gap-2">
            {selected && (
              <span
                role="button"
                tabIndex={0}
                aria-label="Clear date"
                onClick={(e) => {
                  e.stopPropagation();
                  setValue("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    setValue("");
                  }
                }}
                className="grid h-4 w-4 place-items-center rounded text-[11px] leading-none text-grey-2 transition-colors hover:text-ink"
              >
                ✕
              </span>
            )}
            <Icon icon={Calendar03Icon} size={16} className="shrink-0 text-grey" />
          </span>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Positioner sideOffset={6} align="start" className="z-50 outline-none">
            <Popover.Popup
              className={cn(
                "w-[17rem] rounded-xl border border-border bg-white p-3 text-ink shadow-[0_10px_34px_-8px_rgba(26,26,26,0.18)] outline-none",
                "origin-[var(--transform-origin)]",
                "motion-safe:transition-[transform,opacity] motion-safe:duration-150",
                "data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0",
                "data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0",
              )}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium tracking-tight">
                  {MONTHS[month]}{" "}
                  <span className="text-grey tabular-nums">{year}</span>
                </span>
                <span className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => shift(-1)}
                    aria-label="Previous month"
                    className="grid h-7 w-7 place-items-center rounded-md text-grey outline-none transition-colors hover:bg-secondary hover:text-ink focus-visible:ring-2 focus-visible:ring-ink/10"
                  >
                    <Icon icon={ArrowLeft01Icon} size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => shift(1)}
                    aria-label="Next month"
                    className="grid h-7 w-7 place-items-center rounded-md text-grey outline-none transition-colors hover:bg-secondary hover:text-ink focus-visible:ring-2 focus-visible:ring-ink/10"
                  >
                    <Icon icon={ArrowRight01Icon} size={16} />
                  </button>
                </span>
              </div>

              <div className="grid grid-cols-7 gap-0.5">
                {WEEKDAYS.map((w) => (
                  <span
                    key={w}
                    className="grid h-8 place-items-center font-mono text-[10px] uppercase tracking-wide text-grey-2"
                  >
                    {w}
                  </span>
                ))}
                {cells.map((d, i) =>
                  d === null ? (
                    <span key={`b${i}`} />
                  ) : (
                    <Popover.Close
                      key={iso(d)}
                      render={
                        <button
                          type="button"
                          onClick={() => {
                            setValue(iso(d));
                            setView(d);
                          }}
                        />
                      }
                      className={cn(
                        "grid h-8 w-8 place-items-center rounded-md text-sm tabular-nums outline-none transition-colors",
                        "focus-visible:ring-2 focus-visible:ring-ink/10",
                        selected && sameDay(d, selected)
                          ? "bg-ink font-medium text-white"
                          : sameDay(d, today)
                            ? "font-semibold text-ink hover:bg-secondary"
                            : "text-ink-2 hover:bg-secondary",
                      )}
                    >
                      {d.getDate()}
                    </Popover.Close>
                  ),
                )}
              </div>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
}
