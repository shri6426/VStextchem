/**
 * ENQUIRY DELIVERY
 * ----------------
 * The form calls `submitEnquiry`. Delivery is configured with environment
 * variables (see .env.example and README → "Enquiry form"):
 *
 *   VITE_ENQUIRY_ENDPOINT    URL that accepts a JSON POST (Formspree, Web3Forms,
 *                            Getform, a CRM webhook, or your own API)
 *   VITE_ENQUIRY_ACCESS_KEY  optional key some providers require
 *
 * If no endpoint is configured, `isEnquiryConfigured` is false and the form
 * says so honestly and offers email / WhatsApp instead. We never show
 * "message sent" unless the endpoint actually returned success.
 */
export interface EnquiryPayload {
  name: string
  company: string
  email: string
  phone: string
  industry: string
  product: string
  message: string
}

const defaultEndpoint = 'https://formsubmit.co/ajax/texchemvs@gmail.com'
const endpoint = (import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined)?.trim() || defaultEndpoint
const accessKey = (import.meta.env.VITE_ENQUIRY_ACCESS_KEY as string | undefined)?.trim() || ''

export const isEnquiryConfigured = endpoint.length > 0

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: 'not-configured' | 'network' | 'rejected' | 'activation-needed'; detail?: string }

export async function submitEnquiry(data: EnquiryPayload): Promise<SubmitResult> {
  if (!isEnquiryConfigured) return { ok: false, reason: 'not-configured' }
  try {
    const payload = {
      name: data.name,
      company: data.company || 'Not specified',
      email: data.email,
      phone: data.phone || 'Not specified',
      industry: data.industry || 'Not specified',
      product: data.product || 'General Enquiry',
      message: data.message,
      subject: `Website enquiry: ${data.name}${data.product ? ` — ${data.product}` : ''}`,
      _subject: `Website enquiry: ${data.name}${data.product ? ` — ${data.product}` : ''}`,
      _template: 'table',
      _captcha: 'false',
      ...(accessKey ? { access_key: accessKey } : {}),
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })

    const result = await res.json().catch(() => null)

    if (result && (result.success === 'false' || result.success === false)) {
      if (result.message && /needs activation/i.test(result.message)) {
        return { ok: false, reason: 'activation-needed', detail: result.message }
      }
      return { ok: false, reason: 'rejected', detail: result.message || 'Submission failed' }
    }

    if (!res.ok) return { ok: false, reason: 'rejected', detail: `${res.status}` }

    return { ok: true }
  } catch (e) {
    return { ok: false, reason: 'network', detail: e instanceof Error ? e.message : undefined }
  }
}

/** Plain-text version of an enquiry, used for the email / WhatsApp fallbacks. */
export function enquiryAsText(d: Partial<EnquiryPayload>) {
  return [
    d.product && `Product of interest: ${d.product}`,
    d.industry && `Industry: ${d.industry}`,
    d.message && `\n${d.message}\n`,
    d.name && `Name: ${d.name}`,
    d.company && `Company: ${d.company}`,
    d.phone && `Phone: ${d.phone}`,
    d.email && `Email: ${d.email}`,
  ]
    .filter(Boolean)
    .join('\n')
}
