'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { CornerMarkers, BlurOrb } from '@/components/ui/BrandDecor';
import { TELEGRAM_LEADS } from '@/content/copy';
import { useLeadPopup } from '@/components/global/LeadPopupProvider';

/**
 * Slim Telegram trigger strip — not a full section.
 * Shows realistic incoming lead preview so the prospect imagines
 * what their own Telegram will look like after launch.
 */
export function TelegramLeadsSection() {
  const { openPopup } = useLeadPopup();
  const p = TELEGRAM_LEADS.preview;

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
          <CornerMarkers color="orange" size="md" inset={14} />
          <BlurOrb color="orange" size={300} intensity="med" className="-top-24 -right-20" />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grain opacity-25" />

          <div className="relative grid gap-8 px-6 py-7 md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:px-10 md:py-9">
            {/* Left: text + CTA */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-pill bg-orange px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                  {TELEGRAM_LEADS.badge}
                </span>
              </div>
              <h2 id="telegram-title" className="text-2xl md:text-[32px] font-bold tracking-tight text-pretty leading-tight">
                {TELEGRAM_LEADS.headline}
              </h2>
              <p className="text-sm md:text-base text-white/65 max-w-md text-pretty">
                {TELEGRAM_LEADS.body}
              </p>
              <div className="mt-1">
                <Button onClick={() => openPopup()} iconRight={<ArrowIcon />}>
                  {TELEGRAM_LEADS.cta}
                </Button>
              </div>
            </div>

            {/* Right: realistic Telegram lead notification */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative w-full md:w-[400px] rounded-2xl bg-white/[0.05] backdrop-blur-sm p-4 ring-1 ring-white/10"
            >
              {/* Telegram header */}
              <div className="flex items-center gap-3">
                <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2AABEE] to-[#229ED9]">
                  <PaperPlane className="h-4 w-4 text-white" />
                  <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-orange ring-2 ring-ink" />
                </span>
                <div className="flex flex-col">
                  <div className="text-sm font-semibold leading-tight">Заявки з сайту</div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-white/45">{p.time}</div>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  доставлено
                </span>
              </div>

              {/* Message bubble */}
              <div className="mt-3 rounded-xl rounded-tl-md bg-ink/60 p-3.5 ring-1 ring-white/5">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange">{p.title}</span>
                </div>
                <dl className="mt-2.5 flex flex-col gap-1.5">
                  <Row label="Ім'я" value={p.name} />
                  <Row label="Телефон" value={p.phone} />
                </dl>
                <div className="mt-3 rounded-lg bg-white/5 p-3 text-[13px] leading-snug text-white/85 ring-1 ring-white/5">
                  “{p.message}”
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[70px_1fr] gap-2 items-baseline">
      <dt className="text-[10px] uppercase tracking-[0.12em] text-white/40">{label}</dt>
      <dd className="text-sm text-white">{value}</dd>
    </div>
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
