import { NextRequest, NextResponse } from 'next/server';

import { createProductService, listProductsService } from '@/features/product/service/product.service';
import { ProductCreateSchema } from '@/features/product/validations/product-admin.validation';
import { ProductQuerySchema } from '@/features/product/validations/product.validation';
import { auth } from '@/shared/lib/auth';
import { validateBody } from '@/shared/middleware/validate-body';

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

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session || role !== 'admin') {
      return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 });
    }

    const validated = await validateBody(req, ProductCreateSchema);
    if (validated instanceof NextResponse) return validated;

    const { data, status } = await createProductService(validated.data);
    return NextResponse.json(data, { status });
  } catch {
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
