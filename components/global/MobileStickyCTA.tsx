'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLeadPopup } from './LeadPopupProvider';

export function MobileStickyCTA() {
  const { openPopup, isOpen } = useLeadPopup();
  const [afterHero, setAfterHero] = useState(false);
  const [overFinal, setOverFinal] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const finalSection = document.querySelector('[aria-labelledby="final-title"]');

    if (!hero) setAfterHero(true);

    const heroObs = hero
      ? new IntersectionObserver(([entry]) => setAfterHero(!entry.isIntersecting), { threshold: 0.1 })
      : null;
    heroObs?.observe(hero!);

    const finalObs = finalSection
      ? new IntersectionObserver(([entry]) => setOverFinal(entry.isIntersecting), { threshold: 0.05 })
      : null;
    if (finalSection) finalObs?.observe(finalSection);

    return () => {
      heroObs?.disconnect();
      finalObs?.disconnect();
    };
  }, []);

  const visible = afterHero && !overFinal && !isOpen;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pt-2 safe-bottom md:hidden"
        >
          <button
            type="button"
            onClick={() => openPopup()}
            className="flex w-full items-center justify-between rounded-pill bg-orange px-6 py-4 text-base font-semibold text-ink shadow-liftSoft active:scale-[0.98]"
          >
            <span>Залишити заявку</span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-orange">
              <ArrowIcon />
            </span>
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 15 L15 5 M8 5 H15 V12" />
    </svg>
  );
}
