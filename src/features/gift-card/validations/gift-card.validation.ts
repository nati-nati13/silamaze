import { z } from 'zod';

export const PublicGiftCardSchema = z.object({
  amount: z.string().min(1),
  usage: z.enum(['თბილისი', 'საგარეჯო', 'ორივე']),
  delivery: z.enum(['ელექტრონული', 'ბეჭდური']),
  name: z.string().min(2, 'სახელი სავალდებულოა'),
  phone: z.string().min(5, 'ტელეფონი სავალდებულოა'),
  email: z.string().email().optional().or(z.literal('')),
  message: z.string().optional(),
});

export type PublicGiftCardType = z.infer<typeof PublicGiftCardSchema>;
