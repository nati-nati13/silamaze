import { BookingDocument, BookingModel } from '@/features/booking/schema/booking.schema';
import { mongo } from '@/shared/lib/mongo';

export const bookingRepository = {
  async findByUserId(userId: string): Promise<BookingDocument[]> {
    await mongo.connect();
    return BookingModel.find({ userId }).sort({ createdAt: -1 }).lean<BookingDocument[]>().exec();
  },

  async create(data: {
    userId: string;
    service: string;
    location: string;
    date: string;
    time: string;
    name: string;
    phone: string;
    email?: string;
    message?: string;
  }): Promise<string> {
    await mongo.connect();
    const doc = await BookingModel.create({ ...data, status: 'pending' });
    return doc._id.toString();
  },
};
