import { notFound } from 'next/navigation';

import { CourseDetailPage } from '@/features/marketing/components/course-detail-page';
import { COURSES } from '@/shared/const/courses.const';

import type { Metadata } from 'next';

type CourseRouteProps = {
  params: Promise<{ courseId: string }>;
};

export function generateStaticParams() {
  return COURSES.map((course) => ({ courseId: course.id }));
}

export async function generateMetadata({
  params,
}: CourseRouteProps): Promise<Metadata> {
  const { courseId } = await params;
  const course = COURSES.find((item) => item.id === courseId);
  if (!course) return { title: 'კურსი — Dermako Academy' };
  return {
    title: `${course.title} — Dermako Academy`,
    description: course.description,
  };
}

export default async function CourseDetailRoute({ params }: CourseRouteProps) {
  const { courseId } = await params;
  const course = COURSES.find((item) => item.id === courseId);
  if (!course) notFound();
  return <CourseDetailPage course={course} />;
}
