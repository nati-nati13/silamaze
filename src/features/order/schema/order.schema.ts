import mongoose, { InferSchemaType, Schema } from 'mongoose';

import { ORDER_PAYMENT_STATUSES, ORDER_STATUSES } from '@/shared/const/order.const';

const OrderItemSchema = new Schema(
  {
    productName: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, default: null, min: 0 },
    subtotal: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    items: { type: [OrderItemSchema], default: [] },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: [...ORDER_STATUSES],
      default: 'pending',
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: [...ORDER_PAYMENT_STATUSES],
      default: 'unpaid',
      required: true,
    },
  },
  { timestamps: true }
);

export type OrderDocument = InferSchemaType<typeof OrderSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const OrderModel = mongoose.models.Order || mongoose.model('Order', OrderSchema);
