import type { Metadata, Viewport } from 'next';
import { LeadPopupProvider } from '@/components/global/LeadPopupProvider';
import { Preloader } from '@/components/global/Preloader';
import './globals.css';

const SITE_URL = 'https://shstkv.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Сайти для бізнесу за 200€ / 400€ з Telegram-заявками',
  description:
    'Швидко створимо сайт для реклами, презентації послуг і збору заявок. Пакети 200€ та 400€, адаптація під мобільні, форма заявки і Telegram-бот.',
  keywords: [
    'розробка сайту',
    'landing page',
    'сайт під рекламу',
    'сайт за 200 євро',
    'сайт за 400 євро',
    'Telegram заявки',
    'швидкий сайт для бізнесу',
  ],
  authors: [{ name: 'shstkv' }],
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: SITE_URL,
    siteName: 'shstkv — швидкі сайти для бізнесу',
    title: 'Сайти для бізнесу за 200€ / 400€ з Telegram-заявками',
    description:
      'Швидкий запуск сайту під рекламу, презентацію послуг і збір заявок. Заявки приходять одразу в Telegram.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Сайти для бізнесу за 200€ / 400€',
    description: 'Швидкий сайт під рекламу і Telegram-заявки.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: '#D1D3D5',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Розробка landing page для бізнесу',
  provider: {
    '@type': 'Organization',
    name: 'shstkv',
    url: SITE_URL,
  },
  areaServed: 'UA',
  offers: [
    {
      '@type': 'Offer',
      name: 'Сайт за 200€',
      price: '200',
      priceCurrency: 'EUR',
      description: 'Базовий сайт для швидкого старту бізнесу: структура, мобільна адаптація, форма заявки, Telegram-заявки.',
    },
    {
      '@type': 'Offer',
      name: 'Сайт за 400€',
      price: '400',
      priceCurrency: 'EUR',
      description: 'Сильніша структура сайту під рекламу: блоки довіри, FAQ, popup-форма, Telegram-заявки.',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body className="font-sans">
        <Preloader />
        <LeadPopupProvider>{children}</LeadPopupProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
