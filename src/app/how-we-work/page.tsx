import type { Metadata } from "next";
import { DeliveryChain } from "@/components/chain/DeliveryChain";
import { Accreditations } from "@/components/how-we-work/Accreditations";
import { PageHero } from "@/components/how-we-work/PageHero";
import { VerifiedEngineers } from "@/components/how-we-work/VerifiedEngineers";

export const metadata: Metadata = {
  title: "How We Work | FlickSoft",
  description:
    "Where FlickSoft sits in the delivery chain, how engineers are verified before they attend, and the standards we deliver to.",
};

export default function HowWeWorkPage() {
  return (
    <main>
      <PageHero />
      <VerifiedEngineers />
      <DeliveryChain tag="The delivery chain" showPageLink={false} />
      <Accreditations />
    </main>
  );
}
