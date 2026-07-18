import mongoose, { InferSchemaType, Schema } from 'mongoose';

const GiftCardOrderSchema = new Schema(
  {
    userId: { type: String, default: '', index: true },
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
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
      required: true,
    },
  },
  { timestamps: true }
);

export type GiftCardOrderDocument = InferSchemaType<typeof GiftCardOrderSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const GiftCardOrderModel =
  mongoose.models.GiftCardOrder || mongoose.model('GiftCardOrder', GiftCardOrderSchema);
