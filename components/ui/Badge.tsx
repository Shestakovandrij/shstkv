import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'orange' | 'dark' | 'light' | 'outline';

const tones: Record<Tone, string> = {
  orange: 'bg-orange text-ink',
  dark: 'bg-ink text-white',
  light: 'bg-surface text-ink',
  outline: 'bg-transparent text-ink border border-ink/15',
};

export function Badge({
  children,
  tone = 'light',
  className,
  uppercase = false,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  uppercase?: boolean;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-3 py-1.5 text-xs font-medium tracking-tight',
        uppercase && 'uppercase tracking-[0.12em] text-[11px]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
