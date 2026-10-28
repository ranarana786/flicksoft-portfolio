"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { serviceGroups } from "@/data/services";
import { ServiceCard } from "./ServiceCard";

const pad = (n: number) => String(n).padStart(2, "0");


interface TrackState {
  first: number;
  progress: number;
  atStart: boolean;
  atEnd: boolean;
}

/**
 * Tabbed, horizontally scrolling service slider. Native scroll-snap handles
 * swipe / trackpad / keyboard scrolling; JS only drives tabs, arrows and the
 * progress read-out.
 */
export function ServicesSlider() {
  const [activeId, setActiveId] = useState(serviceGroups[0].id);
  const [switched, setSwitched] = useState(false);
  const [state, setState] = useState<TrackState>({
    first: 1,
    progress: 0,
    atStart: true,
    atEnd: false,
  });
  const trackRef = useRef<HTMLUListElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const frame = useRef(0);

  const group = serviceGroups.find((g) => g.id === activeId) ?? serviceGroups[0];
  const total = group.services.length;

  /** Width of one card plus the gap: the distance one arrow press moves. */
  const getStep = () => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return 0;
    return card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
  };

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = getStep() || 1;
    const max = track.scrollWidth - track.clientWidth;
    const atEnd = track.scrollLeft >= max - 2;
    setState({
      first: atEnd ? total : Math.min(Math.round(track.scrollLeft / step) + 1, total),
      progress: max <= 0 ? 1 : track.scrollLeft / max,
      atStart: track.scrollLeft <= 2,
      atEnd,
    });
  }, [total]);

  const onScroll = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(measure);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: 0, behavior: "instant" });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [activeId, measure]);

  const scroll = (dir: 1 | -1) =>
    trackRef.current?.scrollBy({ left: dir * getStep(), behavior: "smooth" });

  const selectTab = (id: string) => {
    if (id === activeId) return;
    setSwitched(true);
    setActiveId(id);
  };

  // WAI-ARIA tabs: arrow keys move between tabs.
  const onTabKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      (i + (e.key === "ArrowRight" ? 1 : -1) + serviceGroups.length) % serviceGroups.length;
    selectTab(serviceGroups[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      {/* Tabs + navigation */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-slate-300 pt-6">
          <div role="tablist" aria-label="Service categories" className="flex gap-8 sm:gap-10">
            {serviceGroups.map((g, i) => {
              const selected = g.id === activeId;
              return (
                <button
                  key={g.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`services-tab-${g.id}`}
                  aria-selected={selected}
                  aria-controls={`services-panel-${g.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(g.id)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className={`relative cursor-pointer pb-2 text-left text-lg font-semibold tracking-tight transition-colors sm:text-2xl ${
                    selected ? "text-brand" : "text-slate-400 hover:text-slate-600"
                  } focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand`}
                >
                  {g.label}
                  <sup className="ml-1 text-xs font-medium tabular-nums">
                    {pad(g.services.length)}
                  </sup>
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand transition-transform duration-500 ${
                      selected ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-5">
            <p className="text-sm tabular-nums text-slate-500" aria-live="polite">
              <span className="font-semibold text-[#0b1a2e]">{pad(state.first)}</span> /{" "}
              {pad(total)}
            </p>
            <div className="flex">
              <ArrowButton
                label="Previous services"
                disabled={state.atStart}
                onClick={() => scroll(-1)}
              >
                <ArrowLeft className="size-5" />
              </ArrowButton>
              <ArrowButton label="Next services" disabled={state.atEnd} onClick={() => scroll(1)}>
                <ArrowRight className="size-5" />
              </ArrowButton>
            </div>
          </div>
        </div>
      </div>

      {/* Track: whole cards only — 1 / 2 / 3 per view, no partial card at the edge */}
      <div
        role="tabpanel"
        id={`services-panel-${group.id}`}
        aria-labelledby={`services-tab-${group.id}`}
        className="mx-auto mt-10 max-w-7xl px-6 sm:px-10 lg:px-16"
      >
        <ul
          key={group.id}
          ref={trackRef}
          onScroll={onScroll}
          aria-label={`${group.label} services`}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 lg:gap-8"
        >
          {group.services.map((service, i) => (
            <li
              key={service.id}
              style={switched ? { animationDelay: `${i * 70}ms` } : undefined}
              className={`w-full shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4rem)/3)] ${
                switched ? "animate-fade-up" : ""
              }`}
            >
              <ServiceCard service={service} index={i} category={group.label} />
            </li>
          ))}
        </ul>
      </div>

      {/* Progress */}
      <div className="mx-auto mt-12 max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="h-px bg-slate-300">
          <div
            className="h-px origin-left bg-brand transition-transform duration-300"
            style={{ transform: `scaleX(${Math.max(state.progress, 1 / total)})` }}
          />
        </div>
      </div>
    </div>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="-ml-px grid size-12 cursor-pointer place-items-center border border-slate-300 text-[#0b1a2e] transition-colors first:ml-0 hover:border-brand hover:bg-brand hover:text-white focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:border-slate-300 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}
