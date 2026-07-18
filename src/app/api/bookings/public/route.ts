import { NextRequest, NextResponse } from 'next/server';

import { createPublicBookingService } from '@/features/booking/service/booking.service';
import { PublicBookingSchema } from '@/features/booking/validations/booking.validation';
import { validateBody } from '@/shared/middleware/validate-body';

export async function POST(req: NextRequest) {
  try {
    const validated = await validateBody(req, PublicBookingSchema);
    if (validated instanceof NextResponse) return validated;

    const { data, status } = await createPublicBookingService(validated.data);
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error('POST /api/bookings/public failed', error);
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
