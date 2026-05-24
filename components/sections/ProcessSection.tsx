'use client';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { TimelineStep } from '@/components/ui/TimelineStep';
import { Button } from '@/components/ui/Button';
import { PROCESS } from '@/content/copy';
import { useLeadPopup } from '@/components/global/LeadPopupProvider';

export function ProcessSection() {
  const { openPopup } = useLeadPopup();

  return (
    <SectionWrapper id="process" ariaLabelledBy="process-title" bg="soft">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <span className="text-xs uppercase tracking-[0.16em] font-medium text-warmDark/80">
            {PROCESS.eyebrow}
          </span>
          <h2 id="process-title" className="text-display-section font-bold tracking-tight text-balance">
            {PROCESS.headline}
          </h2>
          <p className="max-w-md text-lead text-warmDark/80">{PROCESS.body}</p>
          <div className="pt-2">
            <Button size="lg" onClick={() => openPopup()} iconRight={<ArrowIcon />}>
              {PROCESS.cta}
            </Button>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {PROCESS.steps.map((s, i) => (
            <TimelineStep
              key={s.num}
              num={s.num}
              title={s.title}
              desc={s.desc}
              index={i}
              total={PROCESS.steps.length}
              highlight={i === PROCESS.steps.length - 1}
            />
          ))}
        </ul>
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
