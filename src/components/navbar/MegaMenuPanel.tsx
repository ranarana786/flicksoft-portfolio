import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MegaMenu } from "@/data/navigation";
import { contactLink } from "@/data/navigation";

interface MegaMenuPanelProps {
  menu: MegaMenu;
  id: string;
  onNavigate: () => void;
}

export function MegaMenuPanel({ menu, id, onNavigate }: MegaMenuPanelProps) {
  const { intro, items } = menu;

  return (
    <div
      id={id}
      className="animate-menu-in absolute inset-x-0 top-full border-t border-white/10 bg-brand shadow-2xl shadow-black/30"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[18rem_1fr] gap-12 px-10 py-10 lg:px-16">
        {/* Intro */}
        <div className="border-r border-white/10 pr-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-accent">
            {intro.eyebrow}
          </p>
          <h2 className="mt-4 text-2xl font-semibold leading-snug text-white">{intro.heading}</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70">{intro.text}</p>
          <Link
            href={intro.cta.href}
            onClick={onNavigate}
            className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-accent"
          >
            {intro.cta.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Services */}
        <ul className="grid grid-cols-3 content-start gap-x-4 gap-y-2">
          {items.map(({ title, description, href, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={onNavigate}
                className="group flex gap-4 rounded-xl p-4 transition-colors hover:bg-white/[0.07] focus-visible:bg-white/[0.07] focus-visible:outline-none"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/10 text-white transition-colors group-hover:border-brand-accent/60 group-hover:bg-brand-accent group-hover:text-brand">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-white">{title}</span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-white/65">
                    {description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer strip */}
      <div className="border-t border-white/10 bg-black/15">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-4 text-sm lg:px-16">
          <p className="text-white/70">
            Not sure what you need? Our experts will point you the right way.
          </p>
          <Link
            href={contactLink.href}
            onClick={onNavigate}
            className="group inline-flex items-center gap-2 font-semibold text-white hover:text-brand-accent"
          >
            Talk to an expert
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
