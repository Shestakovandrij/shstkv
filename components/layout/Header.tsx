'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_ITEMS, TELEGRAM_URL } from '@/lib/constants';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useLeadPopup } from '@/components/global/LeadPopupProvider';
import { Button } from '@/components/ui/Button';
import { scrollToId, cn } from '@/lib/utils';

export function Header() {
  const { direction, atTop } = useScrollDirection(12);
  const { openPopup } = useLeadPopup();
  const [menuOpen, setMenuOpen] = useState(false);
  useLockBodyScroll(menuOpen);

  useEffect(() => {
    setMenuOpen(false);
  }, [direction]);

  const hidden = !menuOpen && direction === 'down' && !atTop;

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors',
          atTop ? 'bg-transparent' : 'bg-soft/80 backdrop-blur-md border-b border-ink/5',
        )}
      >
        <div className="container flex h-16 items-center justify-between md:h-20">
          <a
            href="#top"
            aria-label="shstkv — на головну"
            className="flex items-center gap-2 text-ink"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Image
              src="/logo-dark.svg"
              alt="shstkv"
              width={132}
              height={28}
              priority
              className="h-7 w-auto md:h-8"
            />
          </a>

          <nav aria-label="Основна навігація" className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToId(item.id)}
                className="rounded-pill px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Відкрити Telegram"
              className="hidden h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ink/10 md:inline-flex"
            >
              <TelegramIcon />
            </a>
            <Button
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => openPopup()}
            >
              Замовити сайт
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
              aria-expanded={menuOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white lg:hidden"
            >
              <BurgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-soft lg:hidden"
          >
            <motion.nav
              aria-label="Мобільна навігація"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="container flex h-full flex-col pt-24 pb-12"
            >
              <ul className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        setTimeout(() => scrollToId(item.id), 200);
                      }}
                      className="flex w-full items-center justify-between rounded-2xl bg-white px-5 py-4 text-left text-xl font-semibold tracking-tight"
                    >
                      {item.label}
                      <span className="text-orange">→</span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => {
                    setMenuOpen(false);
                    setTimeout(() => openPopup(), 200);
                  }}
                >
                  Замовити сайт
                </Button>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-pill border border-ink/15 bg-white px-6 py-4 text-base font-semibold"
                >
                  <TelegramIcon /> Написати в Telegram
                </a>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M21.05 3.13 2.62 10.4c-1.13.43-1.12 1.06-.2 1.35l4.73 1.48 1.83 5.61c.23.61.43.83.83.83.4 0 .58-.18.8-.39l1.95-1.9 4.06 3c.74.41 1.27.2 1.46-.69l2.64-12.43c.27-1.07-.41-1.6-1.67-1.13z" />
    </svg>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3 w-4">
      <motion.span
        className="absolute left-0 right-0 h-[2px] bg-current"
        animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
        transition={{ duration: 0.25 }}
        style={{ top: 0 }}
      />
      <motion.span
        className="absolute left-0 right-0 h-[2px] bg-current"
        animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
        transition={{ duration: 0.25 }}
        style={{ top: 12 }}
      />
    </span>
  );
}
