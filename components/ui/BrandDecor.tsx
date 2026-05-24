'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type OrbProps = {
  color?: 'orange' | 'ink' | 'white';
  size?: number;
  className?: string;
  intensity?: 'low' | 'med' | 'high';
};

const orbColor: Record<NonNullable<OrbProps['color']>, string> = {
  orange: 'bg-orange',
  ink: 'bg-ink',
  white: 'bg-white',
};

const orbAlpha: Record<NonNullable<OrbProps['intensity']>, string> = {
  low: 'opacity-[0.08]',
  med: 'opacity-[0.15]',
  high: 'opacity-[0.22]',
};

/**
 * Brand DNA: soft blurred orb used as atmospheric background.
 * Animates with very slow scale pulse — never distracting.
 */
export function BlurOrb({ color = 'orange', size = 320, className, intensity = 'med' }: OrbProps) {
  return (
    <motion.span
      aria-hidden
      initial={{ scale: 0.95 }}
      animate={{ scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: size, height: size }}
      className={cn(
        'pointer-events-none absolute rounded-full blur-3xl',
        orbColor[color],
        orbAlpha[intensity],
        className,
      )}
    />
  );
}

type MarkerProps = {
  color?: 'orange' | 'ink' | 'white';
  size?: 'sm' | 'md' | 'lg';
  inset?: number;
  className?: string;
};

const markerColor: Record<NonNullable<MarkerProps['color']>, string> = {
  orange: 'bg-orange',
  ink: 'bg-ink',
  white: 'bg-white',
};

const markerSize: Record<NonNullable<MarkerProps['size']>, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
};

/**
 * Four small filled square markers at the corners of a container.
 * Used as a brand-consistent visual signature on cards/frames.
 */
export function CornerMarkers({ color = 'orange', size = 'md', inset = 12, className }: MarkerProps) {
  const sty = { top: inset, left: inset, right: inset, bottom: inset };
  return (
    <>
      <span aria-hidden style={{ top: sty.top, left: sty.left }} className={cn('absolute pointer-events-none', markerColor[color], markerSize[size], className)} />
      <span aria-hidden style={{ top: sty.top, right: sty.right }} className={cn('absolute pointer-events-none', markerColor[color], markerSize[size], className)} />
      <span aria-hidden style={{ bottom: sty.bottom, left: sty.left }} className={cn('absolute pointer-events-none', markerColor[color], markerSize[size], className)} />
      <span aria-hidden style={{ bottom: sty.bottom, right: sty.right }} className={cn('absolute pointer-events-none', markerColor[color], markerSize[size], className)} />
    </>
  );
}
