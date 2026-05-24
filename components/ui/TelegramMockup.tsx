'use client';

import { motion } from 'framer-motion';

type Field = { label: string; value: string };

type Props = {
  sender: string;
  title: string;
  fields: readonly Field[];
  time: string;
};

export function TelegramMockup({ sender, title, fields, time }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      className="relative mx-auto w-full max-w-md"
    >
      <div className="absolute -top-6 -right-6 hidden h-28 w-28 rounded-full bg-orange/20 blur-2xl md:block" aria-hidden />
      <div className="absolute -bottom-8 -left-8 hidden h-32 w-32 rounded-full bg-ink/20 blur-3xl md:block" aria-hidden />

      <div className="relative overflow-hidden rounded-card bg-ink p-5 text-white shadow-liftSoft ring-1 ring-white/5">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#2AABEE] to-[#229ED9]">
              <PaperPlane className="h-5 w-5 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-orange ring-2 ring-ink" aria-hidden />
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-semibold leading-tight">{sender}</div>
              <div className="text-[11px] text-white/50">Telegram bot</div>
            </div>
          </div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">{time}</div>
        </div>

        {/* Body card */}
        <div className="mt-5 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange" aria-hidden />
            <span className="text-sm font-semibold uppercase tracking-[0.12em] text-orange">{title}</span>
          </div>

          <dl className="mt-4 flex flex-col divide-y divide-white/10">
            {fields.map((f) => (
              <div key={f.label} className="grid grid-cols-[110px_1fr] gap-3 py-2.5">
                <dt className="text-xs uppercase tracking-[0.1em] text-white/45">{f.label}</dt>
                <dd className="text-sm text-white">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-white/40">
          <span>shstkv • заявка з landing</span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> доставлено
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function PaperPlane({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 3 L3 11 L11 13 L13 21 L21 3 Z" />
    </svg>
  );
}
