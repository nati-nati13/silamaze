import type { Metadata } from 'next';

import { PressPage } from '@/features/marketing/components/press-page';

export const metadata: Metadata = {
  title: 'პრესა — Dermako Academy',
  description: 'Dermako Academy მედიაში.',
};

export default function PressPageRoute() {
  return <PressPage />;
}
