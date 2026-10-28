export interface ChainStep {
  id: string;
  /** Small label above the title: who this party is in the chain. */
  role: string;
  title: string;
  text: string;
  /** Label on the arrow that leads to the next step. */
  handoff?: string;
  /** Marks FlickSoft's own position in the chain. */
  isUs?: boolean;
}

export const chainIntro = {
  tag: "How we work",
  heading: "Where we sit in the chain",
  text: "End clients buy from a prime. Primes buy from us where they have no engineers. Both routes end at the same people on the ground.",
  /** The route that skips the prime contractor. */
  direct: "one supplier, one contract",
  pageLink: {
    text: "How engineers are checked, and the standards we deliver to.",
    label: "See how we work",
    href: "/how-we-work",
  },
};

export const chainSteps: ChainStep[] = [
  {
    id: "end-client",
    role: "Who needs the work",
    title: "The end client",
    text: "A German manufacturer, a Dutch bank, a French retailer. They put IT support out to tender and want one supplier, not twelve.",
    handoff: "Tenders the contract",
  },
  {
    id: "prime-contractor",
    role: "Who wins the contract",
    title: "The prime contractor",
    text: "The large IT services firms that win those contracts. They are on the hook if response times are missed, but win work across fifteen sites while holding engineers in three cities.",
    handoff: "White-label subcontract",
  },
  {
    id: "delivery-partner",
    role: "Who does the work — us",
    title: "The delivery partner",
    text: "Engineers on the ground in both directions: direct for the client who wants one supplier, white-label for the prime who cannot reach the site.",
    isUs: true,
  },
];
