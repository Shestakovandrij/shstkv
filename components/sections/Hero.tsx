'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { HighlightFrame } from '@/components/ui/HighlightFrame';
import { HERO } from '@/content/copy';
import { useLeadPopup } from '@/components/global/LeadPopupProvider';
import { scrollToId, cn } from '@/lib/utils';

export function Hero() {
  const { openPopup } = useLeadPopup();

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-soft pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-44 lg:pb-36"
    >
      {/* ambient gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/60 to-transparent blur-3xl"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grain opacity-[0.35]" />

      <div className="container relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <div className="flex flex-col gap-7 md:gap-9">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <span className="inline-flex h-2 w-2 rounded-full bg-orange" />
              <span className="text-xs uppercase tracking-[0.16em] font-medium text-warmDark/80">
                {HERO.badge}
              </span>
            </motion.div>

            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-display-hero font-bold text-balance"
            >
              {HERO.headlineParts.map((part, i) => {
                if (!part.accent) return <span key={i}>{part.text}</span>;
                return (
                  <span key={i} className="mx-1 md:mx-2 inline-block">
                    <HighlightFrame color="orange" size="lg">
                      {part.text}
                    </HighlightFrame>
                  </span>
                );
              })}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="max-w-xl text-lead text-warmDark/85 text-pretty"
            >
              {HERO.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="flex flex-wrap items-center gap-2 text-sm text-warmDark/80"
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
              {HERO.note}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Button size="lg" onClick={() => openPopup()} iconRight={<ArrowIcon />}>
                {HERO.primaryCta}
              </Button>
              <Button size="lg" variant="secondary" onClick={() => scrollToId('pricing')}>
                {HERO.secondaryCta}
              </Button>
            </motion.div>
          </div>

          {/* Floating proof cards */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[5/6] lg:aspect-[4/5]">
              <FloatingCard
                className="absolute left-0 top-[6%] w-[68%]"
                tone="dark"
                title="Telegram"
                value="Заявка → телефон"
                rotate={-3}
                delay={0.5}
              >
                <MockChat />
              </FloatingCard>

              <FloatingCard
                className="absolute right-0 top-[34%] w-[58%]"
                tone="orange"
                title="Пакет"
                value="від 200€"
                rotate={3}
                delay={0.65}
              >
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-ink/10 px-2 py-1.5 font-medium">200€</div>
                  <div className="rounded-lg bg-ink/80 px-2 py-1.5 font-medium text-orange">400€</div>
                </div>
              </FloatingCard>

              <FloatingCard
                className="absolute left-[10%] bottom-[4%] w-[60%]"
                tone="light"
                title="Запуск"
                value="готово під рекламу"
                rotate={-2}
                delay={0.8}
              >
                <div className="mt-3 flex items-center gap-2 text-[11px] text-neutralGray">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> mobile-first · SEO base
                </div>
              </FloatingCard>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:hidden">
              {HERO.proofs.map((p) => (
                <Badge key={p.label} tone={p.tone} uppercase>
                  {p.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  className,
  tone,
  title,
  value,
  rotate = 0,
  delay = 0,
  children,
}: {
  className?: string;
  tone: 'dark' | 'orange' | 'light';
  title: string;
  value: string;
  rotate?: number;
  delay?: number;
  children?: React.ReactNode;
}) {
  const tones = {
    dark: 'bg-ink text-white',
    orange: 'bg-orange text-ink',
    light: 'bg-white text-ink',
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ type: 'spring', stiffness: 80, damping: 18, delay }}
      whileHover={{ y: -4, rotate: rotate * 0.6 }}
      className={cn('rounded-card p-5 shadow-liftSoft ring-1 ring-ink/5', tones[tone], className)}
    >
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] opacity-70">
        <span>{title}</span>
        <span>↗</span>
      </div>
      <div className="mt-2 text-xl font-bold tracking-tight">{value}</div>
      {children}
    </motion.div>
  );
}

function MockChat() {
  return (
    <div className="mt-4 flex flex-col gap-1.5">
      <div className="self-start rounded-2xl rounded-bl-md bg-white/10 px-3 py-1.5 text-xs">Нова заявка</div>
      <div className="self-start rounded-2xl rounded-bl-md bg-white/10 px-3 py-1.5 text-xs">Андрій · 400€</div>
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
