"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  engagementIntro,
  engagementModels,
  specRows,
  type EngagementModel,
} from "@/data/engagement";

const pad = (n: number) => String(n).padStart(2, "0");
const COLS = "grid-cols-[11rem_repeat(3,minmax(0,1fr))]";

/**
 * "Three ways to buy" as a rate-card document: a comparison sheet on desktop
 * (rows = what you compare, columns = how you buy, recommended column inked in
 * brand blue) and a tabbed, one-model-at-a-time view on mobile.
 */
export function EngagementModels() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="bg-[#f4f3ef] py-24 text-[#0b1a2e] lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeader
          id="pricing-title"
          tag={engagementIntro.tag}
          title={engagementIntro.heading}
          text={engagementIntro.text}
        />

        <Reveal delay={150} className="mt-14 lg:mt-20">
          <ComparisonSheet />
          <MobileTabs />
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4 text-slate-600">
          <p>{engagementIntro.note}</p>
          <Link
            href={engagementIntro.noteCta.href}
            className="group inline-flex items-center gap-3 font-semibold text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
              {engagementIntro.noteCta.label}
            </span>
            <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-2" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- desktop */

function ComparisonSheet() {
  /** Cell styling: the recommended column is inked brand blue top to bottom. */
  const cell = (m: EngagementModel, extra = "") =>
    `px-7 ${m.recommended ? "bg-brand text-white" : ""} ${extra}`;
  const rule = (m: EngagementModel) =>
    `border-t ${m.recommended ? "border-white/15" : "border-slate-200"}`;

  return (
    <div className="hidden rounded-xl bg-white p-3 ring-1 ring-slate-900/[0.06] lg:block">
      <div role="table" aria-label="Engagement models compared" className={`grid ${COLS}`}>
        {/* Head */}
        <div role="row" className="contents">
          <div role="columnheader" className="px-5 pt-8">
            <span className="sr-only">Compare</span>
          </div>
          {engagementModels.map((m, i) => (
            <div key={m.id} role="columnheader" className={cell(m, "rounded-t-lg pb-8 pt-8")}>
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`text-sm font-medium tabular-nums ${
                    m.recommended ? "text-brand-accent" : "text-brand"
                  }`}
                >
                  {pad(i + 1)}
                </span>
                {m.recommended && <RecommendedTag />}
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">{m.title}</h3>
              <p
                className={`mt-3 text-[15px] font-normal leading-relaxed ${
                  m.recommended ? "text-white/75" : "text-slate-600"
                }`}
              >
                {m.summary}
              </p>
            </div>
          ))}
        </div>

        {/* Spec rows */}
        {specRows.map((row) => (
          <div role="row" key={row.key} className="contents">
            <div
              role="rowheader"
              className="border-t border-slate-200 px-5 py-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              {row.label}
            </div>
            {engagementModels.map((m) => (
              <div
                key={m.id}
                role="cell"
                className={cell(m, `${rule(m)} py-5 text-[15px] font-semibold`)}
              >
                {m.specs[row.key]}
              </div>
            ))}
          </div>
        ))}

        {/* Includes */}
        <div role="row" className="contents">
          <div
            role="rowheader"
            className="border-t border-slate-200 px-5 py-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            Includes
          </div>
          {engagementModels.map((m) => (
            <div key={m.id} role="cell" className={cell(m, `${rule(m)} py-6`)}>
              <IncludesList model={m} />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div role="row" className="contents">
          <div role="cell" />
          {engagementModels.map((m) => (
            <div key={m.id} role="cell" className={cell(m, "rounded-b-lg pb-7 pt-2")}>
              <CtaButton model={m} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- mobile */

function MobileTabs() {
  const initial = Math.max(
    0,
    engagementModels.findIndex((m) => m.recommended),
  );
  const [active, setActive] = useState(initial);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const m = engagementModels[active];

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = engagementModels.length;
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + n) % n;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="lg:hidden">
      <div
        role="tablist"
        aria-label="Engagement models"
        className="grid grid-cols-3 rounded-lg bg-white p-1 ring-1 ring-slate-900/[0.06]"
      >
        {engagementModels.map((model, i) => {
          const selected = i === active;
          return (
            <button
              key={model.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`pricing-tab-${model.id}`}
              aria-selected={selected}
              aria-controls="pricing-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`cursor-pointer rounded-md px-2 py-3 text-[13px] font-semibold leading-tight transition-colors ${
                selected ? "bg-brand text-white" : "text-slate-600"
              }`}
            >
              {model.title}
            </button>
          );
        })}
      </div>

      <div
        key={m.id}
        role="tabpanel"
        id="pricing-panel"
        aria-labelledby={`pricing-tab-${m.id}`}
        className={`animate-fade-up mt-4 rounded-xl p-6 ring-1 ${
          m.recommended ? "bg-brand text-white ring-brand" : "bg-white ring-slate-900/[0.06]"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <span
            className={`text-sm font-medium tabular-nums ${
              m.recommended ? "text-brand-accent" : "text-brand"
            }`}
          >
            {pad(active + 1)}
          </span>
          {m.recommended && <RecommendedTag />}
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight">{m.title}</h3>
        <p
          className={`mt-3 text-[15px] leading-relaxed ${
            m.recommended ? "text-white/75" : "text-slate-600"
          }`}
        >
          {m.summary}
        </p>

        <dl className="mt-6">
          {specRows.map((row) => (
            <div
              key={row.key}
              className={`flex justify-between gap-6 border-t py-3 text-sm ${
                m.recommended ? "border-white/15" : "border-slate-200"
              }`}
            >
              <dt className={`shrink-0 ${m.recommended ? "text-white/60" : "text-slate-500"}`}>{row.label}</dt>
              <dd className="text-right font-semibold">{m.specs[row.key]}</dd>
            </div>
          ))}
        </dl>

        <div className={`border-t pt-5 ${m.recommended ? "border-white/15" : "border-slate-200"}`}>
          <IncludesList model={m} />
        </div>
        <div className="mt-6">
          <CtaButton model={m} />
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- shared */

function RecommendedTag() {
  return (
    <span className="bg-white py-1 pl-3.5 pr-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand [clip-path:polygon(7px_0,100%_0,calc(100%-7px)_100%,0_100%)]">
      Recommended
    </span>
  );
}

function IncludesList({ model }: { model: EngagementModel }) {
  return (
    <ul className="space-y-3">
      {model.includes.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-snug">
          <Check
            aria-hidden
            className={`mt-0.5 size-4 shrink-0 ${
              model.recommended ? "text-brand-accent" : "text-brand"
            }`}
          />
          <span className={model.recommended ? "text-white/85" : "text-slate-700"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CtaButton({ model }: { model: EngagementModel }) {
  return (
    <Link
      href={model.cta.href}
      className={`group flex w-full items-center justify-center gap-3 rounded-md py-4 text-xs font-bold uppercase tracking-[0.14em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
        model.recommended
          ? "bg-white text-brand hover:bg-brand-accent focus-visible:outline-white"
          : "bg-brand text-white hover:bg-[#0b1a2e] focus-visible:outline-brand"
      }`}
    >
      {model.cta.label}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
