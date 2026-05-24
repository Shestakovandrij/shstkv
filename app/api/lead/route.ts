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
      // We still respond 200 to the client so user sees success;
      // the lead is logged on the server for manual recovery.
      console.info('[lead] payload:', parsed.data);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[lead] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'server' }, { status: 500 });
  }
}
