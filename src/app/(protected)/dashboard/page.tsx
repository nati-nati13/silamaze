import { getUserBookingsService } from '@/features/booking/service/booking.service';
import { DashboardPage } from '@/features/dashboard/components/dashboard-page';
import { getUserEnrollmentsService } from '@/features/enrollment/service/enrollment.service';
import { auth } from '@/shared/lib/auth';

export default async function DashboardPageRoute() {
  const session = await auth();
  const userId = (session?.user as { id?: string })?.id ?? '';

  const [bookingsResult, enrollmentsResult] = await Promise.all([
    getUserBookingsService(userId),
    getUserEnrollmentsService(userId),
  ]);

  return (
    <DashboardPage
      user={{
        name: session?.user?.name ?? '',
        email: session?.user?.email ?? '',
        phone: (session?.user as { phone?: string })?.phone ?? '',
      }}
      bookings={Array.isArray(bookingsResult.data) ? bookingsResult.data : []}
      enrollments={Array.isArray(enrollmentsResult.data) ? enrollmentsResult.data : []}
    />
  );
}
