import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  /** id for the heading, referenced by the section's aria-labelledby. */
  id: string;
  tag: string;
  title: string;
  text: string;
  /** "light" for white / cream sections, "dark" for brand / navy ones. */
  tone?: "light" | "dark";
  /** "split": title left, intro right. "stacked": tag, title, intro in one column. */
  layout?: "split" | "stacked";
  /** Page heroes use h1; sections use h2. */
  as?: "h1" | "h2";
}

/**
 * Shared section opener: slanted tag, heading and intro. Every section uses it
 * so type scale, colour and alignment never drift between pages.
 */
export function SectionHeader({
  id,
  tag,
  title,
  text,
  tone = "light",
  layout = "split",
  as: Heading = "h2",
}: SectionHeaderProps) {
  const dark = tone === "dark";
  const split = layout === "split";

  return (
    <Reveal className={split ? "grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12" : ""}>
      <div className={split ? "lg:col-span-8" : ""}>
        <SectionTag tone={tone}>{tag}</SectionTag>
        <Heading
          id={id}
          className={`mt-5 text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl ${
            dark ? "text-white" : "text-brand"
          }`}
        >
          {title}
        </Heading>
      </div>
      <p
        className={`text-base leading-relaxed sm:text-lg ${
          split ? "max-w-sm lg:col-span-4 lg:justify-self-end lg:pb-2" : "mt-6 max-w-md"
        } ${dark ? "text-white/70" : "text-slate-600"}`}
      >
        {text}
      </p>
    </Reveal>
  );
}

/** Parallelogram label: both side edges slanted via clip-path. */
export function SectionTag({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`inline-block py-2 pl-5 pr-[1.15rem] text-xs font-semibold uppercase tracking-[0.2em] [clip-path:polygon(10px_0,100%_0,calc(100%-10px)_100%,0_100%)] ${
        tone === "dark" ? "bg-white text-brand" : "bg-brand text-white"
      }`}
    >
      {children}
    </p>
  );
}
