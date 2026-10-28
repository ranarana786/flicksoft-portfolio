"use client";

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Pause, Play } from "lucide-react";
import type { HeroSlide } from "@/data/hero-slides";

interface SlideCounterProps {
  slides: HeroSlide[];
  active: number;
  /** Progress is frozen (user pause or hidden tab). */
  paused: boolean;
  /** Explicit user pause — drives the play/pause button. */
  userPaused: boolean;
  duration: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onTogglePause: () => void;
  onProgressEnd: () => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Slide indicator: large active index, total, segmented progress track
 * (one segment per slide, the active one fills over `duration`) and controls.
 * Vertical rail on desktop, horizontal bar on mobile.
 */
export function SlideCounter({
  slides,
  active,
  paused,
  userPaused,
  duration,
  onSelect,
  onPrev,
  onNext,
  onTogglePause,
  onProgressEnd,
}: SlideCounterProps) {
  return (
    <div className="flex items-center gap-5 md:flex-col md:gap-6">
      {/* Index */}
      <div className="flex items-baseline gap-1.5 tabular-nums md:flex-col md:items-center md:gap-1">
        <span
          key={active}
          className="animate-fade-up text-3xl font-semibold leading-none text-white md:text-4xl"
        >
          {pad(active + 1)}
        </span>
        <span className="text-xs font-medium tracking-[0.2em] text-white/50">
          / {pad(slides.length)}
        </span>
      </div>

      {/* Segmented progress track */}
      <ol className="flex flex-1 gap-1.5 md:flex-none md:flex-col">
        {slides.map((slide, i) => {
          const isActive = i === active;
          return (
            <li key={slide.id} className="group relative flex-1 md:flex-none">
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`Go to slide ${i + 1}: ${slide.service}`}
                aria-current={isActive ? "true" : undefined}
                className="flex h-6 w-full cursor-pointer items-center md:h-auto md:w-6 md:justify-center md:py-1"
              >
                <span
                  className={`relative block h-[3px] w-full overflow-hidden rounded-full transition-colors duration-300 md:h-10 md:w-[3px] ${
                    i < active ? "bg-white/70" : "bg-white/20 group-hover:bg-white/40"
                  }`}
                >
                  {isActive && (
                    <span
                      key={`${active}-progress`}
                      onAnimationEnd={onProgressEnd}
                      style={{
                        animationDuration: `${duration}ms`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                      className="absolute inset-0 origin-left animate-fill-x rounded-full bg-white md:origin-top md:animate-fill-y"
                    />
                  )}
                </span>
              </button>

              {/* Hover / active label (desktop) */}
              <span
                className={`pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 md:block ${
                  isActive
                    ? "translate-x-0 text-white opacity-100"
                    : "translate-x-2 text-white/70 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
              >
                {slide.service}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Controls */}
      <div className="flex items-center gap-2 md:flex-col">
        <ControlButton label="Previous slide" onClick={onPrev}>
          <ChevronUp className="hidden size-4 md:block" />
          <ChevronLeft className="size-4 md:hidden" />
        </ControlButton>
        <ControlButton
          label={userPaused ? "Play slideshow" : "Pause slideshow"}
          onClick={onTogglePause}
        >
          {userPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
        </ControlButton>
        <ControlButton label="Next slide" onClick={onNext}>
          <ChevronDown className="hidden size-4 md:block" />
          <ChevronRight className="size-4 md:hidden" />
        </ControlButton>
      </div>
    </div>
  );
}

function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-9 cursor-pointer place-items-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-[#0b1a2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {children}
    </button>
  );
}
