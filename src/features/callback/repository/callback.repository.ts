import { CallbackRequestDocument, CallbackRequestModel } from '@/features/callback/schema/callback.schema';
import { mongo } from '@/shared/lib/mongo';

export const callbackRepository = {
  async create(data: {
    name: string;
    phone: string;
    interestType: string;
    message: string;
    source: string;
    status: string;
  }): Promise<string> {
    await mongo.connect();
    const doc = await CallbackRequestModel.create(data);
    return doc._id.toString();
  },

  async findRecent(
    phone: string,
    source: string,
    since: Date
  ): Promise<CallbackRequestDocument | null> {
    await mongo.connect();
    return CallbackRequestModel.findOne({ phone, source, createdAt: { $gte: since } })
      .lean<CallbackRequestDocument | null>()
      .exec();
  },
};
