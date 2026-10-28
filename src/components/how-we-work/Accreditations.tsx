import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { accreditations, type StandardStatus } from "@/data/how-we-work";

/**
 * Standards as a ledger: a legend defines each kind of claim, then every
 * framework is listed with its status marker, so "aligned" can never be read
 * as "certified".
 */
export function Accreditations() {
  const { tag, heading, text, legend, items } = accreditations;

  return (
    <section
      id="standards"
      aria-labelledby="standards-title"
      className="scroll-mt-24 bg-[#f4f3ef] py-24 text-[#0b1a2e] lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeader id="standards-title" tag={tag} title={heading} text={text} />

        {/* Legend */}
        <Reveal
          delay={100}
          className="mt-14 grid gap-px overflow-hidden rounded-xl bg-slate-900/[0.08] ring-1 ring-slate-900/[0.06] sm:grid-cols-3 lg:mt-20"
        >
          {legend.map((entry) => (
            <div key={entry.status} className="flex gap-4 bg-white p-6">
              <StatusMarker status={entry.status} />
              <div>
                <p className="font-semibold">{entry.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{entry.text}</p>
              </div>
            </div>
          ))}
        </Reveal>

        {/* Ledger */}
        <Reveal delay={150} className="mt-10">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Frameworks and our status against each</caption>
            <thead className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 md:table-header-group">
              <tr>
                <th scope="col" className="pb-4 font-semibold">
                  Framework
                </th>
                <th scope="col" className="pb-4 font-semibold">
                  Status
                </th>
                <th scope="col" className="pb-4 font-semibold">
                  What it means
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.name}
                  className="flex flex-col gap-3 border-t border-slate-300 py-7 last:border-b md:table-row md:py-0"
                >
                  <th scope="row" className="font-normal md:w-[38%] md:py-8 md:pr-8 md:align-top">
                    <span className="block text-2xl font-semibold tracking-tight text-brand sm:text-3xl">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-sm text-slate-500">{item.area}</span>
                  </th>
                  <td className="md:w-[22%] md:py-8 md:pr-8 md:align-top">
                    <span className="inline-flex items-center gap-3 text-sm font-semibold md:pt-2">
                      <StatusMarker status={item.status} small />
                      {item.statusLabel}
                    </span>
                  </td>
                  <td className="text-[15px] leading-relaxed text-slate-600 md:py-8 md:align-top md:pt-10">
                    {item.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

/** Filled = certified, outline = aligned, half-filled = contractual role. */
function StatusMarker({ status, small = false }: { status: StandardStatus; small?: boolean }) {
  const size = small ? "size-3.5" : "size-5 mt-0.5";
  const style: Record<StandardStatus, string> = {
    certified: "bg-brand",
    aligned: "border-2 border-brand",
    contractual:
      "border-2 border-brand bg-[linear-gradient(135deg,#144277_50%,transparent_50%)]",
  };
  return <span aria-hidden className={`block shrink-0 ${size} ${style[status]}`} />;
}
