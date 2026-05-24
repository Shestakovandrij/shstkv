import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { AudienceSection } from '@/components/sections/AudienceSection';
import { IncludedSection } from '@/components/sections/IncludedSection';
import { TelegramLeadsSection } from '@/components/sections/TelegramLeadsSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { MobileStickyCTA } from '@/components/global/MobileStickyCTA';
import { FloatingWidget } from '@/components/global/FloatingWidget';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <AudienceSection />
        <IncludedSection />
        <TelegramLeadsSection />
        <PricingSection />
        <ProcessSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
      <FloatingWidget />
    </>
  );
}
