'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { VALUE } from '@/content/copy';
import { useLeadPopup } from '@/components/global/LeadPopupProvider';

export function ValueSection() {
  const { openPopup } = useLeadPopup();

  const renderHeadline = () => {
    const parts = VALUE.headline.split(VALUE.highlight);
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < parts.length - 1 ? (
          <span className="text-orange">{VALUE.highlight}</span>
        ) : null}
      </span>
    ));
  };

  return (
    <SectionWrapper bg="ink" className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grain opacity-25" />
      <div className="relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="flex flex-col gap-7">
          <span className="text-xs uppercase tracking-[0.16em] font-medium text-orange">
            {VALUE.eyebrow}
          </span>
          <h2 className="text-display-section font-bold tracking-tight text-balance text-white">
            {renderHeadline()}
          </h2>
          <p className="max-w-xl text-lead text-white/70">{VALUE.body}</p>
          <div className="pt-2">
            <Button onClick={() => openPopup('consult')} iconRight={<ArrowIcon />}>
              {VALUE.cta}
            </Button>
          </div>
        </div>

        <ul className="flex flex-col">
          {VALUE.statements.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex items-baseline gap-4 border-b border-white/10 py-6 first:pt-0 last:border-b-0"
            >
              <span className="font-mono text-sm text-white/40">0{i + 1}</span>
              <span className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl text-pretty transition-colors group-hover:text-orange">
                {s}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 15 L15 5 M8 5 H15 V12" />
    </svg>
  );
}
