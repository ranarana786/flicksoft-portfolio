import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

interface StatsRowProps {
  label?: string;
  stats: { value: string; caption: string }[];
}

/** Big counted-up figures along the bottom of an inner-page hero (dark). */
export function StatsRow({ label, stats }: StatsRowProps) {
  return (
    <Reveal delay={150} className="mt-20 border-t border-white/15 pb-20 pt-8 lg:mt-28">
      {label && (
        <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
          {label}
        </p>
      )}
      <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.caption}
            className={`flex flex-col gap-3 pr-6 ${
              i % 2 === 1 ? "border-l border-white/15 pl-6" : ""
            } ${i > 0 ? "lg:border-l lg:border-white/15 lg:pl-8" : "lg:pl-0"}`}
          >
            <dt className="max-w-[24ch] text-sm leading-relaxed text-white/60">{stat.caption}</dt>
            <dd className="order-first text-4xl font-bold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              <CountUp value={stat.value} />
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
