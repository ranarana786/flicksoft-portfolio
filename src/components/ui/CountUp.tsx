"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** e.g. "12", "1 hour", "2 working days". Non-numeric values render as-is. */
  value: string;
  /** Animation length in ms. */
  duration?: number;
  className?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts the leading number of `value` up from 0 the first time it scrolls
 * into view. Server HTML carries the final value (SEO, no-JS), and
 * reduced-motion users never see the animation.
 */
export function CountUp({ value, duration = 1400, className = "" }: CountUpProps) {
  const match = value.match(/^(\d+)([\s\S]*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState<number | null>(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null || target === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    setCurrent(0);

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setCurrent(Math.round(easeOutCubic(t) * target));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  if (target === null) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {/* Screen readers get the final value, not every intermediate frame */}
      <span aria-hidden>
        {current}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
