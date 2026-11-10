import { company } from '../data/company'

export const telHref = (e164: string) => `tel:+${e164}`

export const mailHref = (email: string, subject?: string, body?: string) => {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const q = params.toString().replace(/\+/g, '%20')
  return `mailto:${email}${q ? `?${q}` : ''}`
}

export const whatsappHref = (text?: string) =>
  `https://wa.me/${company.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const productEnquiryText = (productName?: string) =>
  productName
    ? `Hello ${company.brandName}, I would like to enquire about ${productName}.`
    : `Hello ${company.brandName}, I would like to make a product enquiry.`
