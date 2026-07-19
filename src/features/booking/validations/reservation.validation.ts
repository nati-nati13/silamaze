import { z } from 'zod';

export const ReservationSchema = z
  .object({
    type: z.enum(['service', 'course', 'giftcard']),
    location: z.enum(['თბილისი', 'საგარეჯო']).optional(),
    usage: z.enum(['თბილისი', 'საგარეჯო', 'ორივე']).optional(),
    delivery: z.enum(['ელექტრონული', 'ბეჭდური']).optional(),
    address: z.string().optional(),
    name: z.string().min(2, 'სახელი სავალდებულოა'),
    phone: z.string().min(5, 'ტელეფონი სავალდებულოა'),
    email: z.string().email('არასწორი ელ-ფოსტა').optional().or(z.literal('')),
    selection: z.string().min(1, 'გთხოვთ აირჩიოთ'),
    customAmount: z.string().optional(),
    date: z.string().optional(),
    time: z.string().optional(),
    message: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.type === 'giftcard') {
      if (val.selection === 'custom') {
        const value = Number((val.customAmount ?? '').replace(/[^\d.]/g, ''));
        if (!val.customAmount || !(value > 0)) {
          ctx.addIssue({ code: 'custom', path: ['customAmount'], message: 'ჩაწერეთ თანხა' });
        }
      }
      if (!val.usage) {
        ctx.addIssue({ code: 'custom', path: ['usage'], message: 'აირჩიეთ გამოყენების ადგილი' });
      }
      if (!val.delivery) {
        ctx.addIssue({ code: 'custom', path: ['delivery'], message: 'აირჩიეთ მიწოდების მეთოდი' });
      }
      if (val.delivery === 'ბეჭდური' && (!val.address || val.address.trim().length < 5)) {
        ctx.addIssue({ code: 'custom', path: ['address'], message: 'მიუთითეთ მიწოდების მისამართი' });
      }
      if (val.delivery === 'ელექტრონული' && (!val.email || val.email.trim() === '')) {
        ctx.addIssue({ code: 'custom', path: ['email'], message: 'ელ-ფოსტა სავალდებულოა ციფრული ბარათისთვის' });
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
