'use client'

import { subscribeNewsletter } from "@/actions/form";
import { createRef } from "react";
import { useFormState, useFormStatus } from 'react-dom';

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

const initialState = {
  message: '',
}

export function NewsletterForm() {

  const [state, handleSubmit] =  useFormState(subscribeNewsletter, initialState)
  const { pending } = useFormStatus();
  const ref = createRef<HTMLFormElement>();

  return (
    <form
      ref={ref}
      action={(formData) =>{
        handleSubmit(formData)
        if (state.success) {
          ref.current?.reset();
        }
      }}
      className="max-w-sm"
    >
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        Sign up for our newsletter : {state?.resetKey}
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
          className={`${state.errors ? 'border-red-300 text-red-600': 'border-neutral-300 text-neutral-950'} block w-full rounded-2xl border  bg-transparent py-4 pl-6 pr-20 text-base/6  ring-4 ring-transparent transition placeholder:text-neutral-500  focus:outline-none`}
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            aria-disabled={pending}
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
          <p aria-live="polite" className="px-6 text-red-600 text-sm">
            {state.message}
          </p>
        )}
      </div>
    </form>
  )
}

