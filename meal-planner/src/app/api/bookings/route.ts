import { NextRequest, NextResponse } from 'next/server';

import { createBookingService, getUserBookingsService } from '@/features/booking/service/booking.service';
import { BookingSchema } from '@/features/booking/validations/booking.validation';
import { auth } from '@/shared/lib/auth';
import { validateBody } from '@/shared/middleware/validate-body';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });

    const userId = (session.user as { id?: string }).id ?? '';
    const { data, status } = await getUserBookingsService(userId);
    return NextResponse.json(data, { status });
  } catch {
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });

    const userId = (session.user as { id?: string }).id ?? '';
    const validated = await validateBody(req, BookingSchema);
    if (validated instanceof NextResponse) return validated;

    const { data, status } = await createBookingService(userId, validated.data);
    return NextResponse.json(data, { status });
  } catch {
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
