import { GiftCardOrderModel } from '@/features/gift-card/schema/gift-card.schema';
import { mongo } from '@/shared/lib/mongo';

export const giftCardRepository = {
  async create(data: {
    userId: string;
    amount: string;
    usage: string;
    delivery: string;
    address?: string;
    recipient?: string;
    sender?: string;
    name: string;
    phone: string;
    email?: string;
    message?: string;
  }): Promise<string> {
    await mongo.connect();
    const doc = await GiftCardOrderModel.create({ ...data, status: 'pending' });
    return doc._id.toString();
  },
};
