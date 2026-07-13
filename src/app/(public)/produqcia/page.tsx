import { ProductsPage } from '@/features/marketing/components/products-page';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'პროდუქცია — Dermako',
  description: 'პროფესიონალური კოსმეტიკური ხაზი — მალე დაგვემატება.',
};

export default function ProductsPageRoute() {
  return <ProductsPage />;
}
