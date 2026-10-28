import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutStory } from "@/data/about";
import { megaMenus } from "@/data/navigation";

/**
 * The company story: argument pinned on the left, reading column on the right,
 * closing with the two halves of the business side by side.
 */
export function Story() {
  const { tag, heading, text, lead, paragraphs } = aboutStory;

  return (
    <section aria-labelledby="story-title" className="bg-white py-24 text-[#0b1a2e] lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:gap-12 lg:px-16">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionHeader id="story-title" tag={tag} title={heading} text={text} layout="stacked" />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="text-2xl font-semibold leading-snug tracking-tight text-brand sm:text-[1.75rem]">
              {lead}
            </p>
          </Reveal>
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={80 * (i + 1)}>
              <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">{p}</p>
            </Reveal>
          ))}

          {/* Two halves of one company */}
          <Reveal
            delay={150}
            className="mt-14 grid gap-px overflow-hidden rounded-xl bg-slate-900/[0.08] ring-1 ring-slate-900/[0.06] sm:grid-cols-2"
          >
            {megaMenus.map((menu) => (
              <div key={menu.id} className="bg-[#f4f3ef] p-6 sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                  {menu.label}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {menu.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[15px] text-[#0b1a2e] underline decoration-slate-400 decoration-dotted underline-offset-[5px] transition-colors hover:text-brand hover:decoration-solid"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
