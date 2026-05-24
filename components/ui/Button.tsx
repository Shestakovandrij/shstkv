'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'onOrange';
type Size = 'sm' | 'md' | 'lg';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  iconRight?: ReactNode;
  fullWidth?: boolean;
};

const base =
  'group inline-flex items-center justify-center gap-2 rounded-pill font-semibold tracking-tight transition-all duration-200 ease-out will-change-transform active:scale-[0.98] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-orange text-ink hover:bg-orange-hover hover:shadow-soft',
  secondary: 'bg-surface text-ink border border-ink/10 hover:border-ink/30 hover:bg-white',
  ghost: 'bg-transparent text-ink hover:bg-ink/5',
  dark: 'bg-ink text-white hover:bg-warmDark',
  onOrange: 'bg-ink text-white hover:bg-warmDark',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-7 py-4 text-base md:text-[17px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', iconRight, fullWidth, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...rest}
    >
      <span>{children}</span>
      {iconRight ? (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink/10 text-current transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-px">
          {iconRight}
        </span>
      ) : null}
    </button>
  );
});
