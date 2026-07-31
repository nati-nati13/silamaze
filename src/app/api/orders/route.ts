import { NextRequest, NextResponse } from 'next/server';

import { listOrdersForAdminService } from '@/features/order/service/order.service';
import { OrderQuerySchema } from '@/features/order/validations/order.validation';
import { auth } from '@/shared/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session || role !== 'admin') {
      return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 });
    }

    const params = Object.fromEntries(req.nextUrl.searchParams);
    const validated = OrderQuerySchema.safeParse(params);
    if (!validated.success) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const { data, status } = await listOrdersForAdminService(validated.data);
    return NextResponse.json(data, { status });
  } catch {
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
