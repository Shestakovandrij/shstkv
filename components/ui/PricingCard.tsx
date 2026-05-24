'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Badge } from './Badge';
import { CornerMarkers, BlurOrb } from './BrandDecor';
import { useLeadPopup } from '@/components/global/LeadPopupProvider';
import type { PackageValue } from '@/lib/validators';

export type PricingCardProps = {
  id: PackageValue;
  price: string;
  name: string;
  tagline: string;
  description: string;
  features: readonly string[];
  cta: string;
  tone: 'light' | 'dark';
  recommended?: boolean;
  recommendedLabel?: string;
  highlightFromIndex?: number;
};

const Check = ({ accent = false }: { accent?: boolean }) => (
  <svg
    aria-hidden
    viewBox="0 0 20 20"
    className={cn('h-5 w-5 shrink-0', accent ? 'text-orange' : 'text-current opacity-70')}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 10.5 L8 14.5 L16 6" />
  </svg>
);

export function PricingCard({
  id,
  price,
  name,
  tagline,
  description,
  features,
  cta,
  tone,
  recommended,
  recommendedLabel,
  highlightFromIndex,
}: PricingCardProps) {
  const { openPopup } = useLeadPopup();

  const isDark = tone === 'dark';

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className={cn(
        'relative flex flex-col gap-7 rounded-card p-7 md:p-10 shadow-soft border overflow-hidden',
        isDark
          ? 'bg-ink text-white border-white/5 lg:scale-[1.02]'
          : 'bg-white text-ink border-ink/5',
      )}
    >
      <CornerMarkers color={isDark ? 'orange' : 'orange'} size="sm" inset={14} />
      {isDark ? <BlurOrb color="orange" size={260} intensity="low" className="-top-20 -right-20" /> : null}

      {recommended ? (
        <div className="absolute -top-3 left-7 md:left-10 z-10">
          <Badge tone="orange" uppercase>
            {recommendedLabel ?? 'Рекомендовано'}
          </Badge>
        </div>
      ) : null}

      <header className="relative flex flex-col gap-4">
        <div className={cn('text-xs uppercase tracking-[0.16em] font-medium', isDark ? 'text-white/60' : 'text-neutralGray')}>
          {tagline}
        </div>
        <div className="flex items-baseline gap-3">
          <div className="text-display-md font-bold leading-none tracking-tight">{price}</div>
          <div className={cn('text-sm', isDark ? 'text-white/60' : 'text-neutralGray')}>фікс. вартість</div>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{name}</h3>
        <p className={cn('text-base leading-relaxed max-w-[42ch]', isDark ? 'text-white/70' : 'text-warmDark/80')}>
          {description}
        </p>
      </header>

      <ul className="relative flex flex-col gap-3.5">
        {features.map((f, i) => {
          const accent = highlightFromIndex !== undefined && i >= highlightFromIndex;
          return (
            <li key={f} className="flex items-start gap-3 text-[15px] leading-snug">
              <Check accent={accent} />
              <span className={cn(accent && (isDark ? 'text-white' : 'text-ink font-medium'))}>{f}</span>
            </li>
          );
        })}
      </ul>

      <div className="relative mt-auto pt-2">
        <Button
          variant={isDark ? 'primary' : 'dark'}
          size="lg"
          fullWidth
          onClick={() => openPopup(id)}
          iconRight={<ArrowIcon />}
        >
          {cta}
        </Button>
      </div>
    </motion.article>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 15 L15 5 M8 5 H15 V12" />
    </svg>
  );
}
