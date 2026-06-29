import mongoose, { InferSchemaType, Schema } from 'mongoose';

const EnrollmentSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    courseId: { type: String, required: true },
    courseTitle: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
      required: true,
    },
  },
  { timestamps: true }
);

export type EnrollmentDocument = InferSchemaType<typeof EnrollmentSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const EnrollmentModel =
  mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema);
