export const aboutHero = {
  tag: "About us",
  heading: "One company, two disciplines.",
  text: "FlickSoft puts verified IT engineers on site across Europe and builds software with its own developers, from offices in the United States and Germany.",
  stats: [
    { value: "2", caption: "Offices, in the United States and Germany" },
    { value: "12", caption: "European countries with confirmed coverage" },
    { value: "7", caption: "IT services, from surveys to staffing" },
    { value: "5", caption: "Software services, from design to QA" },
  ],
};

export const aboutStory = {
  tag: "Our story",
  heading: "Built for the work that falls between suppliers",
  text: "A new company with a narrow idea, and the discipline to stick to it.",
  lead: "Most multi-country IT contracts don't fail on technology. They fail when an engineer turns up at the wrong site, can't speak to the people there, or leaves without proof the job was done.",
  paragraphs: [
    "FlickSoft exists to close that gap: verified engineers, assessed in the local language, who leave photographs and test results on every job, whether we hold the contract or work white-label for the firm that does.",
    "Alongside the field work, our own developers design, build and maintain software, so the company that installs the network can also build the tools that run on it.",
    "We are open about being new. Where we are aligned rather than certified, we say so. Where we source per project, we say so. It's the standard we would want from a supplier ourselves.",
  ],
};

export const principles = {
  tag: "What we stand for",
  heading: "Three rules we hold ourselves to",
  text: "They shape every quote, every engineer we put forward and every line on this website.",
  items: [
    {
      title: "Say what's true",
      text: "Aligned is not certified. Sourced per project is not blanket coverage. We keep those claims apart on purpose.",
    },
    {
      title: "Answer in writing",
      text: "Coverage, quotes and closeout are written down, so nobody has to remember what was promised on a call.",
    },
    {
      title: "Same standard, any contract",
      text: "Direct or white-label, the engineer on site passes the same checks and follows the same process.",
    },
  ],
};

export interface Office {
  id: string;
  country: string;
  /** TODO: confirm the real city with FlickSoft; drives the photo, pin and clock. */
  city: string;
  region: string;
  timeZone: string;
  lat: number;
  lng: number;
  image: { src: string; alt: string };
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&h=1050&q=80`;

export const offices = {
  tag: "Offices",
  heading: "Two offices, one team",
  text: "One side of the Atlantic each, so there is always someone awake when a site needs an answer.",
  items: [
    {
      id: "usa",
      country: "United States",
      city: "New York",
      region: "North America",
      timeZone: "America/New_York",
      lat: 40.71,
      lng: -74.0,
      image: {
        src: unsplash("1534430480872-3498386e7856"),
        alt: "Manhattan skyline with the Empire State Building, New York",
      },
    },
    {
      id: "germany",
      country: "Germany",
      city: "Berlin",
      region: "Europe",
      timeZone: "Europe/Berlin",
      lat: 52.52,
      lng: 13.4,
      image: {
        src: unsplash("1599946347371-68eb71b16afc"),
        alt: "Berlin skyline with the TV tower and the river Spree",
      },
    },
  ] satisfies Office[],
};
