"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { contactLink, megaMenus, navLinks } from "@/data/navigation";
import { MegaMenuPanel } from "./MegaMenuPanel";
import { MobileMenu } from "./MobileMenu";

/** Grace period so the pointer can travel from a trigger into its panel. */
const CLOSE_DELAY = 150;
const MOBILE_MENU_ID = "mobile-menu";
const panelId = (menuId: string) => `mega-${menuId}`;

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const lastPointerType = useRef<string>("mouse");

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const closeAll = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(null);
    setMobileOpen(false);
  }, []);

  const hoverOpen = (id: string | null) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    cancelClose();
    setOpenMenu(id);
  };

  const scheduleClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), CLOSE_DELAY);
  };

  // Mouse users already opened the menu by hovering, so a click keeps it open;
  // keyboard and touch users toggle.
  const onTriggerClick = (id: string) => {
    setOpenMenu((cur) => (lastPointerType.current === "mouse" ? id : cur === id ? null : id));
  };

  // Escape + outside click close everything.
  useEffect(() => {
    if (!openMenu && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const controls = openMenu ? panelId(openMenu) : MOBILE_MENU_ID;
      const trigger = document.querySelector<HTMLElement>(`[aria-controls="${controls}"]`);
      closeAll();
      trigger?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) closeAll();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openMenu, mobileOpen, closeAll]);

  // Lock page scroll behind the mobile drawer; close it when growing to desktop.
  useEffect(() => {
    if (!mobileOpen) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setMobileOpen(false);
    mq.addEventListener("change", onChange);
    return () => {
      root.style.overflow = prev;
      mq.removeEventListener("change", onChange);
    };
  }, [mobileOpen]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const activeMenu = megaMenus.find((m) => m.id === openMenu);

  return (
    <header
      ref={headerRef}
      onPointerLeave={scheduleClose}
      onPointerEnter={(e) => e.pointerType === "mouse" && cancelClose()}
      onPointerDownCapture={(e) => (lastPointerType.current = e.pointerType)}
      onKeyDownCapture={() => (lastPointerType.current = "keyboard")}
      className="fixed inset-x-0 top-0 z-50 bg-brand text-white shadow-[0_1px_0_rgba(255,255,255,0.06)]"
    >
      <div className="flex h-[72px] w-full items-center justify-between px-6 sm:px-10 lg:h-20 lg:px-12 xl:px-16">
        <Link href="/" onClick={closeAll} aria-label="FlickSoft home" className="shrink-0">
          <Image
            src="/brand/flicksoft-logo-white.png"
            alt="FlickSoft"
            width={772}
            height={212}
            priority
            className="h-8 w-auto lg:h-9"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-2 lg:flex">
          <ul className="flex items-center">
            {megaMenus.map((menu) => {
              const isOpen = openMenu === menu.id;
              return (
                <li key={menu.id} onPointerEnter={hoverOpen(menu.id)}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId(menu.id)}
                    onClick={() => onTriggerClick(menu.id)}
                    className={`relative flex h-20 cursor-pointer items-center gap-1.5 px-5 text-[17px] font-medium transition-colors hover:text-brand-accent ${
                      isOpen ? "text-brand-accent" : ""
                    }`}
                  >
                    {menu.label}
                    <ChevronDown
                      className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                    <span
                      className={`absolute inset-x-5 bottom-0 h-0.5 origin-left rounded-full bg-brand-accent transition-transform duration-300 ${
                        isOpen ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
            {navLinks.map((link) => (
              <li key={link.href} onPointerEnter={hoverOpen(null)}>
                <Link
                  href={link.href}
                  onClick={closeAll}
                  className="flex h-20 items-center px-5 text-[17px] font-medium transition-colors hover:text-brand-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={contactLink.href}
            onClick={closeAll}
            onPointerEnter={hoverOpen(null)}
            className="ml-4 rounded-md bg-white px-6 py-3 text-[13px] font-bold uppercase tracking-[0.18em] text-brand transition hover:bg-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {contactLink.label}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls={MOBILE_MENU_ID}
          onClick={() => setMobileOpen((o) => !o)}
          className="grid size-10 place-items-center rounded-md border border-white/20 lg:hidden"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {activeMenu && (
        <div className="hidden lg:block">
          <MegaMenuPanel
            key={activeMenu.id}
            menu={activeMenu}
            id={panelId(activeMenu.id)}
            onNavigate={closeAll}
          />
        </div>
      )}

      {mobileOpen && <MobileMenu id={MOBILE_MENU_ID} onNavigate={closeAll} />}
    </header>
  );
}
