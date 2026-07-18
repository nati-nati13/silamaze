import { GiftCardOrderModel } from '@/features/gift-card/schema/gift-card.schema';
import { giftCardCode } from '@/shared/lib/gift-card-code';
import { mongo } from '@/shared/lib/mongo';

const MAX_CODE_ATTEMPTS = 5;

const isDuplicateKeyError = (error: unknown): boolean =>
  typeof error === 'object' && error !== null && (error as { code?: number }).code === 11000;

type CreateGiftCardData = {
  userId: string;
  amount: string;
  usage: string;
  delivery: string;
  address?: string;
  // structured buyer + recipient/display
  buyerFirstName: string;
  buyerLastName: string;
  buyerPhone: string;
  buyerEmail: string;
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string;
  displayFrom: string;
  // legacy dual-write
  recipient: string;
  sender: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
  status: string;
  originalAmount?: number | null;
  remainingBalance?: number | null;
  currency?: string | null;
};

export const giftCardRepository = {
  async create(data: CreateGiftCardData): Promise<{ code: string; status: string }> {
    await mongo.connect();
    // retry on the rare unique-index collision for `code`
    for (let attempt = 0; attempt < MAX_CODE_ATTEMPTS; attempt++) {
      const code = giftCardCode.generate();
      try {
        const doc = await GiftCardOrderModel.create({ ...data, code });
        return { code: doc.code, status: doc.status };
      } catch (error) {
        if (isDuplicateKeyError(error) && attempt < MAX_CODE_ATTEMPTS - 1) continue;
        throw error;
      }
    }
    throw new Error('Failed to generate a unique gift card code');
  },
};
