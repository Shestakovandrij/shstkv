'use client';

import { motion } from 'framer-motion';
import { LeadForm } from '@/components/ui/LeadForm';
import { CornerMarkers, BlurOrb } from '@/components/ui/BrandDecor';
import { FINAL_CTA } from '@/content/copy';

export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-title"
      className="relative overflow-hidden py-20 md:py-28 lg:py-36 text-ink"
      style={{
        backgroundImage: [
          'radial-gradient(at 18% 12%, #FFA672 0%, transparent 55%)',
          'radial-gradient(at 88% 92%, #C8420F 0%, transparent 55%)',
          'radial-gradient(at 50% 50%, #FB6221 0%, #E45719 65%, #C04611 100%)',
        ].join(', '),
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grain opacity-30" />
      <BlurOrb color="white" size={500} intensity="low" className="-top-40 -left-40" />
      <BlurOrb color="ink" size={420} intensity="low" className="-bottom-32 -right-32" />

      <div className="container relative">
        <div className="relative">
          <CornerMarkers color="ink" size="md" inset={-10} />

          <div className="relative grid gap-12 rounded-[28px] md:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-max items-center gap-2 rounded-pill bg-ink/10 px-4 py-1.5 text-xs uppercase tracking-[0.16em] font-semibold backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                {FINAL_CTA.eyebrow}
              </span>
              <h2 id="final-title" className="text-display-section font-bold tracking-tight text-balance text-ink">
                {FINAL_CTA.headline}
              </h2>
              <p className="max-w-xl text-lead text-ink/80 text-pretty">{FINAL_CTA.body}</p>
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
              <div className="relative rounded-card bg-surface p-6 shadow-liftSoft md:p-8">
                <h3 className="mb-5 text-xl font-bold tracking-tight">{FINAL_CTA.cta}</h3>
                <LeadForm variant="inline" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
