import { operatingStandards } from "@/data/standards";

const LABEL = "Operating standards";

/**
 * Credentials row anchored to the bottom of the hero. Plain type with hairline
 * dividers, so it reads as a statement of fact rather than a row of badges.
 * Desktop: one line across the container. Mobile: compact wrapped list.
 */
export function OperatingStandards() {
  return (
    <>
      {/* Desktop / tablet */}
      <div className="animate-fade-up absolute inset-x-0 bottom-0 hidden md:block [animation-delay:600ms]">
        <div className="mx-auto max-w-7xl px-10 lg:px-16">
          <div className="flex items-center gap-8 border-t border-white/15 py-6 md:pr-20 2xl:pr-0">
            <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
              {LABEL}
            </p>
            <ul aria-label={LABEL} className="flex flex-wrap items-center gap-y-2">
              {operatingStandards.map(({ name, qualifier }) => (
                <li
                  key={name}
                  className="border-l border-white/15 px-5 text-sm text-white first:border-l-0 first:pl-0"
                >
                  <span className="font-semibold">{name}</span>
                  {qualifier && <span className="ml-1.5 text-white/55">{qualifier}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="animate-fade-up absolute inset-x-6 bottom-24 sm:inset-x-10 md:hidden [animation-delay:600ms]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
          {LABEL}
        </p>
        <ul
          aria-label={LABEL}
          className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[13px] text-white"
        >
          {operatingStandards.map(({ name, qualifier }) => (
            <li key={name}>
              <span className="font-semibold">{name}</span>
              {qualifier && <span className="ml-1 text-white/55">{qualifier}</span>}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
