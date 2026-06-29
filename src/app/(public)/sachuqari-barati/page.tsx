import type { Metadata } from 'next';

import { GiftCardPage } from '@/features/marketing/components/gift-card-page';

export const metadata: Metadata = {
  title: 'სასაჩუქრე ბარათი — Dermako Academy',
  description: 'Dermako Academy-ის სასაჩუქრე ბარათი — პრემიუმ კოსმეტოლოგიური სერვისების საჩუქარი.',
};

export default function GiftCardPageRoute() {
  return <GiftCardPage />;
}
