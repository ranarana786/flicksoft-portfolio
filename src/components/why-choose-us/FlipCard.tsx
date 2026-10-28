"use client";

import { RotateCw } from "lucide-react";
import { useRef, useState } from "react";

interface FlipCardProps {
  icon: React.ReactNode;
  label: string;
  summary: string;
  detail: string;
  /** Brand-filled front, like the centre card of the design. */
  highlighted?: boolean;
  className?: string;
}

/**
 * Mouse users flip the card by hovering (CSS only). Touch and keyboard users
 * have no hover, so a tap / Enter toggles it instead.
 */
export function FlipCard({
  icon,
  label,
  summary,
  detail,
  highlighted = false,
  className = "",
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const lastPointerType = useRef<string>("keyboard");

  const onClick = () => {
    if (lastPointerType.current !== "mouse") setFlipped((f) => !f);
    lastPointerType.current = "keyboard";
  };

  const face = "flex h-full flex-col rounded-xl p-8 [grid-area:1/1] backface-hidden";

  return (
    <button
      type="button"
      aria-pressed={flipped}
      onPointerDown={(e) => (lastPointerType.current = e.pointerType)}
      onClick={onClick}
      className={`group h-full w-full cursor-pointer text-left perspective-[1400px] focus-visible:outline-none ${className}`}
    >
      <span
        className={`grid h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] transform-3d group-hover:rotate-y-180 motion-reduce:transition-none ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <span
          className={`${face} ring-1 transition-shadow group-hover:shadow-[0_28px_60px_-24px_rgba(20,66,119,0.6)] group-focus-visible:ring-2 group-focus-visible:ring-brand ${
            highlighted
              ? "bg-brand text-white ring-brand"
              : "bg-[#f4f3ef] text-[#0b1a2e] ring-slate-900/[0.06]"
          }`}
        >
          <span
            className={`grid size-12 place-items-center rounded-lg ${
              highlighted
                ? "bg-white/15 text-white"
                : "bg-white text-brand ring-1 ring-slate-900/[0.06]"
            }`}
          >
            {icon}
          </span>
          <span
            className={`mt-6 text-[13px] font-bold uppercase tracking-[0.16em] ${
              highlighted ? "text-brand-accent" : "text-brand"
            }`}
          >
            {label}
          </span>
          <span className="mt-3 text-lg font-semibold leading-snug">{summary}</span>
          <span
            className={`mt-auto flex items-center gap-2 pt-6 text-xs font-medium ${
              highlighted ? "text-white/60" : "text-slate-500"
            }`}
          >
            <RotateCw className="size-3.5" />
            <span className="[@media(hover:hover)]:hidden">Tap for details</span>
            <span className="hidden [@media(hover:hover)]:inline">Hover for details</span>
          </span>
        </span>

        {/* Back */}
        <span className={`${face} rotate-y-180 bg-[#0b1a2e] text-white ring-1 ring-white/10`}>
          <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-brand-accent">
            {label}
          </span>
          <span className="mt-3 text-lg font-semibold leading-snug">{summary}</span>
          <span className="mt-4 text-[15px] leading-relaxed text-white/80">{detail}</span>
        </span>
      </span>
    </button>
  );
}
