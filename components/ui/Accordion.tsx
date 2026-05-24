'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type AccordionItem = {
  q: string;
  a: string;
};

export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `${baseId}-panel-${i}`;
        const triggerId = `${baseId}-trigger-${i}`;
        return (
          <li
            key={item.q}
            className={cn(
              'overflow-hidden rounded-card border transition-colors',
              isOpen ? 'border-orange/40 bg-white' : 'border-ink/5 bg-surface hover:bg-white',
            )}
          >
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8 md:py-6"
              >
                <span className="text-lg md:text-xl font-semibold tracking-tight text-ink">{item.q}</span>
                <span
                  className={cn(
                    'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink transition-transform duration-300',
                    isOpen ? 'bg-orange rotate-45' : 'bg-ink/5',
                  )}
                  aria-hidden
                >
                  <PlusIcon />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 md:px-8 md:pb-7 text-warmDark/80 text-base leading-relaxed max-w-[62ch]">
                    {item.a}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M8 2 V14 M2 8 H14" />
    </svg>
  );
}
