import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { principles } from "@/data/about";

const pad = (n: number) => String(n).padStart(2, "0");

/** Three principles on brand blue, each led by a large outlined numeral. */
export function Principles() {
  const { tag, heading, text, items } = principles;

  return (
    <section aria-labelledby="principles-title" className="bg-brand py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeader id="principles-title" tag={tag} title={heading} text={text} tone="dark" />

        <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8 lg:mt-24 lg:gap-12">
          {items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 120} className="group border-t border-white/20 pt-8">
                {/* Outline numeral fills in as it enters, and again on hover */}
                <span
                  aria-hidden
                  className="block text-7xl font-bold leading-none tracking-[-0.04em] text-transparent transition-colors delay-300 duration-1000 [-webkit-text-stroke:1.5px_rgba(255,255,255,0.45)] group-hover:!text-white/30 group-hover:delay-0 group-hover:duration-300 group-data-[visible=true]/reveal:text-white/10 lg:text-8xl"
                >
                  {pad(i + 1)}
                </span>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-white/70 sm:text-base">
                  {item.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
