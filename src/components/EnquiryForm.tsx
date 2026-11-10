import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Mail, MessageCircle } from 'lucide-react'
import { products, primaryListing } from '../data/products'
import { industries, industryById } from '../data/industries'
import { company } from '../data/company'
import { enquiryAsText, isEnquiryConfigured, submitEnquiry, type EnquiryPayload } from '../services/enquiry'
import { mailHref, whatsappHref } from '../utils/contact'
import { buttonClass } from './ui'

type Errors = Partial<Record<keyof EnquiryPayload, string>>
type Status = 'idle' | 'submitting' | 'sent' | 'error' | 'not-configured' | 'activation-needed'

const OTHER = 'Other / not sure'
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phoneRe = /^\+?[\d\s-]{10,15}$/

function validate(d: EnquiryPayload): Errors {
  const e: Errors = {}
  if (d.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!d.email.trim()) e.email = 'Please enter your email address.'
  else if (!emailRe.test(d.email.trim())) e.email = 'Please enter a valid email address, e.g. name@company.com.'
  if (d.phone.trim() && !phoneRe.test(d.phone.trim())) e.phone = 'Please enter a valid phone number (10 digits, with or without +91).'
  if (d.message.trim().length < 10) e.message = 'Please tell us a little about your requirement (at least 10 characters).'
  return e
}

