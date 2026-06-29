import type { Metadata } from 'next';

import { BookingForm } from '@/features/booking/components/booking-form';
import { Footer } from '@/shared/components/layout/footer';
import { Header } from '@/shared/components/layout/header';

export const metadata: Metadata = {
  title: 'ჯავშანი — Dermako Academy',
};

export default function DajavshnaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}
