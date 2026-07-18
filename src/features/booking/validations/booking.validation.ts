import { z } from 'zod';

export const BookingSchema = z.object({
  service: z.string().min(1),
  location: z.enum(['თბილისი', 'საგარეჯო']),
  date: z.string().min(1),
  time: z.string().min(1),
  name: z.string().min(2, 'სახელი სავალდებულოა'),
  phone: z.string().min(5, 'ტელეფონი სავალდებულოა'),
  message: z.string().optional(),
});

export type BookingType = z.infer<typeof BookingSchema>;

export const PublicBookingSchema = z.object({
  service: z.string().min(1),
  location: z.enum(['თბილისი', 'საგარეჯო']),
  date: z.string().min(1),
  time: z.string().min(1),
  name: z.string().min(2, 'სახელი სავალდებულოა'),
  phone: z.string().min(5, 'ტელეფონი სავალდებულოა'),
  email: z.string().email().optional().or(z.literal('')),
  message: z.string().optional(),
});

export type PublicBookingType = z.infer<typeof PublicBookingSchema>;
