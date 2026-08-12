export function SetupNotice() {
  const steps = [
    "Create a project at supabase.com (free tier is fine).",
    "In the SQL editor, run the schema from supabase/schema.sql.",
    "Copy .env.local.example to .env.local and paste your Project URL + anon key.",
    "Restart the dev server, then sign up here and promote yourself to admin (SQL at the bottom of schema.sql).",
  ];
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-16">
      <span className="font-wordmark text-lg font-medium tracking-tight text-neutral-950">
        71labs
      </span>
      <h1 className="mt-6 text-2xl font-medium tracking-tight text-neutral-950">
        Connect Supabase to open the panel
      </h1>
      <p className="mt-3 text-sm text-neutral-500">
        The company panel needs a database. It takes a couple of minutes:
      </p>
      <ol className="mt-6 space-y-3">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3 text-sm text-neutral-700">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-950 font-mono text-[11px] text-white">
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
      <a
        href="/"
        className="mt-8 inline-flex w-fit items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-950"
      >
        ← Back to the site
      </a>
    </div>
  );
}
