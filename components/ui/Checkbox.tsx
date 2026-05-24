'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
  error?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
  { label, error, id, className, ...rest },
  ref,
) {
  const fieldId = id ?? rest.name;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className={cn('flex cursor-pointer items-start gap-3 text-sm text-ink', className)}>
        <span className="relative mt-0.5 inline-flex h-5 w-5 shrink-0">
          <input
            ref={ref}
            id={fieldId}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-md border border-ink/20 bg-white transition-colors checked:border-ink checked:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
            {...rest}
          />
          <svg
            aria-hidden
            viewBox="0 0 12 12"
            className="pointer-events-none absolute inset-0 m-auto h-3 w-3 text-orange opacity-0 transition-opacity peer-checked:opacity-100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 6.5 L5 9 L10 3" />
          </svg>
        </span>
        <span className="leading-snug text-pretty">{label}</span>
      </label>
      {error ? (
        <p id={`${fieldId}-error`} className="text-sm text-orange">
          {error}
        </p>
      ) : null}
    </div>
  );
});
