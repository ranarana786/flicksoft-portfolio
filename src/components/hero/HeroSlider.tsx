"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AppWindow,
  ArrowRight,
  Code2,
  Headset,
  Network,
  PenTool,
  Presentation,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { HeroSlide, ServiceIcon } from "@/data/hero-slides";
import { OperatingStandards } from "./OperatingStandards";
import { SlideCounter } from "./SlideCounter";

interface HeroSliderProps {
  slides: HeroSlide[];
  /** Time each slide stays on screen, in ms. */
  duration?: number;
}

const SWIPE_THRESHOLD = 50;

const ICONS: Record<ServiceIcon, LucideIcon> = {
  headset: Headset,
  network: Network,
  presentation: Presentation,
  code: Code2,
  app: AppWindow,
  pen: PenTool,
};

export function HeroSlider({ slides, duration = 7000 }: HeroSliderProps) {
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const pointerStartX = useRef<number | null>(null);

  const count = slides.length;
  // Mount backgrounds lazily: everything already shown, plus the upcoming slide
  // so its image is decoded before the cross-fade starts.
  const [mounted, setMounted] = useState<ReadonlySet<number>>(() => new Set([0, 1 % count]));
  const paused = userPaused || tabHidden;

  const goTo = useCallback((i: number) => setActive(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    setMounted((prev) => {
      const upcoming = (active + 1) % count;
      if (prev.has(active) && prev.has(upcoming)) return prev;
      return new Set(prev).add(active).add(upcoming);
    });
  }, [active, count]);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      prev();
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") pointerStartX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const dx = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD) (dx < 0 ? next : prev)();
  };

  const slide = slides[active];
  const Icon = ICONS[slide.icon];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="FlickSoft services"
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      className="relative isolate h-svh min-h-[700px] w-full touch-pan-y overflow-hidden bg-[#0b1a2e] text-white"
    >
      {/* Backgrounds: stacked, cross-faded */}
      {slides.map((s, i) => {
        const isActive = i === active;
        return (
          <div
            key={s.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 -z-20 transition-opacity duration-[1200ms] ease-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            {mounted.has(i) && (
              <Image
                src={s.image.src}
                alt={s.image.alt}
                fill
                sizes="100vw"
                priority={i === 0}
                loading={i === 0 ? undefined : "eager"}
                quality={80}
                className={`object-cover ${isActive ? "animate-kenburns" : ""}`}
              />
            )}
          </div>
        );
      })}

      {/* Overlays for legibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b1a2e] via-[#0b1a2e]/75 to-[#0b1a2e]/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0b1a2e]/80 via-transparent to-[#0b1a2e]/30" />

      {/* Content */}
      <div className="mx-auto flex h-full max-w-7xl items-start px-6 pb-28 pt-28 sm:px-10 md:pb-0 md:pt-36 lg:pt-44 lg:px-16">
        <div
          key={slide.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${active + 1} of ${count}: ${slide.service}`}
          aria-live={paused ? "polite" : "off"}
          className="max-w-2xl"
        >
          <span className="animate-fade-up flex w-fit items-center gap-2.5 rounded-full border border-white/70 px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
            <span className="size-1.5 rounded-full bg-white" />
            {slide.category}
          </span>

          <div
            className="animate-fade-up mt-7 flex items-center gap-3"
            style={{ animationDelay: "80ms" }}
          >
            <span className="grid size-12 place-items-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">
              <Icon className="size-6" strokeWidth={1.75} />
            </span>
            <span className="text-sm font-medium text-white/85">{slide.service}</span>
          </div>

          <h1
            className="animate-fade-up mt-7 text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "160ms" }}
          >
            {slide.title}
          </h1>

          <p
            className="animate-fade-up mt-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            {slide.description}
          </p>

          <div className="animate-fade-up mt-12" style={{ animationDelay: "320ms" }}>
            <Link
              href={slide.href}
              className="group inline-flex items-center gap-3 rounded-md border-2 border-white px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:bg-white hover:text-[#0b1a2e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Learn More
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <OperatingStandards />

      {/* Counter: bottom bar on mobile, right rail on desktop */}
      <div className="absolute inset-x-6 bottom-8 sm:inset-x-10 md:inset-x-auto md:bottom-auto md:right-8 md:top-1/2 md:-translate-y-1/2 lg:right-12">
        <SlideCounter
          slides={slides}
          active={active}
          paused={paused}
          userPaused={userPaused}
          duration={duration}
          onSelect={goTo}
          onPrev={prev}
          onNext={next}
          onTogglePause={() => setUserPaused((p) => !p)}
          onProgressEnd={next}
        />
      </div>
    </section>
  );
}
