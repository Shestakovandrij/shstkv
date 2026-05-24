import type { LeadFormValues } from './validators';

const PACKAGE_LABEL: Record<LeadFormValues['packageValue'], string> = {
  p200: 'Сайт за 200€',
  p400: 'Сайт за 400€',
  consult: 'Не знаю, потрібна консультація',
};

function escapeMarkdown(text: string) {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
}

function formatMessage(lead: LeadFormValues) {
  const lines = [
    '*Нова заявка з сайту*',
    '',
    `*Ім'я:* ${escapeMarkdown(lead.name)}`,
    `*Телефон:* ${escapeMarkdown(lead.phone)}`,
    `*Пакет:* ${escapeMarkdown(PACKAGE_LABEL[lead.packageValue])}`,
  ];
  if (lead.comment && lead.comment.trim().length > 0) {
    lines.push(`*Коментар:* ${escapeMarkdown(lead.comment.trim())}`);
  }
  lines.push('', `_${escapeMarkdown(new Date().toLocaleString('uk-UA'))}_`);
  return lines.join('\n');
}

export async function sendLeadToTelegram(
  lead: LeadFormValues,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token) {
    return { ok: false, error: 'TELEGRAM_BOT_TOKEN missing' };
  }
  if (!chatId) {
    return { ok: false, error: 'TELEGRAM_CHAT_ID missing (run `npm run telegram:chatid`)' };
  }

  const text = formatMessage(lead);
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true,
      }),
      cache: 'no-store',
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return { ok: false, error: `telegram ${res.status}: ${errText}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
