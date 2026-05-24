'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { LeadForm } from '@/components/ui/LeadForm';
import { FINAL_CTA } from '@/content/copy';

export function FinalCTA() {
  return (
    <SectionWrapper bg="orange" className="overflow-hidden" ariaLabelledBy="final-title">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grain opacity-20" />
      <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />

      <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-max items-center gap-2 rounded-pill bg-ink/10 px-4 py-1.5 text-xs uppercase tracking-[0.14em] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            {FINAL_CTA.eyebrow}
          </span>
          <h2 id="final-title" className="text-display-section font-bold tracking-tight text-balance text-ink">
            {FINAL_CTA.headline}
          </h2>
          <p className="max-w-xl text-lead text-ink/80">{FINAL_CTA.body}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="relative"
        >
          <div className="absolute -top-3 right-4 z-10">
            <span className="inline-flex items-center gap-2 rounded-pill bg-ink px-4 py-1.5 text-xs font-semibold text-orange shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" />
              {FINAL_CTA.badge}
            </span>
          </div>
          <div className="rounded-card bg-surface p-6 shadow-liftSoft md:p-8">
            <h3 className="mb-5 text-xl font-bold tracking-tight">{FINAL_CTA.cta}</h3>
            <LeadForm variant="inline" />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
