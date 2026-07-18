import mongoose, { InferSchemaType, Schema } from 'mongoose';

import { GIFT_CARD_STATUSES } from '@/shared/const/gift-card.const';

const GiftCardOrderSchema = new Schema(
  {
    userId: { type: String, default: '', index: true },
    // server-generated public code; sparse so pre-existing code-less docs stay valid
    code: { type: String, default: null },
    amount: { type: String, required: true },
    usage: {
      type: String,
      enum: ['თბილისი', 'საგარეჯო', 'ორივე'],
      required: true,
    },
    delivery: {
      type: String,
      enum: ['ელექტრონული', 'ბეჭდური'],
      required: true,
    },
    address: { type: String, default: '' },
    recipient: { type: String, default: '' },
    sender: { type: String, default: '' },
    name: { type: String, required: true, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    message: { type: String, default: '' },
    status: {
      type: String,
      enum: [...GIFT_CARD_STATUSES],
      default: 'pending',
      required: true,
    },
    // monetary gift cards only; null for service/course cards
    originalAmount: { type: Number, default: null },
    remainingBalance: { type: Number, default: null },
    currency: { type: String, default: null },
    // set only when the card becomes active (payment not implemented yet)
    issuedAt: { type: Date, default: null },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

GiftCardOrderSchema.index({ code: 1 }, { unique: true, sparse: true });

export type GiftCardOrderDocument = InferSchemaType<typeof GiftCardOrderSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const GiftCardOrderModel =
  mongoose.models.GiftCardOrder || mongoose.model('GiftCardOrder', GiftCardOrderSchema);