export function EnquiryForm({ initialProductId, initialIndustryId }: { initialProductId?: string; initialIndustryId?: string }) {
  const initialIndustry = industries.find((i) => i.id === initialIndustryId)
  const initialProduct = products.find((p) => p.id === initialProductId)
  const [data, setData] = useState<EnquiryPayload>({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: initialProduct ? industryById[primaryListing(initialProduct).industry].name : initialIndustry?.name ?? '',
    product: initialProduct?.name ?? '',
    message: initialProduct ? `I would like to know more about ${initialProduct.name}, including pricing and availability.` : '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryPayload, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [honeypot, setHoneypot] = useState('')
  const startedAt = useRef(Date.now())
  const statusRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const update = (k: keyof EnquiryPayload, v: string) => {
    const next = { ...data, [k]: v }
    setData(next)
    if (touched[k]) setErrors(validate(next))
    if (status !== 'idle' && status !== 'submitting') setStatus('idle')
  }
  const blur = (k: keyof EnquiryPayload) => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors(validate(data))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate(data)
    setErrors(errs)
    setTouched({ name: true, email: true, phone: true, message: true })
    if (Object.keys(errs).length) {
      // Wait for the error state to render, then move focus to the first invalid field.
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }
    // Spam protection: hidden honeypot field + minimum time on page before submitting.
    if (honeypot || Date.now() - startedAt.current < 2500) {
      setStatus('error')
      return
    }
    setStatus('submitting')
    const res = await submitEnquiry(data)
    setStatus(
      res.ok
        ? 'sent'
        : res.reason === 'activation-needed'
          ? 'activation-needed'
          : res.reason === 'not-configured'
            ? 'not-configured'
            : 'error'
    )
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  const summary = enquiryAsText(data)
  const subject = `Enquiry${data.product && data.product !== OTHER ? ` — ${data.product}` : ''} via website`

  if (status === 'sent') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-line bg-white p-8 outline-none">
        <CheckCircle2 aria-hidden className="size-8 text-[#2f7a4a]" />
        <h3 className="mt-4 text-xl font-bold">Thank you — your enquiry has been sent.</h3>
        <p className="mt-2 text-muted">
          Our team will reply to {data.email}. For anything urgent, call +91 {company.phones[0].display}.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className={buttonClass('secondary', 'mt-6')}>
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="border border-line bg-white p-6 sm:p-8" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required error={touched.name ? errors.name : undefined}>
          {(p) => <input {...p} type="text" autoComplete="name" value={data.name} onChange={(e) => update('name', e.target.value)} onBlur={() => blur('name')} />}
        </Field>
        <Field label="Company name">
          {(p) => <input {...p} type="text" autoComplete="organization" value={data.company} onChange={(e) => update('company', e.target.value)} />}
        </Field>
        <Field label="Email address" required error={touched.email ? errors.email : undefined}>
          {(p) => <input {...p} type="email" inputMode="email" autoComplete="email" value={data.email} onChange={(e) => update('email', e.target.value)} onBlur={() => blur('email')} />}
        </Field>
        <Field label="Phone number" error={touched.phone ? errors.phone : undefined}>
          {(p) => <input {...p} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" value={data.phone} onChange={(e) => update('phone', e.target.value)} onBlur={() => blur('phone')} />}
        </Field>
        <Field label="Industry">
          {(p) => (
            <select {...p} value={data.industry} onChange={(e) => update('industry', e.target.value)}>
              <option value="">Select industry</option>
              {industries.map((i) => (
                <option key={i.id}>{i.name}</option>
              ))}
              <option>Other</option>
            </select>
          )}
        </Field>
        <Field label="Product of interest">
          {(p) => (
            <select {...p} value={data.product} onChange={(e) => update('product', e.target.value)}>
              <option value="">Select product</option>
              {industries.map((ind) => {
                const list = products.filter((pr) => primaryListing(pr).industry === ind.id)
                return list.length ? (
                  <optgroup key={ind.id} label={ind.name}>
                    {list.map((pr) => (
                      <option key={pr.id} value={pr.name}>
                        {pr.name} — {primaryListing(pr).category}
                      </option>
                    ))}
                  </optgroup>
                ) : null
              })}
              <option>{OTHER}</option>
            </select>
          )}
        </Field>
        <Field label="Message" required className="sm:col-span-2" error={touched.message ? errors.message : undefined}>
          {(p) => (
            <textarea
              {...p}
              rows={5}
              placeholder="Your application, required quantity, and any technical questions"
              value={data.message}
              onChange={(e) => update('message', e.target.value)}
              onBlur={() => blur('message')}
            />
          )}
        </Field>
        {/* Honeypot: hidden from people, often filled by bots */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </label>
        </div>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status === 'activation-needed' && (
          <div className="mt-6 border border-[#e3c9a3] bg-[#fbf5ea] p-5 text-sm">
            <p className="flex items-start gap-2 font-semibold text-ink">
              <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-[#a86a12]" />
              First-time setup: Form activation required.
            </p>
            <p className="mt-2 text-muted">
              An activation email has been sent to <strong className="text-ink">{company.emails[0]}</strong>.
              Please click the &quot;Activate Form&quot; link in that email to enable instant online delivery. In the meantime, you can send your enquiry directly:
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a href={mailHref(company.emails[0], subject, summary)} className={buttonClass('primary')}>
                <Mail aria-hidden className="size-4" /> Send directly by email
              </a>
              <a href={whatsappHref(`Hello ${company.brandName},\n\n${summary}`)} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary')}>
                <MessageCircle aria-hidden className="size-4" /> Send on WhatsApp
              </a>
            </div>
          </div>
        )}
        {status === 'not-configured' && (
          <div className="mt-6 border border-[#e3c9a3] bg-[#fbf5ea] p-5 text-sm">
            <p className="flex items-start gap-2 font-semibold text-ink">
              <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-[#a86a12]" />
              Online submission is not connected yet, so your enquiry has not been sent.
            </p>
            <p className="mt-2 text-muted">Your details are ready — send them in one click by email or WhatsApp:</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a href={mailHref(company.emails[0], subject, summary)} className={buttonClass('primary')}>
                <Mail aria-hidden className="size-4" /> Send by email
              </a>
              <a href={whatsappHref(`Hello ${company.brandName},\n\n${summary}`)} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary')}>
                <MessageCircle aria-hidden className="size-4" /> Send on WhatsApp
              </a>
            </div>
          </div>
        )}
        {status === 'error' && (
          <p role="alert" className="mt-6 flex items-start gap-2 border border-accent/30 bg-accent-tint p-4 text-sm text-accent-dark">
            <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
            <span>
              Sorry, we could not send your enquiry. Please try again, or email{' '}
              <a className="font-semibold underline" href={mailHref(company.emails[0], subject, summary)}>
                {company.emails[0]}
              </a>
              .
            </span>
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="text-xs text-muted">
          Fields marked <span className="text-accent">*</span> are required. We use your details only to respond to this enquiry.
        </p>
        <button type="submit" disabled={status === 'submitting'} className={buttonClass('primary', 'sm:min-w-44')}>
          {status === 'submitting' ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            'Send Enquiry'
          )}
        </button>
      </div>
      {!isEnquiryConfigured && import.meta.env.DEV && (
        <p className="mt-4 text-xs text-muted">Developer note: set VITE_ENQUIRY_ENDPOINT to enable online delivery.</p>
      )}
    </form>
  )
}

function Field({
  label,
  required,
  error,
  className = '',
  children,
}: {
  label: string
  required?: boolean
  error?: string
  className?: string
  children: (p: { id: string; name: string; required?: boolean; 'aria-invalid': boolean; 'aria-describedby'?: string; className: string }) => ReactNode
}) {
  const id = useId()
  const errId = `${id}-err`
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label} {required && <span className="text-accent" aria-hidden>*</span>}
      </label>
      {children({
        id,
        name: label.toLowerCase().replace(/\s+/g, '_'),
        required,
        'aria-invalid': !!error,
        'aria-describedby': error ? errId : undefined,
        className: `block w-full min-h-11 rounded-[var(--radius-sm)] border bg-white px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/25 ${
          error ? 'border-accent focus:border-accent' : 'border-line-strong focus:border-ink'
        }`,
      })}
      {error && (
        <p id={errId} className="mt-1.5 text-xs font-medium text-accent-dark">
          {error}
        </p>
      )}
    </div>
  )
}
