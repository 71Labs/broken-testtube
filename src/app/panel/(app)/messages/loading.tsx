import { Skeleton } from "../../_components/ui/skeleton";

export default function MessagesLoading() {
  return (
    <div
      className="flex h-[calc(100dvh-8rem)] overflow-hidden rounded-xl border border-hairline bg-white"
      aria-hidden
    >
      {/* conversation list */}
      <div className="hidden w-80 shrink-0 flex-col border-r border-hairline md:flex lg:w-[21rem]">
        <div className="flex items-center justify-between px-4 py-3.5">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-7 w-7 rounded-lg" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 border-b border-hairline px-4 py-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
      {/* thread */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex-1 bg-fog/40 px-4 py-5">
          <div className="space-y-4">
            <Skeleton className="h-10 w-56 rounded-2xl" />
            <div className="flex justify-end">
              <Skeleton className="h-10 w-44 rounded-2xl" />
            </div>
            <Skeleton className="h-10 w-64 rounded-2xl" />
          </div>
        </div>
        <div className="border-t border-hairline p-3">
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
