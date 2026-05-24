'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useLeadPopup } from './LeadPopupProvider';

export function FloatingWidget() {
  const { openPopup, isOpen } = useLeadPopup();

  return (
    <AnimatePresence>
      {!isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.6 }}
          className="fixed bottom-6 right-6 z-40 hidden md:block"
        >
          <motion.button
            type="button"
            onClick={() => openPopup()}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 5.5, ease: 'easeInOut' }}
            className="group flex items-center gap-3 rounded-pill bg-orange pl-5 pr-2 py-2 text-ink shadow-liftSoft transition-shadow hover:shadow-[0_30px_60px_-20px_rgba(251,98,33,0.6)]"
            aria-label="Залишити заявку"
          >
            <span className="font-semibold tracking-tight">Заявка</span>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-orange transition-transform group-hover:rotate-12">
              <ChatIcon />
            </span>
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
