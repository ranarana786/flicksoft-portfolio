"use server";

import { footerContact } from "@/data/footer";
import { validateEnquiry, type Enquiry, type EnquiryState } from "@/lib/enquiry";

/**
 * Delivery is configured with CONTACT_WEBHOOK_URL (Zapier / Make / Slack /
 * n8n / a mail relay). Without it, development logs the enquiry; production
 * refuses rather than pretending the message was sent.
 */
async function deliver(enquiry: Enquiry): Promise<boolean> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] CONTACT_WEBHOOK_URL not set; enquiry received:", enquiry);
      return true;
    }
    console.error("[contact] CONTACT_WEBHOOK_URL not set; enquiry could not be delivered.");
    return false;
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...enquiry,
        source: "website/contact",
        receivedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error("[contact] webhook responded", res.status);
    return res.ok;
  } catch (err) {
    console.error("[contact] webhook failed", err);
    return false;
  }
}

export async function sendEnquiry(_prev: EnquiryState, data: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never see or fill this field.
  if (String(data.get("website") ?? "") !== "") return { status: "success" };

  const result = validateEnquiry(data);
  if (!result.ok) {
    return { status: "error", errors: result.errors, values: result.values };
  }

  const delivered = await deliver(result.enquiry);
  if (!delivered) {
    return {
      status: "error",
      message: `We couldn't send your enquiry just now. Please email us at ${footerContact.email} and we'll pick it up from there.`,
      values: { ...result.enquiry },
    };
  }

  return { status: "success" };
}
