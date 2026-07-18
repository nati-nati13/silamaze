import { z } from 'zod';

export const ReservationSchema = z.object({
  type: z.enum(['service', 'course']),
  location: z.enum(['თბილისი', 'საგარეჯო']),
  name: z.string().min(2, 'სახელი სავალდებულოა'),
  phone: z.string().min(5, 'ტელეფონი სავალდებულოა'),
  email: z.string().email('არასწორი ელ-ფოსტა').optional().or(z.literal('')),
  selection: z.string().min(1, 'გთხოვთ აირჩიოთ'),
  date: z.string().min(1, 'აირჩიეთ თარიღი'),
  time: z.string().min(1, 'აირჩიეთ დრო'),
  message: z.string().optional(),
});

export type ReservationType = z.infer<typeof ReservationSchema>;
