import { NextRequest, NextResponse } from 'next/server';

import { createCallbackService } from '@/features/callback/service/callback.service';
import { PublicCallbackSchema } from '@/features/callback/validations/callback.validation';
import { validateBody } from '@/shared/middleware/validate-body';

export async function POST(req: NextRequest) {
  try {
    const validated = await validateBody(req, PublicCallbackSchema);
    if (validated instanceof NextResponse) return validated;

    const { data, status } = await createCallbackService(validated.data);
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error('POST /api/callbacks/public failed', error);
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
