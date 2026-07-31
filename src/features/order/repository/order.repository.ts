import { OrderDocument, OrderModel } from '@/features/order/schema/order.schema';
import { OrderPaymentStatus, OrderStatus } from '@/shared/const/order.const';
import { mongo } from '@/shared/lib/mongo';

export const orderRepository = {
  async find(filter: Record<string, unknown>, skip: number, limit: number): Promise<OrderDocument[]> {
    await mongo.connect();
    return OrderModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean<OrderDocument[]>()
      .exec();
  },

  async count(filter: Record<string, unknown>): Promise<number> {
    await mongo.connect();
    return OrderModel.countDocuments(filter).exec();
  },

  async findById(id: string): Promise<OrderDocument | null> {
    await mongo.connect();
    return OrderModel.findById(id).lean<OrderDocument | null>().exec();
  },

  async updateById(
    id: string,
    patch: Partial<{ status: OrderStatus; paymentStatus: OrderPaymentStatus }>
  ): Promise<OrderDocument | null> {
    await mongo.connect();
    return OrderModel.findByIdAndUpdate(id, { $set: patch }, { new: true })
      .lean<OrderDocument | null>()
      .exec();
  },
};
