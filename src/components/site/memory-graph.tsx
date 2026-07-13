"use client";

/**
 * A living knowledge-graph visual: a glowing core with labeled memory clusters
 * drifting around it and animated connection lines flowing inward.
 * Pure SVG + CSS keyframes — no runtime deps.
 */

const CX = 280;
const CY = 200;

const NODES = [
  { id: "notes", label: "Notes", x: 96, y: 78, r: 7, pct: "82%" },
  { id: "work", label: "Work", x: 470, y: 150, r: 8, pct: "67%" },
  { id: "reading", label: "Reading", x: 128, y: 300, r: 6, pct: "50%" },
  { id: "people", label: "People", x: 356, y: 330, r: 7, pct: "44%" },
  { id: "ideas", label: "Ideas", x: 452, y: 292, r: 5, pct: "38%" },
];

const SATELLITES = [
  { x: 190, y: 120, r: 2.5 },
  { x: 380, y: 96, r: 3 },
  { x: 224, y: 250, r: 2.5 },
  { x: 340, y: 168, r: 2 },
  { x: 150, y: 190, r: 2.5 },
  { x: 410, y: 220, r: 2 },
];

export function MemoryGraph() {
  return (
    <div className="relative h-full w-full">
      {/* ambient core glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(130,141,248,0.5), rgba(130,141,248,0.08) 60%, transparent 75%)",
          animation: "glowBreath 6s ease-in-out infinite",
        }}
      />

      <svg viewBox="0 0 560 400" className="relative h-full w-full" fill="none">
        {/* slow-rotating guide ring */}
        <g
          style={{
            transformOrigin: `${CX}px ${CY}px`,
            animation: "spinSlow 60s linear infinite",
          }}
        >
          <circle
            cx={CX}
            cy={CY}
            r="120"
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="2 8"
          />
          <circle
            cx={CX}
            cy={CY}
            r="168"
            stroke="rgba(255,255,255,0.04)"
            strokeDasharray="2 10"
          />
        </g>

        {/* connection lines */}
        {NODES.map((n, i) => (
          <line
            key={`l-${n.id}`}
            x1={CX}
            y1={CY}
            x2={n.x}
            y2={n.y}
            stroke="rgba(130,141,248,0.55)"
            strokeWidth="1.2"
            strokeDasharray="3 6"
            style={{ animation: `dashFlow ${6 + i}s linear infinite` }}
          />
        ))}
        {SATELLITES.map((s, i) => (
          <line
            key={`sl-${i}`}
            x1={CX}
            y1={CY}
            x2={s.x}
            y2={s.y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}

        {/* satellites */}
        {SATELLITES.map((s, i) => (
          <circle
            key={`s-${i}`}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="rgba(255,255,255,0.4)"
            style={{
              transformOrigin: `${s.x}px ${s.y}px`,
              animation: `drift ${7 + (i % 4)}s ease-in-out infinite`,
              ["--dx" as string]: `${(i % 2 ? 1 : -1) * 6}px`,
              ["--dy" as string]: `${(i % 3 ? -1 : 1) * 7}px`,
            }}
          />
        ))}

        {/* labeled cluster nodes */}
        {NODES.map((n, i) => (
          <g
            key={n.id}
            style={{
              transformOrigin: `${n.x}px ${n.y}px`,
              animation: `drift ${8 + i}s ease-in-out infinite`,
              ["--dx" as string]: `${(i % 2 ? -1 : 1) * 8}px`,
              ["--dy" as string]: `${(i % 2 ? 1 : -1) * 6}px`,
            }}
          >
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r + 5}
              fill="rgba(130,141,248,0.12)"
            />
            <circle cx={n.x} cy={n.y} r={n.r} fill="#ededed" />
            <text
              x={n.x + n.r + 8}
              y={n.y - 1}
              className="fill-foreground font-sans"
              fontSize="11"
              fontWeight="500"
            >
              {n.label}
            </text>
            <text
              x={n.x + n.r + 8}
              y={n.y + 11}
              className="fill-muted-foreground font-mono"
              fontSize="8.5"
            >
              {n.pct}
            </text>
          </g>
        ))}

        {/* core */}
        <g style={{ transformOrigin: `${CX}px ${CY}px`, animation: "corePulse 4s ease-in-out infinite" }}>
          <circle cx={CX} cy={CY} r="26" fill="rgba(130,141,248,0.18)" />
          <circle cx={CX} cy={CY} r="15" fill="#f4f4f5" />
          <circle cx={CX} cy={CY} r="15" stroke="rgba(130,141,248,0.6)" strokeWidth="1.5" />
        </g>
        <text x={CX} y={CY + 44} textAnchor="middle" className="fill-foreground font-sans" fontSize="11" fontWeight="500">
          your memory
        </text>
        <text x={CX} y={CY + 58} textAnchor="middle" className="fill-muted-foreground font-mono" fontSize="8.5">
          142 memories
        </text>
      </svg>
    </div>
  );
}
