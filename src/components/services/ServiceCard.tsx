import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  index: number;
  category: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function ServiceCard({ service, index, category }: ServiceCardProps) {
  const { title, description, href, image } = service;

  return (
    <article className="group relative flex h-full flex-col outline-offset-8 outline-brand has-[a:focus-visible]:outline-2">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-slate-200">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1280px) 365px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
          quality={85}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>

      <div className="mt-5 flex items-center gap-3 text-xs font-medium tabular-nums text-slate-500">
        <span className="text-brand">{pad(index + 1)}</span>
        <span aria-hidden className="h-px flex-1 bg-slate-300" />
        <span>{category}</span>
      </div>

      <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-[#0b1a2e]">
        {/* Stretched link: whole card clickable, single tab stop */}
        <Link
          href={href}
          className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px] after:absolute after:inset-0 focus-visible:bg-[length:100%_1px] focus-visible:outline-none"
        >
          {title}
        </Link>
      </h3>
      <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-slate-600">{description}</p>

      <ArrowRight
        aria-hidden
        className="mt-6 size-5 text-brand transition-transform duration-500 group-hover:translate-x-2"
      />
    </article>
  );
}
