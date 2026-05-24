'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { HighlightFrame } from '@/components/ui/HighlightFrame';
import { BlurOrb, CornerMarkers } from '@/components/ui/BrandDecor';
import { HERO } from '@/content/copy';
import { useLeadPopup } from '@/components/global/LeadPopupProvider';
import { scrollToId } from '@/lib/utils';

export function Hero() {
  const { openPopup } = useLeadPopup();

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative bg-soft pt-24 pb-10 md:pt-32 md:pb-14 lg:pt-36"
    >
      <div className="container">
        {/* SHOWCASE FRAME ------------------------------------- */}
        <div
          className="relative overflow-hidden rounded-[28px] md:rounded-[36px] p-6 md:p-10 lg:p-14 shadow-[0_30px_80px_-30px_rgba(10,10,10,0.18)]"
          style={{
            backgroundImage:
              'linear-gradient(180deg, #F4F5F7 0%, #E6E8EA 55%, #D7D9DC 100%)',
          }}
        >
          {/* brand DNA — blur orbs + corner markers */}
          <BlurOrb color="orange" size={420} intensity="low" className="-top-32 -right-24" />
          <BlurOrb color="ink" size={260} intensity="low" className="-bottom-24 -left-16" />
          <CornerMarkers color="orange" size="md" inset={16} />

          <div className="relative flex flex-col gap-10 md:gap-14 lg:gap-16">
            {/* eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-warmDark"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange" />
              {HERO.badge}
            </motion.div>

            {/* MASSIVE HEADLINE */}
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-display-hero font-bold text-balance max-w-5xl"
            >
              {HERO.headlineParts.map((part, i) => {
                if (!part.accent) return <span key={i}>{part.text}</span>;
                return (
                  <span key={i} className="mx-1 md:mx-2 inline-block align-baseline">
                    <HighlightFrame color="orange" size="lg">
                      {part.text}
                    </HighlightFrame>
                  </span>
                );
              })}
            </motion.h1>

            {/* BOTTOM ROW ----------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid gap-8 md:grid-cols-[1fr_auto_auto] md:items-end md:gap-12"
            >
              {/* About */}
              <div className="flex flex-col gap-3 max-w-sm">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-orange">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                  {HERO.about.label}
                </div>
                <p className="text-base md:text-[17px] text-warmDark/85 leading-relaxed text-pretty">
                  {HERO.about.body}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Button size="md" onClick={() => openPopup()} iconRight={<ArrowIcon />}>
                    {HERO.primaryCta}
                  </Button>
                  <button
                    type="button"
                    onClick={() => scrollToId('pricing')}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-ink transition-colors"
                  >
                    {HERO.secondaryCta}
                  </button>
                </div>
              </div>

              {/* KEYCAP — central 3D orange key */}
              <KeyCap onClick={() => openPopup()} top={HERO.keycap.line1} bottom={HERO.keycap.line2} />

              {/* PROOF mini card */}
              <ProofMini />
            </motion.div>
          </div>
        </div>

        {/* TWO CARDS BELOW ----------------------------------- */}
        <div className="grid gap-4 mt-4 md:mt-5 md:grid-cols-[300px_1fr] md:gap-5">
          {/* Question card */}
          <motion.button
            type="button"
            onClick={() => openPopup('consult')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[24px] bg-orange p-6 md:p-7 text-ink shadow-soft transition-shadow hover:shadow-liftSoft text-left"
          >
            <CornerMarkers color="ink" size="sm" inset={14} />
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/30">
              <ChatIcon />
            </div>
            <div>
              <h3 className="text-3xl md:text-[34px] font-bold tracking-tight leading-[1.02] mb-6">
                {HERO.questionCard.title}
              </h3>
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>{HERO.questionCard.cta}</span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-orange transition-transform group-hover:rotate-12">
                  <ArrowIcon />
                </span>
              </div>
            </div>
          </motion.button>

          {/* Metric card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid min-h-[220px] gap-6 overflow-hidden rounded-[24px] bg-white p-6 md:p-8 shadow-soft md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8"
          >
            <CornerMarkers color="orange" size="sm" inset={14} />

            {/* top-left label */}
            <div className="absolute top-5 left-6 inline-flex items-center gap-2 text-xs font-semibold text-ink">
              <BarsIcon /> {HERO.metricCard.label}
            </div>

            {/* left text */}
            <div className="self-end md:self-center">
              <div className="font-bold text-2xl md:text-3xl tracking-tight leading-[1.05]">
                {HERO.metricCard.title}
              </div>
              <div className="text-neutralGray text-sm md:text-base mt-1">{HERO.metricCard.suffix}</div>
            </div>

            {/* gauge */}
            <Gauge value={HERO.metricCard.metric} unit={HERO.metricCard.metricUnit} />

            {/* right copy */}
            <div className="flex flex-col gap-3 md:max-w-[230px]">
              <p className="text-sm md:text-[14.5px] leading-relaxed text-warmDark/85">
                {HERO.metricCard.body}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --------- Sub-components --------- */

function KeyCap({ onClick, top, bottom }: { onClick?: () => void; top: string; bottom: string }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`${top} ${bottom}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      whileTap={{ y: 1, scale: 0.98 }}
      className="relative mx-auto block h-[140px] w-[140px] md:h-[150px] md:w-[150px] cursor-pointer"
    >
      {/* dark base */}
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[52px] w-[120px] rounded-[10px] bg-gradient-to-b from-[#1a1a1a] to-[#000] shadow-[0_30px_40px_rgba(0,0,0,0.25)]" />
      {/* keycap */}
      <span
        className="absolute left-1/2 top-0 -translate-x-1/2 grid h-[120px] w-[130px] place-items-center rounded-[14px_14px_18px_18px] text-white shadow-[inset_0_-10px_20px_rgba(0,0,0,0.2),inset_0_12px_18px_rgba(255,255,255,0.3),0_18px_30px_rgba(217,74,20,0.4)]"
        style={{
          backgroundImage: 'linear-gradient(180deg, #FF8A4D 0%, #FB6221 50%, #D94A14 100%)',
        }}
      >
        <span className="pointer-events-none absolute inset-x-2 top-1.5 bottom-7 rounded-[10px_10px_14px_14px] bg-gradient-to-b from-white/30 to-transparent" />
        <span className="relative z-10 text-center text-[15px] font-bold tracking-tight leading-tight">
          {top}
          <br />
          <span className="text-[12px] opacity-90">{bottom}</span>
        </span>
      </span>
    </motion.button>
  );
}

function ProofMini() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-[120px] w-full max-w-[200px] overflow-hidden rounded-[18px] bg-ink p-4 text-white shadow-soft md:h-[110px] md:w-[200px]"
    >
      <div className="absolute inset-0 opacity-30 bg-grain pointer-events-none" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-white/50">
          <span>Telegram</span>
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-orange leading-tight">Нова заявка</div>
          <div className="text-[12px] text-white/70 leading-tight mt-1">Олена · 400€</div>
        </div>
      </div>
    </motion.div>
  );
}

function Gauge({ value, unit }: { value: string; unit: string }) {
  return (
    <div className="relative mx-auto h-[160px] w-[160px] md:h-[180px] md:w-[180px]">
      <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90">
        <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(10,10,10,0.06)" strokeWidth="14" />
        <motion.circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="#FB6221"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={534}
          initial={{ strokeDashoffset: 534 }}
          whileInView={{ strokeDashoffset: 534 - 534 * 0.72 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight leading-none">{value}</div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-neutralGray mt-1">{unit}</div>
        </div>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 15 L15 5 M8 5 H15 V12" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function BarsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19V10M10 19V4M16 19v-7M22 19H2" />
    </svg>
  );
}
