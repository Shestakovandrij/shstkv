import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  color?: 'orange' | 'ink' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizes: Record<NonNullable<Props['size']>, { pad: string; bracket: string; thick: string }> = {
  sm: { pad: 'px-2 py-0.5', bracket: 'w-2 h-2', thick: 'border-[1.5px]' },
  md: { pad: 'px-2.5 py-1', bracket: 'w-3 h-3 md:w-3.5 md:h-3.5', thick: 'border-2' },
  lg: { pad: 'px-3 py-1 md:px-4', bracket: 'w-3.5 h-3.5 md:w-4 md:h-4', thick: 'border-2 md:border-[2.5px]' },
};

const colors: Record<NonNullable<Props['color']>, string> = {
  orange: 'text-orange border-orange',
  ink: 'text-ink border-ink',
  white: 'text-white border-white',
};

/**
 * Wraps inline children with four corner brackets — like camera viewfinder marks.
 * Used to highlight key words inside large headlines.
 */
export function HighlightFrame({ children, color = 'orange', size = 'lg', className }: Props) {
  const s = sizes[size];
  const c = colors[color];
  const corner = `absolute ${s.bracket} ${s.thick} ${c}`;
  return (
    <span className={cn('relative inline-block leading-[1.05]', s.pad, c, className)}>
      <span aria-hidden className={`${corner} top-0 left-0 border-r-0 border-b-0`} />
      <span aria-hidden className={`${corner} top-0 right-0 border-l-0 border-b-0`} />
      <span aria-hidden className={`${corner} bottom-0 left-0 border-r-0 border-t-0`} />
      <span aria-hidden className={`${corner} bottom-0 right-0 border-l-0 border-t-0`} />
      <span className="relative">{children}</span>
    </span>
  );
}
