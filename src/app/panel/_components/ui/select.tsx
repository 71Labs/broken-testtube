"use client";

import { Select as Base } from "@base-ui/react/select";
import { cn } from "@/lib/utils";
import { ArrowDown01Icon, Icon, Tick02Icon } from "./icons";

export type Option = { value: string; label: string };

type Props = {
  items: Option[];
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  size?: "md" | "sm";
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
};

/**
 * Brand Select built on Base UI — replaces the native OS dropdown so the menu,
 * type, and motion all match the AREA 17 system. Submits `name` for forms.
 */
export function Select({
  items,
  name,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select",
  size = "md",
  disabled,
  ariaLabel,
  className,
}: Props) {
  const sm = size === "sm";
  return (
    <Base.Root
      items={items}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(v) => onValueChange?.((v as string | null) ?? "")}
      disabled={disabled}
    >
      <Base.Trigger
        aria-label={ariaLabel}
        className={cn(
          "group inline-flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-white text-ink",
          "outline-none transition-[border-color,box-shadow] duration-150",
          "hover:border-ink/25 focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/10",
          "data-[popup-open]:border-ink disabled:cursor-not-allowed disabled:opacity-55",
          sm ? "rounded-md px-2.5 py-1.5 text-xs" : "px-3 py-2.5 text-sm",
          className,
        )}
      >
        <Base.Value className="min-w-0 truncate text-left">
          {(val: string | null) => {
            const found = items.find((i) => i.value === (val ?? ""));
            return found ? (
              found.label
            ) : (
              <span className="text-grey-2">{placeholder}</span>
            );
          }}
        </Base.Value>
        <Base.Icon className="shrink-0 text-grey transition-transform duration-200 group-data-[popup-open]:rotate-180">
          <Icon icon={ArrowDown01Icon} size={sm ? 14 : 16} />
        </Base.Icon>
      </Base.Trigger>

      <Base.Portal>
        <Base.Positioner
          sideOffset={6}
          alignItemWithTrigger={false}
          className="z-50 outline-none"
        >
          <Base.Popup
            className={cn(
              "max-h-[min(20rem,var(--available-height))] min-w-[var(--anchor-width)] overflow-y-auto",
              "rounded-lg border border-border bg-white p-1 text-sm text-ink shadow-[0_10px_34px_-8px_rgba(26,26,26,0.18)] outline-none",
              "origin-[var(--transform-origin)]",
              "motion-safe:transition-[transform,opacity] motion-safe:duration-150",
              "data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0",
              "data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0",
            )}
          >
            {items.map((it) => (
              <Base.Item
                key={it.value}
                value={it.value}
                className={cn(
                  "relative flex cursor-default select-none items-center justify-between gap-3 rounded-md px-2.5 py-1.5 text-ink-2 outline-none",
                  "data-[highlighted]:bg-secondary data-[highlighted]:text-ink data-[selected]:text-ink",
                )}
              >
                <Base.ItemText className="min-w-0 truncate">
                  {it.label}
                </Base.ItemText>
                <Base.ItemIndicator className="shrink-0 text-ink">
                  <Icon icon={Tick02Icon} size={15} strokeWidth={2} />
                </Base.ItemIndicator>
              </Base.Item>
            ))}
          </Base.Popup>
        </Base.Positioner>
      </Base.Portal>
    </Base.Root>
  );
}

/** Label + Select stacked, for forms. */
export function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-grey">
        {label}
      </span>
      {children}
    </label>
  );
}
