import { bookingRepository } from '@/features/booking/repository/booking.repository';
import { Booking } from '@/features/booking/types/booking.types';
import { BookingType } from '@/features/booking/validations/booking.validation';
import { ServiceResult } from '@/shared/types/common';

export async function createBookingService(
  userId: string,
  input: BookingType
): Promise<ServiceResult<{ message: string }>> {
  await bookingRepository.create({ userId, ...input });
  return { data: { message: 'Booking created' }, status: 201 };
}

export async function getUserBookingsService(
  userId: string
): Promise<ServiceResult<Booking[]>> {
  const docs = await bookingRepository.findByUserId(userId);
  const bookings: Booking[] = docs.map((doc) => ({
    id: doc._id.toString(),
    service: doc.service,
    location: doc.location,
    date: doc.date,
    time: doc.time,
    name: doc.name ?? '',
    phone: doc.phone ?? '',
    status: doc.status as Booking['status'],
    createdAt: (doc as unknown as { createdAt: Date }).createdAt?.toISOString?.() ?? '',
  }));
  return { data: bookings, status: 200 };
}
