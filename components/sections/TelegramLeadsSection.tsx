'use client';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { TelegramMockup } from '@/components/ui/TelegramMockup';
import { TELEGRAM_LEADS } from '@/content/copy';
import { useLeadPopup } from '@/components/global/LeadPopupProvider';

export function TelegramLeadsSection() {
  const { openPopup } = useLeadPopup();
  const m = TELEGRAM_LEADS.mockup;

  return (
    <SectionWrapper id="telegram" ariaLabelledBy="telegram-title" bg="soft">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="flex flex-col gap-7">
          <span className="text-xs uppercase tracking-[0.16em] font-medium text-warmDark/80">
            {TELEGRAM_LEADS.eyebrow}
          </span>
          <h2 id="telegram-title" className="text-display-section font-bold tracking-tight text-balance">
            {TELEGRAM_LEADS.headline}
          </h2>
          <p className="max-w-xl text-lead text-warmDark/80">{TELEGRAM_LEADS.body}</p>
          <div className="pt-2">
            <Button size="lg" onClick={() => openPopup()} iconRight={<ArrowIcon />}>
              {TELEGRAM_LEADS.cta}
            </Button>
          </div>
        </div>

        <div className="relative">
          <TelegramMockup
            sender={m.sender}
            title={m.title}
            fields={m.fields}
            time={m.time}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 15 L15 5 M8 5 H15 V12" />
    </svg>
  );
}
