import Link from "next/link";
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { chainIntro, chainSteps } from "@/data/delivery-chain";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The delivery chain drawn as a route rather than three cards:
 *   client ──tender──▶ prime ──white-label──▶ FlickSoft
 *      └──────────── direct route ─────────────▲
 * Desktop runs left → right; mobile runs top → bottom on a vertical rail.
 */
interface DeliveryChainProps {
  /** Overrides the section tag (the How We Work page uses its own label). */
  tag?: string;
  /** Link through to the full How We Work page — on for the home page. */
  showPageLink?: boolean;
}

export function DeliveryChain({ tag = chainIntro.tag, showPageLink = true }: DeliveryChainProps) {
  return (
    <section
      id="delivery-chain"
      aria-labelledby="delivery-chain-title"
      className="bg-brand py-24 text-white lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeader
          id="delivery-chain-title"
          tag={tag}
          title={chainIntro.heading}
          text={chainIntro.text}
          tone="dark"
        />

        <Reveal delay={150} className="relative mt-16 lg:mt-24 lg:pt-20">
          {/* Direct route (desktop): bracket from the client's node to ours */}
          <div
            aria-hidden
            className="absolute left-6 right-[calc(33.333%-1.5rem)] top-0 hidden h-[4.5rem] rounded-t-2xl border-x border-t border-dashed border-white/40 lg:block"
          >
            <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-brand px-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
              Direct · {chainIntro.direct}
            </span>
            <ChevronDown className="absolute -bottom-2 -right-[9px] size-4 text-white/60" />
          </div>

          <ol className="grid lg:grid-cols-3">
            {chainSteps.map((step, i) => {
              const last = i === chainSteps.length - 1;
              return (
                <li key={step.id} className="flex gap-6 lg:block lg:pr-10">
                  {/* Rail: node + connector (vertical on mobile, horizontal on desktop) */}
                  <div className="flex flex-col items-center lg:flex-row">
                    <span
                      className={`grid size-12 shrink-0 place-items-center rounded-full text-sm font-semibold tabular-nums ${
                        step.isUs
                          ? "bg-white text-brand shadow-[0_0_0_6px_rgba(255,255,255,0.12)]"
                          : "border border-white/40 text-white"
                      }`}
                    >
                      {pad(i + 1)}
                    </span>
                    {!last && (
                      <span className="relative my-2 w-px flex-1 bg-white/30 lg:mx-4 lg:my-0 lg:h-px lg:w-auto">
                        <span className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 lg:block">
                          {step.handoff}
                        </span>
                        <ArrowRight className="absolute -right-1 top-1/2 hidden size-4 -translate-y-1/2 text-white/60 lg:block" />
                      </span>
                    )}
                  </div>

                  <div className={`pb-12 lg:pb-0 ${last ? "pb-0" : ""}`}>
                    <div
                      className={`lg:mt-8 ${
                        step.isUs
                          ? "-mt-1 rounded-xl bg-white p-6 text-brand lg:-ml-6"
                          : "pt-2 lg:pt-0"
                      }`}
                    >
                      <p
                        className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                          step.isUs ? "text-brand/70" : "text-brand-accent"
                        }`}
                      >
                        {step.role}
                      </p>
                      <h3
                        className={`mt-3 text-2xl font-semibold tracking-tight ${
                          step.isUs ? "text-brand" : "text-white"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`mt-3 max-w-[38ch] text-[15px] leading-relaxed ${
                          step.isUs ? "text-slate-600" : "text-white/70"
                        }`}
                      >
                        {step.text}
                      </p>
                    </div>

                    {/* Mobile: handoff label sits under the step, pointing down the rail */}
                    {!last && (
                      <p className="mt-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 lg:hidden">
                        <ArrowDown className="size-3.5" />
                        {step.handoff}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Direct route (mobile) */}
          <p className="mt-10 border-t border-dashed border-white/30 pt-6 text-sm text-white/70 lg:hidden">
            <span className="font-semibold text-white">Or go direct:</span> {chainIntro.direct}.
          </p>
        </Reveal>

        {showPageLink && (
          <Reveal className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-8 lg:mt-20">
            <p className="text-white/70">{chainIntro.pageLink.text}</p>
            <Link
              href={chainIntro.pageLink.href}
              className="group inline-flex items-center gap-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                {chainIntro.pageLink.label}
              </span>
              <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-2" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
