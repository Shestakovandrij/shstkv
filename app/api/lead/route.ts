import { NextRequest, NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/validators';
import { sendLeadToTelegram } from '@/lib/telegram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = leadFormSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'validation', issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const result = await sendLeadToTelegram(parsed.data);

    if (!result.ok) {
      console.error('[lead] telegram delivery failed:', result.error);
      console.info('[lead] payload (for manual recovery):', parsed.data);

      // If chat_id is intentionally not configured (e.g. local dev),
      // accept the lead silently — it's logged above for recovery.
      // If credentials are set but delivery failed → surface 502 so user retries.
      const isMissingConfig =
        result.error.includes('missing') || result.error.includes('TELEGRAM_');
      if (!isMissingConfig) {
        return NextResponse.json(
          { ok: false, error: 'delivery' },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[lead] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'server' }, { status: 500 });
  }
}
