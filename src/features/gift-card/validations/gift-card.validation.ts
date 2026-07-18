import { z } from 'zod';

const optionalEmail = z.string().email().optional().or(z.literal(''));

export const PublicGiftCardSchema = z
  .object({
    // structured buyer identity (Gift Card Builder)
    buyerFirstName: z.string().optional(),
    buyerLastName: z.string().optional(),
    buyerPhone: z.string().optional(),
    buyerEmail: optionalEmail,
    // recipient + display
    recipientName: z.string().optional(),
    recipientPhone: z.string().optional(),
    recipientEmail: optionalEmail,
    displayFrom: z.string().optional(),
    // legacy identity (reservation form) — kept for backward compatibility
    name: z.string().optional(),
    phone: z.string().optional(),
    email: optionalEmail,
    // shared
    amount: z.string().min(1),
    usage: z.enum(['თბილისი', 'საგარეჯო', 'ორივე']),
    delivery: z.enum(['ელექტრონული', 'ბეჭდური']),
    address: z.string().optional(),
    message: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    const first = (val.buyerFirstName ?? '').trim();
    const last = (val.buyerLastName ?? '').trim();
    const buyerPhone = (val.buyerPhone ?? '').trim();
    const structured = Boolean(first || last || buyerPhone);

    if (structured) {
      if (first.length < 2) {
        ctx.addIssue({ code: 'custom', path: ['buyerFirstName'], message: 'შეიყვანეთ სახელი' });
      }
      if (last.length < 2) {
        ctx.addIssue({ code: 'custom', path: ['buyerLastName'], message: 'შეიყვანეთ გვარი' });
      }
      if (buyerPhone.length < 5) {
        ctx.addIssue({ code: 'custom', path: ['buyerPhone'], message: 'შეიყვანეთ ტელეფონი' });
      }
    } else {
      if ((val.name ?? '').trim().length < 2) {
        ctx.addIssue({ code: 'custom', path: ['name'], message: 'სახელი სავალდებულოა' });
      }
      if ((val.phone ?? '').trim().length < 5) {
        ctx.addIssue({ code: 'custom', path: ['phone'], message: 'ტელეფონი სავალდებულოა' });
      }
    }

    // digital cards are delivered by email → required; physical pickup optional
    const email = (val.buyerEmail || val.email || '').trim();
    if (val.delivery === 'ელექტრონული' && email === '') {
      ctx.addIssue({
        code: 'custom',
        path: [structured ? 'buyerEmail' : 'email'],
        message: 'ელ-ფოსტა სავალდებულოა ციფრული ბარათისთვის',
      });
    }

    if (val.delivery === 'ბეჭდური' && (!val.address || val.address.trim().length < 5)) {
      ctx.addIssue({ code: 'custom', path: ['address'], message: 'მიუთითეთ მიწოდების მისამართი' });
    }
  });

export type PublicGiftCardType = z.infer<typeof PublicGiftCardSchema>;
