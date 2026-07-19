import mongoose, { InferSchemaType, Schema } from 'mongoose';

import { GIFT_CARD_STATUSES, RECIPIENT_DELIVERY_STATUSES } from '@/shared/const/gift-card.const';

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
    // structured buyer / payer identity (authoritative)
    buyerFirstName: { type: String, default: '' },
    buyerLastName: { type: String, default: '' },
    buyerPhone: { type: String, default: '' },
    buyerEmail: { type: String, default: '' },
    // recipient + gift-card display text
    recipientName: { type: String, default: '' },
    recipientPhone: { type: String, default: '' },
    recipientEmail: { type: String, default: '' },
    displayFrom: { type: String, default: '' },
    // legacy fields kept readable + dual-written for backward compatibility
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
    // hide buyer identity from the recipient (buyer stays visible to admins)
    isAnonymous: { type: Boolean, default: false },
    // optional desired recipient send date; delivery only happens once active
    deliveryDate: { type: Date, default: null },
    deliveredAt: { type: Date, default: null },
    recipientDeliveryStatus: {
      type: String,
      enum: [...RECIPIENT_DELIVERY_STATUSES],
      default: 'pending',
      required: true,
    },
    deliveryFailureReason: { type: String, default: '' },
    // only the SHA-256 hash of the public verification token is stored
    verificationTokenHash: { type: String, default: null },
    qrGeneratedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

GiftCardOrderSchema.index({ verificationTokenHash: 1 }, { sparse: true });

GiftCardOrderSchema.index({ code: 1 }, { unique: true, sparse: true });

export type GiftCardOrderDocument = InferSchemaType<typeof GiftCardOrderSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const GiftCardOrderModel =
  mongoose.models.GiftCardOrder || mongoose.model('GiftCardOrder', GiftCardOrderSchema);
