import Link from "next/link";
import { ArrowDown, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { engineerChecks } from "@/data/how-we-work";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The six engineer checks as a vetting timeline: the argument stays pinned on
 * the left while the checks are read top to bottom on the right, like gates an
 * engineer passes before being put forward.
 */
export function VerifiedEngineers() {
  const { tag, heading, text, checks, compliance, cta } = engineerChecks;

  return (
    <section
      id="engineers"
      aria-labelledby="engineers-title"
      className="scroll-mt-24 bg-white py-24 text-[#0b1a2e] lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 lg:grid-cols-12 lg:gap-12 lg:px-16">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionHeader
            id="engineers-title"
            tag={tag}
            title={heading}
            text={text}
            layout="stacked"
          />

          <Reveal delay={100}>
            <p className="mt-10 border-l-2 border-brand pl-5 text-sm leading-relaxed text-slate-600">
              {compliance}
            </p>
            <Link
              href={cta.href}
              className="group mt-8 inline-flex items-center gap-3 font-semibold text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                {cta.label}
              </span>
              <ArrowDown className="size-5 transition-transform duration-500 group-hover:translate-y-1" />
            </Link>
          </Reveal>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {checks.map((check, i) => {
            const last = i === checks.length - 1;
            return (
              <li key={check.title}>
                <Reveal delay={i * 80} className="grid grid-cols-[3rem_1fr] gap-x-6">
                  {/* Gate marker + rail */}
                  <div className="flex flex-col items-center">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full border border-brand/30 bg-white text-brand">
                      <Check className="size-5" strokeWidth={2} />
                    </span>
                    {!last && <span aria-hidden className="w-px flex-1 bg-brand/20" />}
                  </div>

                  <div className={last ? "pb-0" : "pb-12"}>
                    <p className="pt-3.5 text-xs font-medium tabular-nums text-slate-500">
                      Check {pad(i + 1)}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                      {check.title}
                    </h3>
                    <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-slate-600 sm:text-base">
                      {check.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
