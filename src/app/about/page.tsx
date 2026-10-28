import type { Metadata } from "next";
import { Offices } from "@/components/about/Offices";
import { Principles } from "@/components/about/Principles";
import { Story } from "@/components/about/Story";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatsRow } from "@/components/ui/StatsRow";
import { aboutHero } from "@/data/about";

export const metadata: Metadata = {
  title: "About Us | FlickSoft",
  description:
    "FlickSoft puts verified IT engineers on site across Europe and builds software with its own developers, from offices in the United States and Germany.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        id="about-title"
        tag={aboutHero.tag}
        title={aboutHero.heading}
        text={aboutHero.text}
      >
        <StatsRow stats={aboutHero.stats} />
      </PageHeader>
      <Story />
      <Principles />
      <Offices />
    </main>
  );
}
