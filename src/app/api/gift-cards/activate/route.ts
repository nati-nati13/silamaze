import { NextRequest, NextResponse } from 'next/server';

import { activateGiftCardService } from '@/features/gift-card/service/gift-card.service';
import { ActivateGiftCardSchema } from '@/features/gift-card/validations/gift-card.validation';
import { auth } from '@/shared/lib/auth';
import { validateBody } from '@/shared/middleware/validate-body';

export async function POST(req: NextRequest) {
  try {
    // authorized admins only — activation sets authoritative money/validity fields
    const session = await auth();
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session || role !== 'admin') {
      return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 });
    }

    const validated = await validateBody(req, ActivateGiftCardSchema);
    if (validated instanceof NextResponse) return validated;

    const { data, status } = await activateGiftCardService(validated.data.code);
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error('POST /api/gift-cards/activate failed', error);
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
