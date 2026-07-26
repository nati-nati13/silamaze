import { DesignSystemPage } from '@/features/design-system/components/design-system-page';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design System',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <DesignSystemPage />;
}
