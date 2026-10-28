"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { CountUp } from "@/components/ui/CountUp";
import type { QuestionFact } from "@/data/questions";

interface QuestionRowProps {
  index: number;
  question: string;
  answer: string;
  facts: QuestionFact[];
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * One buyer question. Mobile: an accordion (question visible, answer + facts
 * collapse) to keep the page short. Desktop (lg+): always open, laid out on a
 * 12-col grid — the collapse wrappers switch to `display: contents` so their
 * children sit directly on that grid.
 */
export function QuestionRow({ index, question, answer, facts }: QuestionRowProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="group relative -mx-5 rounded-xl px-5 py-8 transition-[background-color,translate,box-shadow] duration-300 ease-out hover:z-10 hover:-translate-y-1.5 hover:bg-brand hover:shadow-[0_28px_60px_-24px_rgba(20,66,119,0.6)] motion-reduce:hover:translate-y-0 sm:-mx-8 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:gap-y-4 lg:py-14">
      <p className="text-sm font-medium tabular-nums text-brand transition-colors group-hover:text-brand-accent lg:col-span-2 lg:row-span-2">
        Q&thinsp;{pad(index + 1)}
      </p>

      <h3 className="mt-3 text-2xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-white sm:text-[1.75rem] lg:col-span-6 lg:col-start-3 lg:mt-0 lg:max-w-[24ch]">
        {/* Mobile: accordion trigger */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full cursor-pointer items-start justify-between gap-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand lg:hidden"
        >
          {question}
          <ChevronDown
            aria-hidden
            className={`mt-1.5 size-5 shrink-0 text-brand transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        {/* Desktop: plain heading, always expanded */}
        <span className="hidden lg:inline">{question}</span>
      </h3>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out lg:contents ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden lg:contents">
          <p className="mt-4 max-w-[56ch] text-[15px] leading-relaxed text-slate-600 transition-colors group-hover:text-white/75 sm:text-base lg:col-span-6 lg:col-start-3 lg:row-start-2 lg:mt-0">
            {answer}
          </p>

          <dl className="mt-6 border-t border-slate-200 transition-colors group-hover:border-white/15 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-start lg:border-t-0">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-baseline justify-between gap-6 border-b border-slate-200 py-3 text-sm transition-colors group-hover:border-white/15 first:lg:pt-0"
              >
                <dt className="text-slate-500 transition-colors group-hover:text-white/60">
                  {fact.label}
                </dt>
                <dd className="text-right font-semibold transition-colors group-hover:text-white">
                  <CountUp value={fact.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
