import { z } from 'zod';

export const PublicGiftCardSchema = z
  .object({
    amount: z.string().min(1),
    usage: z.enum(['თბილისი', 'საგარეჯო', 'ორივე']),
    delivery: z.enum(['ელექტრონული', 'ბეჭდური']),
    address: z.string().optional(),
    recipient: z.string().optional(),
    sender: z.string().optional(),
    name: z.string().min(2, 'სახელი სავალდებულოა'),
    phone: z.string().min(5, 'ტელეფონი სავალდებულოა'),
    email: z.string().email().optional().or(z.literal('')),
    message: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.delivery === 'ბეჭდური' && (!val.address || val.address.trim().length < 5)) {
      ctx.addIssue({ code: 'custom', path: ['address'], message: 'მიუთითეთ მიწოდების მისამართი' });
    }
    // digital cards are delivered by email, so email is required there;
    // physical pickup keeps it optional
    if (val.delivery === 'ელექტრონული' && (!val.email || val.email.trim() === '')) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'ელ-ფოსტა სავალდებულოა ციფრული ბარათისთვის',
      });
    }
  });

export type PublicGiftCardType = z.infer<typeof PublicGiftCardSchema>;
