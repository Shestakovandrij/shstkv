'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Tone = 'light' | 'dark' | 'orange' | 'outline';

type Props = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  rotate?: number;
  delay?: number;
  showBrackets?: boolean;
  href?: string;
};

const tones: Record<Tone, string> = {
  light: 'bg-white text-ink shadow-soft',
  dark: 'bg-ink text-white',
  orange: 'bg-orange text-ink shadow-liftSoft',
  outline: 'bg-transparent text-ink border border-ink/15',
};

const bracketTones: Record<Tone, string> = {
  light: 'border-ink/40',
  dark: 'border-white/60',
  orange: 'border-ink/60',
  outline: 'border-ink/50',
};

/**
 * Card with four corner brackets — matches the design language from the bento reference.
 * Used in Audience section and "what's included" grid.
 */
export function BracketCard({
  children,
  tone = 'light',
  className,
  rotate = 0,
  delay = 0,
  showBrackets = true,
}: Props) {
  const bracket =
    'absolute w-3 h-3 md:w-3.5 md:h-3.5 border-[1.5px] pointer-events-none ' + bracketTones[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 110, damping: 18, delay }}
      whileHover={{ y: -4, rotate: rotate * 0.5 }}
      className={cn(
        'relative rounded-card p-5 md:p-6 transition-shadow',
        tones[tone],
        className,
      )}
    >
      {showBrackets ? (
        <>
          <span aria-hidden className={`${bracket} top-1.5 left-1.5 border-r-0 border-b-0`} />
          <span aria-hidden className={`${bracket} top-1.5 right-1.5 border-l-0 border-b-0`} />
          <span aria-hidden className={`${bracket} bottom-1.5 left-1.5 border-r-0 border-t-0`} />
          <span aria-hidden className={`${bracket} bottom-1.5 right-1.5 border-l-0 border-t-0`} />
        </>
      ) : null}
      {children}
    </motion.div>
  );
}
