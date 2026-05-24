'use client';

/* -------------------------------------------------------------
 * shstkv Preloader
 * Конфігурація:
 *  - LOGO_SRC       : шлях до SVG логотипа (інвертований, для темного фону)
 *  - BG_COLOR       : фон preloader-а (тут — фірмовий чорний)
 *  - ACCENT_COLOR   : основний акцент (orange)
 *  - INTRO_DURATION : тривалість intro-анімації (мс), мінімум показу
 *  - FADE_DURATION  : тривалість зникнення (мс)
 * Анімація: дві фірмові лінії (orange + soft) сходяться по горизонталі,
 * відкриваючи логотип через clip-path reveal + soft pulse-glow.
 * Без spinner, без %, без progress-бару.
 * ------------------------------------------------------------- */

import { useEffect, useState } from 'react';

const LOGO_SRC = '/logo-light.svg';
const BG_COLOR = '#0A0A0A';
const ACCENT_COLOR = '#FB6221';
const SOFT_COLOR = '#D1D3D5';
const INTRO_DURATION = 1400;
const FADE_DURATION = 600;

export function Preloader() {
  const [phase, setPhase] = useState<'mount' | 'fading' | 'done'>('mount');

  useEffect(() => {
    // Блокуємо скрол до фінального fade-out
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const hide = () => {
      // мінімальний час показу — щоб анімація встигла відіграти
      window.setTimeout(() => setPhase('fading'), INTRO_DURATION);
    };

    if (document.readyState === 'complete') {
      hide();
    } else {
      window.addEventListener('load', hide, { once: true });
    }

    // fallback — на випадок якщо load не спрацює (бо SSR + повна гідрація)
    const fallback = window.setTimeout(hide, INTRO_DURATION + 800);

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener('load', hide);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    if (phase !== 'fading') return;
    const t = window.setTimeout(() => {
      document.body.style.overflow = '';
      setPhase('done');
    }, FADE_DURATION);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      aria-hidden="true"
      data-fading={phase === 'fading' ? 'true' : 'false'}
      className="shstkv-preloader"
      style={{ backgroundColor: BG_COLOR }}
    >
      <div className="shstkv-preloader__stage">
        {/* Дві фірмові лінії, що сходяться */}
        <span className="shstkv-preloader__line shstkv-preloader__line--left" style={{ backgroundColor: ACCENT_COLOR }} />
        <span className="shstkv-preloader__line shstkv-preloader__line--right" style={{ backgroundColor: SOFT_COLOR }} />

        {/* М’який світловий «пульс» за логотипом */}
        <span
          className="shstkv-preloader__glow"
          style={{
            background: `radial-gradient(closest-side, ${ACCENT_COLOR}33, transparent 70%)`,
          }}
        />

        {/* Логотип, що відкривається через clip-path */}
        <div className="shstkv-preloader__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_SRC} alt="" width={260} height={56} />
        </div>

        {/* Тонкий sweep-промінь по логотипу */}
        <span className="shstkv-preloader__shine" />
      </div>

      <style jsx>{`
        .shstkv-preloader {
          position: fixed;
          inset: 0;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity ${FADE_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .shstkv-preloader[data-fading='true'] {
          opacity: 0;
          transform: scale(1.02);
          pointer-events: none;
        }

        .shstkv-preloader__stage {
          position: relative;
          width: min(80vw, 320px);
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }

        @media (min-width: 768px) {
          .shstkv-preloader__stage {
            width: min(60vw, 420px);
            height: 96px;
          }
        }

        .shstkv-preloader__line {
          position: absolute;
          top: 50%;
          height: 1px;
          width: 100%;
          opacity: 0;
          transform: translateY(-50%) scaleX(0);
          transform-origin: center;
          animation: shstkv-line 1100ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .shstkv-preloader__line--left {
          transform-origin: left center;
          animation-delay: 60ms;
        }
        .shstkv-preloader__line--right {
          transform-origin: right center;
          animation-delay: 140ms;
        }

        .shstkv-preloader__glow {
          position: absolute;
          inset: -40% -20%;
          opacity: 0;
          animation: shstkv-glow 1800ms ease-out 350ms forwards;
          filter: blur(4px);
        }

        .shstkv-preloader__logo {
          position: relative;
          display: inline-flex;
          opacity: 0;
          transform: scale(0.94);
          clip-path: inset(0 100% 0 0);
          animation: shstkv-reveal 1100ms cubic-bezier(0.22, 1, 0.36, 1) 280ms forwards;
        }
        .shstkv-preloader__logo :global(img) {
          display: block;
          width: 100%;
          height: auto;
          max-width: 260px;
        }
        @media (min-width: 768px) {
          .shstkv-preloader__logo :global(img) {
            max-width: 340px;
          }
        }

        .shstkv-preloader__shine {
          position: absolute;
          top: 0;
          bottom: 0;
          left: -30%;
          width: 30%;
          background: linear-gradient(
            100deg,
            transparent 0%,
            rgba(251, 98, 33, 0) 30%,
            rgba(251, 98, 33, 0.55) 50%,
            rgba(251, 98, 33, 0) 70%,
            transparent 100%
          );
          mix-blend-mode: screen;
          opacity: 0;
          animation: shstkv-shine 1400ms cubic-bezier(0.22, 1, 0.36, 1) 600ms forwards;
          pointer-events: none;
        }

        @keyframes shstkv-line {
          0% {
            opacity: 0;
            transform: translateY(-50%) scaleX(0);
          }
          60% {
            opacity: 0.7;
          }
          100% {
            opacity: 0.4;
            transform: translateY(-50%) scaleX(1);
          }
        }

        @keyframes shstkv-glow {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0.55;
            transform: scale(1.05);
          }
        }

        @keyframes shstkv-reveal {
          0% {
            opacity: 0;
            transform: scale(0.94);
            clip-path: inset(0 100% 0 0);
          }
          40% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1);
            clip-path: inset(0 0% 0 0);
          }
        }

        @keyframes shstkv-shine {
          0% {
            opacity: 0;
            left: -30%;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            left: 130%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .shstkv-preloader__line,
          .shstkv-preloader__glow,
          .shstkv-preloader__logo,
          .shstkv-preloader__shine {
            animation: none;
            opacity: 1;
            transform: none;
            clip-path: none;
          }
        }
      `}</style>
    </div>
  );
}
