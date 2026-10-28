export const contactIntro = {
  tag: "Get in touch",
  heading: "Tell us what you need",
  text: "IT support, a software project, or both. A written answer usually within two working days.",
};

export const needOptions = [
  { value: "it-support", label: "IT support" },
  { value: "software", label: "A software project" },
  { value: "both", label: "Both" },
  { value: "staffing", label: "Engineers for a contract we hold" },
  { value: "other", label: "Something else" },
] as const;

export type NeedValue = (typeof needOptions)[number]["value"];

export const nextSteps = [
  {
    title: "We read it properly",
    text: "An engineer or developer reads your enquiry, not an auto-responder.",
  },
  {
    title: "A written answer",
    text: "Usually within two working days, per site where coverage is involved.",
  },
  {
    title: "A call if it helps",
    text: "Only if there is something we need to understand before quoting.",
  },
];

export const formCopy = {
  messagePlaceholder: "12 sites across France and Belgium, rollout from March",
  submit: "Send enquiry",
  privacy: "We'll only use these details to answer your enquiry.",
  successTitle: "Thank you, your enquiry is in.",
  successText: "We'll reply in writing to the email you gave, usually within two working days.",
};
