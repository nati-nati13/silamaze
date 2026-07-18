export const BOOKING_SERVICES = [
  'კლასიკური კოსმეტოლოგია',
  'ინექციური კოსმეტოლოგია',
  'მასაჟი',
  'პერმანენტული მაკიაჟი',
  'ლაზერული (დიოდური) ეპილაცია',
] as const;

export const BOOKING_LOCATIONS = ['თბილისი', 'საგარეჯო'] as const;

export const RESERVATION_DISCLAIMER =
  '* დაჯავშნის გაგზავნის შემდეგ, ჩვენი კოლეგა უმოკლეს დროში დაგიკავშირდებათ მითითებულ ' +
  'ნომერზე დეტალებისა და ზუსტი დროის დასაზუსტებლად.';

export type BookingLocation = (typeof BOOKING_LOCATIONS)[number];

export const AVAILABLE_TIMES = [
  '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00',
] as const;

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';
export type EnrollmentStatus = 'pending' | 'confirmed' | 'cancelled';

export const STATUS_LABELS: Record<BookingStatus, string> = {
  pending: 'განხილვაში',
  confirmed: 'დადასტურებული',
  cancelled: 'გაუქმებული',
};
