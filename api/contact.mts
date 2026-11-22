// POST /api/contact: the contact page's "Work inquiries" form.
// A Vercel Function: the site itself is static files (next.config.mjs → output: 'export').
// The .mts extension makes it an ES module on Vercel (package.json has no "type": "module").
//
// Environment: SMTP_HOST, SMTP_PORT, SENDER_EMAIL, SENDER_PASSWORD, RECEIVER_EMAIL.
// Without all five it answers with an error and sends nothing.

import nodemailer from 'nodemailer'
import { z } from 'zod'

const BUDGETS = [
  '$1K – $10K',
  '$10K – $25K',
  '$25K – $50K',
  '$50K – $100K',
  '$100K – $150K',
  'More than $150K',
] as const

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(200, 'Name is too long'),
  email: z
    .string()
    .trim()
    .max(320, 'Email is too long')
    .email('Valid email is required'),
  company: z
    .string()
    .trim()
    .min(1, 'Company is required')
    .max(200, 'Company is too long'),
  phone: z
    .string()
    .trim()
    .min(5, 'Phone number is required')
    .max(50, 'Phone number is too long'),
  message: z
    .string()
    .trim()
    .min(5, 'Message is required')
    .max(5000, 'Message is too long'),
  budget: z.enum(BUDGETS, { message: 'Budget is required' }),
})

type FieldError = { for: string; message: string }
type ContactReply = { success: boolean; message: string; errors: FieldError[] }

const FAILED = 'Something went wrong. Try again.'

function reply(status: number, body: ContactReply, headers?: HeadersInit) {
  return Response.json(body, { status, headers })
}

function parseContact(form: FormData) {
  const field = (name: string) => {
    const value = form.get(name)
    return typeof value === 'string' ? value : ''
  }
  return contactSchema.safeParse({
    name: field('name'),
    email: field('email'),
    company: field('company'),
    phone: field('phone'),
    message: field('message'),
    budget: field('budget'),
  })
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return reply(
        405,
        { success: false, message: 'Method not allowed', errors: [] },
        { Allow: 'POST' },
      )
    }

    let form: FormData
    try {
      form = await request.formData()
    } catch {
      return reply(400, { success: false, message: FAILED, errors: [] })
    }

    const parsed = parseContact(form)
    if (!parsed.success) {
      return reply(400, {
        success: false,
        message: 'Check the fields marked in red.',
        errors: parsed.error.issues.map((issue) => ({
          for: String(issue.path[0] ?? ''),
          message: issue.message,
        })),
      })
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SENDER_EMAIL,
      SENDER_PASSWORD,
      RECEIVER_EMAIL,
    } = process.env
    if (
      !SMTP_HOST ||
      !SMTP_PORT ||
      !SENDER_EMAIL ||
      !SENDER_PASSWORD ||
      !RECEIVER_EMAIL
    ) {
      console.error('contact: the SMTP settings are missing')
      return reply(500, { success: false, message: FAILED, errors: [] })
    }

    const { name, email, company, phone, message, budget } = parsed.data
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        requireTLS: true,
        auth: { user: SENDER_EMAIL, pass: SENDER_PASSWORD },
      })
      await transporter.sendMail({
        from: SENDER_EMAIL,
        to: RECEIVER_EMAIL,
        replyTo: email,
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\nBudget: ${budget}`,
      })
    } catch (error) {
      console.error(
        'contact: sending failed',
        error instanceof Error ? error.message : error,
      )
      return reply(502, { success: false, message: FAILED, errors: [] })
    }

    return reply(200, {
      success: true,
      message: 'Thank you for contacting us!',
      errors: [],
    })
  },
}
