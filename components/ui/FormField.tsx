'use client';

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type CommonProps = {
  label: string;
  error?: string;
  hint?: string;
  onLight?: boolean;
};

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & CommonProps;

const inputBase =
  'w-full rounded-2xl border bg-white px-4 py-3.5 text-base text-ink placeholder:text-neutralGray transition-colors focus-visible:outline-none focus-visible:border-ink/40';

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  { label, error, hint, id, onLight, className, ...rest },
  ref,
) {
  const fieldId = id ?? rest.name;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        ref={ref}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
        className={cn(
          inputBase,
          error ? 'border-orange' : 'border-ink/10',
          onLight && 'bg-white',
          className,
        )}
        {...rest}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="text-sm text-orange">
          {error}
        </p>
      ) : hint ? (
        <p id={`${fieldId}-hint`} className="text-sm text-neutralGray">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & CommonProps;

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(function TextareaField(
  { label, error, hint, id, className, ...rest },
  ref,
) {
  const fieldId = id ?? rest.name;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        ref={ref}
        id={fieldId}
        rows={3}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
        className={cn(
          inputBase,
          'resize-none',
          error ? 'border-orange' : 'border-ink/10',
          className,
        )}
        {...rest}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="text-sm text-orange">
          {error}
        </p>
      ) : hint ? (
        <p id={`${fieldId}-hint`} className="text-sm text-neutralGray">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
