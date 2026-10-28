import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { contactIntro, nextSteps } from "@/data/contact";
import { footerContact } from "@/data/footer";

export const metadata: Metadata = {
  title: "Contact | FlickSoft",
  description:
    "Tell us what you need: IT support, a software project, or both. A written answer usually within two working days.",
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        id="contact-title"
        tag={contactIntro.tag}
        title={contactIntro.heading}
        text={contactIntro.text}
      />

      <section
        aria-label="Enquiry form and contact details"
        className="bg-[#f4f3ef] py-20 text-[#0b1a2e] lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:gap-12 lg:px-16">
          {/* Form first on mobile: it's why people came */}
          <Reveal className="lg:order-2 lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </Reveal>

          <Reveal delay={100} className="lg:order-1 lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Email us directly
            </p>
            <a
              href={`mailto:${footerContact.email}`}
              className="mt-3 inline-block break-all text-2xl font-semibold tracking-tight text-brand underline decoration-brand/30 decoration-dotted underline-offset-[6px] transition-colors hover:decoration-solid"
            >
              {footerContact.email}
            </a>
            <a
              href={footerContact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-fit items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-brand"
            >
              LinkedIn
              <ArrowUpRight className="size-4" />
            </a>

            <h2 className="mt-14 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              What happens next
            </h2>
            <ol className="mt-5 border-b border-slate-300">
              {nextSteps.map((step, i) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[2.5rem_1fr] border-t border-slate-300 py-5"
                >
                  <span className="text-sm font-medium tabular-nums text-brand">{pad(i + 1)}</span>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
