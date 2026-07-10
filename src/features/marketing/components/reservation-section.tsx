import { ReservationForm } from '@/features/marketing/components/reservation-form';
import { ReservationInfo } from '@/features/marketing/components/reservation-info';

export const ReservationSection = () => {
  return (
    <section id="slide-reservation" className="relative bg-background py-20 sm:py-28">
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:items-start">
        <ReservationInfo />
        <ReservationForm />
      </div>
    </section>
  );
};
