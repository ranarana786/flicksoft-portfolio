import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { QuestionRow } from "./QuestionRow";
import { buyerQuestions, questionsCta, questionsIntro } from "@/data/questions";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: buyerQuestions.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

/**
 * Pre-sales objections, laid out as editorial rows (number · Q&A · facts)
 * rather than cards — same typographic system as the Services section.
 */
export function BuyerQuestions() {
  return (
    <section
      id="questions"
      aria-labelledby="questions-title"
      className="bg-white py-24 text-[#0b1a2e] lg:py-32"
    >
      <script
        type="application/ld+json"
        // Static, trusted content from our own data file.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeader
          id="questions-title"
          tag={questionsIntro.eyebrow}
          title={questionsIntro.heading}
          text={questionsIntro.text}
        />

        <ol className="mt-16 border-b border-slate-300 lg:mt-20">
          {buyerQuestions.map(({ id, question, answer, facts }, i) => (
            <li key={id} className="border-t border-slate-300">
              {/* Reveal owns the scroll-in translate; the row owns the hover lift */}
              <Reveal delay={i * 100}>
                <QuestionRow index={i} question={question} answer={answer} facts={facts} />
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-slate-600">{questionsCta.text}</p>
          <Link
            href={questionsCta.href}
            className="group inline-flex items-center gap-3 font-semibold text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
              {questionsCta.label}
            </span>
            <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-2" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
