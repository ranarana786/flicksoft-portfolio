import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { servicesIntro } from "@/data/services";
import { ServicesSlider } from "./ServicesSlider";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative bg-[#f4f3ef] py-24 text-[#0b1a2e] lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeader
          id="services-title"
          tag={servicesIntro.eyebrow}
          title={servicesIntro.heading}
          text={servicesIntro.text}
        />
      </div>

      <Reveal delay={150} className="mt-14 lg:mt-20">
        <ServicesSlider />
      </Reveal>
    </section>
  );
}
