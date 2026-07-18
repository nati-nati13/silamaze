import { NextRequest, NextResponse } from 'next/server';

import { createPublicGiftCardService } from '@/features/gift-card/service/gift-card.service';
import { PublicGiftCardSchema } from '@/features/gift-card/validations/gift-card.validation';
import { validateBody } from '@/shared/middleware/validate-body';

export async function POST(req: NextRequest) {
  try {
    const validated = await validateBody(req, PublicGiftCardSchema);
    if (validated instanceof NextResponse) return validated;

    const { data, status } = await createPublicGiftCardService(validated.data);
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error('POST /api/gift-cards/public failed', error);
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
