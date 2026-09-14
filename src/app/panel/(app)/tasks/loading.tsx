import { CardSkeleton, Skeleton } from "../../_components/ui/skeleton";

export default function TasksLoading() {
  return (
    <div aria-hidden>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div className="space-y-2.5">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-9 w-28 rounded-lg" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, c) => (
          <div key={c} className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-6" />
            </div>
            {Array.from({ length: c === 0 ? 2 : 1 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
