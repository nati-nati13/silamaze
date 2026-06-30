export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export type Booking = {
  id: string;
  service: string;
  location: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  status: BookingStatus;
  createdAt: string;
};
