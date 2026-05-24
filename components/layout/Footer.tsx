'use client';

import Image from 'next/image';
import { useState } from 'react';
import { NAV_ITEMS, TELEGRAM_URL } from '@/lib/constants';
import { FOOTER } from '@/content/copy';
import { scrollToId } from '@/lib/utils';

export function Footer() {
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grain opacity-20" />

      <div className="container relative pt-16 md:pt-20 pb-0">
        {/* TOP ROW */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-8">
          {/* Socials */}
          <div className="flex flex-col gap-3">
            <SocialPill
              href={FOOTER.instagram}
              label="Instagram"
              tone="orange"
              icon={<InstagramIcon />}
            />
            <SocialPill
              href={TELEGRAM_URL}
              label="Telegram"
              tone="dark"
              icon={<TelegramIcon />}
            />
          </div>

          {/* Nav — center column, underlined like ClearPath */}
          <nav aria-label="Футер" className="flex flex-col gap-3 md:items-center">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onMouseEnter={() => setActiveNav(item.id)}
                onMouseLeave={() => setActiveNav(null)}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(item.id);
                  history.replaceState(null, '', `#${item.id}`);
                }}
                className={[
                  'text-base md:text-lg underline-offset-[6px] decoration-1 transition-colors text-left md:text-center',
                  activeNav === item.id ? 'text-orange underline decoration-orange' : 'text-white/75 underline decoration-white/25 hover:text-white',
                ].join(' ')}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-sm font-medium text-orange md:text-right">
            © shstkv, {year}
          </div>
        </div>

        {/* MIDDLE ROW: email + legal */}
        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-end md:justify-between">
          <a
            href={`mailto:${FOOTER.email}`}
            className="text-xl md:text-3xl lg:text-[36px] font-semibold tracking-tight text-white transition-colors hover:text-orange"
          >
            {FOOTER.email}
          </a>
          <div className="flex flex-wrap gap-6 text-sm">
            {FOOTER.legal.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/65 underline underline-offset-4 decoration-white/30 transition-colors hover:text-orange hover:decoration-orange"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* MASSIVE WORDMARK — bleeds off bottom, capped on ultra-wide */}
        <div className="relative mt-10 md:mt-14 overflow-hidden">
          <div className="mx-auto max-w-[1800px]">
            <Image
              src="/logo-light.svg"
              alt=""
              width={1700}
              height={360}
              aria-hidden
              className="w-[130%] -mx-[15%] md:w-[115%] md:-mx-[7.5%] select-none opacity-90 pointer-events-none"
              priority={false}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialPill({
  href,
  label,
  tone,
  icon,
}: {
  href: string;
  label: string;
  tone: 'orange' | 'dark';
  icon: React.ReactNode;
}) {
  const isOrange = tone === 'orange';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        'group inline-flex w-fit min-w-[170px] items-center justify-between rounded-pill pl-5 pr-1.5 py-1.5 text-sm font-semibold transition-all',
        isOrange
          ? 'bg-orange text-ink hover:bg-orange-hover'
          : 'border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]',
      ].join(' ')}
    >
      <span>{label}</span>
      <span
        className={[
          'inline-flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:rotate-6',
          isOrange ? 'bg-ink text-orange' : 'bg-white text-ink',
        ].join(' ')}
      >
        {icon}
      </span>
    </a>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M21.05 3.13 2.62 10.4c-1.13.43-1.12 1.06-.2 1.35l4.73 1.48 1.83 5.61c.23.61.43.83.83.83.4 0 .58-.18.8-.39l1.95-1.9 4.06 3c.74.41 1.27.2 1.46-.69l2.64-12.43c.27-1.07-.41-1.6-1.67-1.13z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
