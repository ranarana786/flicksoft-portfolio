export interface EngagementModel {
  id: string;
  title: string;
  summary: string;
  /** Short answers for the comparison rows, keyed by specRows[].key. */
  specs: Record<SpecKey, string>;
  includes: string[];
  cta: { label: string; href: string };
  recommended?: boolean;
}

export type SpecKey = "bestFor" | "commitment" | "pricing";

export const specRows: { key: SpecKey; label: string }[] = [
  { key: "bestFor", label: "Best for" },
  { key: "commitment", label: "Commitment" },
  { key: "pricing", label: "Pricing" },
];

export const engagementIntro = {
  tag: "Pricing",
  heading: "Three ways to buy",
  text: "Rates are quoted per country and per skill level, because an engineer in Zürich doesn't cost what an engineer in Kraków costs.",
  note: "The rate card is a document, not a slider.",
  noteCta: { label: "Request the rate card", href: "/contact" },
};

export const engagementModels: EngagementModel[] = [
  {
    id: "per-assignment",
    title: "Per assignment",
    summary:
      "One job, one price, agreed before the engineer is dispatched. The simplest way to start.",
    specs: {
      bestFor: "One-off jobs and first projects",
      commitment: "None",
      pricing: "Fixed price per job",
    },
    includes: [
      "Quoted per country and skill level",
      "No minimum volume or commitment",
      "Documented closeout on every job",
      "Coverage confirmed before you commit",
    ],
    cta: { label: "Get a quote", href: "/contact" },
  },
  {
    id: "retained-coverage",
    title: "Retained coverage",
    summary:
      "A standing response commitment across an agreed list of sites, drawn down as tickets arrive.",
    specs: {
      bestFor: "Multi-site estates that need a response commitment",
      commitment: "Contract term, agreed site list",
      pricing: "Rate held for the contract term",
    },
    includes: [
      "Named response window per site",
      "Priority scheduling ahead of ad-hoc work",
      "Shared job tracker and monthly reporting",
      "A named contact who knows the account",
      "Rate held for the contract term",
    ],
    cta: { label: "Discuss coverage", href: "/contact" },
    recommended: true,
  },
  {
    id: "resident-engineer",
    title: "Resident engineer",
    summary:
      "One or more engineers assigned to you full time, for backfill, absence cover or a rollout peak.",
    specs: {
      bestFor: "Backfill, absence cover and rollout peaks",
      commitment: "Monthly or project length",
      pricing: "Per engineer, per month",
    },
    includes: [
      "Placed at service desk or specialist level",
      "Assessed against your skill profile",
      "Monthly or project-length terms",
      "Surge teams for rollout waves",
    ],
    cta: { label: "Talk about staffing", href: "/contact" },
  },
];
