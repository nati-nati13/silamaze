import type { Metadata } from 'next';

import { GalleryPage } from '@/features/marketing/components/gallery-page';

export const metadata: Metadata = {
  title: 'გალერეა — Dermako Academy',
  description: 'Dermako Academy-ის სერვისებისა და პროცედურების ფოტოგალერეა.',
};

export default function GalleryPageRoute() {
  return <GalleryPage />;
}
