# shstkv — швидкі сайти для бізнесу

Конверсійний landing page для продажу розробки сайтів за 200€ та 400€ з Telegram-заявками.

**Stack:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · React Hook Form + Zod.

## Швидкий старт

```bash
npm install
cp .env.example .env.local
# заповни TELEGRAM_BOT_TOKEN (отримати у @BotFather)
npm run dev
```

Сайт стартує на http://localhost:3000.

## Налаштування Telegram-заявок

1. У [@BotFather](https://t.me/BotFather) створи бота → отримай `TELEGRAM_BOT_TOKEN`.
2. Поклади токен у `.env.local`.
3. У Telegram **напиши боту будь-яке повідомлення** (це створює чат).
4. Запусти:
   ```bash
   npm run telegram:chatid
   ```
   Скрипт виведе список доступних `chat_id`. Додай потрібний у `.env.local` як `TELEGRAM_CHAT_ID`.
5. Перезапусти `npm run dev`. Заявки тепер ітимуть у твій Telegram.

Якщо `TELEGRAM_CHAT_ID` порожній — користувач все одно бачить success-state, але заявка лише логується на сервер (її можна знайти у логах).

## Production-білд

```bash
npm run build && npm start
```

## Структура

```
app/                    Next.js App Router (layout, page, API, OG, icon)
components/
  layout/               Header, Footer, SectionWrapper
  sections/             8 секцій лендингу
  ui/                   Button, Badge, FormField, PricingCard, Accordion, ...
  global/               LeadPopup + Provider, MobileStickyCTA, FloatingWidget
hooks/                  useScrollDirection, useLockBodyScroll
lib/                    constants, validators (Zod), telegram, utils
content/copy.ts         весь український текст у одному файлі
scripts/                helper-скрипт для chat_id
```

## CRO-логіка

Порядок секцій оптимізований за класичною AIDA + objection handling:

1. **Hero** — хук + ціна одразу в H1 (фільтр трафіку).
2. **Audience** — self-identification.
3. **Value** — знімає заперечення "чому так дешево" **до** показу ціни.
4. **Telegram Leads** — демонстрація реальної цінності (диференціатор).
5. **Pricing** — продаж, коли цінність уже встановлена.
6. **Process** — знімає страх складності.
7. **FAQ** — last-mile objection handling.
8. **Final CTA** — вбудована форма + єдина orange-секція на сайті.

Глобально: `MobileStickyCTA` (mobile), `FloatingWidget` (desktop), `LeadPopup` зі всіх CTA. Кожен CTA знає свій preset пакета.

## SEO

- Локалізована `metadata` (uk_UA), OG-зображення генерується на edge.
- `JSON-LD` `Service` з offers 200€/400€ у `layout.tsx`.
- Один `<h1>`, semantic `<section aria-labelledby>` у кожному блоці.

## Дизайн-токени

Усі кольори та токени — у [tailwind.config.ts](tailwind.config.ts):

| Token | Колір |
|---|---|
| `ink` | `#0A0A0A` |
| `orange` / `orange-hover` | `#FB6221` / `#E5531A` |
| `soft` | `#D1D3D5` |
| `surface` | `#F2F2F2` |
| `neutralGray` | `#929090` |
| `warmDark` | `#4C433F` |

Шрифти — system-stack у стилі Apple: на macOS/iOS відображається справжній SF Pro, на інших ОС — Segoe UI / Roboto.

## Деплой

Готово для Vercel. Просто підключи репозиторій і додай env-змінні у Project Settings → Environment Variables.
