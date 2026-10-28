import { PageHeader } from "@/components/ui/PageHeader";
import { StatsRow } from "@/components/ui/StatsRow";
import { howWeWorkHero } from "@/data/how-we-work";

/**
 * How We Work hero: the shared inner-page header, with the tender numbers
 * along the bottom edge — the hard facts a buyer copies first.
 */
export function PageHero() {
  const { tag, heading, text, statsLabel, stats } = howWeWorkHero;

  return (
    <PageHeader id="how-we-work-title" tag={tag} title={heading} text={text}>
      <StatsRow label={statsLabel} stats={stats} />
    </PageHeader>
  );
}
