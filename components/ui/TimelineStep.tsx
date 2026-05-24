'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  num: string;
  title: string;
  desc: string;
  index: number;
  total: number;
  highlight?: boolean;
};

export function TimelineStep({ num, title, desc, index, total, highlight }: Props) {
  const isLast = index === total - 1;
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative flex flex-col gap-4 rounded-card border p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft',
        highlight ? 'border-orange/40 bg-ink text-white' : 'border-ink/5 bg-white text-ink',
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold tracking-tight',
            highlight ? 'bg-orange text-ink' : 'bg-ink text-white',
          )}
        >
          {num}
        </span>
        <span className={cn('h-px flex-1', highlight ? 'bg-white/15' : 'bg-ink/10')} />
        {!isLast ? (
          <span className={cn('inline-block h-2 w-2 rounded-full', highlight ? 'bg-orange' : 'bg-orange/70')} aria-hidden />
        ) : null}
      </div>
      <h3 className={cn('text-xl md:text-2xl font-bold tracking-tight', highlight ? 'text-white' : 'text-ink')}>
        {title}
      </h3>
      <p className={cn('text-[15px] leading-relaxed', highlight ? 'text-white/70' : 'text-warmDark/80')}>
        {desc}
      </p>
    </motion.li>
  );
}
