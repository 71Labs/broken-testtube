export default function Loading() {
  return (
    <div className="motion-safe:animate-pulse" aria-hidden>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div className="space-y-2.5">
          <div className="h-7 w-56 rounded-md bg-secondary" />
          <div className="h-4 w-72 rounded bg-secondary" />
        </div>
        <div className="h-9 w-28 rounded-lg bg-secondary" />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-hairline bg-white p-5">
            <div className="h-3 w-20 rounded bg-secondary" />
            <div className="mt-4 h-8 w-12 rounded-md bg-secondary" />
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-56 rounded-xl border border-hairline bg-fog/60" />
        ))}
      </div>
    </div>
  );
}
