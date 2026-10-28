import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

interface PageHeaderProps {
  /** id for the h1, referenced by aria-labelledby. */
  id: string;
  /** Tag label; also used as the current breadcrumb item. */
  tag: string;
  title: string;
  text: string;
  /** Optional content under the heading (e.g. a stats row). */
  children?: React.ReactNode;
}

/**
 * Inner-page hero: same navy as the home hero, no imagery. Breadcrumb, then the
 * shared SectionHeader as the page's h1 — every inner page opens the same way.
 */
export function PageHeader({ id, tag, title, text, children }: PageHeaderProps) {
  return (
    <section aria-labelledby={id} className="bg-[#0b1a2e] pt-32 text-white lg:pt-44">
      <div
        className={`mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 ${children ? "" : "pb-20 lg:pb-28"}`}
      >
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-white/50">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="text-white/80">
              {tag}
            </li>
          </ol>
        </nav>

        <SectionHeader id={id} as="h1" tag={tag} title={title} text={text} tone="dark" />

        {children}
      </div>
    </section>
  );
}
