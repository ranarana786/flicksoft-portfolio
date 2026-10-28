import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { reasons, whyChooseUs } from "@/data/why-choose-us";
import { FlipCard } from "./FlipCard";

/**
 * Desktop layout (3 columns):
 *   row 1:  [1]  [2, highlighted, dropped]  [3]
 *   row 2:  [4]                             [5]
 * Tablet: 2 columns with the last card centred. Mobile: horizontal swipe.
 */
const placement = [
  "md:w-auto",
  "md:w-auto lg:mt-14",
  "md:w-auto",
  "md:w-auto lg:col-start-1",
  "md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)] lg:col-span-1 lg:col-start-3 lg:mx-0 lg:w-auto",
];

/** Reveal order on desktop: row 1 left → right, then row 2. */
const STAGGER = 120;

export function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-title"
      className="bg-white py-24 text-[#0b1a2e] lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeader
          id="why-choose-us-title"
          tag={whyChooseUs.eyebrow}
          title={whyChooseUs.heading}
          text={whyChooseUs.text}
        />

        {/* Mobile: horizontal swipe with a peek of the next card; md+: staggered grid */}
        <ul className="no-scrollbar -mx-6 mt-16 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 sm:-mx-10 sm:scroll-px-10 sm:px-10 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {reasons.map(({ id, icon: Icon, label, summary, detail }, i) => (
            <li key={id} className={`w-[82%] shrink-0 snap-start sm:w-[60%] ${placement[i]}`}>
              <Reveal delay={(i % 3) * STAGGER} className="h-full">
                <FlipCard
                  icon={<Icon className="size-6" strokeWidth={1.6} />}
                  label={label}
                  summary={summary}
                  detail={detail}
                  highlighted={i === 1}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
