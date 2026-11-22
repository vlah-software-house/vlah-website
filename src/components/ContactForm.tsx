'use client'

import { useId, useRef, useState } from 'react'
import { FadeIn } from '@/components/FadeIn'
import { Button } from '@/components/Button'

function TextInput({
  label,
  validationError,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & {
  label: string
  validationError?: string
}) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className={`${validationError ? 'border-red-400 text-red-600' : 'border-neutral-300 text-neutral-950'} peer block w-full border  bg-transparent px-6 pb-4 pt-12 text-base/6 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5`}
      />
      <label
        htmlFor={id}
        className={`${validationError ? 'text-red-600' : 'text-neutral-500'} pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950`}
      >
        {label}
      </label>
      {validationError && (
        <span
          aria-live="polite"
          className="absolute right-0 top-0 bg-red-400 px-2 text-sm text-white"
        >
          {validationError}
        </span>
      )}
    </div>
  )
}

function RadioInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  return (
    <label className="flex gap-x-3">
      <input
        type="radio"
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-neutral-950">{label}</span>
    </label>
  )
}

type ContactState = {
  success: boolean
  message: string
  errors: { for: string; message: string }[]
}

const initialState: ContactState = {
  message: '',
  success: false,
  errors: [],
}

export function ContactForm() {
  const [state, setState] = useState<ContactState>(initialState)
  const [pending, setPending] = useState(false)
  // One send at a time, even for a second press before React re-renders.
  const sending = useRef(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending.current) return
    sending.current = true
    setPending(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: new FormData(event.currentTarget),
      })
      const result = (await response.json()) as ContactState
      setState({ ...initialState, ...result, errors: result.errors ?? [] })
    } catch {
      setState({ ...initialState, message: 'Something went wrong. Try again.' })
    } finally {
      sending.current = false
      setPending(false)
    }
  }

  return (
    <FadeIn className="lg:order-last">
      {state.success ? (
        <>
          {state.success && (
            <div className="border bg-green-50 p-5">
              <div className="mt-3 text-left sm:mt-5">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Thank you for reaching out to us!
                </h3>
                <div className="mt-5">
                  <p className="mb-5 text-sm text-gray-700">
                    We have successfully received your inquiry. One of our team
                    members will get in touch with you within the next 48 hours
                    to discuss your project and how we can help bring your
                    vision to life.
                  </p>
                  <p className="text-sm text-gray-700">
                    We appreciate your interest and look forward to creating
                    something amazing together!
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="font-display text-base font-semibold text-neutral-950">
            Work inquiries
          </h2>
          <div className="isolate mt-6 -space-y-px bg-white/50">
            <TextInput
              label="Name"
              name="name"
              autoComplete="name"
              validationError={
                state.errors.find((error) => error.for === 'name')?.message
              }
            />
            <TextInput
              label="Email"
              type="email"
              name="email"
              validationError={
                state.errors.find((error) => error.for === 'email')?.message
              }
              autoComplete="email"
            />
            <TextInput
              label="Company"
              name="company"
              autoComplete="organization"
              validationError={
                state.errors.find((error) => error.for === 'company')?.message
              }
            />
            <TextInput
              label="Phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              validationError={
                state.errors.find((error) => error.for === 'phone')?.message
              }
            />
            <TextInput
              label="Message"
              name="message"
              validationError={
                state.errors.find((error) => error.for === 'message')?.message
              }
            />
            <div className="border border-neutral-300 px-6 py-8 ">
              <fieldset>
                <legend className="text-base/6 text-neutral-500">Budget</legend>
                <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <RadioInput
                    label="$1K – $10K"
                    name="budget"
                    value="$1K – $10K"
                  />
                  <RadioInput
                    label="$10K – $25K"
                    name="budget"
                    value="$10K – $25K"
                  />
                  <RadioInput
                    label="$25K – $50K"
                    name="budget"
                    value="$25K – $50K"
                  />
                  <RadioInput
                    label="$50K – $100K"
                    name="budget"
                    value="$50K – $100K"
                  />
                  <RadioInput
                    label="$100K – $150K"
                    name="budget"
                    value="$100K – $150K"
                  />
                  <RadioInput
                    label="More than $150K"
                    name="budget"
                    value="More than $150K"
                  />
                </div>
                <span
                  aria-live="polite"
                  className="relative -bottom-8 -mx-6 block bg-red-400 px-2 text-sm text-white"
                >
                  {
                    state.errors.find((error) => error.for === 'budget')
                      ?.message
                  }
                </span>
              </fieldset>
            </div>
          </div>
          <div className="mt-2">
            {!state.success && (
              <p
                aria-live="polite"
                className="px-6 text-center text-sm text-red-600"
              >
                {state.message}
              </p>
            )}
          </div>
          <Button
            aria-disabled={pending}
            disabled={pending}
            type="submit"
            className="mt-10 w-full justify-center py-4"
          >
            Let’s work together
          </Button>
        </form>
      )}
    </FadeIn>
  )
}
