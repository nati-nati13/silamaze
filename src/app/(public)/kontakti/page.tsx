import type { Metadata } from 'next';

import { ContactPage } from '@/features/marketing/components/contact-page';

export const metadata: Metadata = {
  title: 'კონტაქტი — Dermako Academy',
  description: 'Dermako Academy — თბილისი, ვაჟა-ფშაველას 8 | საგარეჯო, ერეკლე II-ის 49.',
};

export default function ContactPageRoute() {
  return <ContactPage />;
}
