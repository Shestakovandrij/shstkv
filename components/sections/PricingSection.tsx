'use client';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { PricingCard } from '@/components/ui/PricingCard';
import { PRICING } from '@/content/copy';

export function PricingSection() {
  return (
    <SectionWrapper id="pricing" ariaLabelledBy="pricing-title" bg="surface">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <span className="text-xs uppercase tracking-[0.16em] font-medium text-neutralGray">
          {PRICING.eyebrow}
        </span>
        <h2 id="pricing-title" className="text-display-section font-bold tracking-tight text-balance">
          {PRICING.headline}
        </h2>
        <p className="max-w-xl text-lead text-warmDark/75">{PRICING.body}</p>
      </div>

      <div className="mt-14 grid items-stretch gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8">
        {PRICING.packages.map((p) => (
          <PricingCard
            key={p.id}
            id={p.id}
            price={p.price}
            name={p.name}
            tagline={p.tagline}
            description={p.description}
            features={p.features}
            cta={p.cta}
            tone={p.tone}
            recommended={p.recommended}
            recommendedLabel={p.recommendedLabel}
            highlightFromIndex={p.recommended ? 3 : undefined}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
