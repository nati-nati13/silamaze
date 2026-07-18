import mongoose, { InferSchemaType, Schema } from 'mongoose';

const BookingSchema = new Schema(
  {
    userId: { type: String, default: '', index: true },
    service: { type: String, required: true },
    location: {
      type: String,
      enum: ['თბილისი', 'საგარეჯო'],
      required: true,
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    name: { type: String, required: true, default: '' },
    phone: { type: String, required: true, default: '' },
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

export type BookingDocument = InferSchemaType<typeof BookingSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const BookingModel =
  mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
