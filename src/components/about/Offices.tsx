import Image from "next/image";
import { Clock } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { offices } from "@/data/about";
import { LocalTime } from "./LocalTime";
import { OfficeMap } from "./OfficeMap";

const pad = (n: number) => String(n).padStart(2, "0");

/** Map panel on brand blue, then one card per office with a wipe-in photo. */
export function Offices() {
  const { tag, heading, text, items } = offices;

  return (
    <section
      id="offices"
      aria-labelledby="offices-title"
      className="scroll-mt-24 bg-[#f4f3ef] py-24 text-[#0b1a2e] lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeader id="offices-title" tag={tag} title={heading} text={text} />

        <Reveal
          delay={100}
          className="mt-14 overflow-hidden rounded-xl bg-brand px-4 py-10 sm:px-10 lg:mt-20 lg:px-16 lg:py-16"
        >
          <OfficeMap offices={items} />
        </Reveal>

        <ul className="mt-8 grid gap-8 md:grid-cols-2">
          {items.map((office, i) => (
            <li key={office.id}>
              <Reveal delay={i * 150}>
                {/* Photo wipes in left → right as the card enters */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200 [clip-path:inset(0_100%_0_0_round_12px)] transition-[clip-path] delay-150 duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-data-[visible=true]/reveal:[clip-path:inset(0_0_0_0_round_12px)] motion-reduce:[clip-path:none] motion-reduce:transition-none">
                  <Image
                    src={office.image.src}
                    alt={office.image.alt}
                    fill
                    sizes="(min-width: 1280px) 560px, (min-width: 768px) 46vw, 100vw"
                    quality={85}
                    className="scale-110 object-cover transition-transform delay-150 duration-[1600ms] ease-out group-data-[visible=true]/reveal:scale-100 motion-reduce:scale-100"
                  />
                </div>

                <div className="mt-6 flex items-center gap-3 text-xs font-medium tabular-nums text-slate-500">
                  <span className="text-brand">{pad(i + 1)}</span>
                  <span aria-hidden className="h-px flex-1 bg-slate-300" />
                  <span>{office.region}</span>
                </div>
                <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-semibold tracking-tight text-brand">
                      {office.country}
                    </h3>
                    <p className="mt-1 text-slate-600">{office.city}</p>
                  </div>
                  <p className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock aria-hidden className="size-4 text-brand" />
                    <span className="sr-only">Local time:</span>
                    <LocalTime timeZone={office.timeZone} />
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
