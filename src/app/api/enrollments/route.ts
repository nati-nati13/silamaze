import { NextRequest, NextResponse } from 'next/server';

import { createEnrollmentService, getUserEnrollmentsService } from '@/features/enrollment/service/enrollment.service';
import { EnrollmentSchema } from '@/features/enrollment/validations/enrollment.validation';
import { auth } from '@/shared/lib/auth';
import { validateBody } from '@/shared/middleware/validate-body';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });

    const userId = (session.user as { id?: string }).id ?? '';
    const { data, status } = await getUserEnrollmentsService(userId);
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
    const validated = await validateBody(req, EnrollmentSchema);
    if (validated instanceof NextResponse) return validated;

    const { courseId, courseTitle } = validated.data;
    const { data, status } = await createEnrollmentService(userId, courseId, courseTitle);
    return NextResponse.json(data, { status });
  } catch {
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
