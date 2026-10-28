import type { LucideIcon } from "lucide-react";
import { Clock, Code2, Contact, FileSignature, Timer } from "lucide-react";

export interface Reason {
  id: string;
  icon: LucideIcon;
  /** Short uppercase label on the card front. */
  label: string;
  /** One-line promise on the card front. */
  summary: string;
  /** Expanded explanation revealed when the card flips. */
  detail: string;
}

export const whyChooseUs = {
  eyebrow: "Why choose us",
  heading: "Engineers on site, in the country where the problem is.",
  text: "Service desk, on-site support, network and data centre work across twelve European countries. One contract and a single point of contact, with engineers who speak the language of the site they attend.",
};

export const reasons: Reason[] = [
  {
    id: "rapid-response",
    icon: Timer,
    label: "Rapid Response",
    summary: "One-hour on-site response in our priority markets",
    detail:
      "The moment a ticket is raised, the nearest engineer is dispatched and on site within 60 minutes in our priority markets, with live ETA updates until they arrive.",
  },
  {
    id: "always-on",
    icon: Clock,
    label: "24/7 Cover",
    summary: "24/7 on-call and weekend cover, arranged per contract",
    detail:
      "Nights, weekends and public holidays are covered by an on-call rota built around your SLAs, so critical sites are never left waiting until Monday.",
  },
  {
    id: "single-contact",
    icon: Contact,
    label: "One Contact",
    summary: "One contract and a single point of contact for every site",
    detail:
      "However many countries and sites are involved, you deal with one named contact and one contract, not a chain of local subcontractors to chase.",
  },
  {
    id: "in-house-developers",
    icon: Code2,
    label: "In-House Team",
    summary: "Software built and maintained by our own developers",
    detail:
      "The people who design and build your software are the same team that supports it after launch, so knowledge stays with your product, not with a handover document.",
  },
  {
    id: "flexible-contracts",
    icon: FileSignature,
    label: "Flexible Contracts",
    summary: "Contract with a German UG or a UK Ltd, your choice",
    detail:
      "Sign with our German UG or our UK Ltd, whichever fits your procurement, invoicing and legal requirements best. Same team and same service either way.",
  },
];
