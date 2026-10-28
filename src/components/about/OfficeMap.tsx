import DottedMap from "dotted-map";
import type { Office } from "@/data/about";

/** North Atlantic crop: both offices plus enough land to read as a map. */
const REGION = { lat: { min: 22, max: 62 }, lng: { min: -128, max: 32 } };

/**
 * Dotted map rendered on the server at build time: no third-party map script,
 * no tracking (relevant for a German company under GDPR), and only a few KB
 * of SVG. All dots are one <path> of zero-length segments with round caps.
 */
export function OfficeMap({ offices }: { offices: Office[] }) {
  const map = new DottedMap({ height: 44, grid: "diagonal", region: REGION });
  const points = map.getPoints();
  const width = Math.max(...points.map((p) => p.x)) + 1;
  const height = Math.max(...points.map((p) => p.y)) + 1;
  const dots = points.map((p) => `M${p.x} ${p.y.toFixed(2)}h0`).join("");

  const pins = offices.map((o) => ({ ...o, ...map.getPin({ lat: o.lat, lng: o.lng }) }));
  const [a, b] = pins;
  // Great-circle-ish arc: bow the line upwards between the two pins.
  const arc = `M${a.x} ${a.y} Q${(a.x + b.x) / 2} ${Math.min(a.y, b.y) - 16} ${b.x} ${b.y}`;

  return (
    <div className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 size-full"
        role="img"
        aria-label={`Map showing our offices in ${offices.map((o) => o.city).join(" and ")}`}
      >
        <path d={dots} stroke="rgba(255,255,255,0.22)" strokeWidth={0.5} strokeLinecap="round" />

        {/* Arc draws itself once the map scrolls into view */}
        <path
          d={arc}
          pathLength={1}
          fill="none"
          stroke="#8ec5ff"
          strokeWidth={0.35}
          strokeLinecap="round"
          className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] delay-300 duration-[1800ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-data-[visible=true]/reveal:[stroke-dashoffset:0] motion-reduce:[stroke-dashoffset:0] motion-reduce:transition-none"
        />

        {pins.map((pin) => (
          <g key={pin.id}>
            <circle
              cx={pin.x}
              cy={pin.y}
              r={1.6}
              fill="#8ec5ff"
              className="origin-center animate-ping opacity-60 [transform-box:fill-box] motion-reduce:animate-none"
            />
            <circle cx={pin.x} cy={pin.y} r={1.1} fill="#ffffff" />
          </g>
        ))}
      </svg>

      {/* HTML labels positioned in % of the map so they stay crisp at any size */}
      {pins.map((pin) => (
        <span
          key={pin.id}
          style={{ left: `${(pin.x / width) * 100}%`, top: `${(pin.y / height) * 100}%` }}
          className="absolute -translate-x-1/2 translate-y-3 whitespace-nowrap bg-white py-1 pl-3 pr-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand [clip-path:polygon(6px_0,100%_0,calc(100%-6px)_100%,0_100%)] sm:text-[11px]"
        >
          {pin.city}
        </span>
      ))}
    </div>
  );
}
