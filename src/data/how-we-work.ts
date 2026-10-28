export const howWeWorkHero = {
  tag: "How we work",
  heading: "Checked before they are put forward.",
  text: "How work reaches us, how engineers are verified before they attend, and the standards we deliver to — whoever holds the contract.",
  statsLabel: "The numbers you will be asked about in the tender",
  stats: [
    { value: "12", caption: "European countries with confirmed coverage" },
    { value: "1 hour", caption: "On-site response in priority markets" },
    { value: "B2", caption: "Minimum assessed language level, local plus English" },
    { value: "2 days", caption: "Written coverage answer per site" },
  ],
};

export const engineerChecks = {
  tag: "Engineer standards",
  heading: "Verified engineers, not a list of names",
  text: "The same checks apply whoever holds the contract. Specific, verifiable, and completed before an engineer is put forward.",
  checks: [
    {
      title: "Verified engineers",
      text: "Every engineer is verified before we make them available. We're not a marketplace where anyone registers and claims a skill.",
    },
    {
      title: "CEFR B2 language minimum",
      text: "Assessed at B2 or above in the local working language, plus technical English. Language is the most common cause of on-site failure.",
    },
    {
      title: "Assessment before deployment",
      text: "Engineers are assessed against the assignment's skill profile before being put forward, to prevent avoidable escalation.",
    },
    {
      title: "Checks completed in advance",
      text: "Identity, right-to-work and documentation verified before an engineer attends. You never inherit that admin or risk.",
    },
    {
      title: "Documented closeout",
      text: "Photographs, test results, as-built notes and completion confirmation on every job. You never chase us for evidence.",
    },
    {
      title: "White-label where needed",
      text: "Where you are the contract holder, our engineers arrive in your name, in your ticketing system, following your process.",
    },
  ],
  compliance:
    "We act as a processor under GDPR Article 28, with a data processing agreement signed before access is granted. Delivery follows ITIL-aligned process and ISO 27001-aligned information security practice. Identity and right-to-work records are held in the EU.",
  cta: { label: "Read the answers on our standards", href: "#standards" },
};

export type StandardStatus = "certified" | "aligned" | "contractual";

export const accreditations = {
  tag: "Standards",
  heading: "Accreditations and frameworks",
  text: "Two different claims, kept apart on purpose.",
  legend: [
    {
      status: "certified" as StandardStatus,
      label: "Certified",
      text: "An auditor has issued a certificate we can send you.",
    },
    {
      status: "aligned" as StandardStatus,
      label: "Aligned",
      text: "We follow the framework without holding the certificate.",
    },
    {
      status: "contractual" as StandardStatus,
      label: "Contractual",
      text: "A legal role we take on in a signed agreement.",
    },
  ],
  items: [
    {
      name: "ISO 27001",
      area: "Information security",
      status: "aligned" as StandardStatus,
      statusLabel: "Aligned",
      detail: "Aligned practice, not yet certified.",
    },
    {
      name: "ITIL",
      area: "Service delivery",
      status: "aligned" as StandardStatus,
      statusLabel: "Aligned",
      detail: "Aligned delivery process: tickets, changes and closeout.",
    },
    {
      name: "GDPR Art. 28",
      area: "Data protection",
      status: "contractual" as StandardStatus,
      statusLabel: "Processor",
      detail: "Processor; data processing agreement signed before access.",
    },
  ],
};
