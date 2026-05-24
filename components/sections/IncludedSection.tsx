'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { HighlightFrame } from '@/components/ui/HighlightFrame';
import { Button } from '@/components/ui/Button';
import { INCLUDED } from '@/content/copy';
import { useLeadPopup } from '@/components/global/LeadPopupProvider';

export function IncludedSection() {
  const { openPopup } = useLeadPopup();
  const headlineParts = INCLUDED.headline.split(INCLUDED.highlight);

  return (
    <SectionWrapper id="included" ariaLabelledBy="included-title" bg="ink" className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grain opacity-25" />

      <div className="relative grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <span className="text-xs uppercase tracking-[0.16em] font-medium text-orange">
            {INCLUDED.eyebrow}
          </span>
          <h2 id="included-title" className="text-display-section font-bold tracking-tight text-balance text-white">
            {headlineParts[0]}
            <HighlightFrame color="orange" size="lg">
              {INCLUDED.highlight}
            </HighlightFrame>
            {headlineParts[1]}
          </h2>
          <p className="max-w-md text-lead text-white/70">{INCLUDED.body}</p>
          <div className="pt-2">
            <Button onClick={() => openPopup('consult')} iconRight={<ArrowIcon />}>
              {INCLUDED.cta}
            </Button>
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {INCLUDED.features.map((f, i) => (
            <motion.li
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-card border border-white/10 bg-white/[0.04] p-5 md:p-6 transition-all hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              {/* Corner brackets */}
              <span aria-hidden className="absolute top-2 left-2 h-3 w-3 border-l-[1.5px] border-t-[1.5px] border-orange/60" />
              <span aria-hidden className="absolute top-2 right-2 h-3 w-3 border-r-[1.5px] border-t-[1.5px] border-orange/60" />
              <span aria-hidden className="absolute bottom-2 left-2 h-3 w-3 border-l-[1.5px] border-b-[1.5px] border-orange/60" />
              <span aria-hidden className="absolute bottom-2 right-2 h-3 w-3 border-r-[1.5px] border-b-[1.5px] border-orange/60" />

              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-orange leading-none mt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg md:text-xl font-bold tracking-tight text-white text-pretty">
                    {f.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-white/65 text-pretty">
                    {f.desc}
                  </p>
                </div>
              </div>
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
