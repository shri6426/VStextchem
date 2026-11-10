import { MessageCircle } from 'lucide-react'
import { ButtonLink, buttonClass } from './ui'
import { whatsappHref, productEnquiryText } from '../utils/contact'

/** Closing business-enquiry call to action used on most pages. */
export function CtaBand({
  title = 'Looking for a chemical for a specific application?',
  body = 'Tell us about your process and requirements. We will help you identify a suitable product or discuss a formulation for your application.',
}: {
  title?: string
  body?: string
}) {
  return (
    <section className="bg-accent text-white">
      <div className="container-site grid gap-8 py-14 sm:py-16 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <div>
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-white/85">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <ButtonLink to="/contact#enquiry" variant="inverse" arrow>
            Send an Enquiry
          </ButtonLink>
          <a
            href={whatsappHref(productEnquiryText())}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass('primary', 'border border-white/50 bg-transparent hover:bg-white/10')}
          >
            <MessageCircle aria-hidden className="size-4" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
