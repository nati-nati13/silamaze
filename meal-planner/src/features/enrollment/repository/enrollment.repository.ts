import { EnrollmentDocument, EnrollmentModel } from '@/features/enrollment/schema/enrollment.schema';
import { mongo } from '@/shared/lib/mongo';

export const enrollmentRepository = {
  async findByUserId(userId: string): Promise<EnrollmentDocument[]> {
    await mongo.connect();
    return EnrollmentModel.find({ userId }).lean<EnrollmentDocument[]>().exec();
  },

  async findByUserAndCourse(userId: string, courseId: string): Promise<EnrollmentDocument | null> {
    await mongo.connect();
    return EnrollmentModel.findOne({ userId, courseId }).lean<EnrollmentDocument>().exec();
  },

  async create(data: { userId: string; courseId: string; courseTitle: string }): Promise<string> {
    await mongo.connect();
    const doc = await EnrollmentModel.create({ ...data, status: 'pending' });
    return doc._id.toString();
  },
};
