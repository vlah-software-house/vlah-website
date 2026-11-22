// @ts-check
// POST /api/newsletter: the footer's newsletter form, which adds the address to MailerLite.
// A Vercel Function: the site itself is static files (next.config.mjs → output: 'export').
// Plain JavaScript in an .mjs file, so Vercel runs it as an ES module (package.json
// has no "type": "module", and Vercel doesn't build .mts files). TypeScript still
// checks it, through @ts-check and the JSDoc types.
//
// Environment: MAILERLITE_API_KEY. Without it the form answers with an error.

import { z } from 'zod'

const MAILERLITE_SUBSCRIBERS = 'https://connect.mailerlite.com/api/subscribers'
const NEWSLETTER_GROUP = '121248322928247905'

const emailSchema = z.string().trim().max(320).email()

/** @typedef {{ success?: string, message: string, errors?: Record<string, string[]> }} NewsletterReply */

const FAILED = 'Something went wrong. Try again.'

/**
 * @param {number} status
 * @param {NewsletterReply} body
 * @param {HeadersInit} [headers]
 */
function reply(status, body, headers) {
  return Response.json(body, { status, headers })
}

export default {
  /**
   * @param {Request} request
   * @returns {Promise<Response>}
   */
  async fetch(request) {
    if (request.method !== 'POST') {
      return reply(
        405,
        { message: 'Method not allowed', errors: {} },
        { Allow: 'POST' },
      )
    }

    /** @type {FormData} */
    let form
    try {
      form = await request.formData()
    } catch {
      return reply(400, { message: FAILED, errors: {} })
    }

    const email = emailSchema.safeParse(form.get('email') ?? '')
    if (!email.success) {
      const message = 'Enter a valid email address.'
      return reply(400, { message, errors: { email: [message] } })
    }

    const apiKey = process.env.MAILERLITE_API_KEY
    if (!apiKey) {
      console.error('newsletter: MAILERLITE_API_KEY is missing')
      return reply(500, { message: FAILED, errors: {} })
    }

    try {
      const response = await fetch(MAILERLITE_SUBSCRIBERS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ email: email.data, groups: [NEWSLETTER_GROUP] }),
      })
      const data =
        /** @type {{ message?: string, errors?: Record<string, string[]> }} */ (
          await response.json().catch(() => ({}))
        )
      if (!response.ok || data.errors) {
        // MailerLite explains a refused address ("The email must be a valid email address.").
        const refused = response.status === 422
        if (!refused)
          console.error('newsletter: MailerLite answered', response.status)
        return reply(refused ? 400 : 502, {
          message: refused && data.message ? data.message : FAILED,
          errors: data.errors ?? {},
        })
      }
    } catch (error) {
      console.error(
        'newsletter: MailerLite unreachable',
        error instanceof Error ? error.message : error,
      )
      return reply(502, { message: FAILED, errors: {} })
    }

    // Only the outcome goes back to the browser, never MailerLite's subscriber record.
    return reply(200, { success: 'Thank you for subscribing! 🎉', message: '' })
  },
}
