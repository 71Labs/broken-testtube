import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiBrain01Icon,
  CodeCircleIcon,
  DocumentCodeIcon,
  File01Icon,
  Rocket01Icon,
  SentIcon,
  ServerStack01Icon,
} from "@hugeicons/core-free-icons";

function Tile({ icon, color }: { icon: typeof AiBrain01Icon; color: string }) {
  return (
    <span
      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white"
      style={{ backgroundImage: `linear-gradient(145deg, ${color}, ${color}cc)` }}
    >
      <HugeiconsIcon icon={icon} size={16} strokeWidth={1.8} color="#fff" />
    </span>
  );
}

function Node({
  icon,
  label,
  sub,
  color,
}: {
  icon: typeof AiBrain01Icon;
  label: string;
  sub?: string;
  color: string;
}) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-xl border border-black/[0.07] bg-white px-3 py-2 shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
      <span
        className="grid h-6 w-6 shrink-0 place-items-center rounded-lg"
        style={{ background: `${color}14`, color }}
      >
        <HugeiconsIcon icon={icon} size={13} strokeWidth={1.8} color={color} />
      </span>
      <span className="leading-tight">
        <span className="block text-[12.5px] font-medium text-ink">{label}</span>
        {sub && <span className="block text-[10.5px] text-grey-2">{sub}</span>}
      </span>
    </span>
  );
}

/** Card A — a delivery/project workflow. */
function DeliveryCard() {
  const PURPLE = "#5b3df5";
  return (
    <div className="w-full rounded-2xl border border-black/[0.06] bg-white/95 p-4 shadow-[0_36px_80px_-34px_rgba(20,20,45,0.5)] backdrop-blur sm:p-5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2.5">
          <Tile icon={Rocket01Icon} color={PURPLE} />
          <span className="text-[13px] font-medium text-ink">Client build</span>
        </span>
        <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-grey">
          Sprint 1
        </span>
      </div>

      <div className="mt-4 flex flex-col items-center gap-0">
        <Node icon={CodeCircleIcon} label="Website development" sub="Assigned · 68%" color={PURPLE} />
        <span aria-hidden className="h-5 w-px bg-black/10" />
        <div className="relative flex w-full items-start justify-center gap-4">
          <span aria-hidden className="absolute left-1/4 right-1/4 top-0 h-px bg-black/10" />
          <span aria-hidden className="absolute left-1/4 top-0 h-3 w-px bg-black/10" />
          <span aria-hidden className="absolute right-1/4 top-0 h-3 w-px bg-black/10" />
          <div className="mt-3">
            <Node icon={CodeCircleIcon} label="Frontend" sub="React · Next" color={PURPLE} />
          </div>
          <div className="mt-3">
            <Node icon={ServerStack01Icon} label="Backend" sub="Node · Postgres" color={PURPLE} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Card B — an AI document pipeline. */
function PipelineCard() {
  const GREEN = "#3c9a4e";
  return (
    <div className="w-full rounded-2xl border border-black/[0.06] bg-white/95 p-4 shadow-[0_36px_80px_-34px_rgba(20,45,25,0.5)] backdrop-blur sm:p-5">
      <div className="flex items-center gap-2.5">
        <Tile icon={AiBrain01Icon} color={GREEN} />
        <span className="text-[13px] font-medium text-ink">Document pipeline</span>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <Node icon={DocumentCodeIcon} label="CRM" color={GREEN} />
        <Node icon={File01Icon} label="Docs" color={GREEN} />
        <Node icon={File01Icon} label="PDF" color={GREEN} />
      </div>
      <div className="flex flex-col items-center">
        <span aria-hidden className="h-5 w-px bg-black/10" />
        <Node icon={AiBrain01Icon} label="Extract & classify" sub="0G Compute" color={GREEN} />
        <span aria-hidden className="h-5 w-px bg-black/10" />
        <span className="inline-flex items-center gap-2.5 rounded-xl border border-black/[0.07] bg-white px-3 py-2 shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
          <span className="grid h-6 w-6 place-items-center rounded-lg" style={{ background: `${GREEN}14`, color: GREEN }}>
            <HugeiconsIcon icon={SentIcon} size={13} strokeWidth={1.8} color={GREEN} />
          </span>
          <span className="text-[12.5px] font-medium text-ink">Structured output</span>
          <span className="ml-1 rounded-md bg-ink px-2 py-0.5 text-[10px] font-medium text-white">Ready</span>
        </span>
      </div>
    </div>
  );
}

export function HeroWorkflows() {
  return (
    <div className="relative mx-auto grid w-full max-w-[860px] gap-5 sm:grid-cols-2">
      <DeliveryCard />
      <div className="hidden sm:block">
        <PipelineCard />
      </div>
    </div>
  );
}
