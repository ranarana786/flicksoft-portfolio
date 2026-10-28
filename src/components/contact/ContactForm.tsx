"use client";

import { ArrowRight, Check, ChevronDown, LoaderCircle } from "lucide-react";
import { useActionState } from "react";
import { sendEnquiry } from "@/app/contact/actions";
import { formCopy, needOptions } from "@/data/contact";
import type { EnquiryField, EnquiryState } from "@/lib/enquiry";

const initialState: EnquiryState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendEnquiry, initialState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="animate-fade-up rounded-xl bg-white p-8 ring-1 ring-slate-900/[0.06] sm:p-10"
      >
        <span className="grid size-12 place-items-center rounded-full bg-brand text-white">
          <Check className="size-6" strokeWidth={2} />
        </span>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-brand">
          {formCopy.successTitle}
        </h2>
        <p className="mt-3 max-w-[48ch] leading-relaxed text-slate-600">{formCopy.successText}</p>
      </div>
    );
  }

  const error = (f: EnquiryField) => state.errors?.[f];
  const value = (f: EnquiryField) => state.values?.[f] ?? "";

  return (
    <form
      action={action}
      noValidate
      className="rounded-xl bg-white p-6 ring-1 ring-slate-900/[0.06] sm:p-10"
    >
      {state.message && (
        <p
          role="alert"
          className="mb-6 border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {state.message}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Full name" error={error("name")}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={value("name")}
            {...fieldProps("name", error("name"))}
          />
        </Field>
        <Field id="company" label="Company name" error={error("company")}>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            required
            defaultValue={value("company")}
            {...fieldProps("company", error("company"))}
          />
        </Field>
        <Field id="email" label="Email address" error={error("email")}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            required
            defaultValue={value("email")}
            {...fieldProps("email", error("email"))}
          />
        </Field>
        <Field id="need" label="What do you need?" error={error("need")}>
          <div className="relative">
            <select
              id="need"
              name="need"
              defaultValue={value("need") || needOptions[0].value}
              {...fieldProps("need", error("need"), "appearance-none pr-11")}
            >
              {needOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-500"
            />
          </div>
        </Field>
        <Field id="message" label="Message" error={error("message")} className="sm:col-span-2">
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder={formCopy.messagePlaceholder}
            required
            defaultValue={value("message")}
            {...fieldProps("message", error("message"), "h-auto resize-y py-3")}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive tech, filled only by bots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group mt-8 flex w-full cursor-pointer items-center justify-center gap-3 rounded-md bg-brand py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#0b1a2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Sending
          </>
        ) : (
          <>
            {formCopy.submit}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
      <p className="mt-4 text-sm text-slate-500">{formCopy.privacy}</p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  className = "",
  children,
}: {
  id: EnquiryField;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-[#0b1a2e]">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

/** Shared input styling + accessible error wiring. */
function fieldProps(id: EnquiryField, error: string | undefined, extra = "") {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: `block h-12 w-full rounded-md border bg-white px-4 text-[15px] text-[#0b1a2e] placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
      error
        ? "border-red-600 focus:border-red-600 focus:ring-red-600/20"
        : "border-slate-300 hover:border-slate-400 focus:border-brand focus:ring-brand/20"
    } ${extra}`,
  };
}
