'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { TELEGRAM_LEADS } from '@/content/copy';
import { useLeadPopup } from '@/components/global/LeadPopupProvider';

/**
 * Slim Telegram trigger strip — not a full section.
 * Sits as an attention-grabbing bonus banner between IncludedSection and Pricing.
 */
export function TelegramLeadsSection() {
  const { openPopup } = useLeadPopup();

  return (
    <section
      id="telegram"
      aria-labelledby="telegram-title"
      className="relative bg-soft py-10 md:py-14"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 110, damping: 20 }}
          className="relative overflow-hidden rounded-card bg-ink text-white shadow-liftSoft"
        >
          {/* Corner brackets — brand consistency */}
          <span aria-hidden className="absolute top-3 left-3 h-3.5 w-3.5 border-l-2 border-t-2 border-orange" />
          <span aria-hidden className="absolute top-3 right-3 h-3.5 w-3.5 border-r-2 border-t-2 border-orange" />
          <span aria-hidden className="absolute bottom-3 left-3 h-3.5 w-3.5 border-l-2 border-b-2 border-orange" />
          <span aria-hidden className="absolute bottom-3 right-3 h-3.5 w-3.5 border-r-2 border-b-2 border-orange" />

          {/* Ambient glow */}
          <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-orange/25 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grain opacity-25" />

          <div className="relative grid gap-6 px-6 py-7 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8 md:px-10 md:py-8">
            {/* Bonus badge + icon */}
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2AABEE] to-[#229ED9]">
                <PaperPlane className="h-5 w-5 text-white" />
                <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange text-[10px] font-bold text-ink ring-2 ring-ink">
                  1
                </span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-pill bg-orange px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                {TELEGRAM_LEADS.badge}
              </span>
            </div>

            {/* Headline + body + mini preview */}
            <div className="flex flex-col gap-2">
              <h2 id="telegram-title" className="text-2xl font-bold tracking-tight md:text-3xl text-pretty">
                {TELEGRAM_LEADS.headline}
              </h2>
              <p className="text-sm md:text-base text-white/65 text-pretty max-w-xl">
                {TELEGRAM_LEADS.body}
              </p>
              <div className="mt-1 inline-flex w-fit items-center gap-2 rounded-pill bg-white/5 px-3 py-1.5 font-mono text-[12px] text-white/70 ring-1 ring-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {TELEGRAM_LEADS.preview}
              </div>
            </div>

            {/* CTA */}
            <div className="flex md:justify-end">
              <Button onClick={() => openPopup()} iconRight={<ArrowIcon />}>
                {TELEGRAM_LEADS.cta}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PaperPlane({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 3 L3 11 L11 13 L13 21 L21 3 Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 15 L15 5 M8 5 H15 V12" />
    </svg>
  );
}
