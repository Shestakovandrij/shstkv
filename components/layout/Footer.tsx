'use client';

import Image from 'next/image';
import { NAV_ITEMS, TELEGRAM_URL, TELEGRAM_USERNAME } from '@/lib/constants';
import { FOOTER } from '@/content/copy';
import { Button } from '@/components/ui/Button';
import { scrollToId } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <Image
              src="/logo-light.svg"
              alt="shstkv"
              width={170}
              height={36}
              className="h-9 w-auto"
            />
            <p className="max-w-md text-base text-white/70 leading-relaxed">{FOOTER.description}</p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 self-start rounded-pill bg-orange px-6 py-3 text-base font-semibold text-ink transition-colors hover:bg-orange-hover"
            >
              <TelegramIcon /> {FOOTER.cta}
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-xs uppercase tracking-[0.16em] text-white/40">{FOOTER.navLabel}</div>
            <ul className="flex flex-col gap-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(item.id)}
                    className="text-base text-white/80 transition-colors hover:text-orange"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-xs uppercase tracking-[0.16em] text-white/40">{FOOTER.contactsLabel}</div>
            <ul className="flex flex-col gap-2.5 text-base text-white/80">
              <li>
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-orange">
                  Telegram @{TELEGRAM_USERNAME}
                </a>
              </li>
              <li>
                <a href={`mailto:${FOOTER.email}`} className="hover:text-orange">
                  {FOOTER.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} shstkv. Усі права захищено.</div>
          <ul className="flex flex-wrap gap-6">
            {FOOTER.legal.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-orange">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M21.05 3.13 2.62 10.4c-1.13.43-1.12 1.06-.2 1.35l4.73 1.48 1.83 5.61c.23.61.43.83.83.83.4 0 .58-.18.8-.39l1.95-1.9 4.06 3c.74.41 1.27.2 1.46-.69l2.64-12.43c.27-1.07-.41-1.6-1.67-1.13z" />
    </svg>
  );
}
