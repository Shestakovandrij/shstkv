import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Color = 'orange' | 'ink' | 'white';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  children: ReactNode;
  color?: Color;
  size?: Size;
  className?: string;
};

const sizes: Record<Size, { pad: string; handle: string; offset: string }> = {
  sm: { pad: 'px-2 py-0.5', handle: 'h-1.5 w-1.5', offset: '-top-[3px] -left-[3px] -right-[3px] -bottom-[3px]' },
  md: { pad: 'px-2.5 py-0.5 md:px-3', handle: 'h-2 w-2', offset: '-top-1 -left-1 -right-1 -bottom-1' },
  lg: { pad: 'px-3 py-0.5 md:px-4 md:py-1', handle: 'h-2 w-2 md:h-2.5 md:w-2.5', offset: '-top-[5px] -left-[5px] -right-[5px] -bottom-[5px] md:-top-1.5 md:-left-1.5 md:-right-1.5 md:-bottom-1.5' },
};

const palette: Record<Color, { text: string; border: string; bg: string; handle: string }> = {
  orange: { text: 'text-orange', border: 'border-orange/55', bg: 'bg-orange/10', handle: 'bg-orange' },
  ink: { text: 'text-ink', border: 'border-ink/55', bg: 'bg-ink/8', handle: 'bg-ink' },
  white: { text: 'text-white', border: 'border-white/55', bg: 'bg-white/10', handle: 'bg-white' },
};

/**
 * Selection-handle style highlight: subtle tinted background, thin border,
 * four small filled squares at the corners (positioned slightly outside).
 * Used for accent words inside large headlines.
 */
export function HighlightFrame({ children, color = 'orange', size = 'lg', className }: Props) {
  const s = sizes[size];
  const c = palette[color];
  // Parse offset shorthand into individual class strings for each handle.
  return (
    <span
      className={cn(
        'relative inline-block align-baseline leading-[0.95]',
        'border',
        s.pad,
        c.bg,
        c.border,
        c.text,
        className,
      )}
    >
      <Handle position="tl" sizeClass={s.handle} bg={c.handle} sizeKey={size} />
      <Handle position="tr" sizeClass={s.handle} bg={c.handle} sizeKey={size} />
      <Handle position="bl" sizeClass={s.handle} bg={c.handle} sizeKey={size} />
      <Handle position="br" sizeClass={s.handle} bg={c.handle} sizeKey={size} />
      <span className="relative">{children}</span>
    </span>
  );
}

function Handle({
  position,
  sizeClass,
  bg,
  sizeKey,
}: {
  position: 'tl' | 'tr' | 'bl' | 'br';
  sizeClass: string;
  bg: string;
  sizeKey: Size;
}) {
  const offsetMap: Record<Size, Record<typeof position, string>> = {
    sm: {
      tl: '-top-[3px] -left-[3px]',
      tr: '-top-[3px] -right-[3px]',
      bl: '-bottom-[3px] -left-[3px]',
      br: '-bottom-[3px] -right-[3px]',
    },
    md: {
      tl: '-top-1 -left-1',
      tr: '-top-1 -right-1',
      bl: '-bottom-1 -left-1',
      br: '-bottom-1 -right-1',
    },
    lg: {
      tl: '-top-[5px] -left-[5px] md:-top-1.5 md:-left-1.5',
      tr: '-top-[5px] -right-[5px] md:-top-1.5 md:-right-1.5',
      bl: '-bottom-[5px] -left-[5px] md:-bottom-1.5 md:-left-1.5',
      br: '-bottom-[5px] -right-[5px] md:-bottom-1.5 md:-right-1.5',
    },
  };
  return <span aria-hidden className={cn('absolute pointer-events-none', sizeClass, bg, offsetMap[sizeKey][position])} />;
}
