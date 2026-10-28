export interface QuestionFact {
  label: string;
  value: string;
}

export interface BuyerQuestion {
  id: string;
  question: string;
  answer: string;
  facts: QuestionFact[];
}

export const questionsIntro = {
  eyebrow: "Before you shortlist",
  heading: "The three questions IT managers ask us first.",
  text: "Answered the way we would answer them on a call, without the sales pitch.",
};

export const buyerQuestions: BuyerQuestion[] = [
  {
    id: "coverage",
    question: "Can you actually cover all our sites, or only the easy ones?",
    answer:
      "We answer per site, in writing, before you commit. Priority, core and wider-Europe markets are labelled differently on purpose. Where we source per project we say so rather than claiming blanket coverage.",
    facts: [
      { label: "Countries", value: "12 confirmed" },
      { label: "Answer", value: "Per site, in writing" },
      { label: "Turnaround", value: "2 working days" },
    ],
  },
  {
    id: "language",
    question: "Will the engineer speak the language of my site?",
    answer:
      "Every engineer is assessed at CEFR B2 or above in the local working language plus technical English. Language, not skill, is the most common cause of a failed on-site visit.",
    facts: [
      { label: "Standard", value: "CEFR B2 minimum" },
      { label: "Assessed", value: "Before deployment" },
      { label: "Also", value: "Technical English" },
    ],
  },
  {
    id: "proof",
    question: "How do I know the work was actually done properly?",
    answer:
      "Photographs, test results, as-built notes and a completion confirmation on every job, the day it's done. You never chase us for evidence, and the survey report is the deliverable on survey work.",
    facts: [
      { label: "Closeout", value: "Same day" },
      { label: "Evidence", value: "Photos + tests" },
      { label: "Process", value: "ITIL-aligned" },
    ],
  },
];

export const questionsCta = {
  text: "Have a question that isn't here?",
  label: "Ask an engineer",
  href: "/contact",
};
