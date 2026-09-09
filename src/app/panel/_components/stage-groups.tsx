import type { ReactNode } from "react";

/** Groups items into stage sections (only non-empty stages, in order). */
export function StageGroups<T extends { id: string }>({
  stages,
  meta,
  items,
  getStage,
  renderCard,
}: {
  stages: readonly string[];
  meta: Record<string, { label: string; dot: string }>;
  items: T[];
  getStage: (item: T) => string;
  renderCard: (item: T) => ReactNode;
}) {
  const groups = stages
    .map((s) => ({ s, list: items.filter((i) => getStage(i) === s) }))
    .filter((g) => g.list.length > 0);

  return (
    <div className="space-y-6">
      {groups.map(({ s, list }) => (
        <section key={s} className="overflow-hidden rounded-xl border border-hairline">
          <div className="flex items-center justify-between border-b border-hairline bg-fog px-5 py-3">
            <span className="flex items-center gap-2 text-sm font-medium text-ink">
              <span className="h-2 w-2 rounded-full" style={{ background: meta[s].dot }} />
              {meta[s].label}
            </span>
            <span className="font-mono text-[11px] tabular-nums text-grey-2">{list.length}</span>
          </div>
          <div className="divide-y divide-hairline">{list.map(renderCard)}</div>
        </section>
      ))}
    </div>
  );
}

export function PipelineEmpty({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-hairline py-16 text-center">
      {children}
    </div>
  );
}
