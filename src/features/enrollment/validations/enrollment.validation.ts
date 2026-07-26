import { z } from 'zod';

import { COURSES } from '@/shared/const/courses.const';

const COURSE_IDS = COURSES.map((course) => course.id) as [string, ...string[]];

export const EnrollmentSchema = z.object({
  courseId: z.enum(COURSE_IDS),
  courseTitle: z.string().min(1).max(200),
});

export type EnrollmentType = z.infer<typeof EnrollmentSchema>;
