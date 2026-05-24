export const NAV_ITEMS = [
  { id: 'audience', label: 'Для кого' },
  { id: 'included', label: 'Що входить' },
  { id: 'pricing', label: 'Пакети' },
  { id: 'process', label: 'Процес' },
  { id: 'faq', label: 'FAQ' },
] as const;

export const TELEGRAM_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME ?? 'Andrii_DEV9';
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_USERNAME}`;
