import mongoose, { InferSchemaType, Schema } from 'mongoose';

import { CALLBACK_INTEREST_TYPES, CALLBACK_STATUSES } from '@/shared/const/callback.const';

const CallbackRequestSchema = new Schema(
  {
    name: { type: String, default: '' },
    phone: { type: String, required: true },
    interestType: {
      type: String,
      enum: [...CALLBACK_INTEREST_TYPES],
      required: true,
    },
    message: { type: String, default: '' },
    source: { type: String, default: 'homepage-cta', required: true },
    status: {
      type: String,
      enum: [...CALLBACK_STATUSES],
      default: 'new',
      required: true,
    },
  },
  { timestamps: true }
);

export type CallbackRequestDocument = InferSchemaType<typeof CallbackRequestSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const CallbackRequestModel =
  mongoose.models.CallbackRequest || mongoose.model('CallbackRequest', CallbackRequestSchema);
