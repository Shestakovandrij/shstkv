import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  id?: string;
  ariaLabelledBy?: string;
  children: ReactNode;
  className?: string;
  bg?: 'soft' | 'surface' | 'ink' | 'orange';
  containerClassName?: string;
  fullBleed?: boolean;
};

const bgClass: Record<NonNullable<Props['bg']>, string> = {
  soft: 'bg-soft text-ink',
  surface: 'bg-surface text-ink',
  ink: 'bg-ink text-white',
  orange: 'bg-orange text-ink',
};

export function SectionWrapper({
  id,
  ariaLabelledBy,
  children,
  className,
  bg = 'soft',
  containerClassName,
  fullBleed,
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn('relative w-full py-20 md:py-28 lg:py-36', bgClass[bg], className)}
    >
      {fullBleed ? children : <div className={cn('container', containerClassName)}>{children}</div>}
    </section>
  );
}
