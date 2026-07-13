import { Reveal } from "./reveal";

/* ---------------------------------- icons --------------------------------- */

function IconHelix() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M6 3c0 4 12 5 12 9s-12 5-12 9M18 3c0 4-12 5-12 9s12 5 12 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconBeacon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 13v8M4 21h16M8 8l-3 3M16 8l3 3M9.5 4.5 8 3M14.5 4.5 16 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function IconAtlas() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="m8 9-3 3 3 3M16 9l3 3-3 3M13 7l-2 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -------------------------------- previews -------------------------------- */

/** Helix — replication streams flowing between two lanes. */
function HelixPreview() {
  const nodes = [0, 1, 2, 3];
  return (
    <svg viewBox="0 0 320 176" className="h-full w-full" fill="none">
      <defs>
        <linearGradient id="helixLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgb(var(--glow))" stopOpacity="0" />
          <stop offset="0.5" stopColor="rgb(var(--glow))" stopOpacity="0.9" />
          <stop offset="1" stopColor="rgb(var(--glow))" stopOpacity="0" />
        </linearGradient>
      </defs>
      {nodes.map((i) => {
        const y = 30 + i * 38;
        return (
          <g key={i}>
            <path
              d={`M74 ${y} C 150 ${y - 26}, 170 ${y + 26}, 246 ${y}`}
              stroke="url(#helixLine)"
              strokeWidth="1.5"
              strokeDasharray="4 7"
              style={{
                animation: `dashFlow ${5 + i}s linear infinite`,
                opacity: 0.8,
              }}
            />
            <circle cx="74" cy={y} r="4" fill="#e5e5e5" />
            <circle cx="246" cy={y} r="4" fill="rgb(var(--glow))" />
          </g>
        );
      })}
      <line x1="74" y1="18" x2="74" y2="158" stroke="rgba(255,255,255,0.1)" />
      <line x1="246" y1="18" x2="246" y2="158" stroke="rgba(255,255,255,0.1)" />
      <text x="60" y="172" className="fill-muted-foreground font-mono" fontSize="9" textAnchor="middle">
        local
      </text>
      <text x="260" y="172" className="fill-muted-foreground font-mono" fontSize="9" textAnchor="middle">
        replica
      </text>
    </svg>
  );
}

/** Beacon — trace waterfall of latency spans. */
function BeaconPreview() {
  const spans = [
    { x: 6, w: 78, label: "request", hot: false },
    { x: 20, w: 120, label: "resolve", hot: false },
    { x: 44, w: 60, label: "db.query", hot: true },
    { x: 110, w: 96, label: "render", hot: false },
    { x: 150, w: 40, label: "cache", hot: false },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-5 py-4">
      {spans.map((s, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="w-14 shrink-0 truncate font-mono text-[9px] text-muted-foreground">
            {s.label}
          </span>
          <div className="relative h-2 flex-1 rounded-full bg-white/[0.04]">
            <div
              className="absolute top-0 h-2 rounded-full"
              style={{
                left: `${s.x}%`,
                width: `${s.w / 2.6}%`,
                background: s.hot
                  ? "rgb(var(--glow))"
                  : "rgba(255,255,255,0.55)",
                boxShadow: s.hot
                  ? "0 0 12px rgba(var(--glow),0.6)"
                  : "none",
              }}
            />
          </div>
        </div>
      ))}
      <div className="mt-1 flex justify-between border-t border-border pt-2 font-mono text-[9px] text-muted-foreground">
        <span>0ms</span>
        <span>p99 · 214ms</span>
      </div>
    </div>
  );
}

/** Atlas — generated, type-safe client from a schema. */
function AtlasPreview() {
  return (
    <div className="flex h-full flex-col px-4 py-4">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 font-mono text-[9px] text-muted-foreground">
          client.ts
        </span>
      </div>
      <pre className="overflow-hidden font-mono text-[10.5px] leading-[1.7] text-muted-foreground">
        <span className="text-[rgb(var(--glow))]">const</span> user ={" "}
        <span className="text-foreground">await</span> atlas.
        <span className="text-foreground">users</span>
        {"\n"}  .find({"{"} id {"}"})
        {"\n"}  .<span className="text-foreground">select</span>({"{"} name,
        email {"}"});
        {"\n"}
        {"\n"}
        <span className="text-white/25">{"// fully typed, end to end"}</span>
        {"\n"}user.<span className="text-foreground">name</span>{" "}
        <span className="text-white/40">: string</span>
      </pre>
    </div>
  );
}

/* --------------------------------- data ----------------------------------- */

const PRODUCTS = [
  {
    name: "Helix",
    icon: <IconHelix />,
    desc: "A local-first sync engine — realtime, offline-ready, and conflict-free by construction.",
    tag: "Infrastructure",
    preview: <HelixPreview />,
  },
  {
    name: "Beacon",
    icon: <IconBeacon />,
    desc: "Tracing and observability designed for edge and serverless runtimes.",
    tag: "Developer tools",
    preview: <BeaconPreview />,
  },
  {
    name: "Atlas",
    icon: <IconAtlas />,
    desc: "Type-safe API clients generated straight from your schema, end to end.",
    tag: "Developer tools",
    preview: <AtlasPreview />,
  },
];

/* -------------------------------- section --------------------------------- */

export function Products() {
  return (
    <section id="products" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Products
        </p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl">
          Software we build, use, and ship.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Each product starts as an internal tool we needed — then hardens into
          something teams outside 71Labs can build on.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 90}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-white/20">
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(500px 200px at 50% -10%, rgba(130,141,248,0.1), transparent 70%)",
                }}
              />
              <div className="relative flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    {p.name}
                  </h3>
                  <span className="mt-1 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {p.tag}
                  </span>
                </div>
                <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                  {p.icon}
                </span>
              </div>

              <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>

              <div className="relative mt-6 h-44 overflow-hidden rounded-xl border border-border bg-[#0a0a0d] bg-grid-sm">
                <div className="absolute inset-0 mask-radial">{p.preview}</div>
              </div>

              <a
                href="#contact"
                className="relative mt-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors group-hover:text-foreground"
              >
                Learn more
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
