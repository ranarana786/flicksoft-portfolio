import { needOptions, type NeedValue } from "@/data/contact";

export const enquiryFields = ["name", "company", "email", "need", "message"] as const;
export type EnquiryField = (typeof enquiryFields)[number];

export interface Enquiry {
  name: string;
  company: string;
  email: string;
  need: NeedValue;
  message: string;
}

export interface EnquiryState {
  status: "idle" | "success" | "error";
  /** Form-level message (e.g. delivery failed). */
  message?: string;
  errors?: Partial<Record<EnquiryField, string>>;
  /** Echoed back on error so the form can be refilled. */
  values?: Partial<Record<EnquiryField, string>>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NEEDS = new Set<string>(needOptions.map((o) => o.value));

const text = (data: FormData, key: string) => String(data.get(key) ?? "").trim();

/** Server-side validation; returns the clean enquiry or per-field errors. */
export function validateEnquiry(
  data: FormData,
):
  | { ok: true; enquiry: Enquiry }
  | { ok: false; errors: EnquiryState["errors"]; values: EnquiryState["values"] } {
  const values = Object.fromEntries(enquiryFields.map((f) => [f, text(data, f)])) as Record<
    EnquiryField,
    string
  >;
  const errors: Partial<Record<EnquiryField, string>> = {};

  if (values.name.length < 2) errors.name = "Please enter your full name.";
  else if (values.name.length > 100) errors.name = "Please keep this under 100 characters.";

  if (values.company.length < 2) errors.company = "Please enter your company name.";
  else if (values.company.length > 120) errors.company = "Please keep this under 120 characters.";

  if (!EMAIL_RE.test(values.email) || values.email.length > 254)
    errors.email = "Please enter a valid email address.";

  if (!NEEDS.has(values.need)) errors.need = "Please choose what you need.";

  if (values.message.length < 10)
    errors.message = "A sentence or two helps us answer properly: sites, countries, timing.";
  else if (values.message.length > 5000)
    errors.message = "Please keep this under 5,000 characters.";

  if (Object.keys(errors).length) return { ok: false, errors, values };
  return { ok: true, enquiry: { ...values, need: values.need as NeedValue } };
}
