import type { Metadata } from 'next';

import { AcademyPage } from '@/features/marketing/components/academy-page';

export const metadata: Metadata = {
  title: 'აკადემია — Dermako Academy',
  description: 'პროფესიული კურსები კოსმეტოლოგიაში. ლაზერული ეპილაცია, პერმანენტული მაკიაჟი.',
};

export default function AcademyPageRoute() {
  return <AcademyPage />;
}
