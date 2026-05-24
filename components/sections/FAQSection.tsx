'use client';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { FAQ } from '@/content/copy';
import { TELEGRAM_URL } from '@/lib/constants';
import { useLeadPopup } from '@/components/global/LeadPopupProvider';

export function FAQSection() {
  const { openPopup } = useLeadPopup();

  return (
    <SectionWrapper id="faq" ariaLabelledBy="faq-title" bg="surface">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <span className="text-xs uppercase tracking-[0.16em] font-medium text-neutralGray">
            {FAQ.eyebrow}
          </span>
          <h2 id="faq-title" className="text-display-section font-bold tracking-tight text-balance">
            {FAQ.headline}
          </h2>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
            <Button variant="dark" onClick={() => openPopup()}>
              {FAQ.cta}
            </Button>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-pill border border-ink/15 bg-white px-6 py-3 text-base font-semibold text-ink transition-colors hover:border-ink/40"
            >
              Написати в Telegram
            </a>
          </div>
        </div>

        <Accordion items={FAQ.items} />
      </div>
    </SectionWrapper>
  );
}
