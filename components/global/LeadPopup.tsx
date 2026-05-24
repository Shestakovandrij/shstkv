'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLeadPopup } from './LeadPopupProvider';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { LeadForm } from '@/components/ui/LeadForm';
import { POPUP } from '@/content/copy';

export function LeadPopup() {
  const { isOpen, closePopup, presetPackage } = useLeadPopup();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closePopup();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input:not([type="hidden"]), select, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    const t = window.setTimeout(() => {
      const firstInput = dialogRef.current?.querySelector<HTMLElement>('input,button');
      firstInput?.focus();
    }, 60);

    return () => {
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen, closePopup]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center">
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
            onClick={closePopup}
            aria-hidden
          />
          <motion.div
            key="dialog"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-popup-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-t-card bg-surface shadow-liftSoft md:max-h-[90vh] md:rounded-card"
          >
            <div className="flex items-center justify-between border-b border-ink/5 px-6 pt-6 pb-5 md:px-8">
              <div>
                <h2 id="lead-popup-title" className="text-2xl font-bold tracking-tight">
                  {POPUP.title}
                </h2>
                <p className="mt-1 text-sm text-warmDark/70">{POPUP.subtitle}</p>
              </div>
              <button
                type="button"
                aria-label="Закрити"
                onClick={closePopup}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ink/10"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="max-h-[calc(90vh-110px)] overflow-y-auto px-6 py-6 md:px-8 md:py-7">
              <LeadForm defaultPackage={presetPackage} onDone={closePopup} />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M3 3 L13 13 M13 3 L3 13" />
    </svg>
  );
}
