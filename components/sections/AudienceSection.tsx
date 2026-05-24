'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { BracketCard } from '@/components/ui/BracketCard';
import { HighlightFrame } from '@/components/ui/HighlightFrame';
import { BlurOrb } from '@/components/ui/BrandDecor';
import { Button } from '@/components/ui/Button';
import { AUDIENCE } from '@/content/copy';
import { useLeadPopup } from '@/components/global/LeadPopupProvider';

export function AudienceSection() {
  const { openPopup } = useLeadPopup();

  const headlineParts = AUDIENCE.headline.split(AUDIENCE.highlight);

  return (
    <SectionWrapper id="audience" ariaLabelledBy="audience-title" bg="surface" className="overflow-hidden">
      <BlurOrb color="orange" size={420} intensity="low" className="-top-32 -right-20" />
      <BlurOrb color="ink" size={300} intensity="low" className="-bottom-20 -left-16" />
      <div className="relative grid gap-12 lg:grid-cols-[1.05fr_1.2fr] lg:gap-16">
        {/* Left: headline + supporting text + CTA */}
        <div className="flex flex-col gap-7">
          <span className="text-xs uppercase tracking-[0.16em] font-medium text-neutralGray">
            {AUDIENCE.eyebrow}
          </span>
          <h2 id="audience-title" className="text-display-section font-bold tracking-tight text-balance">
            {headlineParts[0]}
            <HighlightFrame color="orange" size="lg">
              {AUDIENCE.highlight}
            </HighlightFrame>
            {headlineParts[1]}
          </h2>
          <p className="max-w-md text-lead text-warmDark/80">{AUDIENCE.body}</p>
          <div className="pt-2">
            <Button
              variant="dark"
              size="lg"
              onClick={() => openPopup('consult')}
              iconRight={<ArrowIcon />}
            >
              {AUDIENCE.cta}
            </Button>
          </div>
        </div>

        {/* Right: bento composition */}
        <div className="relative">
          <div className="grid grid-cols-6 gap-3 md:gap-4">
            {/* Featured big card — top right */}
            <div className="col-span-6 md:col-span-4 md:col-start-3 md:row-start-1">
              <BracketCard tone="orange" rotate={-1.2} delay={0.05} showBrackets={false} className="h-full">
                <div className="flex flex-col gap-3">
                  <span className="text-xs uppercase tracking-[0.14em] font-semibold opacity-70">
                    {AUDIENCE.featured.title}
                  </span>
                  <p className="text-xl md:text-2xl font-bold tracking-tight leading-snug text-pretty">
                    {AUDIENCE.featured.description}
                  </p>
                </div>
              </BracketCard>
            </div>

            {/* Bento positions for 6 use cases */}
            <UseCaseTile className="col-span-3 md:col-span-2" delay={0.1} rotate={1.5} tone="dark" label={AUDIENCE.useCases[0].label} />
            <UseCaseTile className="col-span-3 md:col-span-2" delay={0.15} rotate={-0.8} tone="light" label={AUDIENCE.useCases[1].label} />
            <UseCaseTile className="col-span-3 md:col-span-3 md:col-start-1" delay={0.2} rotate={-1.5} tone="light" label={AUDIENCE.useCases[2].label} />
            <UseCaseTile className="col-span-3 md:col-span-3" delay={0.25} rotate={1} tone="dark" label={AUDIENCE.useCases[3].label} />
            <UseCaseTile className="col-span-4 md:col-span-3" delay={0.3} rotate={-0.5} tone="light" label={AUDIENCE.useCases[4].label} />
            <UseCaseTile className="col-span-2 md:col-span-3" delay={0.35} rotate={1.2} tone="outline" label={AUDIENCE.useCases[5].label} />
          </div>

          {/* Ambient blur for depth */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="pointer-events-none absolute -inset-x-8 -top-10 -bottom-10 -z-10 bg-grain opacity-20"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

function UseCaseTile({
  className,
  label,
  tone,
  rotate,
  delay,
}: {
  className?: string;
  label: string;
  tone: 'light' | 'dark' | 'outline';
  rotate: number;
  delay: number;
}) {
  return (
    <div className={className}>
      <BracketCard tone={tone} rotate={rotate} delay={delay} className="h-full min-h-[88px] md:min-h-[100px]">
        <div className="flex h-full items-center">
          <span className="text-[11px] md:text-xs uppercase tracking-[0.14em] font-semibold leading-tight">
            {label}
          </span>
        </div>
      </BracketCard>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 15 L15 5 M8 5 H15 V12" />
    </svg>
  );
}
