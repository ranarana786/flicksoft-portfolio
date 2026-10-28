import Image from "next/image";
import Link from "next/link";
import { footerColumns, footerContact, footerLegalLine, footerTagline } from "@/data/footer";

/** Dotted underline that firms up on hover — quiet, editorial link style. */
const linkStyle =
  "underline decoration-dotted decoration-1 underline-offset-[5px] transition-colors hover:decoration-solid focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1a2e] text-white">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-20 sm:px-10 lg:px-16 lg:pt-24">
        {/* Top: brand + link columns */}
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link href="/" aria-label="FlickSoft home" className="inline-block">
              <Image
                src="/brand/flicksoft-logo-white.png"
                alt="FlickSoft"
                width={772}
                height={212}
                className="h-11 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">
              {footerTagline}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:col-span-7"
          >
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                  {column.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`text-[17px] ${linkStyle} ${
                          link.highlight
                            ? "text-brand-accent decoration-brand-accent/60"
                            : "text-white/90 decoration-white/35 hover:text-white hover:decoration-brand-accent"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom: legal line + contact */}
        <div className="mt-20 grid gap-6 border-t border-white/10 pt-8 text-sm text-white/60 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          <p className="leading-relaxed lg:col-span-5">
            © {year} FlickSoft.
            <br />
            {footerLegalLine}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-7">
            <li>
              <a
                href={`mailto:${footerContact.email}`}
                className={`${linkStyle} decoration-white/30 hover:text-white hover:decoration-brand-accent`}
              >
                {footerContact.email}
              </a>
            </li>
            <li>
              <a
                href={footerContact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkStyle} decoration-white/30 hover:text-white hover:decoration-brand-accent`}
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
