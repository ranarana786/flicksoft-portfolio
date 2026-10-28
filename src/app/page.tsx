import { DeliveryChain } from "@/components/chain/DeliveryChain";
import { EngagementModels } from "@/components/engagement/EngagementModels";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { BuyerQuestions } from "@/components/questions/BuyerQuestions";
import { Services } from "@/components/services/Services";
import { WhyChooseUs } from "@/components/why-choose-us/WhyChooseUs";
import { heroSlides } from "@/data/hero-slides";

export default function Home() {
  return (
    <main>
      <HeroSlider slides={heroSlides} />
      <WhyChooseUs />
      <Services />
      <DeliveryChain />
      <BuyerQuestions />
      <EngagementModels />
    </main>
  );
}
