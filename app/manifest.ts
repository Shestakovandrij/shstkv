import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'shstkv — швидкі сайти для бізнесу',
    short_name: 'shstkv',
    description: 'Сайти за 200€ або 400€ з Telegram-заявками',
    start_url: '/',
    display: 'standalone',
    background_color: '#D1D3D5',
    theme_color: '#0A0A0A',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
