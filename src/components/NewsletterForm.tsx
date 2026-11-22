'use client'

import { useRef, useState } from 'react'

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

type NewsletterState = {
  success?: string
  message: string
  errors?: Record<string, string[]>
}

const initialState: NewsletterState = {
  message: '',
}

export function NewsletterForm() {
  const [state, setState] = useState<NewsletterState>(initialState)
  const [pending, setPending] = useState(false)
  // One send at a time, even for a second press before React re-renders.
  const sending = useRef(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending.current) return
    sending.current = true
    setPending(true)
    const form = event.currentTarget
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: new FormData(form),
      })
      const result = (await response.json()) as NewsletterState
      setState(result)
      if (result.success) form.reset()
    } catch {
      setState({ message: 'Something went wrong. Try again.', errors: {} })
    } finally {
      sending.current = false
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        Sign up for our newsletter
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        Subscribe to get the latest design news, articles, resources and
        inspiration.
      </p>
      <div className="relative mt-6">
        <input
          type="email"
          name="email"
          placeholder="Email address"
          autoComplete="email"
          aria-label="Email address"
          className={`${state.errors ? 'border-red-300 text-red-600' : 'border-neutral-300 text-neutral-950'} block w-full rounded-2xl border  bg-transparent py-4 pl-6 pr-20 text-base/6  ring-4 ring-transparent transition placeholder:text-neutral-500  focus:outline-none`}
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            aria-disabled={pending}
            disabled={pending}
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
      <div className="mt-2">
        {state.success && (
          <p aria-live="polite" className="px-6 text-green-600">
            {state.success}
          </p>
        )}
        {state.errors && (
          <p aria-live="polite" className="px-6 text-sm text-red-600">
            {state.message}
          </p>
        )}
      </div>
    </form>
  )
}
