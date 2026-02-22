'use server'

import { z } from 'zod'
import { Resend } from 'resend'

const contactSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  company: z.string().min(1, { message: 'Company is required' }),
  email: z.coerce.string().email().min(5, { message: 'Valid email is required' }),
  phone: z.string().min(5, { message: 'Phone number is required' }),
  message: z.string().min(5, { message: 'Message is required' }),
  budget: z.string({ message: 'Budget is required' }),
})

export async function contactUs(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    company: formData.get('company'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
    budget: formData.get('budget'),
  })
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    let errArr: any[] = []
    const { errors: err } = validatedFields.error
    for (var i = 0; i < err.length; i++) {
      errArr.push({ for: err[i].path[0], message: err[i].message })
    }
    return {
      success: false,
      message: 'Validation error!',
      errors: errArr,
    }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: process.env.SENDER_EMAIL!,
    to: process.env.RECEIVER_EMAIL!,
    subject: 'New Contact Form Submission',
    text: `Name: ${formData.get('name')}\nCompany: ${formData.get('company')}\nEmail: ${formData.get('email')}\nPhone: ${formData.get('phone')}\nMessage: ${formData.get('message')}\nBudget: ${formData.get('budget')}`,
  })

  if (error) {
    console.error(error)
    return { success: false, message: 'Something Wrong. Try again!', errors: [] }
  }

  return { success: true, message: 'Thank you for contacting us!', errors: [] }
}
