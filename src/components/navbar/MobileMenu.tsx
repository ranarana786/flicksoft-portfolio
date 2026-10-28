import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { contactLink, megaMenus, navLinks } from "@/data/navigation";

interface MobileMenuProps {
  id: string;
  onNavigate: () => void;
}

export function MobileMenu({ id, onNavigate }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div
      id={id}
      className="animate-menu-in fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto border-t border-white/10 bg-brand lg:hidden"
    >
      <nav aria-label="Mobile" className="flex min-h-full flex-col px-6 py-4 sm:px-10">
        <ul className="divide-y divide-white/10">
          {megaMenus.map((menu) => {
            const isOpen = expanded === menu.id;
            const panelId = `${id}-${menu.id}`;
            return (
              <li key={menu.id}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setExpanded(isOpen ? null : menu.id)}
                  className="flex w-full items-center justify-between py-4 text-lg font-medium text-white"
                >
                  {menu.label}
                  <ChevronDown
                    className={`size-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Accordion body: grid-rows trick animates height without JS measuring */}
                <div
                  id={panelId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <ul className="overflow-hidden" inert={!isOpen}>
                    {menu.items.map(({ title, description, href, icon: Icon }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={onNavigate}
                          className="flex gap-4 rounded-lg px-2 py-3 hover:bg-white/[0.07]"
                        >
                          <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/10 text-white">
                            <Icon className="size-5" strokeWidth={1.75} />
                          </span>
                          <span>
                            <span className="block text-[15px] font-semibold text-white">
                              {title}
                            </span>
                            <span className="mt-0.5 block text-[13px] leading-relaxed text-white/65">
                              {description}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                    <li className="h-3" aria-hidden />
                  </ul>
                </div>
              </li>
            );
          })}
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onNavigate}
                className="block py-4 text-lg font-medium text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={contactLink.href}
          onClick={onNavigate}
          className="mt-auto mb-4 block rounded-md bg-white py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-brand"
        >
          {contactLink.label}
        </Link>
      </nav>
    </div>
  );
}
