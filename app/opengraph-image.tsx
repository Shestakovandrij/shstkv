import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Сайти для бізнесу за 200€ або 400€ — Telegram-заявки';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#D1D3D5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          fontFamily: 'system-ui, -apple-system, "SF Pro Display", sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#0A0A0A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FB6221',
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            ↗
          </div>
          <div style={{ fontSize: 26, fontWeight: 600, color: '#0A0A0A', letterSpacing: '-0.01em' }}>
            shstkv
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: '#0A0A0A',
              lineHeight: 0.95,
              letterSpacing: '-0.035em',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <span>Сайт для бізнесу за&nbsp;</span>
            <span style={{ background: '#FB6221', padding: '0 18px', borderRadius: 18, color: '#0A0A0A' }}>200€</span>
            <span>&nbsp;або&nbsp;</span>
            <span style={{ background: '#0A0A0A', padding: '0 18px', borderRadius: 18, color: '#FB6221' }}>400€</span>
          </div>
          <div style={{ fontSize: 28, color: '#4C433F', maxWidth: 900, lineHeight: 1.35 }}>
            Швидкий запуск під рекламу. Заявки одразу в Telegram.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontSize: 22, color: '#4C433F' }}>shstkv.com</div>
          <div
            style={{
              fontSize: 22,
              padding: '14px 26px',
              borderRadius: 999,
              background: '#0A0A0A',
              color: '#FFFFFF',
              fontWeight: 600,
            }}
          >
            Залишити заявку
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
