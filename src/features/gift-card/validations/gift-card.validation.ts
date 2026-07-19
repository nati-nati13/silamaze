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
    isAnonymous: z.boolean().optional(),
    // ISO date (yyyy-mm-dd); empty = send as soon as the card is activated
    deliveryDate: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    const first = (val.buyerFirstName ?? '').trim();
    const last = (val.buyerLastName ?? '').trim();
    const buyerPhone = (val.buyerPhone ?? '').trim();
    const structured = Boolean(first || last || buyerPhone);
    const isDigital = val.delivery === 'ელექტრონული';

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
      // buyer email is always required for the order confirmation
      if ((val.buyerEmail ?? '').trim() === '') {
        ctx.addIssue({ code: 'custom', path: ['buyerEmail'], message: 'ელ-ფოსტა სავალდებულოა' });
      }
      // digital cards are delivered to the recipient's email
      if (isDigital && (val.recipientEmail ?? '').trim() === '') {
        ctx.addIssue({
          code: 'custom',
          path: ['recipientEmail'],
          message: 'მიმღების ელ-ფოსტა სავალდებულოა ციფრული ბარათისთვის',
        });
      }
    } else {
      if ((val.name ?? '').trim().length < 2) {
        ctx.addIssue({ code: 'custom', path: ['name'], message: 'სახელი სავალდებულოა' });
      }
      if ((val.phone ?? '').trim().length < 5) {
        ctx.addIssue({ code: 'custom', path: ['phone'], message: 'ტელეფონი სავალდებულოა' });
      }
      // legacy single-email flow: required for digital, reused as recipient email
      if (isDigital && (val.email ?? '').trim() === '') {
        ctx.addIssue({
          code: 'custom',
          path: ['email'],
          message: 'ელ-ფოსტა სავალდებულოა ციფრული ბარათისთვის',
        });
      }
    }

    if (val.delivery === 'ბეჭდური' && (!val.address || val.address.trim().length < 5)) {
      ctx.addIssue({ code: 'custom', path: ['address'], message: 'მიუთითეთ მიწოდების მისამართი' });
    }

    if (val.deliveryDate && val.deliveryDate.trim() !== '') {
      const chosen = new Date(val.deliveryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (Number.isNaN(chosen.getTime()) || chosen < today) {
        ctx.addIssue({
          code: 'custom',
          path: ['deliveryDate'],
          message: 'თარიღი არ შეიძლება იყოს წარსულში',
        });
      }
    }
  });

export type PublicGiftCardType = z.infer<typeof PublicGiftCardSchema>;

export const ActivateGiftCardSchema = z.object({
  code: z.string().min(1),
});

export type ActivateGiftCardType = z.infer<typeof ActivateGiftCardSchema>;
