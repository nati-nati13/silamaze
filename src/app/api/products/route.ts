import { NextRequest, NextResponse } from 'next/server';

import { listProductsService } from '@/features/product/service/product.service';
import { ProductQuerySchema } from '@/features/product/validations/product.validation';

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const validated = ProductQuerySchema.safeParse(params);
    if (!validated.success) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const { data, status } = await listProductsService(validated.data);
    return NextResponse.json(data, { status });
  } catch {
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
