export type EnrollmentStatus = 'pending' | 'confirmed' | 'cancelled';

export type Enrollment = {
  id: string;
  courseId: string;
  courseTitle: string;
  status: EnrollmentStatus;
  enrolledAt: string;
};
