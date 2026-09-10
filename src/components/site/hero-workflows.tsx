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

type HIcon = typeof AiBrain01Icon;

function Tile({ icon, color }: { icon: HIcon; color: string }) {
  return (
    <span
      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white"
      style={{ backgroundImage: `linear-gradient(145deg, ${color}, ${color}cc)` }}
    >
      <HugeiconsIcon icon={icon} size={16} strokeWidth={1.8} color="#fff" />
    </span>
  );
}

function Avatar({ from, to }: { from: string; to: string }) {
  return (
    <span
      className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
      style={{ backgroundImage: `linear-gradient(140deg, ${from}, ${to})` }}
    />
  );
}

function Chip({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-ink-2">
      <span className="h-2 w-2 rounded-[3px]" style={{ background: color }} />
      {label}
    </span>
  );
}

function Node({
  icon,
  label,
  sub,
  color,
  children,
}: {
  icon: HIcon;
  label: string;
  sub?: string;
  color: string;
  children?: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-xl border border-black/[0.07] bg-white px-2.5 py-2 shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg" style={{ background: `${color}14`, color }}>
        <HugeiconsIcon icon={icon} size={13} strokeWidth={1.8} color={color} />
      </span>
      <span className="leading-tight">
        <span className="block text-[12.5px] font-medium text-ink">{label}</span>
        {sub && <span className="block text-[10.5px] text-grey-2">{sub}</span>}
      </span>
      {children}
    </span>
  );
}

function DeliveryCard() {
  const PURPLE = "#5b3df5";
  return (
    <div className="w-full rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_36px_80px_-34px_rgba(20,20,45,0.5)] sm:p-5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2.5">
          <Tile icon={Rocket01Icon} color={PURPLE} />
          <span className="text-[13px] font-medium text-ink">Client build</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-grey">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3c9a4e]" />
          Sprint 1
        </span>
      </div>

      {/* main node with progress + assignees */}
      <div className="mt-4 rounded-xl border border-black/[0.07] bg-white p-3 shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-ink">Website development</span>
          <span className="flex -space-x-1.5">
            <Avatar from="#ff9ec4" to="#d6247a" />
            <Avatar from="#7cc0ff" to="#1e40af" />
          </span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <Chip color="#e34f26" label="HTML" />
          <Chip color="#61dafb" label="React" />
          <Chip color="#3c9a4e" label="Node" />
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full" style={{ width: "68%", background: PURPLE }} />
          </div>
          <span className="font-mono text-[10px] tabular-nums text-grey-2">68%</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <span aria-hidden className="h-4 w-px bg-black/10" />
        <div className="relative flex w-full items-start justify-center gap-3">
          <span aria-hidden className="absolute left-[22%] right-[22%] top-0 h-px bg-black/10" />
          <span aria-hidden className="absolute left-[22%] top-0 h-3 w-px bg-black/10" />
          <span aria-hidden className="absolute right-[22%] top-0 h-3 w-px bg-black/10" />
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

function PipelineCard() {
  const GREEN = "#3c9a4e";
  return (
    <div className="w-full rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_36px_80px_-34px_rgba(20,45,25,0.5)] sm:p-5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2.5">
          <Tile icon={AiBrain01Icon} color={GREEN} />
          <span className="text-[13px] font-medium text-ink">Document pipeline</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3c9a4e]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[#2f7d3f]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3c9a4e]" />
          Live
        </span>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2.5">
        <Node icon={DocumentCodeIcon} label="CRM" color={GREEN} />
        <Node icon={File01Icon} label="Docs" color={GREEN} />
        <Node icon={File01Icon} label="PDF" color={GREEN} />
      </div>
      <div className="flex flex-col items-center">
        <span aria-hidden className="h-4 w-px bg-black/10" />
        <Node icon={AiBrain01Icon} label="Extract & classify" sub="0G Compute · verifiable" color={GREEN} />
        <span aria-hidden className="h-4 w-px bg-black/10" />
        <span className="inline-flex items-center gap-2.5 rounded-xl border border-black/[0.07] bg-white px-2.5 py-2 shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
          <span className="grid h-6 w-6 place-items-center rounded-lg" style={{ background: `${GREEN}14`, color: GREEN }}>
            <HugeiconsIcon icon={SentIcon} size={13} strokeWidth={1.8} color={GREEN} />
          </span>
          <span className="text-[12.5px] font-medium text-ink">Structured output</span>
          <span className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-grey">JSON</span>
          <span className="rounded-md bg-ink px-2 py-0.5 text-[10px] font-medium text-white">Ready</span>
        </span>
      </div>
    </div>
  );
}

export function HeroWorkflows() {
  return (
    <div className="relative mx-auto grid w-full max-w-[880px] gap-5 sm:grid-cols-2">
      <DeliveryCard />
      <div className="hidden sm:block">
        <PipelineCard />
      </div>
    </div>
  );
}
