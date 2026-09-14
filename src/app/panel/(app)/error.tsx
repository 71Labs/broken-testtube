"use client";

import { useEffect } from "react";

export default function PanelError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface for observability; keeps the message out of the user's face.
    console.error("[panel]", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-hairline bg-white text-grey">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <path d="M12 8v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="12" cy="16.5" r="1.1" fill="currentColor" />
          <path
            d="M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <h2 className="text-lg font-medium tracking-tight text-ink">Something went wrong</h2>
        <p className="mt-1 max-w-sm text-sm text-grey">
          This section failed to load. It&rsquo;s usually a passing hiccup &mdash; try again.
        </p>
      </div>
      <button
        onClick={reset}
        className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white outline-none transition-[background-color,transform] hover:bg-ink-2 focus-visible:ring-2 focus-visible:ring-ink/25 motion-safe:active:scale-[0.98]"
      >
        Try again
      </button>
    </div>
  );
}
