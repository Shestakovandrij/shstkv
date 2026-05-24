'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AUDIENCE } from '@/content/copy';
import { useLeadPopup } from '@/components/global/LeadPopupProvider';

export function AudienceSection() {
  const { openPopup } = useLeadPopup();

  return (
    <SectionWrapper id="audience" ariaLabelledBy="audience-title" bg="surface">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <span className="text-xs uppercase tracking-[0.16em] font-medium text-neutralGray">
            {AUDIENCE.eyebrow}
          </span>
          <h2 id="audience-title" className="text-display-section font-bold tracking-tight text-balance">
            {AUDIENCE.headline}
          </h2>
          <p className="max-w-xl text-lead text-warmDark/80">{AUDIENCE.body}</p>

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

        <ul className="relative flex flex-col gap-3 lg:pt-6">
          {AUDIENCE.useCases.map((u, i) => (
            <motion.li
              key={u.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginLeft: i % 3 === 0 ? '0%' : i % 3 === 1 ? '8%' : '4%',
              }}
            >
              <Badge tone={u.tone} className="rounded-pill px-5 py-3 text-base">
                {u.label}
              </Badge>
            </motion.li>
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
