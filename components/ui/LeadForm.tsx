'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { leadFormSchema, type LeadFormValues, type PackageValue } from '@/lib/validators';
import { POPUP } from '@/content/copy';
import { Button } from './Button';
import { InputField, TextareaField } from './FormField';
import { Checkbox } from './Checkbox';
import { cn } from '@/lib/utils';

type Props = {
  defaultPackage?: PackageValue;
  variant?: 'popup' | 'inline';
  onDone?: () => void;
};

export function LeadForm({ defaultPackage = 'consult', variant = 'popup', onDone }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      packageValue: defaultPackage,
      comment: '',
      // Zod schema requires literal true; cast keeps default an unchecked boolean.
      consent: false as unknown as true,
    },
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus('success');
      reset();
      if (onDone) {
        window.setTimeout(onDone, 3800);
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  });

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-4"
      >
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange text-ink">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12.5 L10 17 L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold tracking-tight">{POPUP.success.title}</h3>
        <p className="text-warmDark/80">{POPUP.success.body}</p>
      </motion.div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className={cn('flex flex-col gap-5', variant === 'inline' && 'gap-4')}>
      <InputField
        label={POPUP.fields.name}
        autoComplete="name"
        placeholder="Андрій"
        {...register('name')}
        error={errors.name?.message}
      />

      <InputField
        label={POPUP.fields.phone}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="+380 ..."
        {...register('phone')}
        error={errors.phone?.message}
      />

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-ink">{POPUP.fields.package}</span>
        <Controller
          control={control}
          name="packageValue"
          render={({ field }) => (
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={POPUP.fields.package}>
              {POPUP.packageOptions.map((opt) => {
                const active = field.value === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => field.onChange(opt.value)}
                    className={cn(
                      'rounded-pill border px-4 py-2 text-sm font-medium transition-all',
                      active
                        ? 'bg-ink text-white border-ink'
                        : 'bg-white text-ink border-ink/15 hover:border-ink/40',
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}
        />
        {errors.packageValue?.message ? (
          <p className="text-sm text-orange">{errors.packageValue.message}</p>
        ) : null}
      </div>

      <TextareaField
        label={POPUP.fields.comment}
        placeholder="Коротко про задачу або нішу"
        {...register('comment')}
        error={errors.comment?.message}
      />

      <Checkbox
        label={
          <>
            {POPUP.fields.consent}{' '}
            <a href="#privacy" className="underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
              політикою
            </a>
            .
          </>
        }
        {...register('consent')}
        error={errors.consent?.message}
      />

      <Button type="submit" size="lg" disabled={status === 'submitting'} fullWidth>
        {status === 'submitting' ? POPUP.submitting : POPUP.submit}
      </Button>

      <AnimatePresence>
        {status === 'error' ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-orange"
            role="alert"
          >
            {POPUP.error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
