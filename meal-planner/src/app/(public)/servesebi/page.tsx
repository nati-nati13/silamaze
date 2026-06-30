import type { Metadata } from 'next';

import { ServicesPage } from '@/features/marketing/components/services-page';

export const metadata: Metadata = {
  title: 'სერვისები — Dermako Academy',
  description: 'კლასიკური კოსმეტოლოგია, ინექციები, მასაჟი, პერმანენტული მაკიაჟი, ლაზერული ეპილაცია.',
};

export default function ServicesPageRoute() {
  return <ServicesPage />;
}
