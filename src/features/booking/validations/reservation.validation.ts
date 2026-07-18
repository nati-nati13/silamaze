import { z } from 'zod';

export const ReservationSchema = z
  .object({
    type: z.enum(['service', 'course', 'giftcard']),
    location: z.enum(['თბილისი', 'საგარეჯო']).optional(),
    usage: z.enum(['თბილისი', 'საგარეჯო', 'ორივე']).optional(),
    delivery: z.enum(['ელექტრონული', 'ბეჭდური']).optional(),
    name: z.string().min(2, 'სახელი სავალდებულოა'),
    phone: z.string().min(5, 'ტელეფონი სავალდებულოა'),
    email: z.string().email('არასწორი ელ-ფოსტა').optional().or(z.literal('')),
    selection: z.string().min(1, 'გთხოვთ აირჩიოთ'),
    date: z.string().optional(),
    time: z.string().optional(),
    message: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.type === 'giftcard') {
      if (!val.usage) {
        ctx.addIssue({ code: 'custom', path: ['usage'], message: 'აირჩიეთ გამოყენების ადგილი' });
      }
      if (!val.delivery) {
        ctx.addIssue({ code: 'custom', path: ['delivery'], message: 'აირჩიეთ მიწოდების მეთოდი' });
      }
      return;
    }
    if (!val.location) {
      ctx.addIssue({ code: 'custom', path: ['location'], message: 'აირჩიეთ ფილიალი' });
    }
    if (!val.date) {
      ctx.addIssue({ code: 'custom', path: ['date'], message: 'აირჩიეთ თარიღი' });
    }
    if (!val.time) {
      ctx.addIssue({ code: 'custom', path: ['time'], message: 'აირჩიეთ დრო' });
    }
  });

export type ReservationType = z.infer<typeof ReservationSchema>;
