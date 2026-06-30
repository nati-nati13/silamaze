import { enrollmentRepository } from '@/features/enrollment/repository/enrollment.repository';
import { Enrollment } from '@/features/enrollment/types/enrollment.types';
import { ServiceResult } from '@/shared/types/common';

export async function createEnrollmentService(
  userId: string,
  courseId: string,
  courseTitle: string
): Promise<ServiceResult<{ message: string }>> {
  const existing = await enrollmentRepository.findByUserAndCourse(userId, courseId);
  if (existing) return { data: { error: 'ALREADY_ENROLLED' }, status: 409 };

  await enrollmentRepository.create({ userId, courseId, courseTitle });
  return { data: { message: 'Enrolled successfully' }, status: 201 };
}

export async function getUserEnrollmentsService(
  userId: string
): Promise<ServiceResult<Enrollment[]>> {
  const docs = await enrollmentRepository.findByUserId(userId);
  const enrollments: Enrollment[] = docs.map((doc) => ({
    id: doc._id.toString(),
    courseId: doc.courseId,
    courseTitle: doc.courseTitle,
    status: doc.status as Enrollment['status'],
    enrolledAt: (doc as unknown as { createdAt: Date }).createdAt?.toISOString?.() ?? '',
  }));
  return { data: enrollments, status: 200 };
}
