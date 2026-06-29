import { NextRequest, NextResponse } from 'next/server';

import { createEnrollmentService, getUserEnrollmentsService } from '@/features/enrollment/service/enrollment.service';
import { auth } from '@/shared/lib/auth';

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
    const body = await req.json() as { courseId?: string; courseTitle?: string };
    const { courseId, courseTitle } = body;

    if (!courseId || !courseTitle) {
      return NextResponse.json({ error: 'MISSING_FIELDS' }, { status: 400 });
    }

    const { data, status } = await createEnrollmentService(userId, courseId, courseTitle);
    return NextResponse.json(data, { status });
  } catch {
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
